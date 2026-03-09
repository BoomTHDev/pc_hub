import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Menu, ShoppingCart, UserRound, X, Zap } from 'lucide-react'
import { clearAuthToken, isAuthenticated } from '@/shared/lib/auth-token'
import { cn } from '@/shared/utils/cn'

const primaryNavItems = [
  { to: '/', label: 'หน้าแรก' },
  { to: '/products', label: 'สินค้า' },
  { to: '/categories', label: 'หมวดหมู่' },
]

const accountNavItems = [
  { to: '/signin', label: 'เข้าสู่ระบบ' },
  { to: '/signup', label: 'สมัครสมาชิก' },
]

export function AppLayout() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const authed = isAuthenticated()

  function handleSignOut() {
    clearAuthToken()
    navigate('/signin', { replace: true, state: { message: 'ออกจากระบบเรียบร้อยแล้ว' } })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="border-b border-slate-800/80 bg-slate-950/60">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] text-slate-400 md:px-6">
            <p>บริการช่วยจัดสเปกโดยทีมงานผู้เชี่ยวชาญ</p>
            <p>เปิดทุกวัน 09:00 - 21:00</p>
          </div>
        </div>

        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="rounded-lg bg-cyan-500 p-1.5 shadow-[0_0_16px_rgba(6,182,212,0.35)]">
              <Zap className="h-4 w-4 fill-current text-slate-950" />
            </span>
            <span className="text-sm font-black uppercase tracking-widest md:text-base">
              PC <span className="text-cyan-400">Hub</span>
            </span>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
              {primaryNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-1.5 text-sm transition',
                      isActive ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {!authed ? (
              <nav className="flex items-center gap-1 rounded-xl border border-slate-800/80 bg-slate-900/45 p-1">
                {accountNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'rounded-lg px-3 py-1.5 text-sm transition',
                        isActive ? 'bg-slate-800 text-cyan-300' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            ) : (
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/45 px-3 py-1.5 text-xs text-cyan-300">สมาชิกออนไลน์</div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white" aria-label="ตะกร้าสินค้า">
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              aria-label="โปรไฟล์ผู้ใช้"
            >
              <UserRound className="h-4 w-4" />
            </button>

            {authed ? (
              <button
                onClick={handleSignOut}
                className="px-1 text-xs text-slate-300 underline decoration-slate-500 underline-offset-4 transition hover:text-cyan-300"
              >
                ออกจากระบบ
              </button>
            ) : null}

            <button
              className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="เมนู"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-800 bg-slate-950 px-4 py-3 md:hidden">
            <nav className="grid gap-1">
              {primaryNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2 text-sm transition',
                      isActive ? 'bg-cyan-500 text-slate-950' : 'text-slate-200 hover:bg-slate-800',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {!authed ? (
              <>
                <div className="my-3 h-px bg-slate-800" />
                <nav className="grid gap-1">
                  {accountNavItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'rounded-lg px-3 py-2 text-sm transition',
                          isActive ? 'bg-slate-800 text-cyan-300' : 'text-slate-200 hover:bg-slate-800',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </>
            ) : null}
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 px-4 py-8 text-xs text-slate-500 md:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <p>PC Hub: ศูนย์รวมอุปกรณ์คอมพิวเตอร์สำหรับเกมมิ่งและงานมืออาชีพ</p>
          <p>© 2026 PC Hub Technology</p>
        </div>
      </footer>
    </div>
  )
}
