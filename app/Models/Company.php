<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name',
        'currency_id',
        'timeout',
        'secret_key',
        'callback_url',
        'notifications',
        'subscriptions',
        'donations',
        'payment_link',
        'network_fee_optimisation',
    ];

    protected $appends = [
        'ticker'
    ];

    protected $hidden = [
        'ticker'
    ];

    public function currency()
    {
        return $this->belongsTo('App\Models\FiatCurrency');
    }

    public function getTickerAttribute()
    {
        return $this->currency->ticker;
    }

    public function users()
    {
        return $this->hasMany('App\Models\User');
    }

    public function makeVisible($attributes)
    {
        $this->hidden = array_diff($this->hidden, (array) $attributes);

        return $this;
    }
}
