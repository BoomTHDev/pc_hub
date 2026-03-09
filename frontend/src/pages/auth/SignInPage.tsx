import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signIn } from '@/features/auth/api/sign-in'
import { setAuthToken } from '@/shared/lib/auth-token'
import { Button } from '@/shared/ui/Button'

interface LocationState {
  message?: string
}

export function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as LocationState | null

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(locationState?.message ?? null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, document.title)
    }
  }, [locationState])

  async function onSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const response = await signIn({ email, password })
      setAuthToken(response.token)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:p-6">
        <h1 className="text-xl font-semibold text-white">เข้าสู่ระบบสมาชิก</h1>
        <p className="mt-1 text-sm text-slate-400">เข้าสู่ระบบเพื่อเริ่มสั่งซื้อสินค้าและติดตามสถานะคำสั่งซื้อของคุณ</p>

        <form onSubmit={onSignIn} className="mt-4 space-y-3">
          <label className="grid gap-1">
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-slate-400">
          ยังไม่มีบัญชี?
          <Link to="/signup" className="ml-2 font-medium text-cyan-300 hover:text-cyan-200">
            สมัครสมาชิก
          </Link>
        </p>

        {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
        {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
      </section>
    </div>
  )
}
