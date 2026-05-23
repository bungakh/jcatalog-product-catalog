<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class UploadProductImages extends Command
{
    protected $signature = 'products:upload-images';
    protected $description = 'Upload placeholder images for all products without images';

    public function handle(): int
    {
        $products = Product::whereNull('image')->orderBy('id')->get();
        $count = $products->count();

        if ($count === 0) {
            $this->info('✅ All products already have images!');
            return 0;
        }

        $this->info("📦 Uploading images for {$count} products...\n");

        $colors = ['4164C8', '228B22', '4682B4', '646464', 'DC143C', 'FFD700', '191970', '8A2BE2', '000000', 'FF0000'];
        $idx = 0;
        $success = 0;

        foreach ($products as $product) {
            $color = $colors[$idx % count($colors)];
            $filename = 'products/' . uniqid() . '.jpg';

            $this->output->write("⏳ {$product->name}... ", false);

            try {
                // Create a JPEG image - reuse the test product image we already have
                $image_data = $this->getProductImage();

                if ($image_data && strlen($image_data) > 100) {
                    Storage::disk('public')->put($filename, $image_data);
                    $product->update(['image' => $filename]);
                    
                    $this->line('<fg=green>✅</>');
                    $success++;
                } else {
                    $this->line('<fg=yellow>❌ Failed to create image</>');
                }
            } catch (\Exception $e) {
                $this->line("<fg=red>❌ {$e->getMessage()}</>");
            }

            $idx++;
        }

        $total = Product::where('image', '!=', null)->count();
        $this->newLine();
        $this->info("✨ Complete! {$success} images uploaded. Total: {$total}/11 products with images");

        return 0;
    }

    private function getProductImage(): string
    {
        // Use the existing test product image
        $testImagePath = '/home/jenlut/PROJECT/storage/app/public/products/01KS9D110JTK3YC8BQ103CMMHC.png';
        
        if (file_exists($testImagePath)) {
            return file_get_contents($testImagePath);
        }

        // Fallback: return minimal valid JPEG data
        return base64_decode('/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=');
    }
}
