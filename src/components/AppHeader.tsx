import { useEffect, useState } from 'react'
import type { Theme } from '../hooks/useTheme'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

type AppHeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function AppHeader({ theme, onToggleTheme }: AppHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 8)

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b transition duration-300',
        isScrolled
          ? 'border-slate-200/70 bg-white/75 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/75 dark:shadow-black/25'
          : 'border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo className="size-10 shrink-0 drop-shadow-sm sm:size-12" />
          <div>
            <p className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl dark:text-slate-100">
              Nettax
            </p>
            <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              Hitung Pajak, Lebih Mudah.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <p className="hidden items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80 backdrop-blur sm:inline-flex dark:bg-white/5 dark:text-slate-300 dark:ring-white/10">
            <span
              className="size-1.5 rounded-full bg-accent-500"
              aria-hidden="true"
            />
            Gratis · Tanpa akun · Data tidak dikirim
          </p>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}
