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
        Schema::create('crypto_withdraws', function (Blueprint $table) {
            $table->id();
            $table->integer('company_id');
            $table->integer('currency_id');
            $table->integer('user_id');
            $table->string('address');
            $table->integer('memo');
            $table->integer('amount');
            $table->enum('status', ['Pending', 'Waiting', 'Success', 'Failed', 'Canceled']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crypto_withdraws');
    }
};
