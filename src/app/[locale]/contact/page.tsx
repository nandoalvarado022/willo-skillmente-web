import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

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
        <div className="container-site grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ContactForm
            labels={{
              fullName: t("form.fullName"),
              organization: t("form.organization"),
              role: t("form.role"),
              email: t("form.email"),
              phone: t("form.phone"),
              interests: t("form.interests"),
              interestOptions: {
                skillpath: t("form.interestOptions.skillpath"),
                skillparenting: t("form.interestOptions.skillparenting"),
                pilot: t("form.interestOptions.pilot"),
                licensing: t("form.interestOptions.licensing"),
                ttt: t("form.interestOptions.ttt"),
                partnership: t("form.interestOptions.partnership"),
                other: t("form.interestOptions.other"),
              },
              message: t("form.message"),
              submit: t("form.submit"),
              sending: t("form.sending"),
              successTitle: t("form.successTitle"),
              successBody: t("form.successBody"),
              errorTitle: t("form.errorTitle"),
              errorBody: t("form.errorBody"),
              required: t("form.required"),
              invalidEmail: t("form.invalidEmail"),
              selectInterest: t("form.selectInterest"),
            }}
          />

          <aside className="h-fit rounded-2xl bg-brand-navy p-6 text-white sm:p-8">
            <h2 className="font-sans text-xl font-bold text-white">{t("aside.title")}</h2>
            <a
              className="mt-4 block text-brand-orange hover:underline"
              href={`mailto:${t("aside.email")}`}
            >
              {t("aside.email")}
            </a>
            <a
              className="mt-2 block text-white/85 hover:text-white"
              href={`tel:${t("aside.phone").replace(/\s/g, "")}`}
            >
              {t("aside.phone")}
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
