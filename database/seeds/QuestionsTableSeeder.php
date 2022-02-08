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
            'created_at' => new DateTime(),
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
        $param = [
            'user_id' => '4',
            'class_id' => '1',
            'question' => '2-1テストデータです',
            'created_at' => new DateTime(),
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
        $param = [
            'user_id' => '2',
            'class_id' => '2',
            'question' => '3-2テストデータです',
            'created_at' => new DateTime(),
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
        $param = [
            'user_id' => '2',
            'class_id' => '3',
            'question' => '3-3テストデータです',
            'created_at' => new DateTime(),
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
    }
}
