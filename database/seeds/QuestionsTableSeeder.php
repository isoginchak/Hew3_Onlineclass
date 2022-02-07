<?php

use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'user_id' => '2',
            'class_id' => '1',
            'question' => '1-1テストデータです',
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
        $param = [
            'user_id' => '4',
            'class_id' => '1',
            'question' => '2-1テストデータです',
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
        $param = [
            'user_id' => '2',
            'class_id' => '2',
            'question' => '3-2テストデータです',
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
        $param = [
            'user_id' => '2',
            'class_id' => '3',
            'question' => '3-3テストデータです',
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
    }
}
