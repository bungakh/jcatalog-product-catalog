import React from 'react';
import { Checkbox } from '@/Components/ui/checkbox';
import { Button } from '@/Components/ui/button';
import { ChevronDown } from '@hugeicons/core-free-icons';
import { Icon } from '@/Components/ui/icon';

export default function ProductFilter({ categories, products = [], onFilterChange, filters }) {
    const [expandedSections, setExpandedSections] = React.useState({
        category: true,
        price: true,
    });

    const categoryCounts = React.useMemo(() => {
        return (products || []).reduce((counts, product) => {
            if (product.category?.slug) counts[product.category.slug] = (counts[product.category.slug] || 0) + 1;
            return counts;
        }, {});
    }, [products]);

    const availableCategories = (categories || []).filter((category) => (categoryCounts[category.slug] || 0) > 0);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="space-y-6">
            {/* Category Filter */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggleSection('category')}
                    className="w-full flex items-center justify-between mb-4 hover:text-gray-700"
                >
                    <h3 className="font-semibold text-gray-900 text-lg">Category</h3>
                    <Icon
                        icon={ChevronDown}
                        className={`w-5 h-5 transition-transform ${
                            expandedSections.category ? 'rotate-0' : '-rotate-90'
                        }`}
                    />
                </button>

                {expandedSections.category && (
                    <div className="space-y-3">
                        {availableCategories.map((category) => (
                            <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                                <Checkbox
                                    checked={filters.categories?.includes(category.slug)}
                                    onCheckedChange={(checked) => {
                                        onFilterChange('categories', checked ? [...(filters.categories || []), category.slug] : filters.categories?.filter(slug => slug !== category.slug));
                                    }}
                                />
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                                    {category.name}
                                </span>
                                <span className="text-xs text-gray-500 ml-auto">
                                    ({categoryCounts[category.slug] || 0})
                                </span>
                            </label>
                        ))}
                        {availableCategories.length === 0 && (
                            <p className="text-sm text-gray-500">Belum ada kategori dengan produk aktif.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggleSection('price')}
                    className="w-full flex items-center justify-between mb-4 hover:text-gray-700"
                >
                    <h3 className="font-semibold text-gray-900 text-lg">Price</h3>
                    <Icon
                        icon={ChevronDown}
                        className={`w-5 h-5 transition-transform ${
                            expandedSections.price ? 'rotate-0' : '-rotate-90'
                        }`}
                    />
                </button>

                {expandedSections.price && (
                    <div className="space-y-4">
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                placeholder="From"
                                value={filters.priceMin || ''}
                                onChange={(e) => onFilterChange('priceMin', e.target.value)}
                                className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="number"
                                placeholder="To"
                                value={filters.priceMax || ''}
                                onChange={(e) => onFilterChange('priceMax', e.target.value)}
                                className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="w-full border-gray-300"
                            onClick={() => onFilterChange('applyPrice', true)}
                        >
                            Apply
                        </Button>
                    </div>
                )}
            </div>

            {/* Clear Filters */}
            <Button
                variant="outline"
                className="w-full border-gray-900 text-gray-900 hover:bg-gray-50"
                onClick={() => onFilterChange('reset', true)}
            >
                Clear All Filters
            </Button>
        </div>
    );
}
