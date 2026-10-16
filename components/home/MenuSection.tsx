'use client'

import { useState } from 'react'
import { categories, menu } from '@/data/menu'
import MenuCard from './MenuCard'
import ShipPromo from '@/components/ShipPromo'

export default function MenuSection() {
  const [active, setActive] = useState(categories[0])
  const items = active === categories[0] ? menu : menu.filter((m) => m.category === active)

  return (
    <section id="thuc-don" className="py-14 sm:py-20 bg-rice-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Thực đơn</span>
          <h2 className="section-title mt-2">Món ngon miền Trung, nấu mới mỗi ngày</h2>
          <p className="section-subtitle">
            Chọn món, thêm vào giỏ và gửi đơn cho quán qua Zalo – quán gọi lại xác nhận ngay.
          </p>
        </div>

        <div className="mt-10">
          <ShipPromo />
        </div>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition ${
                active === c
                  ? 'bg-leaf-600 text-white shadow-md'
                  : 'bg-white text-leaf-700 ring-1 ring-rice-300 hover:ring-leaf-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
