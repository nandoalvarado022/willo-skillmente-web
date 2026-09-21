type HeroMockupsProps = {
  label: string;
  mission: string;
  progress: string;
  dayLabel: string;
  prompt: string;
  skillsPracticed: string;
  processMap: string;
};

export function HeroMockups({
  label,
  mission,
  progress,
  dayLabel,
  prompt,
  skillsPracticed,
  processMap,
}: HeroMockupsProps) {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0">
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(237,101,33,0.18),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(63,77,105,0.16),transparent_50%)]" />

      <div className="relative animate-float surface-card overflow-hidden p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-wide text-brand-orange uppercase">
              {label}
            </p>
            <p className="text-sm text-muted">{mission}</p>
          </div>
          <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-navy">
            {dayLabel}
          </span>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl bg-brand-navy p-4 text-white">
            <p className="text-sm text-white/70">{mission}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl">
              {prompt}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-2/3 rounded-full bg-brand-orange" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-brand-cream p-4">
              <p className="text-xs font-semibold text-muted">{progress}</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-brand-navy">
                86%
              </p>
            </div>
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] p-4">
              <p className="text-xs font-semibold text-muted">{skillsPracticed}</p>
              <div className="mt-3 flex gap-1.5">
                {["R", "C", "D"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange/15 text-xs font-bold text-brand-orange"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--brand-navy)_20%,transparent)] p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-navy/10" />
              <div className="flex-1 space-y-2">
                <div className="h-2.5 w-3/4 rounded-full bg-brand-navy/10" />
                <div className="h-2.5 w-1/2 rounded-full bg-brand-navy/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-2 -bottom-4 w-[58%] animate-draw rounded-2xl border border-white/70 bg-white/95 p-3 shadow-[0_16px_40px_rgba(63,77,105,0.18)] sm:-right-6">
        <p className="text-[0.65rem] font-bold tracking-wide text-brand-orange uppercase">
          {processMap}
        </p>
        <div className="mt-2 flex items-center gap-1 text-[0.65rem] font-semibold text-brand-navy">
          {["L", "P", "E", "T", "M"].map((step, index) => (
            <div key={step} className="flex items-center gap-1">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cream">
                {step}
              </span>
              {index < 4 ? <span className="text-brand-navy/30">→</span> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
