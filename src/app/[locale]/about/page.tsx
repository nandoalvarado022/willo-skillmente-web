import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
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
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

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
