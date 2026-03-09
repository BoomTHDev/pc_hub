import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'

export function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">404</p>
      <h1 className="mt-3 text-2xl font-semibold text-white">ไม่พบหน้าที่คุณค้นหา</h1>
      <p className="mt-2 text-sm text-slate-400">ลิงก์อาจถูกย้ายหรือลบออกจากระบบ</p>
      <Link to="/" className="mt-6 inline-flex">
        <Button>กลับหน้าแรก</Button>
      </Link>
    </section>
  )
}
