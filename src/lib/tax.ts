/** Mode perhitungan: dari nilai bruto atau dari target nilai bersih. */
export type Mode = 'gross' | 'net'

export type TaxRates = {
  /** Tarif PPN dalam persen, contoh 11 untuk 11%. */
  ppn: number
  /** Tarif PPh dalam persen, contoh 1.5 untuk 1,5%. */
  pph: number
}

export type TaxBreakdown = {
  /** G — nilai bruto (sebelum dikurangi pajak). */
  gross: number
  /** V — nilai PPN. */
  ppn: number
  /** H — dasar pengenaan PPh. */
  pphBase: number
  /** Nilai PPh. */
  pph: number
  /** T — total pajak (PPN + PPh). */
  totalTax: number
  /** N — nilai bersih setelah pajak. */
  net: number
}

/**
 * Mode A — hitung dari nilai bruto.
 *
 * V   = G × P / (100 + P)
 * H   = G − V
 * PPh = H × Q / 100
 * T   = V + PPh
 * N   = G − T
 */
export function calculateFromGross(gross: number, rates: TaxRates): TaxBreakdown {
  const ppn = (gross * rates.ppn) / (100 + rates.ppn)
  const pphBase = gross - ppn
  const pph = (pphBase * rates.pph) / 100
  const totalTax = ppn + pph

  return {
    gross,
    ppn,
    pphBase,
    pph,
    totalTax,
    net: gross - totalTax,
  }
}

/**
 * Menghitung nilai bruto yang dibutuhkan untuk mencapai target nilai bersih.
 *
 * G = N / ((100 / (100 + P)) × (1 − Q / 100))
 */
export function grossFromNet(net: number, rates: TaxRates): number {
  const factor = (100 / (100 + rates.ppn)) * (1 - rates.pph / 100)

  if (!Number.isFinite(factor) || factor <= 0) {
    throw new RangeError(
      'Kombinasi tarif tidak menghasilkan nilai bruto yang valid.',
    )
  }

  return net / factor
}

/**
 * Mode B — hitung dari target nilai bersih.
 * Nilai bruto dicari terlebih dahulu, lalu rinciannya dihitung dengan rumus Mode A.
 */
export function calculateFromNet(net: number, rates: TaxRates): TaxBreakdown {
  return calculateFromGross(grossFromNet(net, rates), rates)
}
