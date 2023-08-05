<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Coin;

class CoinManagementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $coin = Coin::create([
            'name' => 'Global Smart Asset',
            'ticker' => 'GSA',
            'logourl' => '/coinsimage/GSA.png',
            'category' => '["Populer Coins","Other Coins"]',
            'active' => true,
            'apiurl' => 'http://localhost:8000',
            'apitoken' => 'skjdfghkjdsf'
        ]);

        $coin = Coin::create([
            'name' => 'Bitcoin',
            'ticker' => 'BTC',
            'logourl' => '/coinsimage/BTC.png',
            'category' => '["Populer Coins"]',
            'active' => true,
            'apiurl' => 'http://localhost:8000',
            'apitoken' => 'skjdfghkjdsf'
        ]);

        $coin = Coin::create([
            'name' => 'BEP20-USDT',
            'ticker' => 'USDT',
            'logourl' => '/coinsimage/USDT.png',
            'category' => '["Stable Coins"]',
            'active' => true,
            'apiurl' => 'http://localhost:8000',
            'apitoken' => 'skjdfghkjdsf'
        ]);
    }
}
