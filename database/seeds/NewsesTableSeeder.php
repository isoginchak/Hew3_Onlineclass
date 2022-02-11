<?php

use Illuminate\Database\Seeder;

class NewsesTableSeeder extends Seeder
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
            'address_class_id' => '1',
            'news_title'=>'テスト1',
            'news_content'=>'テストデータだよ1',
            'created_at' => new DateTime()
        ];
        DB::table('newses')->insert($param);
        $param = [
            'user_id' => '1',
            'address_class_id' => '1',
            'news_title'=>'テスト2',
            'news_content'=>'テストデータだよ2',
            'created_at' => new DateTime()
        ];
        DB::table('newses')->insert($param);
        $param = [
            'user_id' => '1',
            'address_class_id' => '1',
            'news_title'=>'テスト3',
            'news_content'=>'テストデータだよ3',
            'created_at' => new DateTime()
        ];
        DB::table('newses')->insert($param);
    }
}
