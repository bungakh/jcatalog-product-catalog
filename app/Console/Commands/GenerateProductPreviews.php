<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;

class GenerateProductPreviews extends Command
{
    protected $signature = 'products:generate-previews {--force : Regenerate previews even when already exists} {--width=1200} {--height=630} {--quality=82}';

    protected $description = 'Generate JPEG social preview images for WhatsApp/OpenGraph product link previews';

    public function handle(): int
    {
        $force = (bool) $this->option('force');
        $width = (int) $this->option('width');
        $height = (int) $this->option('height');
        $quality = (int) $this->option('quality');

        $products = Product::query()
            ->whereNotNull('image')
            ->orderBy('id')
            ->get();

        if ($products->isEmpty()) {
            $this->info('✅ No product images found.');
            return self::SUCCESS;
        }

        $scriptPath = base_path('scripts/generate-product-preview.mjs');

        if (! file_exists($scriptPath)) {
            $this->error("Preview script not found: {$scriptPath}");
            return self::FAILURE;
        }

        Storage::disk('public')->makeDirectory('products/previews');

        $success = 0;
        $skipped = 0;
        $failed = 0;

        $this->info("Generating WhatsApp preview images for {$products->count()} products...\n");

        foreach ($products as $product) {
            $sourceRelativePath = $product->image;
            $sourceAbsolutePath = Storage::disk('public')->path($sourceRelativePath);

            if (! file_exists($sourceAbsolutePath)) {
                $this->warn("⚠️  {$product->name}: source image missing ({$sourceRelativePath})");
                $failed++;
                continue;
            }

            $previewRelativePath = self::previewPathFor($product);
            $previewAbsolutePath = Storage::disk('public')->path($previewRelativePath);

            if (! $force && file_exists($previewAbsolutePath)) {
                $this->line("⏭️  {$product->name}: preview already exists");
                $skipped++;
                continue;
            }

            $process = new Process([
                'node',
                $scriptPath,
                $sourceAbsolutePath,
                $previewAbsolutePath,
                (string) $width,
                (string) $height,
                (string) $quality,
            ], base_path());

            $process->setTimeout(60);
            $process->run();

            if (! $process->isSuccessful() || ! file_exists($previewAbsolutePath)) {
                $this->error("❌ {$product->name}: " . trim($process->getErrorOutput() ?: $process->getOutput()));
                $failed++;
                continue;
            }

            $this->line("✅ {$product->name}: {$previewRelativePath} (" . $this->formatBytes(filesize($previewAbsolutePath) ?: 0) . ')');
            $success++;
        }

        $this->newLine();
        $this->info("Done. Success: {$success}, Skipped: {$skipped}, Failed: {$failed}");

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
    }

    public static function previewPathFor(Product $product): string
    {
        $slug = Str::slug($product->slug ?: $product->name) ?: 'product-' . $product->id;

        return "products/previews/{$product->id}-{$slug}.jpg";
    }

    private function formatBytes(int $bytes): string
    {
        if ($bytes >= 1048576) {
            return round($bytes / 1048576, 2) . ' MB';
        }

        if ($bytes >= 1024) {
            return round($bytes / 1024, 1) . ' KB';
        }

        return $bytes . ' B';
    }
}
