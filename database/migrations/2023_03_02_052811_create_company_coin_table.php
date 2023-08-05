<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_coin', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('coin_id');
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('coin_id')->references('id')->on('coins');
            $table->unique(['coin_id', 'company_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_coin');
    }
};
