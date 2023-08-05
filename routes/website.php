<?php

use App\Http\Controllers\WebsiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WebsiteController::class, 'welcome']);

// products start
Route::get('/payment', [WebsiteController::class, 'PaymenTools'])->name('main.payment');
Route::get('/donation', [WebsiteController::class, 'DonationTools'])->name('main.donation');
Route::get('/payout', [WebsiteController::class, 'MassPayments'])->name('main.payout');
Route::get('/fiat', [WebsiteController::class, 'Fiat'])->name('main.fiat');
// products end

Route::get('/pricing', [WebsiteController::class, 'Pricing'])->name('pricing');
Route::get('/affiliate', [WebsiteController::class, 'AffiliateProgram'])->name('main.affiliate');
Route::get('/allcoin', [WebsiteController::class, 'SupportedCoins'])->name('allcoin');

// help start
Route::get('/help', [WebsiteController::class, 'Help'])->name('help');
Route::get('/status', [WebsiteController::class, 'StatusPage'])->name('status');
Route::get('/contact', [WebsiteController::class, 'ContactUs'])->name('contact');
Route::get('/about', [WebsiteController::class, 'About'])->name('about');
// help end
