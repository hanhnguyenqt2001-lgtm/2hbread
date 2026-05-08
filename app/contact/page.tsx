'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1000)
  }

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-ember text-sm font-semibold tracking-widest uppercase">
            Liên hệ
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-bread-900 mt-2 mb-4">
            Hãy nói chuyện với chúng tôi
          </h1>
          <p className="text-bread-500 text-lg max-w-md mx-auto">
            Đặt hàng, tư vấn, hay chỉ đơn giản là muốn hỏi về bánh – chúng tôi luôn sẵn sàng!
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-bread-800 mb-6">
                Thông tin liên hệ
              </h2>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-ember" />
                  </div>
                  <div>
                    <p className="font-semibold text-bread-800 text-sm">Địa chỉ</p>
                    <p className="text-bread-500 text-sm mt-0.5">
                      123 Đường Bánh Ngọt, Phường 5,<br />Quận 3, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-ember" />
                  </div>
                  <div>
                    <p className="font-semibold text-bread-800 text-sm">Hotline</p>
                    <a
                      href="tel:0971374225"
                      className="text-ember hover:underline text-sm font-medium mt-0.5 block"
                    >
                      0971 374 225
                    </a>
                    <p className="text-bread-400 text-xs mt-0.5">8:00 – 20:00, T2 – CN</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-ember" />
                  </div>
                  <div>
                    <p className="font-semibold text-bread-800 text-sm">Email</p>
                    <a
                      href="mailto:hello@2hbread.com"
                      className="text-ember hover:underline text-sm font-medium mt-0.5 block"
                    >
                      hello@2hbread.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick chat buttons */}
              <div>
                <p className="text-bread-600 font-semibold text-sm mb-3">Liên hệ nhanh qua:</p>
                <div className="flex gap-3">
                  <Link
                    href="https://zalo.me/0971374225"
                    target="_blank"
                    className="flex items-center gap-2 bg-[#0068FF] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <svg viewBox="0 0 48 48" className="w-4 h-4 fill-white">
                      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm7.5 28.5h-15c-.83 0-1.5-.67-1.5-1.5V17c0-.83.67-1.5 1.5-1.5h15c.83 0 1.5.67 1.5 1.5v14c0 .83-.67 1.5-1.5 1.5z" />
                    </svg>
                    Zalo
                  </Link>
                  <a
                    href="tel:0971374225"
                    className="flex items-center gap-2 bg-ember text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#A33309] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Gọi ngay
                  </a>
                </div>
              </div>

              {/* Google Map iframe */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-cream-300 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.268590025617!2d106.69309081528404!3d10.787900561750505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d1a3b%3A0x0!2zMTDCsDQ3JzIwLjQiTiAxMDbCsDQxJzM2LjAiRQ!5e0!3m2!1svi!2svn!4v1620000000000!5m2!1svi!2svn"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ 2HBread"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-bread-800 mb-6">
                Gửi tin nhắn
              </h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-16 bg-cream-100 rounded-2xl">
                  <CheckCircle className="w-14 h-14 text-green-500 mb-4" />
                  <h3 className="font-display text-xl font-bold text-bread-800 mb-2">
                    Đã nhận được tin nhắn!
                  </h3>
                  <p className="text-bread-500 text-sm">
                    Chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', phone: '', message: '' }) }}
                    className="mt-6 text-ember text-sm font-semibold hover:underline"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-bread-700 mb-1.5">
                      Họ và tên <span className="text-ember">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-sm text-bread-800 placeholder-bread-300 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-bread-700 mb-1.5">
                      Số điện thoại <span className="text-ember">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="0971 374 225"
                      className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-sm text-bread-800 placeholder-bread-300 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-bread-700 mb-1.5">
                      Nội dung
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tôi muốn đặt 2 hộp croissant giao lúc 7h sáng..."
                      className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-sm text-bread-800 placeholder-bread-300 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-ember hover:bg-[#A33309] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 active:scale-98"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Gửi tin nhắn
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
