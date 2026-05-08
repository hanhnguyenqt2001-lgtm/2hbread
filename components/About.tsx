import { Wheat, Clock, Star, Truck } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Làm mới mỗi sáng',
    desc: 'Tất cả bánh được nướng tươi mỗi ngày từ 5 giờ sáng, đảm bảo độ giòn và hương vị tốt nhất.',
  },
  {
    icon: Wheat,
    title: 'Nguyên liệu cao cấp',
    desc: 'Bơ Pháp, bột mì nhập khẩu, không phẩm màu – chúng tôi chỉ chọn những gì tốt nhất.',
  },
  {
    icon: Truck,
    title: 'Giao hàng nhanh',
    desc: 'Giao tận nơi trong vòng 2 tiếng tại khu vực nội thành. Đặt trước để đảm bảo có bánh.',
  },
  {
    icon: Star,
    title: 'Chất lượng đảm bảo',
    desc: 'Hơn 500 khách hàng tin tưởng. Bánh không ngon – hoàn tiền 100% không hỏi thêm.',
  },
]

export default function About() {
  return (
    <section className="py-20 bg-cream-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="text-ember text-sm font-semibold tracking-widest uppercase">
              Về chúng tôi
            </span>
            <h2 className="section-title mt-2">
              Câu chuyện của<br />
              <span className="text-ember">2HBread</span>
            </h2>
            <p className="text-bread-600 leading-relaxed mt-4">
              2HBread được thành lập bởi hai người bạn yêu bánh – với mong muốn mang đến những
              chiếc bánh tươi ngon, chất lượng cao nhưng giá thành hợp lý cho người Việt.
            </p>
            <p className="text-bread-600 leading-relaxed mt-3">
              Chúng tôi tin rằng một chiếc bánh ngon không chỉ là thực phẩm – đó là khoảnh khắc
              hạnh phúc trong ngày của bạn. Vì vậy, mỗi chiếc bánh đều được làm với sự tâm huyết
              và tình yêu thật sự.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 border border-cream-300/60"
              >
                <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5 text-ember" />
                </div>
                <h3 className="font-display font-semibold text-bread-800 text-base mb-1.5">
                  {f.title}
                </h3>
                <p className="text-bread-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
