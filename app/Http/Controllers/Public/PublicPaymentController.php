<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicPaymentController extends Controller
{
    public function PublicPayment()
    {
        return Inertia::render('Public/PublicPayment');
    }

    public function PublicPaymentConfirm()
    {
        return Inertia::render('Public/PublicPaymentConfirm');
    }
}
