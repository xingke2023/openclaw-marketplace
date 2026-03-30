<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Listing extends Model
{
    /** @use HasFactory<\Database\Factories\ListingFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'name_ja',
        'slug',
        'price',
        'description',
        'description_ja',
        'image_url',
        'status',
        'category',
        'demo_messages',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'demo_messages' => 'array',
        ];
    }
}
