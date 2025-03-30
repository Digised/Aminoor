'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function CartIcon() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch('/api/cart/count');
        if (res.ok) {
          const data = await res.json();
          setItemCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartItems();

    // Listen for cart updates
    window.addEventListener('cartUpdated', fetchCartItems);
    return () => window.removeEventListener('cartUpdated', fetchCartItems);
  }, []);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-gray-900" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
} 