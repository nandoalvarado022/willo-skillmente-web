import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("howItWorks");
  const steps = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;

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
        <div className="container-site">
          <ol className="relative space-y-5 before:absolute before:top-4 before:bottom-4 before:left-[1.15rem] before:w-px before:bg-[color-mix(in_srgb,var(--brand-navy)_18%,transparent)] md:before:left-1/2">
            {steps.map((key, index) => (
              <li
                key={key}
                className={`relative grid gap-4 md:grid-cols-2 md:gap-10 ${
                  index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className={`flex items-start gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                  <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange font-bold text-white shadow-lg">
                    {index + 1}
                  </span>
                  <div className={`surface-card max-w-md p-5 ${index % 2 === 1 ? "md:text-right" : ""}`}>
                    <h2 className="font-sans text-xl font-bold text-brand-navy">
                      {t(`steps.${key}.title`)}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{t(`steps.${key}.desc`)}</p>
                  </div>
                </div>
                <div className="hidden md:block" aria-hidden />
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-[1.5rem] bg-brand-navy px-6 py-10 text-center text-white">
            <h2 className="text-2xl text-white sm:text-3xl">{t("cta.title")}</h2>
            <Link href="/contact" className="btn btn-primary mt-6">
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
