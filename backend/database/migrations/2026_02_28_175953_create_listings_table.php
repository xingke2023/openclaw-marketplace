<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $create) {
            $create->id();
            $create->string('name');
            $create->string('slug')->unique();
            $create->decimal('price', 10, 2);
            $create->text('description')->nullable();
            $create->string('image_url')->nullable();
            $create->string('status')->default('available');
            $create->string('category')->default('Claw');
            $create->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
