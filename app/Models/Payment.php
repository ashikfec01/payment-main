<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'user_id',
        'price',
        'coin_id',
        'currency_id',
        'order_description',
        'fixed_rate',
        'fee_paid_user',
        'status'
    ];

    protected $appends = [
        'ticker',
        'fiatTicker'
    ];

    protected $hidden = [
        'ticker',
        'fiatTicker'
    ];

    public function currency()
    {
        return $this->belongsTo(FiatCurrency::class);
    }
    public function coin()
    {
        return $this->belongsTo(Coin::class);
    }

    public function getTickerAttribute()
    {
        return $this->coin->ticker;
    }
    public function getFiatTickerAttribute()
    {
        return $this->currency->ticker;
    }

    public function makeVisible($attributes)
    {
        $this->hidden = array_diff($this->hidden, (array) $attributes);

        return $this;
    }
}
