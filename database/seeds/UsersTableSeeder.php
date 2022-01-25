<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'schoolid' => '1',
            'family_name' => '田中',
            'first_name' => '太郎',
            'mailaddress' => 'aaa@aaa.com',
            'password' => '2023online',
            'position' => '1'
        ];
        DB::table('users')->insert($param);

        $param = [
            'schoolid' => '1',
            'family_name' => '山田',
            'first_name' => '由井',
            'mailaddress' => 'bbb@bbb.com',
            'password' => '2023online',
            'position' => '0'
        ];
        DB::table('users')->insert($param);
    }
}
