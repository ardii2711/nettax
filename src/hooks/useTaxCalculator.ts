import { useMemo, useState } from 'react'
import {
  calculateFromGross,
  calculateFromNet,
  type Mode,
  type TaxBreakdown,
  type TaxRates,
} from '../lib/tax'
import { parseAmount, parseRate, validateAmount, validatePph, validatePpn } from '../lib/validate'

export const DEFAULT_RATES = {
  ppn: '11',
  pph: '1,5',
} as const

export type TaxCalculator = {
  mode: Mode
  setMode: (mode: Mode) => void
  amountDigits: string
  setAmountDigits: (digits: string) => void
  ppnRaw: string
  setPpnRaw: (value: string) => void
  pphRaw: string
  setPphRaw: (value: string) => void
  errors: {
    amount: string | null
    ppn: string | null
    pph: string | null
  }
  result: TaxBreakdown | null
  rates: TaxRates | null
  reset: () => void
  isDirty: boolean
}

export function useTaxCalculator(): TaxCalculator {
  const [mode, setMode] = useState<Mode>('gross')
  const [amountDigits, setAmountDigits] = useState('')
  const [ppnRaw, setPpnRaw] = useState<string>(DEFAULT_RATES.ppn)
  const [pphRaw, setPphRaw] = useState<string>(DEFAULT_RATES.pph)

  const errors = useMemo(
    () => ({
      amount: validateAmount(amountDigits),
      ppn: validatePpn(ppnRaw),
      pph: validatePph(pphRaw, mode),
    }),
    [amountDigits, ppnRaw, pphRaw, mode],
  )

  const amount = parseAmount(amountDigits)
  const ppn = parseRate(ppnRaw)
  const pph = parseRate(pphRaw)

  const rangesValid =
    amount !== null &&
    ppn !== null &&
    pph !== null &&
    errors.amount === null &&
    errors.ppn === null &&
    errors.pph === null

  const result = useMemo<TaxBreakdown | null>(() => {
    if (!rangesValid || amount === null || ppn === null || pph === null) {
      return null
    }

    const rates: TaxRates = { ppn, pph }

    try {
      return mode === 'gross'
        ? calculateFromGross(amount, rates)
        : calculateFromNet(amount, rates)
    } catch {
      return null
    }
  }, [rangesValid, amount, ppn, pph, mode])

  const rates: TaxRates | null =
    ppn !== null && pph !== null && errors.ppn === null && errors.pph === null
      ? { ppn, pph }
      : null

  function reset() {
    setMode('gross')
    setAmountDigits('')
    setPpnRaw(DEFAULT_RATES.ppn)
    setPphRaw(DEFAULT_RATES.pph)
  }

  const isDirty =
    mode !== 'gross' ||
    amountDigits !== '' ||
    ppnRaw !== DEFAULT_RATES.ppn ||
    pphRaw !== DEFAULT_RATES.pph

  return {
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
  }
}
