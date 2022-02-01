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
            'question' => 'テストデータです',
            'share' => '0',
        ];
        DB::table('questions')->insert($param);
    }
}
