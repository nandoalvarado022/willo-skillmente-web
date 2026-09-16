type LogoProps = {
  light?: boolean;
  className?: string;
};

export function Logo({ light = false, className = "" }: LogoProps) {
  const mark = light ? "#ed6521" : "#ed6521";
  const text = light ? "#ffffff" : "#3f4d69";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <rect width="34" height="34" rx="10" fill={light ? "#ffffff14" : "#3f4d69"} />
        <path
          d="M10 22.5c3.2-6.4 5.6-9.6 7-9.6s3.8 3.2 7 9.6"
          stroke={mark}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="17" cy="11" r="2.2" fill={mark} />
      </svg>
      <span
        className="font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-tight"
        style={{ color: text }}
      >
        SkillMente
      </span>
    </span>
  );
}
