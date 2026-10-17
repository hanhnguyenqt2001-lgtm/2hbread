'use client'

import { useEffect, useState } from 'react'
import { getOpenStatus, type OpenStatus as Status } from '@/lib/hours'

// Computed after mount (server render time ≠ customer's time), refreshed every minute.
export function useOpenStatus() {
  const [status, setStatus] = useState<Status | null>(null)
  useEffect(() => {
    const tick = () => setStatus(getOpenStatus())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])
  return status
}

export default function OpenStatus({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const status = useOpenStatus()
  if (!status) return null

  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${className}`}>
      <span className="relative flex w-2.5 h-2.5">
        {status.open && <span className="absolute inset-0 rounded-full bg-leaf-400 animate-ping opacity-60" />}
        <span className={`relative w-2.5 h-2.5 rounded-full ${status.open ? 'bg-leaf-400' : 'bg-chili-400'}`} />
      </span>
      <span className={dark ? 'text-rice-100' : 'text-ink/80'}>
        {status.open ? (
          <>
            <b className={dark ? 'text-white' : 'text-leaf-600'}>Đang mở cửa</b> · đóng lúc {status.closesAt}
          </>
        ) : (
          <>
            <b className={dark ? 'text-white' : 'text-chili-500'}>Đã đóng cửa</b> · mở lại {status.opensAt}{' '}
            {status.opensWhen}
          </>
        )}
      </span>
    </span>
  )
}
