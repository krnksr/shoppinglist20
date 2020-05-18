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
        //testuser
        $user = new\App\User;
        $user->firstname = "Max";
        $user->lastname = "Muster";
        $user->role = true;
        $user->email = "testuser@text.at";
        $user->password = bcrypt('secret');
        $user->save();

    }
}
