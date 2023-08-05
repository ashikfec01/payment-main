<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\DB;
use App\Models\Coin;
use App\Models\FiatCurrency;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        $user = User::find(1);
        $refferal = $request->ref ? $request->ref : $user->code;
        return Inertia::render('Auth/Register', ['refferal' => $refferal]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $u = User::where('code', $request->refferal)->first();
        if ($u) {
            $currency = FiatCurrency::first();
            $company = Company::create(['currency_id' => $currency->id]);
            if ($company) {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'company_id' => $company->id,
                    'code' => (string)Uuid::uuid1(),
                    'upline_id' => $u->id
                ]);
                $user->assignRole([2]);
                $coins = Coin::where('active', 1)->get();
                foreach ($coins as $coin) {
                    DB::insert('insert into company_coin (coin_id, company_id) values (?, ?)', [$coin->id, $company->id]);
                }
            }
        } else {
            return redirect()->back();
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
