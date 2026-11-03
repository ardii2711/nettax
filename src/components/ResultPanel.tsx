import { useEffect, useState } from "react";
import { buildCopyText, formatRate, formatRupiah } from "../lib/format";
import type { Scenario } from "../lib/scenario";
import type { Mode, TaxBreakdown, TaxRates } from "../lib/tax";

type ResultPanelProps = {
  mode: Mode;
  scenario: Scenario;
  result: TaxBreakdown | null;
  rates: TaxRates | null;
};

type Status = {
  tone: "success" | "error";
  message: string;
};

type Row = {
  label: string;
  value: string;
  strong?: boolean;
};

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const succeeded = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!succeeded) {
    throw new Error("Clipboard tidak tersedia");
  }
}

export function ResultPanel({ mode, scenario, result, rates }: ResultPanelProps) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(null), 3000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const heroLabel = mode === "gross" ? "Nilai Bersih Diterima" : "Nilai Bruto Dibutuhkan";

  const heroValue = result === null ? null : mode === "gross" ? result.net : result.gross;

  const pphLabel = scenario.pphKind ? `PPh ${scenario.pphKind}` : "PPh";

  let rows: Row[] = [];

  if (result && rates) {
    rows = [
      ...(mode === "gross" ? [{ label: "Nilai Bruto", value: formatRupiah(result.gross) }] : [{ label: "Nilai Bersih", value: formatRupiah(result.net) }]),
      ...(scenario.includesPpn
        ? [
            {
              label: `PPN (${formatRate(rates.ppn)}%)`,
              value: formatRupiah(result.ppn),
            },
          ]
        : []),
      ...(scenario.pphKind
        ? [
            {
              label: "Dasar Pengenaan PPh",
              value: formatRupiah(result.pphBase),
            },
            {
              label: `${pphLabel} (${formatRate(rates.pph)}%)`,
              value: formatRupiah(result.pph),
            },
          ]
        : []),
      {
        label: "Total Pajak",
        value: formatRupiah(result.totalTax),
        strong: true,
      },
    ];
  }

  async function handleCopy() {
    if (!result || !rates) return;

    try {
      await copyText(buildCopyText(result, rates, scenario));
      setStatus({ tone: "success", message: "Ringkasan disalin ke clipboard." });
    } catch {
      setStatus({
        tone: "error",
        message: "Gagal menyalin. Silakan salin manual dari ringkasan.",
      });
    }
  }

  const copied = status?.tone === "success";

  return (
    <section
      aria-labelledby="result-title"
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-linear-to-br from-navy-900 via-navy-900 to-navy-800 p-4 text-white shadow-xl shadow-navy-900/10 ring-1 ring-white/10 sm:p-6 dark:shadow-black/40 dark:ring-white/15"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="result-title" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
            Ringkasan Perhitungan
          </h2>
          <p className="mt-1 text-[11px] leading-snug text-white/45 sm:text-xs">
            {mode === "gross" ? "Dihitung dari nilai bruto yang Anda masukkan" : "Dihitung mundur dari target nilai bersih"}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap text-accent-300 ring-1 ring-inset ring-white/15 sm:text-[11px]">
          {scenario.label}
        </span>
      </div>

      <div className="mt-4 sm:mt-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-400 sm:text-[11px]">{heroLabel}</p>
        <p
          aria-live="polite"
          className={["mt-1.5 text-display font-bold tracking-tight tabular-nums sm:mt-2", heroValue === null ? "text-white/35" : "text-white"].join(" ")}
        >
          {heroValue === null ? "—" : formatRupiah(heroValue)}
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        {result && rates ? (
          <dl className="mt-4 space-y-3 border-t border-white/10 pt-4 sm:mt-6 sm:space-y-3.5 sm:pt-5">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4">
                <dt className={row.strong ? "text-xs text-white/80 sm:text-sm" : "text-xs text-white/55 sm:text-sm"}>{row.label}</dt>
                <dd
                  className={[
                    "text-right font-semibold tabular-nums",
                    row.strong ? "text-sm text-accent-300 sm:text-base" : "text-xs text-white sm:text-sm",
                  ].join(" ")}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 px-5 py-8 text-center sm:mt-6 sm:py-10">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-accent-300 ring-1 ring-inset ring-white/10">
              <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="3.5" y="2.5" width="13" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7 6.5h6M7 10h1.5M11.5 10H13M7 13.5h1.5M11.5 13.5H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="mt-3 text-sm font-semibold text-white/85">Belum ada perhitungan</p>
            <p className="mt-1 max-w-76 text-xs leading-relaxed text-white/50 sm:text-[13px]">
              Masukkan nilai transaksi dan pastikan tarif valid untuk melihat rincian perhitungan.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:pt-5">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!result}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40 sm:w-auto"
        >
          {copied ? (
            <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="7" y="7" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M13 5.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v6.5A1.5 1.5 0 0 0 5 13h.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          )}
          {copied ? "Tersalin" : "Salin Hasil"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={["text-[11px] sm:ml-1 sm:text-xs", status?.tone === "error" ? "text-red-300" : "text-white/55"].join(" ")}
        >
          {status?.message ?? (result ? "Ringkasan siap disalin ke dokumen Anda." : "Lengkapi input untuk mengaktifkan salin hasil.")}
        </p>
      </div>
    </section>
  );
}
