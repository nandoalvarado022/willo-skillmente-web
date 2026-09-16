import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroMockups } from "@/components/HeroMockups";
import { ProcessDiagram } from "@/components/ProcessDiagram";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const phases = [
    t.raw("process.phases.learn") as { label: string; desc: string },
    t.raw("process.phases.practice") as { label: string; desc: string },
    t.raw("process.phases.engage") as { label: string; desc: string },
    t.raw("process.phases.track") as { label: string; desc: string },
    t.raw("process.phases.measure") as { label: string; desc: string },
  ];

  const modalities = ["digital", "group", "individual", "blended"] as const;
  const skillpathItems = t.raw("programs.skillpath.items") as string[];
  const parentingStats = t.raw("programs.skillparenting.stats") as string[];

  return (
    <>
      <section className="overflow-hidden border-b border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-[linear-gradient(160deg,#f2eee9_0%,#fff_48%,#f7f1ea_100%)]">
        <div className="container-site grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="fade-up max-w-xl">
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem]">{t("hero.title")}</h1>
            <p className="mt-5 text-base text-muted sm:text-lg">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/programs" className="btn btn-primary">
                {t("hero.ctaPrimary")}
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>
          <HeroMockups
            label={t("hero.mockupLabel")}
            mission={t("hero.mockupMission")}
            progress={t("hero.mockupProgress")}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow">{t("process.eyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl">{t("process.title")}</h2>
            <p className="mt-4 text-muted">{t("process.subtitle")}</p>
          </div>
          <ProcessDiagram phases={phases} />

          <div className="mt-14">
            <h3 className="mb-6 text-center font-sans text-lg font-bold text-brand-navy">
              {t("process.modalitiesTitle")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modalities.map((key) => (
                <article key={key} className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(63,77,105,0.08)]">
                  <h4 className="font-sans text-base font-bold text-brand-navy">
                    {t(`process.modalities.${key}.title`)}
                  </h4>
                  <p className="mt-2 text-sm text-muted">{t(`process.modalities.${key}.desc`)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow">{t("programs.eyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl">{t("programs.title")}</h2>
            <p className="mt-4 text-muted">{t("programs.subtitle")}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="surface-card flex flex-col p-6 sm:p-8">
              <span className="w-fit rounded-full bg-brand-cream px-3 py-1 text-xs font-bold text-brand-navy">
                {t("programs.skillpath.badge")}
              </span>
              <h3 className="mt-4 font-sans text-2xl font-bold text-brand-navy">
                {t("programs.skillpath.title")}
              </h3>
              <p className="mt-3 text-muted">{t("programs.skillpath.desc")}</p>
              <ul className="mt-5 space-y-2 text-sm text-brand-navy">
                {skillpathItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-orange">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Link href="/programs#skillpath" className="btn btn-primary">
                  {t("programs.skillpath.cta")}
                </Link>
              </div>
            </article>

            <article className="surface-card flex flex-col p-6 sm:p-8">
              <span className="w-fit rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-bold text-brand-orange">
                {t("programs.skillparenting.badge")}
              </span>
              <h3 className="mt-4 font-sans text-2xl font-bold text-brand-navy">
                {t("programs.skillparenting.title")}
              </h3>
              <p className="mt-3 text-muted">{t("programs.skillparenting.desc")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {parentingStats.map((stat) => (
                  <span
                    key={stat}
                    className="rounded-full border border-[color-mix(in_srgb,var(--brand-navy)_14%,transparent)] px-3 py-1 text-xs font-semibold text-brand-navy"
                  >
                    {stat}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <Link href="/programs#skillparenting" className="btn btn-primary">
                  {t("programs.skillparenting.cta")}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow">{t("implementation.eyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl">{t("implementation.title")}</h2>
            <p className="mt-4 text-muted">{t("implementation.subtitle")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(["implement", "engage", "measure"] as const).map((key, index) => (
              <article
                key={key}
                className="rounded-2xl bg-brand-navy p-6 text-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-sm font-bold text-brand-orange">0{index + 1}</p>
                <h3 className="mt-3 font-sans text-xl font-bold">
                  {t(`implementation.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm text-white/75">
                  {t(`implementation.items.${key}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site">
          <div className="overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#3f4d69_0%,#2c3649_60%,#ed6521_160%)] px-6 py-12 text-center text-white sm:px-10">
            <h2 className="text-3xl text-white sm:text-4xl">{t("finalCta.title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">{t("finalCta.subtitle")}</p>
            <Link href="/contact" className="btn btn-primary mt-8">
              {t("finalCta.cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
