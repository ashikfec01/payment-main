<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\FiatCurrency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompanyController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:company-list|company-create|company-edit|company-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:company-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:company-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:company-delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $companies = Company::orderBy('id', 'DESC')->paginate(5);
        $currencies = FiatCurrency::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();
        $companies->makeVisible('ticker')->toArray();
        return Inertia::render('Backoffice/Admin/CompanyManagement', ['companies' => $companies, 'currencies' => $currencies, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'name' => 'required',
            'currency_id' => 'required',
            'secret_key' => 'required',
            'callback_url' => 'required',
            'timeout' => 'required',
            'notifications' => 'required',
            'subscriptions' => 'required',
            'donations' => 'required',
            'payment_link' => 'required',
            'network_fee_optimisation' => 'required',
        ]);
        $input = $request->all();
        Company::create($input);
        return redirect()->route('company.index')->with('success', 'Coin created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $company = Company::select('name', 'currency_id', 'timeout', 'secret_key', 'callback_url', 'notifications', 'subscriptions', 'donations', 'payment_link', 'network_fee_optimisation')->find($id);
        $company->makeVisible('ticker')->toArray();
        return response()->json(['company' => $company], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $company = Company::find($id);
        $company->makeVisible('ticker')->toArray();
        return response()->json(['company' => $company]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'currency_id' => 'required',
            'secret_key' => 'required',
            'callback_url' => 'required',
            'timeout' => 'required',
            'notifications' => 'required',
            'subscriptions' => 'required',
            'donations' => 'required',
            'payment_link' => 'required',
            'network_fee_optimisation' => 'required',
        ]);
        $input = $request->all();
        $company = Company::find($id);
        $company->update($input);
        return redirect()->route('company.index')->with('success', 'Coin updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::table("companies")->where('id', $id)->delete();
        return redirect()->route('company.index')->with('success', 'User deleted successfully');
    }
}
