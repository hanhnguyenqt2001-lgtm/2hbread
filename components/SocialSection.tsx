import Link from 'next/link'

const socials = [
  {
    name: 'Zalo',
    href: 'https://zalo.me/0971374225',
    color: 'bg-[#0068FF] hover:bg-[#0055CC]',
    icon: (
      <svg viewBox="0 0 48 48" className="w-6 h-6 fill-white">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm7.5 28.5h-15c-.83 0-1.5-.67-1.5-1.5V17c0-.83.67-1.5 1.5-1.5h15c.83 0 1.5.67 1.5 1.5v14c0 .83-.67 1.5-1.5 1.5z" />
        <path d="M20 21h8v2h-8zm0 4h5v2h-5z" />
      </svg>
    ),
    label: 'Chat Zalo',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/hanh.nguyen.782489/',
    color: 'bg-[#1877F2] hover:bg-[#1560BD]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: 'Facebook',
  },
  {
    name: 'Messenger',
    href: 'https://www.facebook.com/hanh.nguyen.782489/',
    color: 'bg-gradient-to-br from-[#9B59B6] to-[#3498DB] hover:from-[#8E44AD] hover:to-[#2980B9]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.131 3.26 5.887-3.26-6.559 6.863z" />
      </svg>
    ),
    label: 'Messenger',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@2hbread',
    color: 'bg-[#010101] hover:bg-[#333]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z" />
      </svg>
    ),
    label: 'TikTok',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/2hbread',
    color: 'bg-gradient-to-br from-[#FCAF45] via-[#E1306C] to-[#833AB4] hover:opacity-90',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: 'Instagram',
  },
]

export default function SocialSection() {
  return (
    <section className="py-20 bg-bread-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-spice text-sm font-semibold tracking-widest uppercase">
          Kết nối với chúng tôi
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Theo dõi 2HBread
        </h2>
        <p className="text-bread-200 text-lg mb-10 max-w-md mx-auto">
          Cập nhật menu mới, khuyến mãi và hậu trường làm bánh mỗi ngày
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {socials.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 ${s.color} text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95`}
            >
              {s.icon}
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
