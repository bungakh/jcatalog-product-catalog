<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Categories
        $categories = [
            [
                'name' => 'Elektronik',
                'slug' => 'elektronik',
                'description' => 'Produk elektronik terkini dan berkualitas',
                'is_active' => true,
            ],
            [
                'name' => 'Fashion',
                'slug' => 'fashion',
                'description' => 'Pakaian dan aksesori untuk gaya Anda',
                'is_active' => true,
            ],
            [
                'name' => 'Rumah Tangga',
                'slug' => 'rumah-tangga',
                'description' => 'Perlengkapan rumah tangga lengkap',
                'is_active' => true,
            ],
            [
                'name' => 'Olahraga',
                'slug' => 'olahraga',
                'description' => 'Peralatan olahraga profesional',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Create Products
        $products = [
            // Elektronik
            [
                'category_id' => 1,
                'name' => 'Laptop Gaming ASUS ROG',
                'slug' => 'laptop-gaming-asus-rog',
                'description' => 'Laptop performa tinggi untuk gaming dengan prosesor Intel i9 dan RTX 4090',
                'price' => 25000000,
                'stock' => 5,
                'is_active' => true,
            ],
            [
                'category_id' => 1,
                'name' => 'Monitor 4K LG UltraWide',
                'slug' => 'monitor-4k-lg-ultrawide',
                'description' => 'Monitor 4K dengan panel IPS 34 inci, cocok untuk desainer dan gamer',
                'price' => 8500000,
                'stock' => 8,
                'is_active' => true,
            ],
            [
                'category_id' => 1,
                'name' => 'Keyboard Mekanik RGB',
                'slug' => 'keyboard-mekanik-rgb',
                'description' => 'Keyboard mekanik dengan lampu RGB, switch Cherry MX',
                'price' => 1200000,
                'stock' => 25,
                'is_active' => true,
            ],
            // Fashion
            [
                'category_id' => 2,
                'name' => 'Jaket Denim Premium',
                'slug' => 'jaket-denim-premium',
                'description' => 'Jaket denim asli dengan kualitas terbaik, desain klasik',
                'price' => 450000,
                'stock' => 50,
                'is_active' => true,
            ],
            [
                'category_id' => 2,
                'name' => 'T-Shirt Cotton 100%',
                'slug' => 't-shirt-cotton-100',
                'description' => 'Kaos berkualitas tinggi dengan bahan cotton 100% nyaman dipakai',
                'price' => 150000,
                'stock' => 100,
                'is_active' => true,
            ],
            [
                'category_id' => 2,
                'name' => 'Sepatu Sneaker Branded',
                'slug' => 'sepatu-sneaker-branded',
                'description' => 'Sepatu sneaker dari brand internasional, desain terkini',
                'price' => 750000,
                'stock' => 30,
                'is_active' => true,
            ],
            // Rumah Tangga
            [
                'category_id' => 3,
                'name' => 'Robot Vacuum Cleaner',
                'slug' => 'robot-vacuum-cleaner',
                'description' => 'Robot penyedot debu otomatis dengan teknologi smart mapping',
                'price' => 3500000,
                'stock' => 12,
                'is_active' => true,
            ],
            [
                'category_id' => 3,
                'name' => 'Air Purifier HEPA',
                'slug' => 'air-purifier-hepa',
                'description' => 'Pembersih udara dengan filter HEPA untuk rumah sehat',
                'price' => 2200000,
                'stock' => 15,
                'is_active' => true,
            ],
            // Olahraga
            [
                'category_id' => 4,
                'name' => 'Sepeda Gunung MTB',
                'slug' => 'sepeda-gunung-mtb',
                'description' => 'Sepeda gunung profesional dengan frame aluminum',
                'price' => 5000000,
                'stock' => 10,
                'is_active' => true,
            ],
            [
                'category_id' => 4,
                'name' => 'Treadmill Electric',
                'slug' => 'treadmill-electric',
                'description' => 'Alat lari otomatis dengan layar digital dan kecepatan variabel',
                'price' => 8000000,
                'stock' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($products as $prod) {
            Product::create($prod);
        }
    }
}
