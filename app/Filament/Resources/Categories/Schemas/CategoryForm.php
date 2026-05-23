<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Category Name')
                    ->required()
                    ->maxLength(255)
                    ->placeholder('Enter category name (e.g., Electronics, Clothing)'),

                Textarea::make('description')
                    ->label('Description')
                    ->rows(4)
                    ->maxLength(1000)
                    ->placeholder('Enter category description'),

                FileUpload::make('image')
                    ->label('Category Image')
                    ->image()
                    ->directory('categories')
                    ->maxSize(5120)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->helperText('Recommended size: 400x300px, Max 5MB'),

                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true)
                    ->inline(),
            ]);
    }
}
