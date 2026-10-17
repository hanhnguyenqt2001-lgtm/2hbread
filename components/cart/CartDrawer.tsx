'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, Copy, Loader2, MessageCircle, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import { nextShipTier, shipDiscountFor } from '@/lib/shipping'
import { useCart } from './CartProvider'
import QtyStepper from './QtyStepper'
import { useOpenStatus } from '@/components/OpenStatus'
import { formatPrice } from '@/lib/format'
import { site } from '@/lib/site'
import { buildOrderMessage, copyText, isValidPhone, type Customer } from '@/lib/order'

type Errors = Partial<Record<'name' | 'phone', string>>

const emptyCustomer: Customer = { name: '', phone: '', address: '', note: '' }

export default function CartDrawer() {
  const { lines, total, isOpen, close, setQty, clear } = useCart()
  const [customer, setCustomer] = useState<Customer>(emptyCustomer)
  const [errors, setErrors] = useState<Errors>({})
  const openStatus = useOpenStatus()
  const [sending, setSending] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  // Set only when sending to the shop failed: the customer falls back to sending it via Zalo.
  const [message, setMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Closing the drawer after a successful order resets it for the next order.
  useEffect(() => {
    if (!isOpen && orderId) {
      setOrderId(null)
      setCustomer(emptyCustomer)
    }
  }, [isOpen, orderId])

  function update(field: keyof Customer, value: string) {
    setCustomer((c) => ({ ...c, [field]: value }))
    if (field in errors) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    const next: Errors = {}
    if (!customer.name.trim()) next.name = 'Vui lòng nhập tên của bạn'
    if (!isValidPhone(customer.phone)) next.phone = 'Số điện thoại chưa đúng (VD: 0901 234 567)'
    setErrors(next)
    if (Object.keys(next).length) return

    setSending(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: lines.map(({ item, qty }) => ({ id: item.id, qty })),
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`)
      setOrderId(data.orderId)
      clear()
    } catch {
      // Never lose the order: let the customer send it to the shop via Zalo instead.
      setMessage(buildOrderMessage(customer, lines, total))
      setCopied(null)
    } finally {
      setSending(false)
    }
  }

  // Runs in the Zalo link's onClick, so the copy happens in the same tap that opens Zalo.
  function copyMessage() {
    if (message) copyText(message).then(setCopied)
  }

  function startOver() {
    clear()
    setMessage(null)
    setCopied(null)
    setOrderId(null)
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
            {orderId ? 'Đặt món thành công' : message ? 'Gửi đơn qua Zalo' : 'Giỏ hàng của bạn'}
          </h2>
          <button
            onClick={close}
            className="p-2 -mr-2 rounded-full text-ink/60 hover:bg-rice-200 hover:text-ink transition"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {orderId ? (
          <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-leaf-50 text-leaf-500 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-leaf-800">Cảm ơn {customer.name.trim()}!</h3>
            <p className="mt-2 text-ink/70 leading-relaxed">
              Quán đã nhận đơn của bạn và sẽ gọi đến số <b>{customer.phone.trim()}</b> để xác nhận và báo phí
              ship trong ít phút.
            </p>
            <p className="mt-5 rounded-2xl bg-white ring-1 ring-rice-300 px-5 py-3 text-sm text-ink/60">
              Mã đơn hàng
              <span className="block font-mono text-lg font-bold text-chili-500 tracking-wide">{orderId}</span>
            </p>
            <div className="mt-8 w-full space-y-3">
              <button onClick={startOver} className="btn-primary w-full !py-3.5">
                Xong
              </button>
              <a
                href={site.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full"
              >
                <MessageCircle className="w-4 h-4" />
                Cần đổi món? Nhắn Zalo cho quán
              </a>
            </div>
          </div>
        ) : message ? (
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
            <p className="flex gap-2.5 rounded-2xl bg-turmeric/15 px-4 py-3 text-sm text-ink/80 leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-turmeric flex-shrink-0 mt-0.5" />
              <span>
                Chưa gửi được đơn tự động. Bạn vui lòng <b>gửi đơn qua Zalo</b> theo 3 bước dưới đây – quán vẫn
                nhận đơn bình thường.
              </span>
            </p>
            <ol className="space-y-3 rounded-2xl bg-leaf-50 border border-leaf-100 p-4 text-sm text-ink/80 leading-relaxed">
              {[
                <>Bấm nút <b>“Sao chép đơn & mở Zalo”</b> bên dưới.</>,
                <>Trong khung chat Zalo của quán, <b>nhấn giữ ô nhập tin nhắn → chọn Dán</b>.</>,
                <>Bấm <b>Gửi</b>. Quán sẽ gọi lại xác nhận trong ít phút.</>,
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-leaf-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <a
              href={site.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyMessage}
              className="btn-primary w-full !py-3.5 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Sao chép đơn & mở Zalo
            </a>

            {copied === true && (
              <p className="flex items-center gap-1.5 text-sm text-leaf-600">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Đã sao chép đơn hàng – giờ chỉ cần dán vào Zalo và gửi.
              </p>
            )}
            {copied === false && (
              <p className="text-sm text-chili-500">
                Máy không cho sao chép tự động. Hãy nhấn giữ vào nội dung đơn bên dưới → Chọn tất cả →
                Sao chép, rồi dán vào Zalo.
              </p>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-ink/70">Nội dung đơn hàng</span>
                <button
                  onClick={copyMessage}
                  className="inline-flex items-center gap-1 text-xs font-medium text-leaf-600 hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Đã chép' : 'Chỉ sao chép'}
                </button>
              </div>
              <textarea
                readOnly
                value={message}
                rows={Math.min(14, message.split('\n').length + 1)}
                onFocus={(e) => e.currentTarget.select()}
                className="input font-mono text-xs leading-relaxed resize-none"
              />
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
              {openStatus && !openStatus.open && (
                <p className="rounded-2xl bg-turmeric/15 px-3.5 py-2.5 text-xs text-ink/80">
                  Quán đang đóng cửa. Bạn vẫn có thể đặt trước – quán sẽ xác nhận khi mở cửa lúc{' '}
                  <b>
                    {openStatus.opensAt} {openStatus.opensWhen}
                  </b>
                  .
                </p>
              )}
              <ShipProgress total={total} />
              <div className="flex items-center justify-between">
                <span className="text-ink/60 text-sm">Tạm tính</span>
                <span className="text-lg font-bold text-chili-500">{formatPrice(total)}</span>
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full !py-3.5 text-base">
                {sending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang gửi đơn…
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Đặt món
                  </>
                )}
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
