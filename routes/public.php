<?php

use App\Http\Controllers\Public\PosController;
use App\Http\Controllers\Public\PublicPaymentController;
use App\Http\Controllers\Public\PublicDonation;
use Illuminate\Support\Facades\Route;

Route::get('/pos-terminal/{id}', [PosController::class, 'PosTerminal'])->name('pos.terminal');
Route::post('/pos-terminal/{id}', [PosController::class, 'store'])->name('pos.terminal.post');

Route::get('/public-payment/avik', [PublicPaymentController::class, 'PublicPayment']);
Route::get('/public-payment/avik/id', [PublicPaymentController::class, 'PublicPaymentconfirm']);

Route::get('/donation/{id}', [PublicDonation::class, 'index'])->name('public.doantion');