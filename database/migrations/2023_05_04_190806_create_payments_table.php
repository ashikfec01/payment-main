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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id')->nullable();
            $table->integer('company_id');
            $table->integer('price');
            $table->integer('coin_id');
            $table->integer('currency_id');
            $table->string('order_description')->nullable();
            $table->boolean('fixed_rate');
            $table->boolean('fee_paid_user');
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
        Schema::dropIfExists('payments');
    }
};
