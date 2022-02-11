<?php

// namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(SchoolsTableSeeder::class);
        $this->call(QuestionsTableSeeder::class);
        $this->call(ClassesTableSeeder::class);
        $this->call(OfferTableSeeder::class);
        $this->call(ParticipationTableSeeder::class);
        $this->call(NewsesTableSeeder::class);
    }
}
