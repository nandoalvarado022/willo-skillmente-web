import { Logo } from "@/components/Logo";
import { getNavItems, type NavLabels } from "@/config/navigation";
import { Link } from "@/i18n/navigation";

type HeaderProps = {
  labels: NavLabels & {
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  languageSwitcher: React.ReactNode;
  mobileMenu: React.ReactNode;
};

export function Header({ labels, languageSwitcher, mobileMenu }: HeaderProps) {
  const items = getNavItems(labels);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-md">
      <div className="relative container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="SkillMente home" className="shrink-0">
          <Logo light />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[color-mix(in_srgb,var(--brand-paper)_72%,transparent)] transition hover:text-[var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">
            {labels.cta}
          </Link>
          {languageSwitcher}
          {mobileMenu}
        </div>
      </div>
    </header>
  );
}
