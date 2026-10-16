'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from './CartProvider'
import { formatPrice } from '@/lib/format'

// Floating summary shown whenever the cart has items, so ordering is one tap away on mobile.
export default function CartBar() {
  const { count, total, isOpen, open } = useCart()
  if (count === 0 || isOpen) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-4 pointer-events-none"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
    >
      <button
        onClick={open}
        className="pointer-events-auto mx-auto flex w-full max-w-md items-center justify-between gap-3 rounded-full bg-leaf-700 text-white pl-5 pr-2 py-2 shadow-2xl animate-fade-in-up hover:bg-leaf-800 transition"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <ShoppingBag className="w-4 h-4" />
          {count} món · {formatPrice(total)}
        </span>
        <span className="rounded-full bg-chili-500 px-4 py-2 text-sm font-semibold">
          Xem giỏ & đặt
        </span>
      </button>
    </div>
  )
}
