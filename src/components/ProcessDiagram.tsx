type Phase = {
  label: string;
  desc: string;
};

type ProcessDiagramProps = {
  phases: Phase[];
};

export function ProcessDiagram({ phases }: ProcessDiagramProps) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {phases.map((phase, index) => (
        <li
          key={phase.label}
          className="relative rounded-2xl bg-white p-5 shadow-[0_12px_30px_rgba(63,77,105,0.08)]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy font-bold text-white">
            {index + 1}
          </div>
          <h3 className="font-sans text-base font-bold text-brand-navy">{phase.label}</h3>
          <p className="mt-2 text-sm text-muted">{phase.desc}</p>
          {index < phases.length - 1 ? (
            <span
              className="pointer-events-none absolute top-1/2 -right-3 hidden text-brand-orange lg:block"
              aria-hidden
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
