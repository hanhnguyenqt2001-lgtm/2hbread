import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bread-900 text-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="2HBread Logo"
                width={40}
                height={40}
                className="rounded-lg object-contain"
              />
              <span className="font-display font-bold text-xl text-white">
                2H<span className="text-spice">Bread</span>
              </span>
            </Link>
            <p className="text-bread-300 text-sm leading-relaxed max-w-xs">
              Tiệm bánh tươi cao cấp – nơi mỗi chiếc bánh đều được làm với tình yêu và nguyên
              liệu tốt nhất.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Khám phá</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Trang chủ' },
                { href: '/products', label: 'Sản phẩm' },
                { href: '/contact', label: 'Liên hệ' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-bread-300 hover:text-spice text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-spice mt-0.5 flex-shrink-0" />
                <span className="text-bread-300 text-sm">
                  123 Đường Bánh Ngọt, Phường 5,<br />Quận 3, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-spice flex-shrink-0" />
                <a
                  href="tel:0971374225"
                  className="text-bread-300 hover:text-spice text-sm transition-colors"
                >
                  0971 374 225
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-spice flex-shrink-0" />
                <a
                  href="mailto:hello@2hbread.com"
                  className="text-bread-300 hover:text-spice text-sm transition-colors"
                >
                  hello@2hbread.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-bread-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-bread-400 text-xs">
            © {new Date().getFullYear()} 2HBread. All rights reserved.
          </p>
          <p className="text-bread-500 text-xs">
            Làm với ❤️ tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  )
}
