import { AppFooter } from './components/AppFooter'
import { AppHeader } from './components/AppHeader'
import { CurrencyInput } from './components/CurrencyInput'
import { FormulaPanel } from './components/FormulaPanel'
import { ModeToggle } from './components/ModeToggle'
import { RateInput } from './components/RateInput'
import { ResultPanel } from './components/ResultPanel'
import { useTaxCalculator } from './hooks/useTaxCalculator'

export default function App() {
  const {
    mode,
    setMode,
    amountDigits,
    setAmountDigits,
    ppnRaw,
    setPpnRaw,
    pphRaw,
    setPphRaw,
    errors,
    result,
    rates,
    reset,
    isDirty,
  } = useTaxCalculator()

  const amountLabel =
    mode === 'gross' ? 'Nilai Bruto (sebelum pajak)' : 'Target Nilai Bersih'
  const amountHint = mode === 'gross' ? 'Termasuk PPN' : 'Yang ingin diterima'

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-3 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
      <AppHeader />

      <main className="mt-4 grid gap-4 sm:mt-6 md:grid-cols-2 md:gap-5 lg:mt-8 lg:gap-6">
        <section
          aria-labelledby="calculator-title"
          className="min-w-0 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm shadow-slate-900/5 backdrop-blur sm:p-6"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h1
              id="calculator-title"
              className="text-sm font-semibold text-navy-900 sm:text-base"
            >
              Kalkulator Pajak
            </h1>
            <span className="text-[11px] text-slate-400 sm:text-xs">
              PPN &amp; PPh
            </span>
          </div>

          <form
            className="mt-4 space-y-4 sm:mt-5 sm:space-y-5"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <ModeToggle value={mode} onChange={setMode} />

            <CurrencyInput
              label={amountLabel}
              hint={amountHint}
              value={amountDigits}
              onChange={setAmountDigits}
              error={errors.amount}
            />

            <fieldset>
              <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Tarif pajak
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <RateInput
                  label="PPN"
                  value={ppnRaw}
                  onChange={setPpnRaw}
                  error={errors.ppn}
                />
                <RateInput
                  label="PPh"
                  value={pphRaw}
                  onChange={setPphRaw}
                  error={errors.pph}
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                Tarif awal 11% dan 1,5% — bisa diubah sesuai transaksi Anda.
              </p>
            </fieldset>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:pt-4">
              <button
                type="button"
                onClick={reset}
                disabled={!isDirty}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent sm:text-sm"
              >
                <svg
                  className="size-3.5 sm:size-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10a6 6 0 1 0 2.2-4.7M4 4.5V8h3.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Reset formulir
              </button>

              <p className="text-[11px] text-slate-400 sm:text-xs">
                Hasil diperbarui otomatis
              </p>
            </div>
          </form>
        </section>

        <div className="min-w-0">
          <ResultPanel mode={mode} result={result} rates={rates} />
        </div>
      </main>

      <FormulaPanel mode={mode} />

      <div className="mt-auto pt-8">
        <AppFooter />
      </div>
    </div>
  )
}
