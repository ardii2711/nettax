import { useId } from 'react'
import type { ChangeEvent } from 'react'
import { formatAmountInput } from '../lib/format'
import { sanitizeAmount } from '../lib/validate'

type CurrencyInputProps = {
  label: string
  hint?: string
  value: string
  onChange: (digits: string) => void
  error?: string | null
  autoFocus?: boolean
}

export function CurrencyInput({
  label,
  hint,
  value,
  onChange,
  error,
  autoFocus = false,
}: CurrencyInputProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(sanitizeAmount(event.target.value))
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
        {hint ? (
          <span id={hintId} className="text-xs text-slate-400 dark:text-slate-500">
            {hint}
          </span>
        ) : null}
      </div>

      <div
        className={[
          'mt-2 flex items-center overflow-hidden rounded-xl border bg-white transition dark:bg-navy-950/60',
          error
            ? 'border-red-300 ring-1 ring-red-100 dark:border-red-500/50 dark:ring-red-500/20'
            : 'border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 dark:border-white/10 dark:focus-within:border-brand-500 dark:focus-within:ring-brand-500/25',
        ].join(' ')}
      >
        <span
          className="pl-3.5 pr-2 text-base font-semibold text-slate-400 sm:pl-4 sm:text-lg dark:text-slate-500"
          aria-hidden="true"
        >
          Rp
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder="0"
          value={formatAmountInput(value)}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className="min-w-0 flex-1 bg-transparent py-2.5 pr-3.5 text-amount font-semibold tracking-tight text-slate-900 tabular-nums outline-none placeholder:text-slate-300 sm:py-3 sm:pr-4 dark:text-slate-50 dark:placeholder:text-slate-600"
        />
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}
