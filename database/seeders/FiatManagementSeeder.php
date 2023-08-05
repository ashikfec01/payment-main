<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FiatCurrency;

class FiatManagementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $FiatCurrency = FiatCurrency::create([
            'name' => 'Bangladeshi Taka',
            'ticker' => 'BDT',
            'logourl' => 'http://localhost:8000',
            'active' => true
        ]);
    }
}
