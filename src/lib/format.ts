import type { TaxBreakdown, TaxRates } from './tax'

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const groupFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
})

const rateFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
})

/** Format Rupiah tanpa angka desimal, contoh: Rp10.000.000 */
export function formatRupiah(value: number): string {
  return `Rp${rupiahFormatter.format(Math.round(value))}`
}

/** Format string digit menjadi angka berkelompok, contoh: 10000000 -> 10.000.000 */
export function formatAmountInput(digits: string): string {
  if (!digits) return ''
  return groupFormatter.format(Number(digits))
}

/** Format tarif dengan koma desimal, contoh: 1.5 -> 1,5 */
export function formatRate(value: number): string {
  return rateFormatter.format(value)
}

/** Ringkasan teks untuk fitur salin hasil. */
export function buildCopyText(result: TaxBreakdown, rates: TaxRates): string {
  return [
    `Nilai Bruto: ${formatRupiah(result.gross)}`,
    `PPN (${formatRate(rates.ppn)}%): ${formatRupiah(result.ppn)}`,
    `PPh (${formatRate(rates.pph)}%): ${formatRupiah(result.pph)}`,
    `Total Pajak: ${formatRupiah(result.totalTax)}`,
    `Nilai Bersih: ${formatRupiah(result.net)}`,
  ].join('\n')
}
