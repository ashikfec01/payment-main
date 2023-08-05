<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FiatCurrency extends Model
{
    protected $fillable = [
        'name',
        'ticker',
        'logourl',
        'active',
    ];

    public function comnpanies()
    {
        return $this->hasMany('App\Models\Company');
    }
}
