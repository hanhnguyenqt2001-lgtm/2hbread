import { ClipboardList, MessageCircle, PhoneCall } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'Chọn món',
    text: 'Thêm món yêu thích vào giỏ, chỉnh số lượng tuỳ ý.',
  },
  {
    icon: MessageCircle,
    title: 'Gửi đơn',
    text: 'Điền tên, số điện thoại rồi bấm Đặt món – đơn được gửi thẳng đến quán, kèm mã đơn hàng.',
  },
  {
    icon: PhoneCall,
    title: 'Quán xác nhận & giao',
    text: 'Quán gọi lại xác nhận đơn, báo phí giao (nếu có) và giao món nóng hổi đến bạn.',
  },
]

export default function HowToOrder() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <span className="eyebrow">Đặt món dễ dàng</span>
          <h2 className="section-title mt-2">3 bước là có món ngon</h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative bg-white rounded-3xl p-6 ring-1 ring-rice-300/60">
              <span className="absolute top-5 right-6 font-display text-5xl font-bold text-rice-200">
                {i + 1}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-leaf-50 text-leaf-500 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 font-semibold text-lg text-leaf-800">{title}</h3>
              <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
