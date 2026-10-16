'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Copy, MessageCircle, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import { nextShipTier, shipDiscountFor } from '@/lib/shipping'
import { useCart } from './CartProvider'
import QtyStepper from './QtyStepper'
import { formatPrice } from '@/lib/format'
import { site } from '@/lib/site'
import { buildOrderMessage, copyText, isValidPhone, type Customer } from '@/lib/order'

type Errors = Partial<Record<'name' | 'phone', string>>

const emptyCustomer: Customer = { name: '', phone: '', address: '', note: '' }

export default function CartDrawer() {
  const { lines, total, isOpen, close, setQty, clear } = useCart()
  const [customer, setCustomer] = useState<Customer>(emptyCustomer)
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  function update(field: keyof Customer, value: string) {
    setCustomer((c) => ({ ...c, [field]: value }))
    if (field in errors) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: Errors = {}
    if (!customer.name.trim()) next.name = 'Vui lòng nhập tên của bạn'
    if (!isValidPhone(customer.phone)) next.phone = 'Số điện thoại chưa đúng (VD: 0901 234 567)'
    setErrors(next)
    if (Object.keys(next).length) return

    const text = buildOrderMessage(customer, lines, total)
    setMessage(text)
    setCopied(null)
    // Copy starts before opening Zalo so it still runs inside the tap gesture.
    const copying = copyText(text)
    window.open(site.zaloUrl, '_blank', 'noopener,noreferrer')
    copying.then(setCopied)
  }

  function recopy() {
    if (message) copyText(message).then(setCopied)
  }

  function startOver() {
    clear()
    setMessage(null)
    setCopied(null)
    setCustomer(emptyCustomer)
    close()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Giỏ hàng">
      <div className="absolute inset-0 bg-ink/50 animate-fade-in" onClick={close} />

      <aside
        className="absolute right-0 top-0 h-full w-full max-w-md bg-rice-50 shadow-2xl flex flex-col animate-fade-in"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <header
          className="flex items-center justify-between px-5 py-4 border-b border-rice-300"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}
        >
          <h2 className="font-display text-xl font-bold text-leaf-800">
            {message ? 'Gửi đơn qua Zalo' : 'Giỏ hàng của bạn'}
          </h2>
          <button
            onClick={close}
            className="p-2 -mr-2 rounded-full text-ink/60 hover:bg-rice-200 hover:text-ink transition"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {message ? (
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
            <div className="flex gap-3 rounded-2xl bg-leaf-50 border border-leaf-100 p-4">
              <CheckCircle2 className="w-6 h-6 text-leaf-500 flex-shrink-0" />
              <div className="text-sm text-ink/80 leading-relaxed">
                {copied === false ? (
                  <p>
                    Trình duyệt không cho sao chép tự động. Hãy <b>chạm giữ đoạn đơn hàng bên dưới</b> để
                    sao chép, rồi dán vào khung chat Zalo.
                  </p>
                ) : (
                  <p>
                    <b>Đơn hàng đã được sao chép.</b> Trong khung chat Zalo vừa mở, hãy{' '}
                    <b>dán (paste)</b> và bấm <b>Gửi</b>. Quán sẽ gọi lại xác nhận trong ít phút.
                  </p>
                )}
              </div>
            </div>

            <textarea
              readOnly
              value={message}
              rows={Math.min(14, message.split('\n').length + 1)}
              onFocus={(e) => e.currentTarget.select()}
              className="input font-mono text-xs leading-relaxed resize-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <button onClick={recopy} className="btn-outline !px-4">
                <Copy className="w-4 h-4" />
                {copied ? 'Đã chép' : 'Sao chép lại'}
              </button>
              <a href={site.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4">
                <MessageCircle className="w-4 h-4" />
                Mở Zalo
              </a>
            </div>

            <div className="pt-2 flex flex-col items-center gap-2 text-sm">
              <button onClick={() => setMessage(null)} className="text-leaf-600 hover:underline">
                ← Sửa lại đơn
              </button>
              <button onClick={startOver} className="text-ink/50 hover:text-ink">
                Đã gửi xong – xoá giỏ hàng
              </button>
            </div>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center">
            <ShoppingBag className="w-12 h-12 text-leaf-200" />
            <p className="text-ink/60">Giỏ hàng đang trống.</p>
            <button onClick={close} className="btn-outline mt-2">
              Xem thực đơn
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0" noValidate>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-rice-300">
                {lines.map(({ item, qty }) => (
                  <li key={item.id} className="py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-ink truncate">{item.name}</p>
                      <p className="text-xs text-ink/50">
                        {formatPrice(item.price)}
                        {item.unit && ` / ${item.unit}`}
                      </p>
                    </div>
                    <QtyStepper size="sm" qty={qty} onChange={(q) => setQty(item.id, q)} />
                    <button
                      type="button"
                      onClick={() => setQty(item.id, 0)}
                      className="p-1.5 text-ink/30 hover:text-chili-500 transition"
                      aria-label={`Xoá ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-3">
                <h3 className="text-sm font-semibold text-leaf-700">Thông tin nhận món</h3>
                <Field label="Họ tên *" error={errors.name}>
                  <input
                    className="input"
                    value={customer.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Nguyễn Văn A"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Số điện thoại *" error={errors.phone}>
                  <input
                    className="input"
                    type="tel"
                    inputMode="tel"
                    value={customer.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="0901 234 567"
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Địa chỉ giao hàng">
                  <input
                    className="input"
                    value={customer.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="Số nhà, đường, phường…"
                    autoComplete="street-address"
                  />
                </Field>
                <Field label="Ghi chú">
                  <textarea
                    className="input resize-none"
                    rows={2}
                    value={customer.note}
                    onChange={(e) => update('note', e.target.value)}
                    placeholder="Ít cay, không hành, giờ nhận…"
                  />
                </Field>
                <p className="text-xs text-ink/50">
                  Phí ship quán sẽ báo khi xác nhận đơn (đã trừ ưu đãi).
                </p>
              </div>
            </div>

            <footer className="border-t border-rice-300 px-5 py-4 bg-white/60 space-y-3">
              <ShipProgress total={total} />
              <div className="flex items-center justify-between">
                <span className="text-ink/60 text-sm">Tạm tính</span>
                <span className="text-lg font-bold text-chili-500">{formatPrice(total)}</span>
              </div>
              <button type="submit" className="btn-primary w-full !py-3.5 text-base">
                <MessageCircle className="w-5 h-5" />
                Đặt món qua Zalo
              </button>
            </footer>
          </form>
        )}
      </aside>
    </div>
  )
}

function ShipProgress({ total }: { total: number }) {
  const discount = shipDiscountFor(total)
  const next = nextShipTier(total)
  return (
    <div className="rounded-2xl bg-chili-500/10 px-3.5 py-2.5 text-xs text-ink/80">
      <p className="flex items-start gap-2">
        <Truck className="w-4 h-4 text-chili-500 flex-shrink-0" />
        <span>
          {discount > 0 && (
            <>
              Bạn được <b className="text-chili-500">giảm {formatPrice(discount)} phí ship</b>.{' '}
            </>
          )}
          {next ? (
            <>
              Mua thêm <b>{formatPrice(next.minTotal - total)}</b> để được giảm{' '}
              <b>{formatPrice(next.discount)}</b> phí ship.
            </>
          ) : (
            'Đơn đã đạt mức ưu đãi cao nhất.'
          )}
        </span>
      </p>
      {next && (
        <div className="mt-2 h-1.5 rounded-full bg-white overflow-hidden">
          <div
            className="h-full rounded-full bg-chili-500 transition-all duration-300"
            style={{ width: `${Math.min(100, (total / next.minTotal) * 100)}%` }}
          />
        </div>
      )}
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-ink/70 mb-1">{label}</span>
      {children}
      {error && <span className="block text-xs text-chili-500 mt-1">{error}</span>}
    </label>
  )
}
