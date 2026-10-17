import Link from 'next/link'
import { Leaf, Truck } from 'lucide-react'
import { menu } from '@/data/menu'
import DishImage from '@/components/DishImage'
import OpenStatus from '@/components/OpenStatus'
import { formatPrice } from '@/lib/format'

export default function Hero() {
  const featured = menu.filter((m) => m.featured).slice(0, 2)

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full leaf-pattern opacity-60 blur-[1px]" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-turmeric/10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="animate-fade-in-up">
          <span className="eyebrow">Đặc sản miền Trung</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-leaf-800 leading-[1.1] mt-3 text-balance">
            Hương vị miền Trung trong từng <span className="text-chili-500">tô bún</span>, từng chiếc{' '}
            <span className="text-hue-500">bánh lọc</span>
          </h1>
          <p className="mt-5 text-lg text-ink/70 leading-relaxed max-w-lg">
            Bún thịt nướng sốt đậu phộng kiểu Lao Bảo, bánh lọc Huế dai trong và bánh mì giòn rụm – nấu mới
            mỗi ngày tại Sài Gòn, đặt món nhanh qua Zalo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#thuc-don" className="btn-primary">
              Xem thực đơn & đặt món
            </Link>
            <Link href="/gioi-thieu" className="btn-outline">
              Câu chuyện của chúng tôi
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
            <OpenStatus />
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-leaf-500" /> Nấu mới mỗi ngày
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-chili-500" /> Giảm đến 20.000₫ phí ship
            </span>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 animate-fade-in">
          {featured.map((item, i) => (
            <Link
              key={item.id}
              href="#thuc-don"
              className={`group block bg-white rounded-3xl p-2 shadow-xl ring-1 ring-rice-300/60 hover:-translate-y-1 transition ${
                i === 1 ? 'mt-12' : ''
              }`}
            >
              <DishImage
                src={item.image}
                alt={item.name}
                priority
                sizes="(max-width: 768px) 50vw, 25vw"
                className="aspect-[3/4] rounded-2xl"
              />
              <div className="px-2 pt-3 pb-1">
                <p className="font-display font-bold text-leaf-800 leading-tight">{item.name}</p>
                <p className="text-sm font-semibold text-chili-500 mt-0.5">{formatPrice(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
