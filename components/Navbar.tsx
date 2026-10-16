'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, ShoppingBag, X } from 'lucide-react'
import Logo from './Logo'
import { useCart } from './cart/CartProvider'

const links = [
  { href: '/', label: 'Trang chủ' },
  { href: '/#thuc-don', label: 'Thực đơn' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count, open: openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cartButton = (
    <button
      onClick={() => {
        setOpen(false)
        openCart()
      }}
      className="relative p-2.5 rounded-full bg-leaf-500 text-white hover:bg-leaf-600 transition"
      aria-label={`Giỏ hàng (${count} món)`}
    >
      <ShoppingBag className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 rounded-full bg-chili-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-rice-100">
          {count}
        </span>
      )}
    </button>
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-rice-100/95 backdrop-blur-md shadow-sm border-b border-rice-300' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink/70 hover:text-chili-500 font-medium text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {cartButton}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          {cartButton}
          <button
            className="p-2 text-leaf-700"
            onClick={() => setOpen(!open)}
            aria-label="Mở menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}
      >
        <nav className="px-4 pb-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 px-3 text-ink/80 font-medium rounded-xl hover:bg-rice-200 transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
