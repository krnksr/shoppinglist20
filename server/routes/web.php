<?php

use App\Shoppinglist;

/*
Route::get('/shoppinglists', function () {
    $shoppinglists = DB::table('shoppinglists')->get();
    //return $shoppinglists;
    return view('shoppinglists.index', compact('shoppinglists'));
});

Route::get('/shoppinglists/{id}', function ($id) {
    $shoppinglist = DB::table('shoppinglists')->find($id);
    //dd($shoppinglist);
    return view('shoppinglists.show', compact('shoppinglist'));

});

*/

Route::get('/', 'ShoppinglistController@index');
Route::get('/shoppinglists', 'ShoppinglistController@index');
Route::get('/shoppinglists/{shoppinglist}', 'ShoppinglistController@show');


