<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Coin;
use App\Models\Company;
use App\Models\FiatCurrency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompanySettingController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:company-coin-list', ['only' => ['coinsSettings', 'coinsSettingsStore']]);
        $this->middleware('permission:company-settings', ['only' => ['companySettings', 'companySettingsPost', 'companyApiGenerator']]);
    }

    // Finalized Controller
    public function coinsSettings(Request $request)
    {
        $coins = Coin::select(
            'id',
            'ticker',
            'active',
            'category',
            'logourl'
        )->where('active', true)->orderBy('id', 'ASC')->get()->toArray();
        $activeCoin = DB::table('company_coin')->where('company_id', Auth::User()->company_id)->pluck('coin_id')->toArray();

        $activeCategory[0] = Coin::select('*')->join('company_coin', 'id', 'company_coin.coin_id')->whereJsonContains('category', 'Populer Coins')->count() != 0 ? true : false;
        $activeCategory[1] = Coin::select('*')->join('company_coin', 'id', 'company_coin.coin_id')->whereJsonContains('category', 'Stable Coins')->count() != 0 ? true : false;
        $activeCategory[2] = Coin::select('*')->join('company_coin', 'id', 'company_coin.coin_id')->whereJsonContains('category', 'Other Coins')->count() != 0 ? true : false;

        return Inertia::render('Backoffice/User/CoinsSettings', ['coins' => $coins, 'activeCoin' => $activeCoin, 'activeCategory' => $activeCategory]);
    }

    public function coinsSettingsPost(Request $request)
    {
        $data = json_decode($request->getContent());

        if (property_exists($data, 'id')) {
            $activeCoin = DB::table('company_coin')->where('coin_id', $data->id)->where('company_id', Auth::User()->company_id)->first();
            if ($activeCoin) {
                DB::delete('delete from company_coin where coin_id = ? AND  company_id = ? ', [$data->id, Auth::User()->company_id]);
            } else {
                DB::insert('insert into company_coin (coin_id, company_id) values (?, ?)', [$data->id, Auth::User()->company_id]);
            }
        }
        if (property_exists($data, 'category') && property_exists($data, 'type')) {
            $coins = Coin::where('active', true)->whereJsonContains('category', $data->category)->orderBy('id', 'ASC')->pluck('id');
            if ($data->type) {
                foreach ($coins as $coin) {
                    DB::insert('insert into company_coin (coin_id, company_id) values (?, ?)', [$coin, Auth::User()->company_id]);
                }
            } else {
                DB::table('company_coin')->whereIn('coin_id', $coins)->where('company_id', Auth::User()->company_id)->delete();
            }
        }


        $coins = Coin::select(
            'id',
            'ticker',
            'active',
            'category',
            'logourl'
        )->where('active', true)->orderBy('id', 'ASC')->get()->toArray();
        $activeCoin = DB::table('company_coin')->where('company_id', Auth::User()->company_id)->pluck('coin_id')->toArray();

        $activeCategory[0] = Coin::select('*')->join('company_coin', 'id', 'company_coin.coin_id')->whereJsonContains('category', 'Populer Coins')->count() != 0 ? true : false;
        $activeCategory[1] = Coin::select('*')->join('company_coin', 'id', 'company_coin.coin_id')->whereJsonContains('category', 'Stable Coins')->count() != 0 ? true : false;
        $activeCategory[2] = Coin::select('*')->join('company_coin', 'id', 'company_coin.coin_id')->whereJsonContains('category', 'Other Coins')->count() != 0 ? true : false;

        return response()->json(['coins' => $coins, 'activeCoin' => $activeCoin, 'activeCategory' => $activeCategory]);
    }

    public function companySettings(Request $request)
    {
        $company = Company::where('id', Auth::user()->company_id)->first();
        $company = $company->makeVisible('ticker')->toArray();
        $currencies = FiatCurrency::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();
        return Inertia::render('Backoffice/User/CompanySettings', ['company' => $company, 'currencies' => $currencies]);
    }

    public function companySettingsPost(Request $request)
    {
        $input = $request->all();
        $data = json_decode($request->getContent(), true);
        $flag = count($input) > 0 ? true : false;
        if (!$flag) {
            $input = $data;
        }

        if (!isset($input['id'])) {
            return response()->json(['error' => 'must need company id']);
        }

        if (isset($input['payment_name']) && isset($input['value'])) {
            Company::find($input['id'])->update([$input['payment_name'] => $input['value']]);
        } else {
            Company::find($input['id'])->update($input);
        };


        if ($flag) {
            return redirect()->route('company.settings');
        } else {
            $company = Company::where('id', Auth::user()->company_id)->first();
            $company = $company->makeVisible('ticker')->toArray();
            $currencies = FiatCurrency::select(DB::raw('id as value'), DB::raw('ticker as label'))->orderBy('id', 'DESC')->get()->toArray();
            return response()->json(['company' => $company, 'currencies' => $currencies]);
        }
    }


    public function companyApiGenerator(Request $request)
    {
        $api = ["api" => "sorwar_api_generator"];
        return response()->json($api, 200);
    }
}
