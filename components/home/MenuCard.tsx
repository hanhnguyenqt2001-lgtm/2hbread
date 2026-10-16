'use client'

import { Plus } from 'lucide-react'
import type { MenuItem } from '@/data/menu'
import { useCart } from '@/components/cart/CartProvider'
import QtyStepper from '@/components/cart/QtyStepper'
import DishImage from '@/components/DishImage'
import { formatPrice } from '@/lib/format'

export default function MenuCard({ item }: { item: MenuItem }) {
  const { qtyOf, add, setQty } = useCart()
  const qty = qtyOf(item.id)

  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-sm ring-1 ring-rice-300/60 hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative">
        <DishImage
          src={item.image}
          alt={item.name}
          className="aspect-[4/3] group-hover:[&_img]:scale-105 [&_img]:transition-transform [&_img]:duration-500"
        />
        {item.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-chili-500 shadow-sm">
            {item.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-leaf-800">{item.name}</h3>
        <p className="text-sm text-ink/60 mt-1.5 leading-relaxed flex-1">{item.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p>
            <span className="text-lg font-bold text-chili-500">{formatPrice(item.price)}</span>
            {item.unit && <span className="text-xs text-ink/40"> / {item.unit}</span>}
          </p>
          {qty > 0 ? (
            <QtyStepper qty={qty} onChange={(q) => setQty(item.id, q)} />
          ) : (
            <button
              onClick={() => add(item.id)}
              className="inline-flex items-center gap-1.5 rounded-full bg-leaf-500 text-white px-4 py-2 text-sm font-semibold hover:bg-leaf-600 active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              Thêm
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
