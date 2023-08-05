<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:role-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:role-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $permissions = Permission::get();
        $roles = Role::orderBy('id', 'DESC')->paginate(5)->toArray();
        return Inertia::render('Backoffice/Admin/RoleManagement', ['roles' => $roles, 'permissions' => $permissions, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'roleName' => 'required|unique:roles,name',
            'permission' => 'required',
        ]);

        $role = Role::create(['name' => $request->input('roleName')]);
        $role->syncPermissions($request->input('permission'));

        return redirect()->route('roles.index')->with('success', 'Role created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $role = Role::select('name')->find($id);
        $rolePermissions = Permission::select('id', 'name')->join("role_has_permissions", "role_has_permissions.permission_id", "=", "permissions.id")->where("role_has_permissions.role_id", $id)->get();
        return response()->json(['role' => $role, 'rolePermissions' => $rolePermissions], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $role = Role::select('id', 'name')->find($id);
        $rolePermissions = Permission::select('name')->join("role_has_permissions", "role_has_permissions.permission_id", "=", "permissions.id")->where("role_has_permissions.role_id", $id)->pluck('name');
        return response()->json(['role' => $role, 'rolePermissions' => $rolePermissions], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'roleName' => 'required',
            'permission' => 'required',
        ]);

        $role = Role::find($id);
        $role->name = $request->input('roleName');
        $role->save();
        $role->syncPermissions($request->input('permission'));
        return redirect()->route('roles.index')->with('success', 'Role updated successfully');
    }

    /*
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        DB::table("roles")->where('id', $id)->delete();
        return redirect()->route('roles.index')->with('success', 'Role deleted successfully');
    }
}
