<?php

use App\Shoppinglist;
use App\Shoppingitem;
use App\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
//auth
Route::group(['middleware' => ['api', 'cors']], function (){
    Route::post('auth/login', 'Auth\ApiAuthController@login');
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('shoppinglists', 'ShoppinglistController@index');
Route::get('shoppinglists/{id}', 'ShoppinglistController@getSingle');
Route::post('shoppinglist', 'ShoppinglistController@save');
//Route::put('shoppinglist', 'ShoppinglistController@update');
Route::put('shoppinglist/{id}', 'ShoppinglistController@delete');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/


Route::group(['middleware' => ['api','cors']], function() {
    Route::post('auth/login', 'Auth\ApiAuthController@login');
});

Route::group(['middleware' => ['api','cors', 'auth.jwt']], function() {
    Route::post('auth/logout', 'Auth\ApiAuthController@logout');
    Route::get('shoppinglists', 'ShoppinglistController@index');
    Route::get('shoppinglists/{id}', 'ShoppinglistController@getSingle');
    Route::post('shoppinglist', 'ShoppinglistController@save');
    Route::put('shoppinglist/{id}', 'ShoppinglistController@update');
    Route::delete('shoppinglist/{id}', 'ShoppinglistController@delete');

});
