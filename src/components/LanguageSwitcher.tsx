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
      className="inline-flex items-center rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_70%,black)] p-0.5"
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
            className={`min-w-9 rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-wide uppercase transition ${
              active
                ? "bg-[var(--surface)] text-[var(--ink)]"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
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
