<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FiatCurrency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FiatCurrencyController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:currencies-list|currencies-create|currencies-edit|currencies-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:currencies-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:currencies-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:currencies-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currencies = FiatCurrency::select('id', 'name', 'ticker', 'active', 'logourl')->orderBy('id', 'DESC')->paginate(5)->toArray();
        return Inertia::render('Backoffice/Admin/FiatCurrencies', ['currencies' => $currencies, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'ticker' => 'required',
            'active' => 'required',
            'logourl' => 'required|mimes:png|max:1024',
        ]);

        $input = $request->all();
        $logourl = $request->file('logourl');
        $logourl->move('currencies_image', $input['ticker'] . '.png');
        $input['logourl'] = '/currencies_image/' . $input['ticker'] . '.png';

        FiatCurrency::create($input);
        return redirect()->route('currencies.index')->with('success', 'Fiat Currency created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $currency = FiatCurrency::select('name', 'ticker', 'logourl', 'active')->find($id);
        return response()->json(['currency' => $currency], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $currency = FiatCurrency::find($id);
        return response()->json(['currency' => $currency]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $fiat_currency = FiatCurrency::find($id);

        if ($request->logourl) {
            $this->validate($request, [
                'name' => 'required',
                'ticker' => 'required',
                'active' => 'required',
                'logourl' => 'required|mimes:png|max:1024'
            ]);

            $logourl = $request->file('logourl');
            @unlink(public_path($fiat_currency->logourl));

            // file upload
            $logourl->move('currencies_image', $input['ticker'] . '_' . time() . '.png');
            // upload url
            $input['logourl'] = '/currencies_image/' . $input['ticker'] . '_' . time() . '.png';
        } else {
            $this->validate($request, [
                'name' => 'required',
                'ticker' => 'required',
                'active' => 'required',
            ]);
        }

        $fiat_currency->update($input);

        return redirect()->route('currencies.index')->with('success', 'Fiat Currency updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        FiatCurrency::find($id)->delete();
        return redirect()->route('currencies.index')->with('success', 'Fiat Currency deleted successfully');
    }
}
