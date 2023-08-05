<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
    public function google2fa(Request $request)
    {
        $google2fa = app('pragmarx.google2fa');
        $user = User::find(Auth::user()->id);
        $secret = "";
        $otp = $request->otp ? $request->otp : '0';
        if ($user->google2fa_secret == null) {
            $secret = $request->key;
            $user->google2fa_secret = $request->key;
        } else {
            $secret = $user->google2fa_secret;
            $user->google2fa_secret = null;
        }
        if (!$google2fa->verifyGoogle2FA($secret, $otp)) {
            $message = "Please Correct OTP information for adding 2FA";
            $QR_Image = $google2fa->getQRCodeInline(
                config('app.name'),
                Auth::user()->email,
                $secret
            );
            return Inertia::render('Google2fa/Register', ['message' => $message, 'secret' => $secret, 'QR_Image' => $QR_Image]);
        } else {
            $user->save();
            if ($user->google2fa_secret != null) {
                $google2fa->login();
                Auth::user()->google2fa_secret = $user->google2fa_secret;
            } else {
                $google2fa->logout();
                Auth::user()->google2fa_secret = null;
            }
            return "<script>window.top.location.href = \"" . route('account.settings') . "\";</script>";
        }
    }
    public function google2faregister()
    {
        $google2fa = app('pragmarx.google2fa');
        $secret = $google2fa->generateSecretKey();
        $QR_Image = $google2fa->getQRCodeInline(
            config('app.name'),
            Auth::user()->email,
            $secret
        );
        return Inertia::render('Google2fa/Register', ['secret' => $secret, 'QR_Image' => $QR_Image]);
    }
}
