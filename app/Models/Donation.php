<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'donation_id',
        'api_ke',
        'email_show',
        'email_require',
        'phone_show',
        'phone_require',
        'name_show',
        'name_require',
        'social_link_show',
        'social_link_require',
        'address_show',
        'address_require',
    ];
}
