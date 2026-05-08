import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, ShoppingCart, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=1920&q=85&auto=format&fit=crop"
          alt="2HBread bakery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bread-900/80 via-bread-800/60 to-bread-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bread-900/60 via-transparent to-transparent" />
      </div>

      {/* Decorative blur blobs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-spice/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-ember/10 rounded-full blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-spice animate-pulse" />
            <span className="text-cream-100 text-xs font-medium tracking-wide uppercase">
              Mới ra lò mỗi sáng
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 text-balance">
            Bánh Tươi{' '}
            <span className="text-spice">Mỗi Ngày</span>
          </h1>

          <p className="text-cream-200 text-lg leading-relaxed mb-8 max-w-md">
            Từ nguyên liệu chất lượng cao, được làm mới mỗi sáng — 2HBread mang đến hương vị
            thật sự, không chất bảo quản.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-ember hover:bg-[#A33309] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-ember/30 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              Đặt hàng ngay
            </Link>
            <Link
              href="https://zalo.me/0971374225"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Chat ngay
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { value: '500+', label: 'Khách hàng' },
              { value: '20+', label: 'Loại bánh' },
              { value: '5★', label: 'Đánh giá' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-cream-300 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-cream-300/70 text-xs">Cuộn xuống</span>
        <ChevronDown className="w-4 h-4 text-cream-300/70 animate-bounce" />
      </div>
    </section>
  )
}
