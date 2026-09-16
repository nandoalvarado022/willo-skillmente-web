import { Logo } from "@/components/Logo";
import { Link } from "@/i18n/navigation";

type NavItem = {
  href: string;
  label: string;
};

type HeaderProps = {
  labels: {
    home: string;
    programs: string;
    howItWorks: string;
    whoWeServe: string;
    about: string;
    contact: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  languageSwitcher: React.ReactNode;
  mobileMenu: React.ReactNode;
};

export function Header({ labels, languageSwitcher, mobileMenu }: HeaderProps) {
  const items: NavItem[] = [
    { href: "/", label: labels.home },
    { href: "/programs", label: labels.programs },
    { href: "/how-it-works", label: labels.howItWorks },
    { href: "/who-we-serve", label: labels.whoWeServe },
    { href: "/about", label: labels.about },
    { href: "/contact", label: labels.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-[color-mix(in_srgb,var(--brand-cream)_92%,white)]/95 backdrop-blur-md">
      <div className="relative container-site flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" aria-label="SkillMente home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-brand-navy transition hover:bg-white hover:text-brand-navy-deep"
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
