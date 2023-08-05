<?php

use App\Http\Controllers\User\CompanySettingController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\PaymentController;
use App\Http\Controllers\User\WithdrawalController;

use Illuminate\Support\Facades\Route;


Route::prefix('portal')->middleware(['auth', 'password_force', '2fa'])->group(function () {
    // Route Finalized
    //coin setting
    Route::get('/coins', [CompanySettingController::class, 'coinsSettings'])->name('coins.settings');
    Route::post('/coins', [CompanySettingController::class, 'coinsSettingsPost'])->name('coins.settings');

    // account setting
    Route::get('/account', [ProfileController::class, 'accountSettings'])->name('account.settings');
    Route::post('/account', [ProfileController::class, 'accountSettingsPost'])->name('account.settings');
    Route::get('/company', [CompanySettingController::class, 'companySettings'])->name('company.settings');
    Route::post('/company', [CompanySettingController::class, 'companySettingsPost'])->name('company.settings.post');
    Route::get('/company/api/generator', [CompanySettingController::class, 'companyApiGenerator']); // Need System Implementation

    // affiliate
    Route::get('/affiliate', [ProfileController::class, 'affiliateProgram'])->name('affiliate.program');

    // fiat withdraw
    Route::get('/withdrawals', [WithdrawalController::class, 'fiatWithdrawals'])->name('fiat.withdrawals');
    Route::post('/withdrawals', [WithdrawalController::class, 'fiatWithdrawalsPost'])->name('fiat.withdrawals');



    // not finalized yet

    Route::get('/dashboard', [PaymentController::class, 'transactionHistory'])->name('dashboard');
    Route::get('/payment/history', [PaymentController::class, 'payments'])->name('payments');

    Route::get('/payment', [PaymentController::class, 'paymentLink'])->name('payment.link');
    Route::post('/payment', [PaymentController::class, 'paymentLinkStore'])->name('payment.link.store');

    Route::get('/donations', [PaymentController::class, 'donations'])->name('donations');

    Route::get('/subscriptions', [PaymentController::class, 'subscriptions'])->name('subscriptions');
    Route::post('/subscriptions', [PaymentController::class, 'subscriptionsStore'])->name('subscription.store');

    //post terminal link
    Route::get('/pos', [PaymentController::class, 'posTerminalLink'])->name('pos.terminal.link');
    Route::post('/pos', [PaymentController::class, 'posTerminalLinkStore'])->name('pos.terminal.link.store');

    Route::get('/payouts', [WithdrawalController::class, 'massPayouts'])->name('mass.payouts');
});
