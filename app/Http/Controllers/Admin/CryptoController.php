<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\CryptoWithdraw;
use App\Models\FiatCurrency;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CryptoController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:crypto-withdraw-list|crypto-withdraw-create|crypto-withdraw-edit|crypto-withdraw-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:crypto-withdraw-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:crypto-withdraw-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:crypto-withdraw-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $withdraws = CryptoWithdraw::join('users', 'users.id', '=', 'crypto_withdraws.user_id')
            ->join('companies', 'companies.id', '=', 'crypto_withdraws.company_id')
            ->join('fiat_currencies', 'fiat_currencies.id', '=', 'crypto_withdraws.currency_id')
            ->select('crypto_withdraws.id', 'companies.id as company_id', 'fiat_currencies.ticker as currency_name', 'companies.name', 'crypto_withdraws.status', 'address', 'amount', 'memo', 'users.email')->orderBy('id', 'DESC')->paginate(5)->toArray();

        $companyid = Company::select(DB::raw('id as value'), DB::raw('name  as label'))->orderBy('id', 'DESC')->paginate(5)->toArray();
        $currencies = FiatCurrency::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();
        $userid = User::select(DB::raw('id as value'), DB::raw('email  as label'))->orderBy('id', 'DESC')->paginate(5)->toArray();

        return Inertia::render('Backoffice/Admin/CryptoWithdrawManagement', ['userid' => $userid, 'companyid' => $companyid, 'currencies' => $currencies, 'withdraws' => $withdraws, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'company_id' => 'required',
            'user_id' => 'required',
            'currency_id' => 'required',
            'address' => 'required',
            'memo' => 'required',
            'amount' => 'required',
        ]);

        $input = $request->all();
        $input['status'] = 'Pending';
        CryptoWithdraw::create($input);
        return redirect()->route('crypto.index')->with('success', 'Crypto Withdraw created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $withdraw = CryptoWithdraw::join('users', 'users.id', '=', 'crypto_withdraws.user_id')
            ->join('companies', 'companies.id', '=', 'crypto_withdraws.company_id')
            ->join('fiat_currencies', 'fiat_currencies.id', '=', 'crypto_withdraws.currency_id')
            ->select('crypto_withdraws.id', 'companies.id as company_id', 'fiat_currencies.ticker as currency_name', 'companies.name', 'crypto_withdraws.status', 'address', 'amount', 'memo', 'users.email')
            ->find($id);
        return response()->json(['withdraw' => $withdraw], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $withdraw = CryptoWithdraw::join('users', 'users.id', '=', 'crypto_withdraws.user_id')
            ->join('companies', 'companies.id', '=', 'crypto_withdraws.company_id')
            ->join('fiat_currencies', 'fiat_currencies.id', '=', 'crypto_withdraws.currency_id')
            ->select('crypto_withdraws.id', 'companies.id as company_id', 'fiat_currencies.ticker as currency_name', 'crypto_withdraws.currency_id', 'companies.name', 'crypto_withdraws.status', 'address', 'amount', 'memo', DB::raw('user_id as value'), DB::raw('email  as label'))
            ->find($id);
        return response()->json(['withdraw' => $withdraw], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'company_id' => 'required',
            'user_id' => 'required',
            'currency_id' => 'required',
            'address' => 'required',
            'memo' => 'required',
            'amount' => 'required',
            'status' => 'required',
        ]);
        $input = $request->all();
        CryptoWithdraw::find($id)->update($input);
        return redirect()->route('crypto.index')->with('success', 'Crypto Withdraw Update successfully');
    }

    /*
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        CryptoWithdraw::find($id)->delete();
        return redirect()->route('crypto.index')->with('success', 'Role deleted successfully');
    }
}
