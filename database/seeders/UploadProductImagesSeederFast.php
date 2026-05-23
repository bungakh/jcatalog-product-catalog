<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class UploadProductImagesSeederFast extends Seeder
{
    /**
     * Run the database seeds using base64 encoded minimal JPEGs.
     */
    public function run(): void
    {
        // Minimal JPEG files (very small, just colored squares)
        $products_to_base64 = [
            2 => [
                'name' => 'Treadmill Electric',
                'image' => base64_decode('/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=')
            ],
            3 => [
                'name' => 'Sepeda Gunung MTB',
                'image' => base64_decode('/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=')
            ]
        ];

        // Simpler approach: create minimal placeholder JPEGs
        $products = Product::whereNull('image')->get();

        foreach ($products as $product) {
            try {
                // Create a minimal JPEG programmatically
                $filename = 'products/' . uniqid() . '.jpg';
                
                // Use a very simple approach: fetch from placeholder.com
                $colors = [
                    '4164C8', '228B22', '4682B4', '646464', 'DC143C',
                    'FFD700', '191970', '8A2BE2', '000000', 'FF0000'
                ];
                
                $color = $colors[array_rand($colors)];
                $url = "https://via.placeholder.com/400?bg={$color}&text=+";
                
                $context = stream_context_create(['http' => ['timeout' => 5]]);
                $image_content = @file_get_contents($url, false, $context);
                
                if ($image_content && strlen($image_content) > 100) {
                    Storage::disk('public')->put($filename, $image_content);
                    $product->update(['image' => $filename]);
                    echo "✅ {$product->name}\n";
                } else {
                    echo "⏭️  Skipped {$product->name} (network timeout)\n";
                }
                
            } catch (\Exception $e) {
                echo "⚠️  {$product->name}: {$e->getMessage()}\n";
            }

            usleep(500000); // 0.5 second delay
        }

        echo "\n✨ Batch image upload completed!\n";
    }
}
