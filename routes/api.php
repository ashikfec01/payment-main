<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\user\WithdrawalController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\User\CompanySettingController;
use App\Http\Controllers\User\ProfileController;
use Tariq86\CountryList\CountryList;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

Route::get('/users', [UserController::class, 'indexapi'])->name('indexapi');
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// setting page route
Route::middleware('auth:sanctum')->post('/coins', [CompanySettingController::class, 'coinsSettingsPost']);
Route::middleware('auth:sanctum')->post('/account', [ProfileController::class, 'accountSettingsPost']);
Route::middleware('auth:sanctum')->post('/company', [CompanySettingController::class, 'companySettingsPost']);
Route::middleware('auth:sanctum')->any('/me', [ProfileController::class, 'profiledetails']);

// fiat withdraw
Route::middleware('auth:sanctum')->post('/withdrawals', [WithdrawalController::class, 'fiatWithdrawalsPost']);


// Route::get('/country', function () {
//     return Countries::getList('en', 'json');
// });
