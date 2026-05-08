import Image from 'next/image'
import { Star } from 'lucide-react'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  return (
    <section className="py-20 bg-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-ember text-sm font-semibold tracking-widest uppercase">
            Khách hàng nói gì
          </span>
          <h2 className="section-title mt-2">Đánh giá thật từ khách thật</h2>
          <p className="section-subtitle">Hơn 500 khách hàng đã tin tưởng 2HBread</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-cream-300/40"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-spice text-spice" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-bread-700 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-cream-200 flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-bread-800 text-sm">{t.name}</p>
                  <p className="text-bread-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
