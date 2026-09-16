"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--brand-navy)_18%,transparent)] bg-white p-1"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchLocale(code)}
            className={`min-w-10 rounded-full px-2.5 py-1.5 text-xs font-bold uppercase transition ${
              active
                ? "bg-brand-navy text-white"
                : "text-brand-navy-soft hover:text-brand-navy"
            }`}
            aria-pressed={active}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
