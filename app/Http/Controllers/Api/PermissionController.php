<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class PermissionController extends Controller
{
    public function roles(Request $request, $id)
    {
        $user = User::find($id);
        return response()->json($user->getRoleNames(), 202);
    }
}
