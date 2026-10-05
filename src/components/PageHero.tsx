type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="container-site max-w-3xl py-16 lg:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{subtitle}</p>
      </div>
    </section>
  );
}
