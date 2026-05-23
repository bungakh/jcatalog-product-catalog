<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class UploadProductImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Product mapping with placeholder image URLs from placeholder service
        $products_to_images = [
            2 => "https://via.placeholder.com/400x400/4164C8/FFFFFF?text=Treadmill+Electric",
            3 => "https://via.placeholder.com/400x400/228B22/FFFFFF?text=Sepeda+Gunung+MTB",
            4 => "https://via.placeholder.com/400x400/4682B4/FFFFFF?text=Air+Purifier+HEPA",
            5 => "https://via.placeholder.com/400x400/646464/FFFFFF?text=Robot+Vacuum",
            6 => "https://via.placeholder.com/400x400/DC143C/FFFFFF?text=Sepatu+Sneaker",
            7 => "https://via.placeholder.com/400x400/FFD700/000000?text=T-Shirt+Cotton",
            8 => "https://via.placeholder.com/400x400/191970/FFFFFF?text=Jaket+Denim",
            9 => "https://via.placeholder.com/400x400/8A2BE2/FFFFFF?text=Keyboard+RGB",
            10 => "https://via.placeholder.com/400x400/000000/FFFFFF?text=Monitor+4K",
        ];

        foreach ($products_to_images as $product_id => $image_url) {
            $product = Product::find($product_id);
            
            if (!$product) {
                echo "❌ Product ID $product_id not found\n";
                continue;
            }

            // Skip if already has image
            if ($product->image) {
                echo "⏭️  Product {$product->name} already has image\n";
                continue;
            }

            try {
                // Download image from placeholder service
                $image_content = file_get_contents($image_url);
                
                if (!$image_content) {
                    echo "❌ Failed to download image for {$product->name}\n";
                    continue;
                }

                // Generate unique filename
                $filename = 'products/' . uniqid() . '.jpg';
                
                // Store image
                Storage::disk('public')->put($filename, $image_content);
                
                // Update product
                $product->update(['image' => $filename]);
                
                echo "✅ Uploaded image for: {$product->name} → $filename\n";
                
            } catch (\Exception $e) {
                echo "❌ Error processing {$product->name}: " . $e->getMessage() . "\n";
            }

            // Small delay to avoid rate limiting
            sleep(1);
        }

        echo "\n✨ Product images upload completed!\n";
    }
}
