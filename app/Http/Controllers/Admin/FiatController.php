<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FiatCurrency;
use App\Models\FiatWithdraw;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FiatController extends Controller
{

    function __construct()
    {
        $this->middleware('permission:fiat-withdraw-list|fiat-withdraw-create|fiat-withdraw-edit|fiat-withdraw-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:fiat-withdraw-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:fiat-withdraw-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:fiat-withdraw-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $fiat_withdraws = FiatWithdraw::join('users', 'users.id', '=', 'fiat_withdraws.user_id')->select('fiat_withdraws.id', 'user_id', 'email', 'currency_name', 'amount', 'status', 'fiat_withdraws.created_at', 'fiat_withdraws.updated_at')->orderBy('id', 'DESC')->paginate(5)->toArray();
        $userid = User::select(DB::raw('id as value'), DB::raw('email  as label'))->get()->toArray();
        $currencies = FiatCurrency::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();
        return Inertia::render('Backoffice/Admin/FiatManagement', ['userid' => $userid, 'currencies' => $currencies,  'fiat_withdraws' => $fiat_withdraws, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'currency_name' => 'required',
            'amount' => 'required',

        ]);

        $input = $request->all();
        $input['status'] = false;

        FiatWithdraw::create($input);
        return redirect()->route('fiat.index')->with('success', 'Fiat Withdraw created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $fiat_withdraw = FiatWithdraw::join('users', 'users.id', '=', 'fiat_withdraws.user_id')->select('fiat_withdraws.id', 'email', 'user_id', 'currency_name', 'amount', 'status', 'fiat_withdraws.created_at', 'fiat_withdraws.updated_at')->find($id);

        return response()->json(['fiat_withdraw' => $fiat_withdraw], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $fiat_withdraw = FiatWithdraw::join('users', 'users.id', '=', 'fiat_withdraws.user_id')->select('fiat_withdraws.id', 'currency_name', 'amount', 'status', DB::raw('user_id as value'), DB::raw('email  as label'))->find($id);
        return response()->json(['fiat_withdraw' => $fiat_withdraw]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'currency_name' => 'required',
            'amount' => 'required',
            'status' => 'required',
        ]);

        $input = $request->all();

        $fiat_withdraw = FiatWithdraw::find($id);
        $fiat_withdraw->update($input);

        return redirect()->route('fiat.index')->with('success', 'Fiat Withdraw updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table("fiat_withdraws")->where('id', $id)->delete();
        return redirect()->route('fiat.index')->with('success', 'Fiat Withdraw deleted successfully');
    }
}
