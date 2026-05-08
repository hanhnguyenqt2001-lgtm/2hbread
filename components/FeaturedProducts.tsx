import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { products } from '@/data/products'

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + '₫'
}

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-ember text-sm font-semibold tracking-widest uppercase">
              Menu nổi bật
            </span>
            <h2 className="section-title mt-2">Sản phẩm được yêu thích</h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-bread-500 hover:text-ember font-semibold text-sm transition-colors group"
          >
            Xem tất cả
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <div key={product.id} className="card group">
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-ember text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-bread-400 font-medium mb-1">{product.category}</p>
                <h3 className="font-display font-semibold text-bread-900 text-base leading-tight mb-1.5">
                  {product.name}
                </h3>
                <p className="text-bread-500 text-xs leading-relaxed line-clamp-2 mb-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-ember text-lg">{formatPrice(product.price)}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/products`}
                    className="flex-1 text-center bg-cream-200 hover:bg-cream-300 text-bread-700 text-xs font-semibold py-2 rounded-full transition-colors"
                  >
                    Chi tiết
                  </Link>
                  <Link
                    href="https://zalo.me/0971374225"
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1 bg-ember hover:bg-[#A33309] text-white text-xs font-semibold py-2 rounded-full transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Đặt hàng
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
