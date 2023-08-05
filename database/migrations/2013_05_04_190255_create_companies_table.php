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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name')->nullable();
            $table->unsignedBigInteger('currency_id');
            $table->string('secret_key')->nullable();
            $table->string('callback_url')->nullable();
            $table->integer('timeout')->nullable();
            $table->integer('notifications')->nullable();
            $table->boolean('subscriptions')->nullable();
            $table->boolean('donations')->nullable();
            $table->boolean('payment_link')->nullable();
            $table->boolean('network_fee_optimisation')->nullable();
            $table->foreign('currency_id')->references('id')->on('fiat_currencies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
};
