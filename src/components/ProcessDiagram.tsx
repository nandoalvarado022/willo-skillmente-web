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
          className="surface-card relative p-5 shadow-none"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p className="mb-4 text-sm font-bold tracking-[0.14em] text-brand-orange">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="font-sans text-base font-bold">{phase.label}</h3>
          <p className="mt-2 text-sm text-muted">{phase.desc}</p>
        </li>
      ))}
    </ol>
  );
}
