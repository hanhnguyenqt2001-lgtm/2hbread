'use client'

import { Minus, Plus } from 'lucide-react'

export default function QtyStepper({
  qty,
  onChange,
  size = 'md',
}: {
  qty: number
  onChange: (qty: number) => void
  size?: 'sm' | 'md'
}) {
  const btn = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-leaf-50 border border-leaf-100 p-0.5">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        className={`${btn} rounded-full flex items-center justify-center text-leaf-600 hover:bg-white transition`}
        aria-label="Giảm số lượng"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="min-w-[1.75rem] text-center text-sm font-semibold text-ink tabular-nums">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        className={`${btn} rounded-full flex items-center justify-center bg-leaf-500 text-white hover:bg-leaf-600 transition`}
        aria-label="Tăng số lượng"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
