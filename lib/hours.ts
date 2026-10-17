// Opening hours in Vietnam time (UTC+7, no DST). Index = day of week, 0 = Chủ nhật.
type Range = [open: string, close: string]

const monToSat: Range[] = [
  ['06:30', '13:30'],
  ['15:00', '19:00'],
]

export const openingHours: Range[][] = [
  [['06:30', '13:30']], // Chủ nhật
  monToSat,
  monToSat,
  monToSat,
  monToSat,
  monToSat,
  monToSat,
]

export const hoursSummary = [
  { days: 'Thứ 2 – Thứ 7', times: ['6:30 – 13:30', '15:00 – 19:00'] },
  { days: 'Chủ nhật', times: ['6:30 – 13:30'] },
]

const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
const display = (t: string) => t.replace(/^0/, '')

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensWhen: string }

export function getOpenStatus(now = new Date()): OpenStatus {
  const vn = new Date(now.getTime() + 7 * 3600 * 1000)
  const day = vn.getUTCDay()
  const minutes = vn.getUTCHours() * 60 + vn.getUTCMinutes()

  for (const [open, close] of openingHours[day]) {
    if (minutes >= toMinutes(open) && minutes < toMinutes(close)) {
      return { open: true, closesAt: display(close) }
    }
  }
  for (let offset = 0; offset < 7; offset++) {
    const d = (day + offset) % 7
    for (const [open] of openingHours[d]) {
      if (offset === 0 && toMinutes(open) <= minutes) continue
      const opensWhen = offset === 0 ? 'hôm nay' : offset === 1 ? 'sáng mai' : dayNames[d]
      return { open: false, opensAt: display(open), opensWhen }
    }
  }
  return { open: false, opensAt: '', opensWhen: '' }
}
