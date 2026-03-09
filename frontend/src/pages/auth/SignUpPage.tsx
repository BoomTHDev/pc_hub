import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '@/features/auth/api/sign-up'
import { Button } from '@/shared/ui/Button'

export function SignUpPage() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await signUp({ firstName, lastName, email, password, phone })
      navigate('/signin', {
        replace: true,
        state: { message: 'สมัครสมาชิกสำเร็จแล้ว กรุณาเข้าสู่ระบบเพื่อเริ่มสั่งซื้อสินค้า' },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'สมัครสมาชิกไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:p-6">
        <h1 className="text-xl font-semibold text-white">สมัครสมาชิกใหม่</h1>
        <p className="mt-1 text-sm text-slate-400">สมัครฟรีเพื่อรับข่าวสารโปรโมชั่น และสั่งซื้อสินค้าได้สะดวกรวดเร็ว</p>

        <form onSubmit={onSignUp} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs text-slate-300">ชื่อ</span>
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              required
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-slate-300">นามสกุล</span>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              required
            />
          </label>
          <label className="grid gap-1 md:col-span-2">
            <span className="text-xs text-slate-300">อีเมล</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              required
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-slate-300">รหัสผ่าน</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              required
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-slate-300">เบอร์โทร</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              required
            />
          </label>

          <Button type="submit" disabled={loading} className="md:col-span-2">
            {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-slate-400">
          มีบัญชีอยู่แล้ว?
          <Link to="/signin" className="ml-2 font-medium text-cyan-300 hover:text-cyan-200">
            เข้าสู่ระบบ
          </Link>
        </p>

        {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
      </section>
    </div>
  )
}
