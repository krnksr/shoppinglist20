<?php

use Illuminate\Database\Seeder;

class ShoppinglistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $shoppinglist = new \App\Shoppinglist;
        $shoppinglist->title = "Meine Einkaufsliste";
        $shoppinglist->finalSum = 10;
        $shoppinglist->dueDate = new DateTime();

        $shoppinglist->save();

        //add user
        $user = \App\User::all()->first();
        $shoppinglist->user()->associate($user);
        $shoppinglist->save();


        //add items
        $shoppingitem1 = new App\Shoppingitem;
        $shoppingitem1->name = "Einkaufsgegenstand1";
        $shoppingitem1->amount = "2kg";
        $shoppingitem1->maxPrice = "10.33";

        $shoppingitem2 = new App\Shoppingitem;
        $shoppingitem2->name = "Einkaufsgegenstand2";
        $shoppingitem2->amount = "4Pkg";
        $shoppingitem2->maxPrice = "05.10";
        $shoppinglist->shoppingitems()->saveMany([$shoppingitem1, $shoppingitem2]);


        //add comment
        $comment = new App\Comment;
        $comment->text = "Das ist ein Kommentar";
        $comment-> save();
    }
}

