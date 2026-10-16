import { formatPrice } from './format'
import { site } from './site'
import { shipDiscountFor } from './shipping'
import type { CartLine } from '@/components/cart/CartProvider'

export interface Customer {
  name: string
  phone: string
  address: string
  note: string
}

export function normalizePhone(phone: string) {
  return phone.replace(/[\s.\-()]/g, '')
}

// Vietnamese mobile numbers: 0xxxxxxxxx or +84xxxxxxxxx
export function isValidPhone(phone: string) {
  return /^(0|\+?84)(3|5|7|8|9)\d{8}$/.test(normalizePhone(phone))
}

export function buildOrderMessage(customer: Customer, lines: CartLine[], total: number) {
  const parts = [
    `ĐƠN HÀNG ${site.name.toUpperCase()}`,
    `Khách hàng: ${customer.name.trim()}`,
    `SĐT: ${normalizePhone(customer.phone)}`,
  ]
  if (customer.address.trim()) parts.push(`Địa chỉ: ${customer.address.trim()}`)
  parts.push('---')
  for (const { item, qty } of lines) {
    parts.push(`• ${item.name} x${qty} – ${formatPrice(item.price * qty)}`)
  }
  parts.push('---', `Tạm tính: ${formatPrice(total)}`)
  const shipDiscount = shipDiscountFor(total)
  if (shipDiscount) parts.push(`Ưu đãi: giảm ${formatPrice(shipDiscount)} phí ship`)
  if (customer.note.trim()) parts.push(`Ghi chú: ${customer.note.trim()}`)
  return parts.join('\n')
}

// Zalo links can't prefill a message, so the order is copied for the customer to paste.
// Both copy paths start synchronously inside the tap, so they still count as a user
// gesture even when the Zalo link navigates away right after.
function copyWithTextarea(text: string) {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.contentEditable = 'true'
    ta.style.position = 'fixed'
    ta.style.top = '0'
    ta.style.opacity = '0'
    ta.style.fontSize = '16px' // stops iOS zooming in on focus
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    ta.setSelectionRange(0, text.length) // iOS ignores select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export function copyText(text: string): Promise<boolean> {
  const fallback = copyWithTextarea(text)
  if (!navigator.clipboard?.writeText || !window.isSecureContext) return Promise.resolve(fallback)
  return navigator.clipboard.writeText(text).then(
    () => true,
    () => fallback,
  )
}
