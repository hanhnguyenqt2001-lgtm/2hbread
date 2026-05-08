import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import FloatingChat from '@/components/FloatingChat'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '2HBread – Bánh Tươi Mỗi Ngày',
  description:
    'Tiệm bánh 2HBread – chuyên cung cấp bánh mì, bánh ngọt cao cấp làm mới mỗi ngày từ nguyên liệu chất lượng. Đặt hàng ngay qua Zalo hoặc Messenger.',
  keywords: ['bánh mì', 'tiệm bánh', '2HBread', 'bánh tươi', 'croissant', 'donut', 'bánh ngọt'],
  authors: [{ name: '2HBread' }],
  openGraph: {
    title: '2HBread – Bánh Tươi Mỗi Ngày',
    description: 'Tiệm bánh cao cấp với bánh làm mới mỗi ngày từ nguyên liệu chất lượng.',
    url: 'https://www.2hbread.com',
    siteName: '2HBread',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: '2HBread – Tiệm Bánh',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2HBread – Bánh Tươi Mỗi Ngày',
    description: 'Tiệm bánh cao cấp với bánh làm mới mỗi ngày từ nguyên liệu chất lượng.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <FloatingChat />
      </body>
    </html>
  )
}
