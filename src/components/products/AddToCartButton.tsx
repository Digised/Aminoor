'use client'

import { useCart } from '@/hooks/useCart'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    images: string[]
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      await addToCart(product.id)
      toast.success('Product added to cart')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add to cart')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  )
} 