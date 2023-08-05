<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    protected $fillable = [
        'name',
        'ticker',
        'logourl',
        'category',
        'active',
        'apiurl',
        'apitoken'
    ];
}
