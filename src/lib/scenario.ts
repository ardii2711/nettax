export type PphKind = '22' | '23'

export type ScenarioId =
  | 'ppn'
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
  pph22: '1,5',
  pph23: '2',
} as const

export function pphDefaultRate(kind: PphKind): string {
  return kind === '22' ? DEFAULT_RATES.pph22 : DEFAULT_RATES.pph23
}

const SCENARIO_MAP: Record<ScenarioId, Scenario> = {
  ppn: {
    id: 'ppn',
    label: 'PPN',
    includesPpn: true,
    pphKind: null,
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
  SCENARIO_MAP.pph22,
  SCENARIO_MAP.pph23,
  SCENARIO_MAP['ppn+pph22'],
  SCENARIO_MAP['ppn+pph23'],
]

export function getScenario(id: ScenarioId): Scenario {
  return SCENARIO_MAP[id]
}
