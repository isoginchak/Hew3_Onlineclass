<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimescheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timeschedule', function (Blueprint $table) {
            $table->integer('id')->unique();
            $table->time('starttime_1');
            $table->time('endtime_1');
            $table->time('starttime_2');
            $table->time('endtime_2');
            $table->time('starttime_3');
            $table->time('endtime_3');
            $table->time('starttime_4');
            $table->time('endtime_4');
            $table->time('starttime_5');
            $table->time('endtime_5');
            $table->time('starttime_6');
            $table->time('endtime_6');
   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('timeschedule');
    }
}
