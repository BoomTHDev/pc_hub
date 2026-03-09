import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '@/features/products/hooks/useProducts'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { ProductCard } from '@/features/products/components/ProductCard'
import type { Product } from '@/entities/api'
import { isAuthenticated } from '@/shared/lib/auth-token'
import { Button } from '@/shared/ui/Button'

export function ProductsPage() {
  const navigate = useNavigate()
  const { data: products, loading, error, reload } = useProducts()
  const { data: categories } = useCategories()

  const [keyword, setKeyword] = useState('')
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด')
  const [notice, setNotice] = useState<string | null>(null)

  const categoryOptions = useMemo(() => ['ทั้งหมด', ...((categories ?? []).map((item) => item.name) || [])], [categories])

  const filteredProducts = useMemo(() => {
    const keywordLower = keyword.trim().toLowerCase()

    return (products ?? []).filter((product) => {
      const matchCategory = activeCategory === 'ทั้งหมด' || product.category.name === activeCategory
      const matchKeyword =
        !keywordLower ||
        product.name.toLowerCase().includes(keywordLower) ||
        product.description.toLowerCase().includes(keywordLower) ||
        product.category.name.toLowerCase().includes(keywordLower)

      return matchCategory && matchKeyword
    })
  }, [products, keyword, activeCategory])

  function onQuote(product: Product) {
    if (!isAuthenticated()) {
      navigate('/signin', {
        state: { message: 'กรุณาเข้าสู่ระบบก่อนเริ่มสั่งซื้อสินค้า' },
      })
      return
    }

    setNotice(`ส่งคำขอใบเสนอราคาสำหรับ "${product.name}" แล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด`)
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h1 className="text-xl font-semibold text-white">สินค้าไอทีทั้งหมด</h1>
        <p className="mt-1 text-sm text-slate-400">ค้นหา เปรียบเทียบ และเลือกอุปกรณ์ที่เหมาะกับการใช้งานของคุณ</p>
      </section>

      <section className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:grid-cols-[2fr_1fr_auto]">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="ค้นหาสินค้า เช่น RTX, SSD, Mainboard"
          className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        />
        <select
          value={activeCategory}
          onChange={(event) => setActiveCategory(event.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        >
          {categoryOptions.map((nameValue) => (
            <option key={nameValue} value={nameValue}>
              {nameValue}
            </option>
          ))}
        </select>
        <Button variant="ghost" onClick={() => void reload()}>
          อัปเดตข้อมูล
        </Button>
      </section>

      {notice ? <p className="text-sm text-emerald-300">{notice}</p> : null}
      {loading ? <p className="text-sm text-slate-400">กำลังโหลดสินค้า...</p> : null}
      {error ? <p className="text-sm text-rose-300">ไม่สามารถโหลดสินค้าได้: {error}</p> : null}

      {!loading && !error ? <p className="text-sm text-slate-400">พบสินค้าทั้งหมด {filteredProducts.length} รายการ</p> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onQuote={onQuote} />
        ))}
      </div>
    </div>
  )
}
