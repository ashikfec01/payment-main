<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Coin;
use App\Models\Company;
use App\Models\FiatCurrency;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function transactionHistory(Request $request)
    {
        return Inertia::render('Backoffice/User/TransactionHistory');
    }

    public function payments(Request $request)
    {
        return Inertia::render('Backoffice/User/Payments');
    }

    public function paymentLink(Request $request)
    {
        $payments = Payment::join('fiat_currencies', 'fiat_currencies.id', '=', 'payments.currency_id')
            ->select('payments.id', 'order_id', 'user_id', 'ticker as currency', 'coin_id', 'currency_id', 'price', 'order_description', 'fixed_rate', 'fee_paid_user', 'status', 'payments.created_at', 'payments.updated_at')
            ->where('user_id', Auth::user()->id)->get();

        $company = Company::where('id', Auth::user()->company_id)->first();
        $company = $company->makeVisible('ticker')->toArray();

        $coins = Coin::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();

        return Inertia::render('Backoffice/User/PaymentLink', ['coins' => $coins, 'payments' => $payments, 'company' => $company]);
    }
    public function paymentLinkStore(Request $request)
    {
        $this->validate($request, [
            'order_id' => 'required',
            'user_id' => 'required',
            'price' => 'required',
            'currency_id' => 'required',
        ]);

        $input = $request->all();
        $input['status'] = 'Pending';
        Payment::create($input);
        return redirect()->route('payment.link')->with('success', 'Payment updated successfully');
    }

    public function donations(Request $request)
    {
        return Inertia::render('Backoffice/User/Donations');
    }

    public function subscriptions(Request $request)
    {
        $subscriptions = Subscription::join('fiat_currencies', 'fiat_currencies.id', '=', 'subscriptions.currency_id')
            ->select('subscriptions.id', 'user_id', 'ticker', 'plan_name', 'period_unit', 'period_duration', 'price', 'currency_id', 'payment_notifications_link', 'successful_payment_page', 'payment_failed_page', 'partial_payment_page', 'subscriptions.created_at')->where('user_id', Auth::user()->id)->get();

        $company = Company::where('id', Auth::user()->company_id)->first();
        $company = $company->makeVisible('ticker')->toArray();

        return Inertia::render('Backoffice/User/Subscriptions', ['subscriptions' => $subscriptions, 'company' => $company]);
    }

    public function subscriptionsStore(Request $request)
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
        Subscription::create($input);
        return redirect()->route('subscriptions')->with('success', 'Donation successfully');
    }



    public function posTerminalLink(Request $request)
    {
        return Inertia::render('Backoffice/User/POSTerminalLink');
    }

    public function posTerminalLinkStore(Request $request)
    {
        $this->validate($request, [
            'company_id' => 'required',
            'api_key' => 'required',
            'theme' => 'required',
            'pos_id' => 'required',
        ]);

        return redirect()->route('subscriptions')->with('success', 'Donation successfully');
    }
}
