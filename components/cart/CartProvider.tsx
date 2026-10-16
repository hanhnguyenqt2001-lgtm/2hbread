'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { menu, type MenuItem } from '@/data/menu'

export interface CartLine {
  item: MenuItem
  qty: number
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  total: number
  qtyOf: (id: string) => number
  add: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  isOpen: boolean
  open: () => void
  close: () => void
}

const STORAGE_KEY = '2hfood-cart'
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [loaded, setLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Restore after mount (not during render) to avoid hydration mismatches.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      const valid: Record<string, number> = {}
      for (const item of menu) {
        const qty = Number(saved[item.id])
        if (qty > 0) valid[item.id] = Math.min(Math.floor(qty), 99)
      }
      setQuantities(valid)
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities))
    } catch {}
  }, [quantities, loaded])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  const setQty = useCallback((id: string, qty: number) => {
    setQuantities((prev) => {
      const next = { ...prev }
      if (qty > 0) next[id] = Math.min(qty, 99)
      else delete next[id]
      return next
    })
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const lines = menu
      .filter((item) => quantities[item.id] > 0)
      .map((item) => ({ item, qty: quantities[item.id] }))
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      total: lines.reduce((sum, l) => sum + l.qty * l.item.price, 0),
      qtyOf: (id) => quantities[id] ?? 0,
      add: (id) => setQty(id, (quantities[id] ?? 0) + 1),
      setQty,
      clear: () => setQuantities({}),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }
  }, [quantities, isOpen, setQty])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
