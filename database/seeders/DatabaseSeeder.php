<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PermissionTableSeeder::class,
            CoinManagementSeeder::class,
            FiatManagementSeeder::class,
            CompanySeeder::class,
            CreateAdminUserSeeder::class,
            CountryStateCityTableSeeder::class,
        ]);
    }
}
