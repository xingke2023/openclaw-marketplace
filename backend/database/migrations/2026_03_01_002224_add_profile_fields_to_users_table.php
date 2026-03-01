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
        Schema::table('users', function (Blueprint $table): void {
            $table->string('avatar_url')->nullable()->after('email');
            $table->string('website_url')->nullable()->after('avatar_url');
            $table->text('bio')->nullable()->after('website_url');
            $table->boolean('is_seller')->default(false)->after('bio');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['avatar_url', 'website_url', 'bio', 'is_seller']);
        });
    }
};
