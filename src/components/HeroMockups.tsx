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
      <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(237,101,33,0.22),transparent_52%)]" />

      <div className="animate-float relative overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_92%,black)] shadow-[0_28px_70px_rgba(8,12,20,0.45)]">
        <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
          <span className="size-2.5 rounded-full bg-brand-orange" />
          <span className="size-2.5 rounded-full bg-brand-cream/45" />
          <span className="size-2.5 rounded-full bg-brand-paper/20" />
          <p className="flex-1 text-center text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">
            {label}
          </p>
          <span className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[0.65rem] font-semibold text-brand-paper">
            {dayLabel}
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:p-5">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">{mission}</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-ink">{prompt}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-brand-paper/10">
              <div className="h-full w-2/3 rounded-full bg-brand-orange" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">{progress}</p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-brand-orange">86%</p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                {skillsPracticed}
              </p>
              <div className="mt-3 flex gap-1.5">
                {["R", "C", "D"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand-orange)_45%,transparent)] text-xs font-bold text-brand-orange-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="text-[0.65rem] font-bold tracking-[0.14em] text-brand-orange-soft uppercase">
              {processMap}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.7rem] font-semibold text-brand-paper">
              {["L", "P", "E", "T", "M"].map((step, index) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--bg)]">
                    {step}
                  </span>
                  {index < 4 ? <span className="text-brand-paper/35">→</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
