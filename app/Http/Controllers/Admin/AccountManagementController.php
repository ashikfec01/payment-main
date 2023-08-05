<?php

namespace App\Http\Controllers\Admin;

use App\Models\AccountManagement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AccountManagementController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:account-management-list|account-management-create|account-management-edit|account-management-delete', ['only' => ['index', 'show']]);
        $this->middleware('permission:account-management-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:account-management-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:account-management-delete', ['only' => ['destroy']]);
    }
    public function index()
    {
        $accounts = AccountManagement::join('companies', 'companies.id', '=', 'account_management.company_id')
            ->select('account_management.id', 'companies.name', 'account_management.email', 'iban', 'country', 'city', 'postcode', 'billing_address')->orderBy('id', 'DESC')->paginate(5)->toArray();

        $companies = Company::select(DB::raw('id as value'), DB::raw('name  as label'))->whereNotIn('id', AccountManagement::pluck('company_id'))->orderBy('id', 'DESC')->get()->toArray();
        return Inertia::render('Backoffice/Admin/AccountManagement', ['companies' => $companies, 'accounts' => $accounts,]);
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
            'company_id' => 'required',
            'email' => 'required',
            'iban' => 'required',
            'country' => 'required',
            'city' => 'required',
            'postcode' => 'required',
            'billing_address' => 'required',
        ]);
        $input = $request->all();
        AccountManagement::create($input);
        return redirect()->route('account.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AccountManagement  $accountManagement
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $account = AccountManagement::join('companies', 'companies.id', '=', 'account_management.company_id')
            ->select('account_management.id', 'companies.name', 'company_id', 'account_management.email', 'iban', 'country', 'city', 'postcode', 'billing_address')->find($id);
        return response()->json(['account' => $account], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AccountManagement  $accountManagement
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AccountManagement  $accountManagement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'company_id' => 'required',
            'email' => 'required',
            'iban' => 'required',
            'country' => 'required',
            'city' => 'required',
            'postcode' => 'required',
            'billing_address' => 'required',
        ]);
        $input = $request->all();
        $company = AccountManagement::find($id);
        $company->update($input);
        return redirect()->route('account.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AccountManagement  $accountManagement
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        AccountManagement::find($id)->delete();
        return redirect()->route('account.index');
    }
}
