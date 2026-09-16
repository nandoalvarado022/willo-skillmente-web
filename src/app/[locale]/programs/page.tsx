import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programs");

  const skillpathKeys = ["foundations", "circle1", "circle2", "softSkills"] as const;
  const parentingKeys = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;
  const tttPoints = t.raw("ttt.points") as string[];

  return (
    <>
      <section className="border-b border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-[linear-gradient(160deg,#f2eee9,#fff)]">
        <div className="container-site max-w-3xl py-14 lg:py-20">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="text-4xl sm:text-5xl">{t("hero.title")}</h1>
          <p className="mt-5 text-lg text-muted">{t("hero.subtitle")}</p>
        </div>
      </section>

      <section id="skillpath" className="section scroll-mt-24">
        <div className="container-site">
          <h2 className="text-3xl sm:text-4xl">{t("skillpath.title")}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t("skillpath.subtitle")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {skillpathKeys.map((key) => (
              <article key={key} className="surface-card p-6">
                <h3 className="font-sans text-xl font-bold text-brand-navy">
                  {t(`skillpath.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm font-semibold text-brand-orange">
                  {t(`skillpath.items.${key}.meta`)}
                </p>
                <p className="mt-3 text-sm text-muted">{t(`skillpath.items.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skillparenting" className="section scroll-mt-24 bg-white">
        <div className="container-site">
          <h2 className="text-3xl sm:text-4xl">{t("skillparenting.title")}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t("skillparenting.subtitle")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {parentingKeys.map((key, index) => (
              <article key={key} className="rounded-2xl border border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-brand-cream/40 p-6">
                <p className="text-xs font-bold tracking-wide text-brand-orange uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-sans text-lg font-bold text-brand-navy">
                  {t(`skillparenting.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm font-semibold text-brand-navy-soft">
                  {t(`skillparenting.items.${key}.focus`)}
                </p>
                <p className="mt-3 text-sm text-muted">{t(`skillparenting.items.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div className="surface-card grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow">{t("ttt.eyebrow")}</p>
              <h2 className="text-3xl">{t("ttt.title")}</h2>
              <p className="mt-4 text-muted">{t("ttt.subtitle")}</p>
              <ul className="mt-6 space-y-3 text-sm text-brand-navy">
                {tttPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-brand-orange">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-navy p-8 text-center text-white">
              <Link href="/contact" className="btn btn-primary">
                {t("ttt.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
