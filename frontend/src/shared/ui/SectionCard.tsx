import type { ReactNode } from 'react'

interface SectionCardProps {
  children: ReactNode
}

export function SectionCard({ children }: SectionCardProps) {
  return <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">{children}</section>
}
