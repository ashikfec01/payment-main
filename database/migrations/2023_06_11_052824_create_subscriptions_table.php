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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('plan_name');
            $table->integer('company_id');
            $table->enum('period_unit', ['Days', 'Month', 'Years']);
            $table->integer('period_duration');
            $table->integer('price');
            $table->integer('currency_id');
            $table->string('payment_notifications_link')->nullable();
            $table->string('successful_payment_page')->nullable();
            $table->string('payment_failed_page')->nullable();
            $table->string('partial_payment_page')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscriptions');
    }
};
