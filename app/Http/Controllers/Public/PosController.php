<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Coin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    public function PosTerminal(Request $request, $id)
    {
        $coins = Coin::select('id', 'name', 'ticker', 'active', 'logourl')->orderBy('id', 'ASC')->paginate(5)->toArray();
        $barcodeStep = $request->session()->get('barcodeStep') ? true : false;
        return Inertia::render('Public/PosTerminal', ['barcodeStep' => $barcodeStep, 'coins' => $coins, 'loading' => false, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }

    public function store(Request $request, $id)
    {
        $this->validate($request, [
            'coin_id' => 'required',
            'coin_name' => 'required',
            'coin_ticker' => 'required',
            'coin_logourl' => 'required',
            'amount' => 'required'


        ]);
        $input = $request->all();
        dd($input);
        // Coin::create($input);
        return redirect()->route('pos.terminal')->with('success', 'Coin created successfully')->with('barcodeStep', true);
    }
}
