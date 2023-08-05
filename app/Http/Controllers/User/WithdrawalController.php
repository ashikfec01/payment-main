<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\AccountManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class WithdrawalController extends Controller
{
    public function massPayouts(Request $request)
    {
        return Inertia::render('Backoffice/User/MassPayouts');
    }

    public function fiatWithdrawals(Request $request)
    {

        $account = AccountManagement::join('companies', 'companies.id', '=', 'account_management.company_id')
            ->select('account_management.id', 'companies.name', 'account_management.email', 'iban', 'country', 'city', 'postcode', 'billing_address')->where('company_id', Auth::user()->company_id)->first();

        return Inertia::render('Backoffice/User/FiatWithdrawals', ['account' => $account]);
    }

    public function fiatWithdrawalsPost(Request $request)
    {
        $input = $request->all();
        $data = json_decode($request->getContent(), true);
        $flag = count($input) > 0 ? true : false;

        if (!$flag) {
            $input = $data;
        }

        if (isset($input['user_id']) && isset($input['email']) && isset($input['iban'])) {

            Validator::make($input, [
                'company_id' => 'required',
                'email' => 'required',
                'iban' => 'required',
                'country' => 'required',
                'city' => 'required',
                'postcode' => 'required',
                'billing_address' => 'required',
            ]);

            $account = ['user_id' => $input['user_id']];
            AccountManagement::updateOrCreate($account, $input);
        }


        if ($flag) {
            return redirect()->route('fiat.withdrawals');
        } else {
            $account = AccountManagement::join('users', 'users.id', '=', 'account_management.user_id')
                ->select('account_management.id', 'users.email as user_email', 'verified', 'user_id', 'account_management.email', 'iban', 'country', 'city', 'postcode', 'billing_address')->where('user_id', Auth::user()->id)->first();
            return response()->json(['account' => $account]);
        }
    }
}
