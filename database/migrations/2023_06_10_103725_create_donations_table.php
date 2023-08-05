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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('donation_id');
            $table->string('api_ke');
            $table->string('email_show');
            $table->string('email_require');
            $table->integer('phone_show');
            $table->integer('phone_require');
            $table->string('name_show');
            $table->string('name_require');
            $table->string('social_link_show');
            $table->string('social_link_require');
            $table->string('address_show');
            $table->string('address_require');
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
        Schema::dropIfExists('donations');
    }
};
