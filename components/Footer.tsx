import Link from 'next/link'
import { Facebook, MapPin, MessageCircle, Phone } from 'lucide-react'
import Logo from './Logo'
import { site } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="bg-leaf-900 text-rice-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-28 md:pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Logo light />
            <p className="mt-4 text-rice-200/70 text-sm leading-relaxed max-w-xs">
              Bún thịt nướng & bánh lọc Huế – hương vị miền Trung nấu mới mỗi ngày.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Khám phá</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#thuc-don" className="text-rice-200/70 hover:text-turmeric transition-colors">Thực đơn</Link></li>
              <li><Link href="/gioi-thieu" className="text-rice-200/70 hover:text-turmeric transition-colors">Câu chuyện của chúng tôi</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Đặt món & liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-turmeric mt-0.5 flex-shrink-0" />
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-rice-200/70 hover:text-turmeric transition-colors">
                  {site.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-turmeric" />
                <span className="text-rice-200/70">
                  {site.phoneDisplay} (<a href={`tel:${site.phone}`} className="hover:text-turmeric underline-offset-2 hover:underline">gọi</a>)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-turmeric" />
                <a href={site.zaloUrl} target="_blank" rel="noopener noreferrer" className="text-rice-200/70 hover:text-turmeric transition-colors">
                  Chat Zalo
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Facebook className="w-4 h-4 text-turmeric" />
                <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-rice-200/70 hover:text-turmeric transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-leaf-700 mt-10 pt-6 text-xs text-rice-200/50">
          © {new Date().getFullYear()} {site.name}. Hương vị miền Trung.
        </div>
      </div>
    </footer>
  )
}
