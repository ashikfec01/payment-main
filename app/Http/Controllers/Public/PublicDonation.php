<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Coin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicDonation extends Controller
{
  public function index(Request $request, $id)
    {
        $coins = Coin::select('id', 'name', 'ticker', 'active', 'logourl')->orderBy('id', 'ASC')->paginate(5)->toArray();
        return Inertia::render('Public/PublicDonation', ['coins' => $coins]);
    }

}
