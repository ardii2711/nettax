import { PPH21_CATEGORIES, type Pph21CategoryId } from "../lib/scenario";

type Pph21CategorySelectorProps = {
  value: Pph21CategoryId;
  onChange: (id: Pph21CategoryId) => void;
};

export function Pph21CategorySelector({ value, onChange }: Pph21CategorySelectorProps) {
  return (
    <fieldset>
      <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Kategori PPh 21</legend>

      <div className="mt-2 flex flex-wrap gap-2">
        {PPH21_CATEGORIES.map((category) => {
          const checked = category.id === value;

          return (
            <label
              key={category.id}
              className={[
                "relative inline-flex cursor-pointer items-center justify-center rounded-xl border px-3 py-1.5 text-xs font-semibold transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-500 sm:px-3.5 sm:py-2 sm:text-[13px]",
                checked
                  ? "border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-brand-500/10 dark:border-accent-400/60 dark:bg-accent-400/15 dark:text-accent-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10",
              ].join(" ")}
            >
              <input type="radio" name="pph21-category" value={category.id} checked={checked} onChange={() => onChange(category.id)} className="sr-only" />
              {category.label}
              <span className="ml-1.5 text-[10px] font-medium tabular-nums opacity-70">{category.rate}%</span>
            </label>
          );
        })}
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs dark:text-slate-400">
        Tarif terisi otomatis mengikuti kategori dan tetap bisa diubah pada kolom tarif.
      </p>
    </fieldset>
  );
}
