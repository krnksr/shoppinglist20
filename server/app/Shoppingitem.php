<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shoppingitem extends Model
{
    protected $fillable = ['name', 'amount', 'maxPrice' ];


    public function shoppinglist() : BelongsTo {
        return $this->belongsTo(Shoppinglist::class);
    }



}


