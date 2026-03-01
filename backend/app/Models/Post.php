<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'published' => 'boolean',
        ];
    }

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image_url',
        'published',
        'published_at',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
