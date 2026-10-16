import Link from 'next/link'

// Same mark as app/icon.svg (the favicon). Replace both when the real logo arrives.
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="2hFood – Trang chủ">
      <svg viewBox="0 0 64 64" className="w-9 h-9 group-hover:scale-105 transition-transform" aria-hidden>
        <rect width="64" height="64" rx="16" fill="#2F6B3A" />
        <path d="M14 34h36a18 18 0 0 1-36 0z" fill="#FBF5E9" />
        <path d="M24 26c0-4 4-4 4-8M34 26c0-4 4-4 4-8" stroke="#E0A526" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <span className={`font-display font-bold text-xl tracking-tight ${light ? 'text-white' : 'text-leaf-800'}`}>
        2h<span className={light ? 'text-turmeric' : 'text-chili-500'}>Food</span>
      </span>
    </Link>
  )
}
