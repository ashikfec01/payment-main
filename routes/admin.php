<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AccountManagementController;
use App\Http\Controllers\Admin\CoinController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\FiatController;
use App\Http\Controllers\Admin\CryptoController;
use App\Http\Controllers\Admin\DonationController;
use App\Http\Controllers\Admin\FiatCurrencyController;
use App\Http\Controllers\Admin\SubscriptionController;

Route::prefix('admin')->middleware(['auth', '2fa'])->group(function () {
    Route::resource('/roles', RoleController::class);
    Route::resource('/users', UserController::class);
    Route::resource('/coins', CoinController::class);
    Route::resource('/fiat/currencies', FiatCurrencyController::class);
    Route::resource('/company', CompanyController::class);
    Route::resource('/payment', PaymentController::class);
    Route::resource('/donation', DonationController::class);
    Route::resource('/subscriptions', SubscriptionController::class);
    Route::resource('/withdraw/fiat', FiatController::class);
    Route::resource('/withdraw/crypto', CryptoController::class);
    Route::resource('/account', AccountManagementController::class);
});
