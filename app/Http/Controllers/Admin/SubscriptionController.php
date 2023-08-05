<?php

namespace App\Http\Controllers\Admin;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\FiatCurrency;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SubscriptionController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:donation-list|subscription-create|subscription-edit|subscription-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:subscription-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:subscription-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:subscription-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $subscriptions = Subscription::join('users', 'users.id', '=', 'subscriptions.user_id')
            ->join('fiat_currencies', 'fiat_currencies.id', '=', 'subscriptions.currency_id')
            ->select('subscriptions.id', 'user_id', 'email', 'ticker', 'plan_name', 'period_unit', 'period_duration', 'price', 'currency_id', 'payment_notifications_link', 'successful_payment_page', 'payment_failed_page', 'partial_payment_page', 'subscriptions.created_at')->orderBy('id', 'DESC')->paginate(5)->toArray();

        $currencies = FiatCurrency::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();
        $userid = User::select(DB::raw('id as value'), DB::raw('email  as label'))->get()->toArray();

        return Inertia::render('Backoffice/Admin/SubscriptionManagement', ['subscriptions' => $subscriptions, 'userid' => $userid, 'currencies' => $currencies]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'plan_name' => 'required',
            'user_id' => 'required',
            'period_duration' => 'required',
            'period_unit' => 'required',
            'price' => 'required',
            'currency_id' => 'required',
        ]);
        $input = $request->all();
        // dd($input);
        Subscription::create($input);
        return redirect()->route('subscriptions.index')->with('success', 'Donation successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $subscription = Subscription::join('users', 'users.id', '=', 'subscriptions.user_id')
            ->join('fiat_currencies', 'fiat_currencies.id', '=', 'subscriptions.currency_id')
            ->select('subscriptions.id', 'user_id', 'email', 'ticker', 'plan_name', 'period_unit', 'period_duration', 'price', 'currency_id', 'payment_notifications_link', 'successful_payment_page', 'payment_failed_page', 'partial_payment_page', 'subscriptions.created_at')->find($id);

        return response()->json(['subscription' => $subscription], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     */
    public function edit($id)
    {
        $subscription = Subscription::join('users', 'users.id', '=', 'subscriptions.user_id')
            ->join('fiat_currencies', 'fiat_currencies.id', '=', 'subscriptions.currency_id')
            ->select('subscriptions.id', 'user_id', 'email', 'ticker', 'plan_name', 'period_unit', 'period_duration', 'price', 'currency_id', 'payment_notifications_link', 'successful_payment_page', 'payment_failed_page', 'partial_payment_page', 'subscriptions.created_at')->find($id);

        return response()->json(['subscription' => $subscription], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'plan_name' => 'required',
            'user_id' => 'required',
            'period_duration' => 'required',
            'period_unit' => 'required',
            'price' => 'required',
            'currency_id' => 'required',
        ]);

        $input = $request->all();
        Subscription::find($id)->update($input);
        return redirect()->route('subscriptions.index')->with('success', 'Update successfully');
    }

    /*
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        Subscription::find($id)->delete();
        return redirect()->route('subscriptions.index')->with('success', 'deleted successfully');
    }
}
