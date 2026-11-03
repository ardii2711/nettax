export type PphKind = '21' | '22' | '23'

export type Pph21CategoryId = 'pns3' | 'pns4' | 'pppk' | 'non-asn'

export type Pph21Category = {
  id: Pph21CategoryId
  label: string
  /** Tarif awal dalam persen, memakai koma desimal bila perlu. */
  rate: string
}

export type ScenarioId =
  | 'ppn'
  | 'pph21'
  | 'pph22'
  | 'pph23'
  | 'ppn+pph22'
  | 'ppn+pph23'

export type Scenario = {
  id: ScenarioId
  /** Label untuk chip pemilih dan badge hasil. */
  label: string
  includesPpn: boolean
  /** null berarti skenario tidak memakai PPh. */
  pphKind: PphKind | null
}

export const DEFAULT_SCENARIO: ScenarioId = 'ppn'

export const DEFAULT_RATES = {
  ppn: '11',
  pph21: '5',
  pph22: '1,5',
  pph23: '2',
} as const

/** Kategori PPh 21 untuk honorarium narasumber, moderator, dan panitia. */
export const PPH21_CATEGORIES: Pph21Category[] = [
  { id: 'pns3', label: 'PNS Gol. III', rate: '5' },
  { id: 'pns4', label: 'PNS Gol. IV', rate: '15' },
  { id: 'pppk', label: 'PPPK', rate: '5' },
  { id: 'non-asn', label: 'Non ASN', rate: '5' },
]

export const DEFAULT_PPH21_CATEGORY: Pph21CategoryId = 'pns3'

export function getPph21Category(id: Pph21CategoryId): Pph21Category {
  return (
    PPH21_CATEGORIES.find((category) => category.id === id) ??
    PPH21_CATEGORIES[0]
  )
}

export function pphDefaultRate(kind: PphKind): string {
  if (kind === '21') return DEFAULT_RATES.pph21
  return kind === '22' ? DEFAULT_RATES.pph22 : DEFAULT_RATES.pph23
}

const SCENARIO_MAP: Record<ScenarioId, Scenario> = {
  ppn: {
    id: 'ppn',
    label: 'PPN',
    includesPpn: true,
    pphKind: null,
  },
  pph21: {
    id: 'pph21',
    label: 'PPh 21',
    includesPpn: false,
    pphKind: '21',
  },
  pph22: {
    id: 'pph22',
    label: 'PPh 22',
    includesPpn: false,
    pphKind: '22',
  },
  pph23: {
    id: 'pph23',
    label: 'PPh 23',
    includesPpn: false,
    pphKind: '23',
  },
  'ppn+pph22': {
    id: 'ppn+pph22',
    label: 'PPN + PPh 22',
    includesPpn: true,
    pphKind: '22',
  },
  'ppn+pph23': {
    id: 'ppn+pph23',
    label: 'PPN + PPh 23',
    includesPpn: true,
    pphKind: '23',
  },
}

/** Urutan tampil chip pemilih skenario. */
export const SCENARIO_LIST: Scenario[] = [
  SCENARIO_MAP.ppn,
  SCENARIO_MAP.pph21,
  SCENARIO_MAP.pph22,
  SCENARIO_MAP.pph23,
  SCENARIO_MAP['ppn+pph22'],
  SCENARIO_MAP['ppn+pph23'],
]

export function getScenario(id: ScenarioId): Scenario {
  return SCENARIO_MAP[id]
}
