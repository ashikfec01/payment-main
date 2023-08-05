<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CoinController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:coin-list|coin-create|coin-edit|coin-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:coin-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:coin-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:coin-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $coins = Coin::select('id', 'name', 'ticker', 'active', 'category', 'logourl', 'apiurl', 'apitoken')->orderBy('id', 'DESC')->paginate(5)->toArray();
        return Inertia::render('Backoffice/Admin/CoinManagement', ['coins' => $coins, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'name' => 'required',
            'ticker' => 'required',
            'active' => 'required',
            'category' => 'required',
            'logourl' => 'required|mimes:png|max:1024',
            'apiurl' => 'required',
            'apitoken' => 'required'
        ]);

        $input = $request->all();
        $logourl = $request->file('logourl');
        $logourl->move('coinsimage', $input['ticker'] . '.png');
        $input['logourl'] = '/coinsimage/' . $input['ticker'] . '.png';
        $input['category'] = json_encode($input['category']);

        Coin::create($input);
        return redirect()->route('coins.index')->with('success', 'Coin created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $coin = Coin::select('name', 'ticker', 'logourl', 'category', 'active', 'apiurl', 'apitoken')->find($id);
        return response()->json(['coin' => $coin], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $coin = Coin::find($id);
        return response()->json(['coin' => $coin]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $coin = Coin::find($id);

        if ($request->logourl) {

            // file update 
            $this->validate($request, [
                'name' => 'required',
                'ticker' => 'required',
                'active' => 'required',
                'category' => 'required',
                'logourl' => 'required|mimes:png|max:1024',
                'apiurl' => 'required',
                'apitoken' => 'required'
            ]);

            // file upload
            $logourl = $request->file('logourl');
            @unlink(public_path($coin->logourl));
            $logourl->move('coinsimage', $input['ticker'] . '_' . time() . '.png');
            // upload url
            $input['logourl'] = '/coinsimage/' . $input['ticker'] . '_' . time() . '.png';
        } else {

            // whitout file update 
            $this->validate($request, [
                'name' => 'required',
                'ticker' => 'required',
                'active' => 'required',
                'category' => 'required',
                'apiurl' => 'required',
                'apitoken' => 'required'
            ]);
        }

        $coin->update($input);

        return redirect()->route('coins.index')->with('success', 'Coin updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::table("coins")->where('id', $id)->delete();
        return redirect()->route('coins.index')->with('success', 'User deleted successfully');
    }
}
