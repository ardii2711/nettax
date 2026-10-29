import type { Mode } from '../lib/tax'

type FormulaPanelProps = {
  mode: Mode
}

const GROSS_FORMULAS = [
  'V   = G × P / (100 + P)',
  'H   = G − V',
  'PPh = H × Q / 100',
  'T   = V + PPh',
  'N   = G − T',
]

const NET_FORMULAS = [
  'G = N / ((100 / (100 + P)) × (1 − Q / 100))',
]

type FormulaCardProps = {
  title: string
  lines: string[]
  active: boolean
  note?: string
}

function FormulaCard({ title, lines, active, note }: FormulaCardProps) {
  return (
    <div
      className={[
        'min-w-0 rounded-xl border p-3.5 transition sm:p-4',
        active
          ? 'border-brand-500/30 bg-brand-50/70 ring-1 ring-brand-500/10'
          : 'border-slate-200/80 bg-slate-50/60',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-navy-900">{title}</p>
        {active ? (
          <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Aktif
          </span>
        ) : null}
      </div>

      <div className="mt-2.5 space-y-1 font-mono text-[11px] leading-relaxed text-slate-700 sm:text-xs">
        {lines.map((line) => (
          <p key={line} className="break-words whitespace-pre-wrap">
            {line}
          </p>
        ))}
      </div>

      {note ? (
        <p className="mt-2.5 text-[11px] leading-relaxed text-slate-500">
          {note}
        </p>
      ) : null}
    </div>
  )
}

export function FormulaPanel({ mode }: FormulaPanelProps) {
  return (
    <section aria-labelledby="formula-title" className="mt-4 min-w-0 sm:mt-5">
      <details className="group rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur sm:p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
          <span
            id="formula-title"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900"
          >
            <svg
              className="size-4 text-brand-600"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 3.5h8M10 3.5v13M4 16.5h12M4.5 8.5h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Rumus perhitungan
          </span>

          <span className="flex items-center gap-2 text-[11px] text-slate-400 sm:text-xs">
            {mode === 'gross' ? 'Mode bruto' : 'Mode bersih'}
            <svg
              className="size-4 transition-transform duration-200 group-open:rotate-180"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m5.5 8 4.5 4.5L14.5 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </summary>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <FormulaCard
            title="Mode A — dari nilai bruto"
            lines={GROSS_FORMULAS}
            active={mode === 'gross'}
          />
          <FormulaCard
            title="Mode B — dari nilai bersih"
            lines={NET_FORMULAS}
            active={mode === 'net'}
            note="Nilai bruto (G) yang diperoleh kemudian dihitung ulang memakai rumus Mode A, sehingga kedua mode konsisten."
          />
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
          G = nilai bruto · P = tarif PPN (%) · Q = tarif PPh (%) · V = nilai PPN ·
          H = dasar pengenaan PPh · T = total pajak · N = nilai bersih. Pembulatan
          hanya dilakukan saat menampilkan hasil.
        </p>
      </details>
    </section>
  )
}
