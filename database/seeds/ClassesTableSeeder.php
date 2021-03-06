<?php

use Illuminate\Database\Seeder;

class ClassesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'teacher_id' => '1',
            'class_name' => 'JAVAプログラミング',
            'start_frame' => '1',
            'end_frame' => '1',
            'week' => '1',
            'hash' =>  Str::random(10),
        ];
       DB::table('classes')->insert($param);
       $param = [
        'teacher_id' => '1',
        'class_name' => 'IOT基礎',
        'start_frame' => '2',
        'end_frame' => '2',
        'week' => '1',
        'hash' =>  Str::random(10),
    ];
     DB::table('classes')->insert($param);
     $param = [
        'teacher_id' => '3',
        'class_name' => 'iPhoneアプリ開発',
        'start_frame' => '2',
        'end_frame' => '2',
        'week' => '2',
        'hash' =>  Str::random(10),
    ];
     DB::table('classes')->insert($param);
    }
}
