type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

type TeamGridProps = {
  members: TeamMember[];
};

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <li key={member.name} className="surface-card p-6">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--line)] bg-brand-navy text-xl font-bold text-brand-paper">
            {member.initials}
          </div>
          <h3 className="font-sans text-lg font-bold">{member.name}</h3>
          <p className="mt-1 text-sm font-semibold text-brand-orange">{member.role}</p>
          <p className="mt-3 text-sm text-muted">{member.bio}</p>
        </li>
      ))}
    </ul>
  );
}
