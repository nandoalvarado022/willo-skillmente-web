type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-[linear-gradient(160deg,#f2eee9,#fff)]">
      <div className="container-site max-w-3xl py-14 lg:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg text-muted">{subtitle}</p>
      </div>
    </section>
  );
}
