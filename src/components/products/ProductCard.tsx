import Image from 'next/image';
import Link from 'next/link';
import { Product, Category, Image as PrismaImage } from '@prisma/client';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product & {
    category?: Category | null;
    images: PrismaImage[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get image URLs safely
  const imageUrls = product.images?.map(img => img.url) || [];

  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <Link
        href={`/products/${product.id}`}
        className="block"
      >
        <div className="relative w-full pt-[75%]">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="absolute top-0 left-0 w-full h-full object-cover object-center transition duration-300 group-hover:opacity-90"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
            <p className="text-sm font-semibold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex flex-col h-full">
          {product.category?.name && (
            <span className="text-xs font-medium text-indigo-500 uppercase tracking-wider mb-2">
              {product.category.name}
            </span>
          )}
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
          
          <div className="mt-6 flex items-center gap-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-shrink-0 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Details
            </Link>
            <div className="flex-grow">
              <AddToCartButton 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  images: imageUrls
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 