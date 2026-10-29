type LogoProps = {
  className?: string
}

const GRADIENT_ID = 'nettax-logo-gradient'

export function Logo({ className = 'size-12' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Logo Nettax"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={GRADIENT_ID}
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1D4ED8" />
          <stop offset="1" stopColor="#0B1F3A" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill={`url(#${GRADIENT_ID})`} />
      <path
        d="M15 33V15l18 18V15"
        stroke="#22D3EE"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
