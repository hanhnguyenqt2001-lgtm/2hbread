import { NextResponse } from 'next/server'
import { menu } from '@/data/menu'
import { buildOrderMessage, isValidPhone, normalizePhone, type Customer } from '@/lib/order'
import { shipDiscountFor } from '@/lib/shipping'

// n8n "webhook-test" URLs only accept a call while the workflow editor is listening.
// Set ORDER_WEBHOOK_URL on Vercel (e.g. .../webhook/2h-dat-don) to switch to production.
const WEBHOOK_URL =
  process.env.ORDER_WEBHOOK_URL || 'https://n8n.2hbread.com/webhook-test/2h-dat-don'

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function makeOrderId(now: Date) {
  // Date in Vietnam time (UTC+7), e.g. 2H-261017-K3F9
  const vn = new Date(now.getTime() + 7 * 3600 * 1000).toISOString()
  const ymd = vn.slice(2, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `2H-${ymd}-${rand}`
}

export async function POST(req: Request) {
  let body: { customer?: Record<string, unknown>; items?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const customer: Customer = {
    name: str(body.customer?.name, 100),
    phone: str(body.customer?.phone, 20),
    address: str(body.customer?.address, 300),
    note: str(body.customer?.note, 500),
  }
  if (!customer.name || !isValidPhone(customer.phone)) {
    return NextResponse.json({ ok: false, error: 'invalid_customer' }, { status: 400 })
  }

  // Prices always come from data/menu.ts, never from the browser.
  const lines = (Array.isArray(body.items) ? body.items : [])
    .map((raw) => {
      const item = menu.find((m) => m.id === (raw as { id?: unknown })?.id)
      const qty = Math.floor(Number((raw as { qty?: unknown })?.qty))
      return item && qty > 0 && qty <= 99 ? { item, qty } : null
    })
    .filter((l): l is NonNullable<typeof l> => l !== null)
  if (lines.length === 0) {
    return NextResponse.json({ ok: false, error: 'empty_order' }, { status: 400 })
  }

  const now = new Date()
  const orderId = makeOrderId(now)
  const subtotal = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0)
  const payload = {
    orderId,
    createdAt: now.toISOString(),
    source: 'website',
    customer: { ...customer, phone: normalizePhone(customer.phone) },
    items: lines.map(({ item, qty }) => ({
      id: item.id,
      name: item.name,
      unit: item.unit ?? null,
      qty,
      price: item.price,
      lineTotal: item.price * qty,
    })),
    itemCount: lines.reduce((sum, l) => sum + l.qty, 0),
    subtotal,
    shipDiscount: shipDiscountFor(subtotal),
    message: `Mã đơn: ${orderId}\n` + buildOrderMessage(customer, lines, subtotal),
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) {
      console.error('Order webhook failed', res.status, await res.text().catch(() => ''))
      return NextResponse.json({ ok: false, error: 'webhook_failed' }, { status: 502 })
    }
  } catch (err) {
    console.error('Order webhook error', err)
    return NextResponse.json({ ok: false, error: 'webhook_unreachable' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, orderId })
}
