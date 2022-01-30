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
            'email' => 'aaa@aaa.com',
            'password' =>  Hash::make('2023online'),
            'position' => '1'
        ];
        DB::table('users')->insert($param);

        $param = [
            'schoolid' => '1',
            'family_name' => '山田',
            'first_name' => '由井',
            'email' => 'bbb@bbb.com',
            'password' =>  Hash::make('2023online'),
            'position' => '0'
        ];
        DB::table('users')->insert($param);
    }
}
