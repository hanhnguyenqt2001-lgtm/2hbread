import type { Metadata } from 'next'
import Link from 'next/link'
import { HandHeart, Leaf, MapPin } from 'lucide-react'
import { site } from '@/lib/site'
import DishImage from '@/components/DishImage'
import { menu } from '@/data/menu'

// Story from the shop owner: Lao Bảo (Quảng Trị) bún thịt nướng + Huế bánh bột lọc, brought to Sài Gòn.

export const metadata: Metadata = {
  title: 'Câu chuyện của chúng tôi',
  description:
    'Câu chuyện 2hFood – bún thịt nướng nước lèo sốt đậu phộng Lao Bảo và bánh bột lọc Huế, mang vào Sài Gòn để lan toả hương vị quê nhà.',
}

const stories = [
  {
    dishId: 'bun-thit-nuong-sot-dau-phong',
    eyebrow: 'Lao Bảo · Quảng Trị',
    title: 'Bún thịt nướng nước lèo sốt đậu phộng',
    paragraphs: [
      'Khác với bún thịt nướng chấm nước mắm quen thuộc, ở vùng núi Lao Bảo (Quảng Trị), bún thịt nướng được chan nước lèo sốt đậu phộng sánh mịn, béo bùi.',
      'Một tô bún giản dị nhưng mang đậm dấu ấn của miền núi biên giới – hương vị mà người con Quảng Trị nào đi xa cũng nhớ.',
    ],
  },
  {
    dishId: 'banh-loc-hue',
    eyebrow: 'Đặc sản Huế',
    title: 'Bánh bột lọc',
    paragraphs: [
      'Bánh bột lọc là món của sự tỉ mỉ: vỏ bột trong veo, dẻo dai, nhân tôm thịt đậm đà, bày trên lá chuối xanh và chấm cùng nước mắm ớt cay nhẹ.',
      'Một món ăn nhỏ nhưng chứa cả nét thanh tao, chỉn chu của người xứ Huế.',
    ],
  },
]

const values = [
  {
    icon: Leaf,
    title: 'Nguyên liệu tươi mỗi sáng',
    text: 'Thịt, rau, tôm được chọn tươi mỗi ngày. Bánh lọc làm tay, nấu mới trong ngày.',
  },
  {
    icon: HandHeart,
    title: 'Nấu như cho người nhà',
    text: 'Nước lèo sốt đậu phộng nấu theo công thức quê nhà, mỗi phần ăn đều được chuẩn bị như bữa cơm gia đình.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="eyebrow">Câu chuyện của chúng tôi</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-leaf-800 mt-3 leading-tight text-balance">
            Mang vị quê nhà miền Trung vào giữa lòng Sài Gòn
          </h1>
          <p className="section-subtitle">
            2hFood được một người con miền Trung mang vào Sài Gòn với mong muốn giản dị: lan toả hương
            vị quê nhà và giới thiệu ẩm thực địa phương đến nhiều người hơn.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-24">
          {stories.map((s, i) => (
            <div key={s.dishId} className="grid gap-8 md:gap-12 md:grid-cols-2 md:items-center">
              <DishImage
                src={menu.find((m) => m.id === s.dishId)?.image}
                alt={s.title}
                className={`aspect-[4/3] rounded-[2rem] shadow-xl ${i % 2 ? 'md:order-2' : ''}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="space-y-4 text-ink/75 leading-relaxed">
                <span className="eyebrow">{s.eyebrow}</span>
                <h2 className="section-title">{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="max-w-3xl mx-auto text-center space-y-4 text-ink/75 leading-relaxed">
            <h2 className="section-title">Từ quê nhà đến Sài Gòn</h2>
            <p>
              Mang hai món ăn ấy vào Sài Gòn, chúng tôi mong những người con miền Trung xa quê tìm lại
              được hương vị thân quen, và bạn bè khắp nơi có dịp biết thêm về ẩm thực địa phương của
              Quảng Trị, của Huế – qua từng tô bún, từng chiếc bánh.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-rice-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <span className="eyebrow">Điều chúng tôi giữ gìn</span>
            <h2 className="section-title mt-2">Làm chậm để giữ trọn vị</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-3xl p-6 ring-1 ring-rice-300/60">
                <div className="w-12 h-12 rounded-2xl bg-hue-100 text-hue-500 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-semibold text-lg text-leaf-800">{title}</h3>
                <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title">Thèm vị miền Trung rồi phải không?</h2>
          <p className="section-subtitle">Chọn món và gửi đơn qua Zalo chỉ trong một phút.</p>
          <p className="mt-4">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-sm text-ink/60 hover:text-leaf-600"
            >
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-chili-500" />
              {site.address}
            </a>
          </p>

          <Link href="/#thuc-don" className="btn-primary mt-8">
            Xem thực đơn & đặt món
          </Link>
        </div>
      </section>
    </>
  )
}
