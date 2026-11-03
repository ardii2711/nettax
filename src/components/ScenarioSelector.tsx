import { SCENARIO_LIST, type ScenarioId } from "../lib/scenario";

type ScenarioSelectorProps = {
  value: ScenarioId;
  onChange: (id: ScenarioId) => void;
};

export function ScenarioSelector({ value, onChange }: ScenarioSelectorProps) {
  return (
    <fieldset>
      <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Jenis pajak</legend>

      <div className="mt-2 flex flex-wrap gap-2">
        {SCENARIO_LIST.map((scenario) => {
          const checked = scenario.id === value;

          return (
            <label
              key={scenario.id}
              className={[
                "relative inline-flex cursor-pointer items-center justify-center rounded-xl border px-3 py-1.5 text-xs font-semibold transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-500 sm:px-3.5 sm:py-2 sm:text-[13px]",
                checked
                  ? "border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-brand-500/10 dark:border-accent-400/60 dark:bg-accent-400/15 dark:text-accent-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10",
              ].join(" ")}
            >
              <input type="radio" name="tax-scenario" value={scenario.id} checked={checked} onChange={() => onChange(scenario.id)} className="sr-only" />
              {scenario.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
