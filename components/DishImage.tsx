import Image from 'next/image'
import { Soup } from 'lucide-react'

// Shows the dish photo, or a banana-leaf placeholder until real photos are added.
export default function DishImage({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, 33vw',
  className = '',
  priority,
}: {
  src?: string
  alt: string
  sizes?: string
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="leaf-pattern absolute inset-0 flex flex-col items-center justify-center gap-2 text-leaf-500/70">
          <Soup className="w-10 h-10" strokeWidth={1.4} />
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Ảnh đang cập nhật</span>
        </div>
      )}
    </div>
  )
}
