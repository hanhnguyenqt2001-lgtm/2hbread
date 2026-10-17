import { Clock, ExternalLink, MapPin, Navigation, PenLine, Star } from 'lucide-react'
import OpenStatus from '@/components/OpenStatus'
import { hoursSummary } from '@/lib/hours'
import { site } from '@/lib/site'
import { reviews } from '@/data/reviews'

function Stars({ rating, className = 'w-4 h-4' }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-turmeric" aria-label={`${rating} sao`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} ${i < rating ? 'fill-current' : 'opacity-30'}`} />
      ))}
    </span>
  )
}

export default function VisitSection() {
  return (
    <section id="ghe-quan" className="py-14 sm:py-20 bg-rice-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Ghé quán</span>
          <h2 className="section-title mt-2">Địa chỉ & giờ mở cửa</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-2 bg-white rounded-3xl p-6 ring-1 ring-rice-300/60 flex flex-col">
            <h3 className="font-display text-2xl font-bold text-leaf-800">{site.name}</h3>
            <OpenStatus className="mt-2" />

            <p className="mt-5 flex items-start gap-2.5 text-sm text-ink/80">
              <MapPin className="w-4 h-4 mt-0.5 text-chili-500 flex-shrink-0" />
              {site.address}
            </p>

            <div className="mt-4 flex items-start gap-2.5 text-sm">
              <Clock className="w-4 h-4 mt-0.5 text-chili-500 flex-shrink-0" />
              <dl className="flex-1 space-y-2">
                {hoursSummary.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt className="font-medium text-ink/80">{h.days}</dt>
                    <dd className="text-right text-ink/70">
                      {h.times.map((t) => (
                        <span key={t} className="block">{t}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
              <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4">
                <Navigation className="w-4 h-4" />
                Chỉ đường
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline !px-4">
                <ExternalLink className="w-4 h-4" />
                Google Maps
              </a>
            </div>
          </div>

          <div className="md:col-span-3 overflow-hidden rounded-3xl ring-1 ring-rice-300/60 bg-rice-200 min-h-[280px] aspect-[4/3] md:aspect-auto">
            <iframe
              src={site.mapEmbedUrl}
              title="Bản đồ đến 2hFood"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-14">
          <div className="text-center">
            <span className="eyebrow">Đánh giá</span>
            <h2 className="section-title mt-2">
              {reviews.length > 0 ? 'Khách nói gì về 2hFood' : '2hFood trên Google'}
            </h2>
          </div>

          {reviews.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <figure key={r.name + r.text.slice(0, 20)} className="bg-white rounded-3xl p-5 ring-1 ring-rice-300/60">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-3 text-sm text-ink/75 leading-relaxed">“{r.text}”</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-leaf-800">
                    {r.name}
                    <span className="block text-xs font-normal text-ink/40">
                      Đánh giá trên Google{r.date && ` · ${r.date}`}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          <div className="mt-8 rounded-3xl bg-leaf-700 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <Stars rating={5} className="w-6 h-6" />
              <p className="mt-3 font-display text-xl sm:text-2xl font-bold leading-snug">
                Đã thưởng thức món của quán?
              </p>
              <p className="mt-1.5 text-rice-200/90 text-sm leading-relaxed">
                Một đánh giá trên Google giúp 2hFood mang hương vị miền Trung đến với nhiều người hơn. Cảm ơn bạn!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={site.googleWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-turmeric text-ink px-6 py-3 text-sm font-semibold hover:brightness-105 transition"
              >
                <PenLine className="w-4 h-4" />
                Viết đánh giá
              </a>
              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                Xem đánh giá trên Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
