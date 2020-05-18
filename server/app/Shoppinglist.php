<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shoppinglist extends Model
{
    protected $fillable = ['title', 'finalSum', 'dueDate', 'user_id'];



    public function shoppingitems() :HasMany {
        return $this->hasMany(Shoppingitem::class);
    }



        public function comments() {
            return $this->hasMany(Shoppingitem::class)->withTimeStamps();
        }


    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

}
