<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;

class GenerateProductThumbnails extends Command
{
    protected $signature = 'products:generate-thumbnails {--force : Regenerate thumbnails even when already exists} {--width=480} {--height=480} {--quality=72}';

    protected $description = 'Generate lightweight WebP thumbnails for product catalog cards';

    public function handle(): int
    {
        $force = (bool) $this->option('force');
        $width = (int) $this->option('width');
        $height = (int) $this->option('height');
        $quality = (int) $this->option('quality');

        $products = Product::query()
            ->whereNotNull('image')
            ->when(! $force, fn ($query) => $query->whereNull('thumbnail'))
            ->orderBy('id')
            ->get();

        if ($products->isEmpty()) {
            $this->info('✅ No thumbnails to generate.');
            return self::SUCCESS;
        }

        $scriptPath = base_path('scripts/resize-product-image.mjs');

        if (! file_exists($scriptPath)) {
            $this->error("Resize script not found: {$scriptPath}");
            return self::FAILURE;
        }

        Storage::disk('public')->makeDirectory('products/thumbnails');

        $success = 0;
        $failed = 0;

        $this->info("Generating thumbnails for {$products->count()} products...\n");

        foreach ($products as $product) {
            $sourceRelativePath = $product->image;
            $sourceAbsolutePath = Storage::disk('public')->path($sourceRelativePath);

            if (! file_exists($sourceAbsolutePath)) {
                $this->warn("⚠️  {$product->name}: source image missing ({$sourceRelativePath})");
                $failed++;
                continue;
            }

            $baseName = Str::slug(pathinfo($sourceRelativePath, PATHINFO_FILENAME)) ?: 'product-' . $product->id;
            $thumbnailRelativePath = "products/thumbnails/{$product->id}-{$baseName}.webp";
            $thumbnailAbsolutePath = Storage::disk('public')->path($thumbnailRelativePath);

            $process = new Process([
                'node',
                $scriptPath,
                $sourceAbsolutePath,
                $thumbnailAbsolutePath,
                (string) $width,
                (string) $height,
                (string) $quality,
            ], base_path());

            $process->setTimeout(60);
            $process->run();

            if (! $process->isSuccessful() || ! file_exists($thumbnailAbsolutePath)) {
                $this->error("❌ {$product->name}: " . trim($process->getErrorOutput() ?: $process->getOutput()));
                $failed++;
                continue;
            }

            $product->update(['thumbnail' => $thumbnailRelativePath]);

            $originalSize = filesize($sourceAbsolutePath) ?: 0;
            $thumbnailSize = filesize($thumbnailAbsolutePath) ?: 0;
            $saving = $originalSize > 0 ? round((1 - ($thumbnailSize / $originalSize)) * 100) : 0;

            $this->line("✅ {$product->name}: " . $this->formatBytes($originalSize) . ' → ' . $this->formatBytes($thumbnailSize) . " ({$saving}% smaller)");
            $success++;
        }

        $this->newLine();
        $this->info("Done. Success: {$success}, Failed: {$failed}");

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
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
