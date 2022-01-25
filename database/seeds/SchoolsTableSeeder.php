<?php

use Illuminate\Database\Seeder;

class SchoolsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'school_name' => 'HAL東京'
        ];
        DB::table('schools')->insert($param);
        $param = [
            'school_name' => 'HAL名古屋'
        ];
        DB::table('schools')->insert($param);
        $param = [
            'school_name' => 'HAL大阪'
        ];
        DB::table('schools')->insert($param);
    
    }
}
