import type { Product } from '@/entities/api'
import { Button } from '@/shared/ui/Button'

interface ProductCardProps {
  product: Product
  onQuote?: (product: Product) => void
}

export function ProductCard({ product, onQuote }: ProductCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition hover:-translate-y-0.5 hover:border-cyan-500/40">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-medium text-cyan-300">
          {product.category.name}
        </span>
        <span className="text-[11px] text-slate-500">SKU #{product.id.toString().padStart(5, '0')}</span>
      </div>

      <h3 className="mt-3 text-base font-semibold text-white">{product.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-400">{product.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-slate-500">ราคา: ติดต่อเจ้าหน้าที่</p>
        <Button size="sm" onClick={() => onQuote?.(product)}>
          ขอใบเสนอราคา
        </Button>
      </div>
    </article>
  )
}
