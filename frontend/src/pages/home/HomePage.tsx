import { Link } from 'react-router-dom'
import { Cpu, Monitor, MousePointer2, Sparkles, Wrench, Zap } from 'lucide-react'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { useProducts } from '@/features/products/hooks/useProducts'

const highlightCards = [
  { title: 'ประกอบคอมตามงบ', icon: Wrench, desc: 'มีทีมช่วยจัดสเปกให้ตรงงานและงบประมาณ' },
  { title: 'ของแท้ประกันศูนย์', icon: Sparkles, desc: 'สินค้าทุกชิ้นมีประกันและใบกำกับครบ' },
  { title: 'จัดส่งทั่วประเทศ', icon: Zap, desc: 'แพ็กอย่างดี พร้อมบริการหลังการขาย' },
]

export function HomePage() {
  const { data: categories } = useCategories()
  const { data: products } = useProducts()

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              ร้านอุปกรณ์ไอทีครบวงจร
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
              เลือกอุปกรณ์คอมให้ตรงงาน
              <br />
              <span className="text-cyan-400">พร้อมคำแนะนำเป็นภาษาไทย</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              ไม่ว่าจะเป็นคอมเกมมิ่ง งานตัดต่อ หรือเวิร์กสเตชัน เราช่วยคัดสเปก ประเมินความคุ้มค่า และดูแลหลังการขายให้ครบในที่เดียว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products" className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                เลือกซื้อสินค้า
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlightCards.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:last:col-span-2">
                <item.icon className="h-5 w-5 text-cyan-400" />
                <h2 className="mt-3 text-sm font-semibold text-white">{item.title}</h2>
                <p className="mt-1 text-xs leading-6 text-slate-400">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs text-slate-400">หมวดหมู่ยอดนิยม</p>
          <p className="mt-2 text-2xl font-bold text-white">{categories?.length ?? 0} หมวด</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs text-slate-400">สินค้าพร้อมจำหน่าย</p>
          <p className="mt-2 text-2xl font-bold text-white">{products?.length ?? 0} รายการ</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs text-slate-400">ทีมแนะนำสเปก</p>
          <p className="mt-2 text-2xl font-bold text-white">ทุกวัน 09:00-21:00</p>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">หมวดหมู่แนะนำ</h2>
          <Link to="/categories" className="text-sm text-cyan-400 hover:text-cyan-300">
            ดูหมวดหมู่ทั้งหมด
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {(categories ?? []).slice(0, 4).map((category, index) => {
            const iconMap = [Cpu, Monitor, MousePointer2, Sparkles]
            const Icon = iconMap[index % iconMap.length]

            return (
              <article key={category.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <Icon className="h-4 w-4 text-cyan-400" />
                <p className="mt-2 text-sm font-semibold text-white">{category.name}</p>
                <p className="mt-1 text-xs text-slate-400">สินค้าในหมวด {category.products.length} รายการ</p>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
