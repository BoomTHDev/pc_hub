import { useState } from 'react'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { readCategory } from '@/features/categories/api/read-category'
import type { Category } from '@/entities/api'
import { Button } from '@/shared/ui/Button'

export function CategoriesPage() {
  const { data: categories, loading, error, reload } = useCategories()

  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function handleViewDetail(id: number) {
    setMessage(null)

    try {
      const category = await readCategory(id)
      setActiveCategory(category)
    } catch {
      setMessage('ไม่สามารถโหลดรายละเอียดหมวดหมู่ได้ในขณะนี้')
    }
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h1 className="text-xl font-semibold text-white">หมวดหมู่สินค้า</h1>
        <p className="mt-1 text-sm text-slate-400">เลือกชมหมวดหมู่เพื่อดูประเภทสินค้าและรายการแนะนำในแต่ละกลุ่ม</p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">หมวดหมู่ทั้งหมด</h2>
          <Button size="sm" variant="ghost" onClick={() => void reload()}>
            อัปเดตข้อมูล
          </Button>
        </div>

        {loading ? <p className="text-sm text-slate-400">กำลังโหลดหมวดหมู่...</p> : null}
        {error ? <p className="text-sm text-rose-300">ไม่สามารถโหลดหมวดหมู่ได้: {error}</p> : null}

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {(categories ?? []).map((category) => (
            <article key={category.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-sm font-semibold text-white">{category.name}</p>
              <p className="mt-1 text-xs text-slate-400">{category.description ?? 'หมวดหมู่นี้กำลังอัปเดตรายละเอียด'}</p>
              <p className="mt-1 text-xs text-cyan-300">สินค้าในหมวด: {category.products.length} รายการ</p>
              <Button size="sm" variant="ghost" className="mt-3" onClick={() => void handleViewDetail(category.id)}>
                ดูรายละเอียด
              </Button>
            </article>
          ))}
        </div>
      </section>

      {message ? <p className="text-sm text-rose-300">{message}</p> : null}

      {activeCategory ? (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">{activeCategory.name}</h2>
          <p className="mt-1 text-sm text-slate-400">{activeCategory.description ?? 'ยังไม่มีคำอธิบายเพิ่มเติม'}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeCategory.products.length > 0 ? (
              activeCategory.products.map((product) => (
                <span key={product.id} className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300">
                  {product.name}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">ยังไม่มีสินค้าที่เปิดแสดงในหมวดนี้</span>
            )}
          </div>
        </section>
      ) : null}
    </div>
  )
}
