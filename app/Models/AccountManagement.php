<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountManagement extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'email',
        'iban',
        'country',
        'city',
        'postcode',
        'billing_address'
    ];
}
