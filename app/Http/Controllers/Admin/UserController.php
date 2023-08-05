<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->middleware('permission:user-list|user-create|user-edit|user-delete', ['only' => ['index', 'show']]);
        $this->middleware('permission:user-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:user-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:user-delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        $roles = Role::select(DB::raw('id as value'), DB::raw('name as label'))->orderBy('id', 'DESC')->paginate(5)->toArray();
        $datas = User::select('id', 'email', 'name', 'company_id', 'google2fa_secret')->orderBy('id', 'DESC')->paginate(5);

        $data = array();
        $i = 0;
        foreach ($datas as $d) {
            $data[$i] = $d->toArray();
            $data[$i]['roles'] = $d->getRoleNames()->toArray();
            $data[$i]['company'] = $d->company;
            $i++;
        }
        $companies = Company::select(DB::raw('id as value'), DB::raw('name  as label'))->orderBy('id', 'DESC')->get()->toArray();
        // dd($data);
        return Inertia::render('Backoffice/Admin/UserManagement', ['users' => $data, 'companies' => $companies, 'roles' => $roles, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }

    public function indexapi(Request $request)
    {
        $roles = Role::select(DB::raw('id as value'), DB::raw('name as label'))->orderBy('id', 'DESC')->paginate(5)->toArray();
        $datas = User::select('id', 'email', 'name', 'company_id', 'google2fa_secret')->orderBy('id', 'DESC')->paginate(5);

        $data = array();
        $i = 0;
        foreach ($datas as $d) {
            $data[$i] = $d->toArray();
            $data[$i]['roles'] = $d->getRoleNames()->toArray();
            $data[$i]['company'] = $d->company;
            $i++;
        }
        $companies = Company::select(DB::raw('id as value'), DB::raw('name  as label'))->orderBy('id', 'DESC')->get()->toArray();
        // dd($data);
        return response()->json(['users' => $data, 'companies' => $companies, 'roles' => $roles, 'pagination' => ($request->input('page', 1) - 1) * 5]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required',
            'roles' => 'required',
            'company_id' => 'required',
        ]);

        $input = $request->all();
        $input['password_changed'] = true;
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $user->assignRole($request->input('roles'));

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::select('id', 'name', 'email', 'email_verified_at', 'company_id', 'google2fa_secret')->find($id);
        $user->company = $user->company;
        $userRole = $user->roles->pluck('name', 'name')->all();
        return response()->json(['user' => $user, 'userRole' => $userRole], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        $user->company = $user->company;
        $roles = Role::pluck('name', 'name')->all();
        $userRole = $user->roles->all();
        return response()->json(['user' => $user, 'roles' => $roles, 'userRole' => $userRole]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password',
            'roles'
        ]);
        $input = $request->all();
        if ($request->google2fa_secret == 'true') {
            $input = Arr::except($input, array('google2fa_secret'));
        } else {
            $input['google2fa_secret'] = null;
        }

        $input = Arr::except($input, array('email'));
        $input = Arr::except($input, array('company_id'));

        if (!empty($input['password'])) {
            $input['password'] = Hash::make($input['password']);
        } else {
            $input = Arr::except($input, array('password'));
        }

        $user = User::find($id);
        $user->update($input);
        DB::table('model_has_roles')->where('model_id', $id)->delete();

        $user->assignRole($request->input('roles'));

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table("users")->where('id', $id)->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }
}
