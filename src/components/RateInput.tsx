import { useId } from 'react'
import type { ChangeEvent } from 'react'
import { sanitizeRate } from '../lib/validate'

type RateInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string | null
}

export function RateInput({ label, value, onChange, error }: RateInputProps) {
  const id = useId()
  const errorId = `${id}-error`

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(sanitizeRate(event.target.value))
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div
        className={[
          'mt-2 flex items-center overflow-hidden rounded-xl border bg-white transition',
          error
            ? 'border-red-300 ring-1 ring-red-100'
            : 'border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100',
        ].join(' ')}
      >
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent py-2 pl-3 text-base font-semibold text-slate-900 tabular-nums outline-none placeholder:text-slate-300 sm:py-2.5 sm:pl-3.5 sm:text-lg"
        />
        <span
          className="pr-3.5 pl-1 text-sm font-medium text-slate-400"
          aria-hidden="true"
        >
          %
        </span>
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
