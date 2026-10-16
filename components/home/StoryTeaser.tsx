import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function StoryTeaser() {
  return (
    <section className="pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-leaf-700 text-rice-100 px-6 py-12 sm:px-12 md:py-16">
          <div className="absolute inset-0 leaf-pattern opacity-[0.07]" />
          <div className="relative max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-turmeric">
              Câu chuyện 2hFood
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">
              Mang vị quê nhà miền Trung đến bàn ăn của bạn
            </h2>
            <p className="mt-4 text-rice-200/90 leading-relaxed">
              Một người con miền Trung mang bún thịt nướng nước lèo sốt đậu phộng của Lao Bảo (Quảng
              Trị) và bánh bột lọc Huế vào Sài Gòn – để lan toả hương vị quê nhà và giới thiệu ẩm thực
              địa phương đến nhiều người hơn.
            </p>
            <Link
              href="/gioi-thieu"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white text-leaf-700 px-6 py-3 text-sm font-semibold hover:bg-rice-100 transition"
            >
              Đọc câu chuyện <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
