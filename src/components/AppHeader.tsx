import { Logo } from './Logo'

export function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Logo className="size-10 shrink-0 drop-shadow-sm sm:size-12" />
        <div>
          <p className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
            Nettax
          </p>
          <p className="text-xs text-slate-500 sm:text-sm">
            Hitung Pajak, Lebih Mudah.
          </p>
        </div>
      </div>

      <p className="hidden items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80 backdrop-blur sm:inline-flex">
        <span className="size-1.5 rounded-full bg-accent-500" aria-hidden="true" />
        Gratis · Tanpa akun · Data tidak dikirim
      </p>
    </header>
  )
}
