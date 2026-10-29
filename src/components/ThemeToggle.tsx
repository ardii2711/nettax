import type { Theme } from '../hooks/useTheme'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  const label = isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={label}
      title={label}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-600 shadow-sm shadow-slate-900/5 backdrop-blur transition hover:border-slate-300 hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-black/20 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white sm:size-10"
    >
      {isDark ? (
        <svg
          className="size-4 sm:size-[1.125rem]"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M16 11.2A6.5 6.5 0 0 1 8.8 4a6.5 6.5 0 1 0 7.2 7.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className="size-4 sm:size-[1.125rem]"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="10"
            cy="10"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M10 2.5V4M10 16v1.5M2.5 10H4M16 10h1.5M4.7 4.7l1 1M14.3 14.3l1 1M15.3 4.7l-1 1M5.7 14.3l-1 1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  )
}
