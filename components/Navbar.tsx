'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag } from 'lucide-react'

const links = [
  { href: '/', label: 'Trang chủ' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '/contact', label: 'Liên hệ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-100/95 backdrop-blur-md shadow-sm border-b border-bread-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-bread-500 flex items-center justify-center shadow-sm group-hover:bg-ember transition-colors duration-200">
            <ShoppingBag className="w-5 h-5 text-cream-100" />
          </div>
          <span className="font-display font-bold text-xl text-bread-800 tracking-tight">
            2H<span className="text-ember">Bread</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-bread-600 hover:text-ember font-medium text-sm transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-ember group-hover:w-full transition-all duration-200 rounded-full" />
            </Link>
          ))}
          <Link
            href="https://zalo.me/0971374225"
            target="_blank"
            className="btn-primary !py-2 !px-5 text-xs"
          >
            Đặt hàng ngay
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-bread-700 hover:text-ember transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-cream-100/98 backdrop-blur-md border-t border-bread-100`}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 px-3 text-bread-700 font-medium text-sm rounded-xl hover:bg-cream-300 hover:text-ember transition-all duration-150"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="https://zalo.me/0971374225"
            target="_blank"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 text-center"
          >
            Đặt hàng ngay
          </Link>
        </nav>
      </div>
    </header>
  )
}
