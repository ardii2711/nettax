import { useMemo, useState } from "react";
import { calculateFromGross, calculateFromNet, type Mode, type TaxBreakdown, type TaxRates } from "../lib/tax";
import {
  DEFAULT_PPH21_CATEGORY,
  DEFAULT_RATES,
  DEFAULT_SCENARIO,
  getPph21Category,
  getScenario,
  type Pph21Category,
  type Pph21CategoryId,
  type Scenario,
  type ScenarioId,
} from "../lib/scenario";
import { parseAmount, parseRate, validateAmount, validatePph, validatePpn } from "../lib/validate";

export type TaxCalculator = {
  scenario: Scenario;
  setScenario: (id: ScenarioId) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  amountDigits: string;
  setAmountDigits: (digits: string) => void;
  ppnRaw: string;
  setPpnRaw: (value: string) => void;
  pphRaw: string;
  setPphRaw: (value: string) => void;
  pph21Category: Pph21Category;
  setPph21Category: (id: Pph21CategoryId) => void;
  errors: {
    amount: string | null;
    ppn: string | null;
    pph: string | null;
  };
  result: TaxBreakdown | null;
  rates: TaxRates | null;
  reset: () => void;
  isDirty: boolean;
};

export function useTaxCalculator(): TaxCalculator {
  const [scenarioId, setScenarioId] = useState<ScenarioId>(DEFAULT_SCENARIO);
  const [mode, setMode] = useState<Mode>("gross");
  const [amountDigits, setAmountDigits] = useState("");
  const [ppnRaw, setPpnRaw] = useState<string>(DEFAULT_RATES.ppn);
  const [pph21Raw, setPph21Raw] = useState<string>(DEFAULT_RATES.pph21);
  const [pph22Raw, setPph22Raw] = useState<string>(DEFAULT_RATES.pph22);
  const [pph23Raw, setPph23Raw] = useState<string>(DEFAULT_RATES.pph23);
  const [pph21CategoryId, setPph21CategoryId] = useState<Pph21CategoryId>(DEFAULT_PPH21_CATEGORY);

  const scenario = getScenario(scenarioId);
  const pph21Category = getPph21Category(pph21CategoryId);

  // Nilai tarif PPh yang aktif; disimpan terpisah per jenis agar isian tidak
  // hilang saat pengguna berpindah antara PPh 21, PPh 22, dan PPh 23.
  const activePphRaw = scenario.pphKind === "21" ? pph21Raw : scenario.pphKind === "22" ? pph22Raw : scenario.pphKind === "23" ? pph23Raw : "";

  const errors = useMemo(
    () => ({
      amount: validateAmount(amountDigits),
      ppn: scenario.includesPpn ? validatePpn(ppnRaw) : null,
      pph: scenario.pphKind ? validatePph(activePphRaw, mode, `PPh ${scenario.pphKind}`) : null,
    }),
    [amountDigits, ppnRaw, activePphRaw, mode, scenario],
  );

  const amount = parseAmount(amountDigits);
  const ppn = scenario.includesPpn ? parseRate(ppnRaw) : null;
  const pph = scenario.pphKind ? parseRate(activePphRaw) : null;

  const ratesValid = errors.ppn === null && errors.pph === null && (!scenario.includesPpn || ppn !== null) && (!scenario.pphKind || pph !== null);

  const rangesValid = amount !== null && errors.amount === null && ratesValid;

  const result = useMemo<TaxBreakdown | null>(() => {
    if (!rangesValid || amount === null) {
      return null;
    }

    const rates: TaxRates = {
      ppn: ppn ?? 0,
      pph: pph ?? 0,
    };

    try {
      return mode === "gross" ? calculateFromGross(amount, rates) : calculateFromNet(amount, rates);
    } catch {
      return null;
    }
  }, [rangesValid, amount, ppn, pph, mode]);

  const rates: TaxRates | null = ratesValid ? { ppn: ppn ?? 0, pph: pph ?? 0 } : null;

  function setPphRaw(value: string) {
    if (scenario.pphKind === "21") setPph21Raw(value);
    if (scenario.pphKind === "22") setPph22Raw(value);
    if (scenario.pphKind === "23") setPph23Raw(value);
  }

  function setPph21Category(id: Pph21CategoryId) {
    setPph21CategoryId(id);
    setPph21Raw(getPph21Category(id).rate);
  }

  function reset() {
    setScenarioId(DEFAULT_SCENARIO);
    setMode("gross");
    setAmountDigits("");
    setPpnRaw(DEFAULT_RATES.ppn);
    setPph21Raw(DEFAULT_RATES.pph21);
    setPph22Raw(DEFAULT_RATES.pph22);
    setPph23Raw(DEFAULT_RATES.pph23);
    setPph21CategoryId(DEFAULT_PPH21_CATEGORY);
  }

  const isDirty =
    scenarioId !== DEFAULT_SCENARIO ||
    mode !== "gross" ||
    amountDigits !== "" ||
    ppnRaw !== DEFAULT_RATES.ppn ||
    pph21Raw !== DEFAULT_RATES.pph21 ||
    pph22Raw !== DEFAULT_RATES.pph22 ||
    pph23Raw !== DEFAULT_RATES.pph23 ||
    pph21CategoryId !== DEFAULT_PPH21_CATEGORY;

  return {
    scenario,
    setScenario: setScenarioId,
    mode,
    setMode,
    amountDigits,
    setAmountDigits,
    ppnRaw,
    setPpnRaw,
    pphRaw: activePphRaw,
    setPphRaw,
    pph21Category,
    setPph21Category,
    errors,
    result,
    rates,
    reset,
    isDirty,
  };
}
