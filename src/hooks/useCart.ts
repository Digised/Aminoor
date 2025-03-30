import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    images: {
      id: string
      url: string
    }[]
  }
}

interface CartStore {
  items: CartItem[]
  loading: boolean
  error: string | null
  fetchCart: () => Promise<void>
  addToCart: (productId: string, quantity?: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => void
}

export const useCart = create<CartStore>()((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    try {
      set({ loading: true, error: null })
      const res = await fetch('/api/cart')
      if (!res.ok) {
        throw new Error('Failed to fetch cart')
      }
      const data = await res.json()
      set({ items: data.items || [] })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch cart' })
    } finally {
      set({ loading: false })
    }
  },

  addToCart: async (productId: string, quantity = 1) => {
    try {
      set({ loading: true, error: null })
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to add to cart')
      }

      // Refresh cart after adding item
      const cartRes = await fetch('/api/cart')
      if (!cartRes.ok) {
        const cartData = await cartRes.json()
        throw new Error(cartData.message || 'Failed to fetch updated cart')
      }
      const cartData = await cartRes.json()
      set({ items: cartData.items || [] })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add to cart'
      set({ error: message })
      throw new Error(message)
    } finally {
      set({ loading: false })
    }
  },

  removeFromCart: async (itemId: string) => {
    try {
      set({ loading: true, error: null })
      const res = await fetch(`/api/cart?itemId=${itemId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to remove from cart')
      }

      // Refresh cart after removing item
      const cartRes = await fetch('/api/cart')
      if (!cartRes.ok) {
        throw new Error('Failed to fetch updated cart')
      }
      const cartData = await cartRes.json()
      set({ items: cartData.items || [] })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to remove from cart' })
    } finally {
      set({ loading: false })
    }
  },

  updateQuantity: async (itemId: string, quantity: number) => {
    try {
      set({ loading: true, error: null })
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      })

      if (!res.ok) {
        throw new Error('Failed to update quantity')
      }

      // Refresh cart after updating quantity
      const cartRes = await fetch('/api/cart')
      if (!cartRes.ok) {
        throw new Error('Failed to fetch updated cart')
      }
      const cartData = await cartRes.json()
      set({ items: cartData.items || [] })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update quantity' })
    } finally {
      set({ loading: false })
    }
  },

  clearCart: () => {
    set({ items: [], error: null })
  },
})) 