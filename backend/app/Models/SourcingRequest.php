<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SourcingRequest extends Model
{
    protected $fillable = [
        'name',
        'contact',
        'model',
        'budget',
        'note',
        'status',
    ];
}
