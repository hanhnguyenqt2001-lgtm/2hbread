import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/cart/CartProvider'
import CartDrawer from '@/components/cart/CartDrawer'
import CartBar from '@/components/cart/CartBar'
import { site } from '@/lib/site'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
})

const description =
  '2hFood – bún thịt nướng nước lèo sốt đậu phộng kiểu Lao Bảo (Quảng Trị) và bánh bột lọc Huế, nấu mới mỗi ngày tại Sài Gòn. Đặt món nhanh qua Zalo.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: '2hFood – Bún Thịt Nướng & Bánh Lọc Huế',
    template: '%s | 2hFood',
  },
  description,
  keywords: ['bún thịt nướng', 'bánh lọc Huế', 'món Huế', 'đặc sản miền Trung', '2hFood', 'đặt món Zalo'],
  openGraph: {
    title: '2hFood – Bún Thịt Nướng & Bánh Lọc Huế',
    description,
    url: site.url,
    siteName: site.name,
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2hFood – Bún Thịt Nướng & Bánh Lọc Huế',
    description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartBar />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
