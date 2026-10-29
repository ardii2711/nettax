import type { Mode } from './tax'

/** Batas digit nominal agar tetap aman untuk perhitungan presisi ganda. */
export const MAX_AMOUNT_DIGITS = 15

/** Mengubah string digit menjadi angka. String kosong menghasilkan null. */
export function parseAmount(digits: string): number | null {
  if (!digits) return null
  const value = Number(digits)
  return Number.isFinite(value) ? value : null
}

/** Mengubah tarif bertipe teks (boleh memakai koma atau titik) menjadi angka. */
export function parseRate(raw: string): number | null {
  const normalized = raw.trim().replace(',', '.')
  if (!normalized) return null
  const value = Number(normalized)
  return Number.isFinite(value) ? value : null
}

/** Validasi nominal. String kosong dianggap netral (belum diisi), bukan error. */
export function validateAmount(digits: string): string | null {
  if (!digits) return null

  const value = Number(digits)
  if (!Number.isFinite(value) || value <= 0) {
    return 'Masukkan nominal lebih dari 0.'
  }

  return null
}

export function validatePpn(raw: string): string | null {
  if (!raw.trim()) return 'Tarif PPN wajib diisi.'

  const value = parseRate(raw)
  if (value === null) return 'Tarif PPN tidak valid.'
  if (value < 0 || value > 100) return 'Tarif PPN harus antara 0 dan 100%.'

  return null
}

export function validatePph(raw: string, mode: Mode): string | null {
  if (!raw.trim()) return 'Tarif PPh wajib diisi.'

  const value = parseRate(raw)
  if (value === null) return 'Tarif PPh tidak valid.'
  if (value < 0) return 'Tarif PPh tidak boleh negatif.'

  if (mode === 'net') {
    if (value >= 100) {
      return 'Untuk hitung dari bersih, tarif PPh harus di bawah 100%.'
    }
    return null
  }

  if (value > 100) return 'Tarif PPh harus antara 0 dan 100%.'

  return null
}

/** Membersihkan input tarif: hanya angka dan satu pemisah desimal. */
export function sanitizeRate(raw: string): string {
  const cleaned = raw.replace(/[^\d.,]/g, '')
  const separatorIndex = cleaned.search(/[.,]/)

  if (separatorIndex === -1) {
    return cleaned.slice(0, 3)
  }

  const integerPart = cleaned.slice(0, separatorIndex).slice(0, 3)
  const separator = cleaned[separatorIndex]
  const decimalPart = cleaned
    .slice(separatorIndex + 1)
    .replace(/[.,]/g, '')
    .slice(0, 2)

  return `${integerPart}${separator}${decimalPart}`
}

/** Membersihkan input nominal: hanya digit, tanpa nol di depan, maksimal 15 digit. */
export function sanitizeAmount(raw: string): string {
  return raw
    .replace(/\D/g, '')
    .replace(/^0+(?=\d)/, '')
    .slice(0, MAX_AMOUNT_DIGITS)
}
