<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->word().' '.$this->faker->randomElement(['Claw', 'Robot', 'Machine']);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'price' => $this->faker->randomFloat(2, 50, 5000),
            'description' => $this->faker->paragraphs(3, true),
            'image_url' => 'https://picsum.photos/seed/'.Str::random(10).'/800/600',
            'status' => $this->faker->randomElement(['available', 'available', 'sold', 'draft']),
            'category' => 'Claw',
        ];
    }
}
