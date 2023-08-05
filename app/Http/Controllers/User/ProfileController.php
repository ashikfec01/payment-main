<?php

namespace App\Http\Controllers\User;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class ProfileController extends Controller
{

    public function affiliateProgram(Request $request)
    {
        return Inertia::render('Backoffice/User/AffiliateProgram');
    }

    public function profiledetails()
    {
        return response()->json(Auth::user());
    }

    public function accountSettings(Request $request)
    {
        $usersinfo = User::where('company_id', Auth::user()->company_id)->get();
        $roles = Role::where('name', 'like', 'Company%')->select(DB::raw('id as value'), DB::raw('SUBSTR(name,9) as label'))->orderBy('id', 'DESC')->get()->toArray();

        return Inertia::render('Backoffice/User/AccountSettings', ['roles' => $roles, 'usersinfo' => $usersinfo]);
    }

    public function accountSettingsPost(Request $request)
    {
        $input = $request->all();
        $data = json_decode($request->getContent(), true);
        $flag = count($input) > 0 ? true : false;
        if (!$flag) {
            $input = $data;
        }

        if (isset($input['password']) && isset($input['name']) && isset($input['email'])) {
            Validator::make($input, [
                'name' => 'required',
                'email' => 'required|unique:users,email',
                'password' => 'required',
                'roles' => 'required',
            ]);
            $input['password_changed'] = true;
            $input['password'] = Hash::make($input['password']);
            $input['company_id'] = Auth::user()->company_id;
            $user = User::Create($input);
            $user->assignRole($input['roles']);
        } else if (isset($input['password']) && isset($input['id']) && !isset($input['delete'])) {
            if (isset($input['current_password'])) {
                Validator::make($input, [
                    'current_password' => 'required',
                    'password' => ['required', 'confirmed', Rules\Password::defaults()],
                ]);

                $user = User::find($input['id']);
                if (Hash::check($input['current_password'], $user->password)) {
                    $input['password'] = Hash::make($input['password']);
                } else {
                    return redirect()->route('account.settings')->withErrors(['current_password' => 'Current Password Not Match']);
                }
            } else {
                $input['password_changed'] = true;
                $input['password'] = Hash::make($input['password']);
            }
            $user = User::find($input['id']);
            if (isset($input['roles'])) {
                DB::table('model_has_roles')->where('model_id',  $input['id'])->delete();
                $user->assignRole($input['roles']);
            }
            $user->update($input);
        } else if (isset($input['name']) &&  isset($input['id'])) {
            Validator::make($input, [
                'name' => 'required'
            ]);
            $user = User::find($input['id']);
            if (isset($input['roles'])) {
                DB::table('model_has_roles')->where('model_id',  $input['id'])->delete();
                $user->assignRole($input['roles']);
            }
            $user->update($input);
        } else if (isset($input['delete']) &&  isset($input['id'])) {
            if (Auth::User()->id == $input['id']) {
                $request->validate([
                    'password' => ['required', 'current-password'],
                ]);
                $user = $request->user();
            } else {
                $user = User::find($input['id']);
            }

            DB::table('model_has_roles')->where('model_id',  $input['id'])->delete();
            $user->delete();
        }

        $usersinfo = User::where('company_id', Auth::user()->company_id)->get();
        $roles = Role::where('name', 'like', 'Company%')->select(DB::raw('id as value'), DB::raw('SUBSTR(name,9) as label'))->orderBy('id', 'DESC')->get()->toArray();

        if ($flag) {
            return redirect()->route('account.settings');
        } else {
            return response()->json(['roles' => $roles, 'usersinfo' => $usersinfo]);
        }
    }
}
