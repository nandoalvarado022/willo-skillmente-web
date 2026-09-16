import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function WhoWeServePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("whoWeServe");
  const segments = ["nonprofit", "youth", "schools", "government"] as const;

  return (
    <>
      <section className="border-b border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-[linear-gradient(160deg,#f2eee9,#fff)]">
        <div className="container-site max-w-3xl py-14 lg:py-20">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="text-4xl sm:text-5xl">{t("hero.title")}</h1>
          <p className="mt-5 text-lg text-muted">{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {segments.map((key, index) => (
            <article key={key} className="surface-card p-6 sm:p-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cream font-bold text-brand-navy">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h2 className="font-sans text-xl font-bold text-brand-navy">
                {t(`segments.${key}.title`)}
              </h2>
              <p className="mt-3 text-muted">{t(`segments.${key}.desc`)}</p>
            </article>
          ))}
        </div>

        <div className="container-site mt-12">
          <div className="rounded-[1.5rem] bg-white px-6 py-10 text-center shadow-[0_16px_40px_rgba(63,77,105,0.08)]">
            <h2 className="text-2xl sm:text-3xl">{t("cta.title")}</h2>
            <Link href="/contact" className="btn btn-primary mt-6">
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
