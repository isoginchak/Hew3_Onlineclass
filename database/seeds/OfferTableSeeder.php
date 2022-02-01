<?php

use Illuminate\Database\Seeder;

class OfferTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'school_id' => '1',
            'class_id' => '1',
        ];
        DB::table('offer')->insert($param);
        $param = [
            'school_id' => '1',
            'class_id' => '2',
        ];
        DB::table('offer')->insert($param);
    }
}
