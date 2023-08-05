<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coin;
use App\Models\FiatCurrency;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:payment-list|payment-create|payment-edit|payment-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:payment-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:payment-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:payment-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //   ->join('fiat_currencies', 'fiat_currencies.id', '=', 'payments.currency_id')

        $payments = Payment::join('users', 'users.id', '=', 'payments.user_id')
            ->select('payments.id', 'order_id', 'user_id', 'email', 'coin_id', 'currency_id', 'price', 'order_description', 'fixed_rate', 'fee_paid_user', 'status', 'payments.created_at', 'payments.updated_at')->orderBy('id', 'DESC')->paginate(5);

        $userid = User::select(DB::raw('id as value'), DB::raw('email  as label'))->get()->toArray();
        $coins = Coin::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();

        $currencies = FiatCurrency::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();

        $payments->makeVisible('ticker')->toArray();
        $payments->makeVisible('fiatTicker')->toArray();

        return Inertia::render('Backoffice/Admin/PaymentManagement', ['payments' => $payments, 'userid' => $userid, 'currencies' => $currencies, 'coins' => $coins,  'pagination' => ($request->input('page', 1) - 1) * 5]);
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
            'order_id' => 'required',
            'user_id' => 'required',
            'price' => 'required',
            'currency_id' => 'required',
        ]);

        $input = $request->all();
        $input['status'] = 'Pending';
        Payment::create($input);
        return redirect()->route('payment.index')->with('success', 'Payment updated successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $payment = Payment::join('users', 'users.id', '=', 'payments.user_id')->select('payments.id', 'order_id', 'user_id', 'email', 'currency_id', 'coin_id', 'price', 'order_description', 'fixed_rate', 'fee_paid_user', 'status', 'payments.created_at', 'payments.updated_at')->find($id);
        $payment->makeVisible('ticker')->toArray();
        $payment->makeVisible('fiatTicker')->toArray();
        return response()->json(['payment' => $payment], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $payment = Payment::join('users', 'users.id', '=', 'payments.user_id')->select('payments.id', 'order_id', 'user_id', 'email', 'currency_id', 'price', 'coin_id', 'order_description', 'fixed_rate', 'fee_paid_user', 'status', 'payments.created_at', 'payments.updated_at')->find($id);

        $payment->makeVisible('ticker')->toArray();
        $payment->makeVisible('fiatTicker')->toArray();

        return response()->json(['payment' => $payment]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'order_id' => 'required',
            'user_id' => 'required',
            'price' => 'required',
            'currency_id' => 'required',
            'status' => 'required',
        ]);

        $input = $request->all();
        $payment = Payment::find($id);
        $payment->update($input);

        return redirect()->route('payment.index')->with('success', 'Payment updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::table("payments")->where('id', $id)->delete();
        return redirect()->route('payment.index')->with('success', 'Payment deleted successfully');
    }
}
