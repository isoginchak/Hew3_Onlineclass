<?php

use Illuminate\Database\Seeder;

class ParticipationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'user_id' => '1',
            'class_id' => '1',
        ];
        DB::table('participation')->insert($param);
        $param = [
            'user_id' => '1',
            'class_id' => '2',
        ];
        DB::table('participation')->insert($param);
        $param = [
            'user_id' => '3',
            'class_id' => '3',
        ];
        DB::table('participation')->insert($param);
        $param = [
            'user_id' => '2',
            'class_id' => '1',
        ];
        DB::table('participation')->insert($param);
        $param = [
            'user_id' => '2',
            'class_id' => '2',
        ];
        DB::table('participation')->insert($param);
        $param = [
            'user_id' => '4',
            'class_id' => '1',
        ];
        DB::table('participation')->insert($param);
        $param = [
            'user_id' => '4',
            'class_id' => '2',
        ];
        DB::table('participation')->insert($param);



    }
}
