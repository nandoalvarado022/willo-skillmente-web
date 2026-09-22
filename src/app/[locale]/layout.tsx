import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Fraunces, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { getNavItems } from "@/config/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");

  const navLabels = {
    home: tNav("home"),
    programs: tNav("programs"),
    howItWorks: tNav("howItWorks"),
    whoWeServe: tNav("whoWeServe"),
    about: tNav("about"),
    contact: tNav("contact"),
    cta: tNav("cta"),
    openMenu: tNav("openMenu"),
    closeMenu: tNav("closeMenu"),
  };

  const mobileItems = getNavItems(navLabels);

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="relative">
            <Header
              labels={navLabels}
              languageSwitcher={<LanguageSwitcher />}
              mobileMenu={
                <MobileMenu
                  items={mobileItems}
                  cta={navLabels.cta}
                  openLabel={navLabels.openMenu}
                  closeLabel={navLabels.closeMenu}
                />
              }
            />
          </div>
          <main className="flex-1">{children}</main>
          <Footer
            year={new Date().getFullYear()}
            labels={{
              tagline: tFooter("tagline"),
              institutional: tFooter("institutional"),
              legal: tFooter("legal"),
              privacy: tFooter("privacy"),
              terms: tFooter("terms"),
              copyright: tFooter("copyright"),
              trademark: tFooter("trademark"),
              email: tFooter("email"),
              phone: tFooter("phone"),
              home: navLabels.home,
              programs: navLabels.programs,
              howItWorks: navLabels.howItWorks,
              whoWeServe: navLabels.whoWeServe,
              about: navLabels.about,
              contact: navLabels.contact,
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
