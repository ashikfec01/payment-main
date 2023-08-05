<?php



namespace Database\Seeders;



use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;



class PermissionTableSeeder extends Seeder

{

    /**

     * Run the database seeds.

     *

     * @return void

     */

    public function run()

    {

        $permissions = [
            'role-list',
            'role-create',
            'role-edit',
            'role-delete',

            'user-list',
            'user-create',
            'user-edit',
            'user-delete',

            'coin-list',
            'coin-create',
            'coin-edit',
            'coin-delete',

            'currencies-list',
            'currencies-create',
            'currencies-edit',
            'currencies-delete',

            'company-list',
            'company-create',
            'company-edit',
            'company-delete',

            'payment-list',
            'payment-create',
            'payment-edit',
            'payment-delete',

            'fiat-withdraw-list',
            'fiat-withdraw-create',
            'fiat-withdraw-edit',
            'fiat-withdraw-delete',

            'crypto-withdraw-list',
            'crypto-withdraw-create',
            'crypto-withdraw-edit',
            'crypto-withdraw-delete',

            'order-list',
            'order-create',
            'order-edit',
            'order-delete',

            'account-management-list',
            'account-management-create',
            'account-management-edit',
            'account-management-delete',

            'company-setting',
            'account-setting',
            'coins-setting',
            'my-team-list',
            'my-team-create',

            'donation-list',
            'donation-create',
            'donation-edit',
            'donation-delete',

            'subscription-list',
            'subscription-create',
            'subscription-edit',
            'subscription-delete',

            'company-coin-list',
            'company-settings',
        ];




        foreach ($permissions as $permission) {

            Permission::create(['name' => $permission]);
        }
    }
}
