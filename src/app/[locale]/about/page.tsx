import { setRequestLocale, getTranslations } from "next-intl/server";
import { TeamGrid } from "@/components/TeamGrid";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const members = [
    {
      name: t("team.members.mayuri.name"),
      role: t("team.members.mayuri.role"),
      bio: t("team.members.mayuri.bio"),
      initials: "MM",
    },
    {
      name: t("team.members.enrique.name"),
      role: t("team.members.enrique.role"),
      bio: t("team.members.enrique.bio"),
      initials: "EM",
    },
  ];

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
        <div className="container-site grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="text-3xl">{t("why.title")}</h2>
            <p className="mt-4 text-muted">{t("why.body")}</p>
          </div>
          <div className="rounded-2xl bg-brand-navy p-6 text-white sm:p-8">
            <h3 className="font-sans text-xl font-bold text-white">{t("vision.title")}</h3>
            <ul className="mt-5 space-y-4">
              {(["scale", "micro", "impact"] as const).map((key) => (
                <li key={key}>
                  <p className="font-semibold text-brand-orange">
                    {t(`vision.items.${key}.title`)}
                  </p>
                  <p className="mt-1 text-sm text-white/75">{t(`vision.items.${key}.desc`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl">{t("team.title")}</h2>
            <p className="mt-3 text-muted">{t("team.subtitle")}</p>
          </div>
          <TeamGrid members={members} />
        </div>
      </section>
    </>
  );
}
