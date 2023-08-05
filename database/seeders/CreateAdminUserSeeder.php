<?php



namespace Database\Seeders;



use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

use App\Models\User;
use Ramsey\Uuid\Uuid;
use Spatie\Permission\Models\Role;

use Spatie\Permission\Models\Permission;



class CreateAdminUserSeeder extends Seeder

{

    /**

     * Run the database seeds.

     *

     * @return void

     */

    public function run()
    {
        $user = User::create([
            'name' => 'Hardik Savani',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'),
            'company_id' => 1,
            'code' => (string)Uuid::uuid1()
        ]);
        $role = Role::create(['name' => 'Admin']);

        $permissions = Permission::pluck('id', 'id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);

        $role = Role::create(['name' => 'Store Ownner']);
        $role->syncPermissions([50]);
    }
}
