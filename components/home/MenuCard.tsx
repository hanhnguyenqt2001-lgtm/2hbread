'use client'

import { Plus } from 'lucide-react'
import type { MenuItem } from '@/data/menu'
import { useCart } from '@/components/cart/CartProvider'
import QtyStepper from '@/components/cart/QtyStepper'
import DishImage from '@/components/DishImage'
import { formatPrice } from '@/lib/format'

// Phone: compact row (small photo left, info + order right) so more dishes fit on screen.
// sm and up: vertical card with a large photo.
export default function MenuCard({ item }: { item: MenuItem }) {
  const { qtyOf, add, setQty } = useCart()
  const qty = qtyOf(item.id)

  return (
    <article className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm ring-1 ring-rice-300/60 hover:shadow-xl transition-all duration-300 flex sm:flex-col">
      <div className="relative w-28 flex-shrink-0 self-stretch sm:w-auto sm:self-auto">
        <DishImage
          src={item.image}
          alt={item.name}
          sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, 33vw"
          className="h-full min-h-[7rem] sm:h-auto sm:min-h-0 sm:aspect-[4/3] group-hover:[&_img]:scale-105 [&_img]:transition-transform [&_img]:duration-500"
        />
        {item.badge && (
          <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 max-w-[calc(100%-0.75rem)] truncate rounded-full bg-white/95 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-chili-500 shadow-sm">
            {item.badge}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-1 min-w-0">
        <h3 className="font-display text-base sm:text-xl font-bold text-leaf-800 leading-snug">{item.name}</h3>
        <p className="text-xs sm:text-sm text-ink/60 mt-1 sm:mt-1.5 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-none">
          {item.description}
        </p>

        <div className="mt-2 sm:mt-4 flex items-center justify-between gap-2">
          <p className="min-w-0">
            <span className="text-base sm:text-lg font-bold text-chili-500">{formatPrice(item.price)}</span>
            {item.unit && <span className="text-[11px] sm:text-xs text-ink/40"> / {item.unit}</span>}
          </p>
          {qty > 0 ? (
            <QtyStepper size="sm" qty={qty} onChange={(q) => setQty(item.id, q)} />
          ) : (
            <button
              onClick={() => add(item.id)}
              className="flex-shrink-0 inline-flex items-center gap-1 rounded-full bg-leaf-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-leaf-600 active:scale-95 transition"
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
