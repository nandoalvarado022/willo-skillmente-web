import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <section className="section">
      <div className="container-site max-w-3xl">
        <h1 className="text-4xl">{t("title")}</h1>
        <p className="mt-3 text-sm text-muted">{t("updated")}</p>
        <p className="mt-8 text-muted">{t("body")}</p>
      </div>
    </section>
  );
}
