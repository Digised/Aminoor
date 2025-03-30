'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product, Category, Image as PrismaImage } from '@prisma/client';
import ProductGrid from '@/components/products/ProductGrid';

type ProductWithImages = Product & {
  category: Category;
  images: PrismaImage[];
};

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithImages[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          const productsError = await productsRes.text();
          const categoriesError = await categoriesRes.text();
          console.error('API Errors:', { productsError, categoriesError });
          throw new Error('Failed to fetch data');
        }

        const products = await productsRes.json();
        const categories = await categoriesRes.json();

        console.log('Fetched data:', { products, categories });

        setFeaturedProducts(products);
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories available</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/categories/${category.id}`}
                className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>
    </main>
  );
}
