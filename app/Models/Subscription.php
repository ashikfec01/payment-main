<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_name',
        'user_id',
        'period_unit',
        'period_duration',
        'price',
        'currency_id',
        'payment_notifications_link',
        'successful_payment_page',
        'payment_failed_page',
        'partial_payment_page'
    ];
}
