import { MapPin, Truck } from 'lucide-react'
import { shipTiers } from '@/lib/shipping'
import { formatPrice } from '@/lib/format'
import { site } from '@/lib/site'

export default function ShipPromo() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-chili-500 text-white p-5 sm:p-6 shadow-lg">
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-turmeric/30" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-turmeric">Ưu đãi phí ship</p>
            <p className="font-display text-xl font-bold leading-tight">Đặt càng nhiều, ship càng rẻ</p>
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 md:ml-auto">
          {shipTiers.map((t) => (
            <li key={t.minTotal} className="rounded-2xl bg-white text-ink px-4 py-2.5 text-sm">
              Đơn từ <b>{formatPrice(t.minTotal)}</b>
              <span className="block font-bold text-chili-500">Giảm {formatPrice(t.discount)} phí ship</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="relative mt-4 flex items-start gap-1.5 text-xs text-white/80">
        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        Quán giao từ {site.address}
      </p>
    </div>
  )
}
