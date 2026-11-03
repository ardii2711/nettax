import type { Scenario } from "../lib/scenario";
import type { Mode } from "../lib/tax";

type FormulaPanelProps = {
  mode: Mode;
  scenario: Scenario;
};

type FormulaCardProps = {
  title: string;
  lines: string[];
  active: boolean;
  note?: string;
};

function FormulaCard({ title, lines, active, note }: FormulaCardProps) {
  return (
    <div
      className={[
        "min-w-0 rounded-xl border p-3.5 transition sm:p-4",
        active
          ? "border-brand-500/30 bg-brand-50/70 ring-1 ring-brand-500/10 dark:border-accent-400/30 dark:bg-accent-400/10 dark:ring-accent-400/10"
          : "border-slate-200/80 bg-slate-50/60 dark:border-white/10 dark:bg-white/5",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-navy-900 dark:text-slate-100">{title}</p>
        {active ? <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">Aktif</span> : null}
      </div>

      <div className="mt-2.5 space-y-1 font-mono text-[11px] leading-relaxed text-slate-700 sm:text-xs dark:text-slate-300">
        {lines.map((line) => (
          <p key={line} className="wrap-break-word whitespace-pre-wrap">
            {line}
          </p>
        ))}
      </div>

      {note ? <p className="mt-2.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{note}</p> : null}
    </div>
  );
}

export function FormulaPanel({ mode, scenario }: FormulaPanelProps) {
  const grossFormulas = [
    ...(scenario.includesPpn ? ["V   = G × P / (100 + P)", "H   = G − V"] : ["V   = 0", "H   = G"]),
    ...(scenario.pphKind ? ["PPh = H × Q / 100"] : ["PPh = 0"]),
    "T   = V + PPh",
    "N   = G − T",
  ];

  const netFormulas =
    scenario.includesPpn && scenario.pphKind
      ? ["G = N / ((100 / (100 + P)) × (1 − Q / 100))"]
      : scenario.includesPpn
        ? ["G = N × (100 + P) / 100"]
        : ["G = N / (1 − Q / 100)"];

  const variables = [
    "G = nilai bruto",
    ...(scenario.includesPpn ? ["P = tarif PPN (%)"] : []),
    ...(scenario.pphKind ? [`Q = tarif PPh ${scenario.pphKind} (%)`] : []),
    "V = nilai PPN",
    "H = dasar pengenaan PPh",
    "T = total pajak",
    "N = nilai bersih",
  ];

  return (
    <section aria-labelledby="formula-title" className="mt-4 min-w-0 sm:mt-5">
      <details className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-navy-950/60">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden sm:p-5">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-500/10 sm:size-10 dark:bg-accent-400/10 dark:text-accent-300 dark:ring-accent-400/15">
              <svg className="size-4 sm:size-4.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M6 3.5h8M10 3.5v13M4 16.5h12M4.5 8.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span className="min-w-0">
              <span id="formula-title" className="block truncate text-sm font-semibold text-navy-900 dark:text-slate-100">
                Rumus perhitungan
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">Skenario {scenario.label}</span>
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
            <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:inline-flex dark:bg-white/10 dark:text-slate-300">
              {mode === "gross" ? "Bruto" : "Bersih"}
            </span>
            <svg className="size-4 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5.5 8 4.5 4.5L14.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </summary>

        <div className="border-t border-slate-200/70 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5 dark:border-white/10">
          <div className="grid gap-3 md:grid-cols-2">
            <FormulaCard title="Mode A — dari nilai bruto" lines={grossFormulas} active={mode === "gross"} />
            <FormulaCard
              title="Mode B — dari nilai bersih"
              lines={netFormulas}
              active={mode === "net"}
              note="Nilai bruto (G) yang diperoleh kemudian dihitung ulang memakai rumus Mode A, sehingga kedua mode konsisten."
            />
          </div>

          <div className="mt-3 rounded-xl bg-slate-50/80 px-3.5 py-3 text-[11px] leading-relaxed text-slate-500 ring-1 ring-slate-200/60 sm:text-xs dark:bg-white/5 dark:text-slate-400 dark:ring-white/10">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Variabel:</span> {variables.join(" · ")}. Komponen yang tidak termasuk skenario
            dianggap 0, dan pembulatan hanya dilakukan saat menampilkan hasil.
          </div>
        </div>
      </details>
    </section>
  );
}
