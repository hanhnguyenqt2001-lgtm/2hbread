'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, X } from 'lucide-react'

export default function FloatingChat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat options */}
      <div
        className={`flex flex-col gap-2.5 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Zalo */}
        <Link
          href="https://zalo.me/0971374225"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-white shadow-xl rounded-2xl px-4 py-2.5 hover:-translate-x-1 transition-transform duration-150 group border border-gray-100"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0068FF] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 48 48" className="w-5 h-5 fill-white">
              <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm7.5 28.5h-15c-.83 0-1.5-.67-1.5-1.5V17c0-.83.67-1.5 1.5-1.5h15c.83 0 1.5.67 1.5 1.5v14c0 .83-.67 1.5-1.5 1.5z" />
              <path d="M20 21h8v2h-8zm0 4h5v2h-5z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Chat Zalo</p>
            <p className="text-[10px] text-gray-500">Trả lời trong 5 phút</p>
          </div>
        </Link>

        {/* Messenger */}
        <Link
          href="https://www.facebook.com/hanh.nguyen.782489/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-white shadow-xl rounded-2xl px-4 py-2.5 hover:-translate-x-1 transition-transform duration-150 group border border-gray-100"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9B59B6] to-[#3498DB] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.131 3.26 5.887-3.26-6.559 6.863z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Messenger</p>
            <p className="text-[10px] text-gray-500">Chat ngay</p>
          </div>
        </Link>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-ember shadow-2xl flex items-center justify-center text-white hover:bg-[#A33309] transition-all duration-200 active:scale-90 hover:scale-105"
        aria-label="Chat với 2HBread"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        {!open && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
        )}
      </button>
    </div>
  )
}
