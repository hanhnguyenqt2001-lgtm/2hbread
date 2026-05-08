'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Search } from 'lucide-react'
import { products, categories } from '@/data/products'
import Footer from '@/components/Footer'

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + '₫'
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [query, setQuery] = useState('')

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'Tất cả' || p.category === activeCategory
    const matchQuery =
      query === '' ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <>
      {/* Hero banner */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-ember text-sm font-semibold tracking-widest uppercase">
            Thực đơn
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-bread-900 mt-2 mb-4">
            Tất cả sản phẩm
          </h1>
          <p className="text-bread-500 text-lg max-w-md mx-auto mb-8">
            Bánh tươi làm mới mỗi sáng – đặt hàng trước 8pm để nhận vào sáng hôm sau.
          </p>

          {/* Search */}
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bread-400" />
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-cream-300 rounded-full text-sm text-bread-800 placeholder-bread-300 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-ember text-white shadow-md'
                    : 'bg-cream-200 text-bread-600 hover:bg-cream-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-bread-400 text-lg">Không tìm thấy sản phẩm phù hợp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-cream-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-cream-300/40 group"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-ember text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.badge}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-bread-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display font-bold text-bread-900 text-lg leading-tight mb-2">
                      {product.name}
                    </h3>
                    <p className="text-bread-500 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Ingredients */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.ingredients.slice(0, 3).map((ing) => (
                        <span
                          key={ing}
                          className="bg-cream-200 text-bread-600 text-xs px-2 py-0.5 rounded-full"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ember text-xl">
                        {formatPrice(product.price)}
                      </span>
                      <Link
                        href="https://zalo.me/0971374225"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 bg-ember hover:bg-[#A33309] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Đặt hàng
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center bg-cream-200 rounded-3xl p-10">
            <h3 className="font-display text-2xl font-bold text-bread-800 mb-2">
              Không thấy bánh mình muốn?
            </h3>
            <p className="text-bread-500 mb-6">
              Nhắn tin cho chúng tôi – có thể làm theo yêu cầu!
            </p>
            <Link
              href="https://zalo.me/0971374225"
              target="_blank"
              className="btn-primary inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Nhắn tin tư vấn
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
