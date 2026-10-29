import type { Mode } from '../lib/tax'

type ModeToggleProps = {
  value: Mode
  onChange: (mode: Mode) => void
}

const OPTIONS: Array<{ value: Mode; label: string; description: string }> = [
  {
    value: 'gross',
    label: 'Dari Bruto',
    description: 'Nilai transaksi sebelum pajak',
  },
  {
    value: 'net',
    label: 'Dari Bersih',
    description: 'Target nilai yang ingin diterima',
  },
]

export function ModeToggle({ value, onChange }: ModeToggleProps) {
  return (
    <fieldset>
      <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Mode perhitungan
      </legend>

      <div className="relative mt-2 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-white shadow-sm ring-1 ring-slate-200/80 transition-transform duration-200 ease-out',
            value === 'net' ? 'translate-x-full' : 'translate-x-0',
          ].join(' ')}
        />

        {OPTIONS.map((option) => (
          <label
            key={option.value}
            className="relative z-10 flex cursor-pointer flex-col items-center justify-center rounded-lg px-2 py-2 text-center transition focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-1 focus-within:ring-offset-slate-100 sm:py-2.5"
          >
            <input
              type="radio"
              name="tax-mode"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="text-[13px] font-semibold text-slate-500 transition peer-checked:text-navy-900 sm:text-sm">
              {option.label}
            </span>
            <span className="mt-0.5 hidden text-[11px] leading-tight text-slate-400 lg:block">
              {option.description}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
