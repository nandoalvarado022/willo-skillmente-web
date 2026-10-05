import { Logo } from "@/components/Logo";
import { getNavItems, type NavLabels } from "@/config/navigation";
import { Link } from "@/i18n/navigation";

type FooterProps = {
  labels: NavLabels & {
    tagline: string;
    institutional: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
    trademark: string;
    email: string;
    phone: string;
  };
  year: number;
};

export function Footer({ labels, year }: FooterProps) {
  const institutional = getNavItems(labels);

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-brand-navy text-brand-paper">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-sm text-sm leading-relaxed text-brand-paper/75">{labels.tagline}</p>
          <div className="space-y-1 text-sm text-brand-paper/80">
            <a className="block hover:text-brand-paper" href={`mailto:${labels.email}`}>
              {labels.email}
            </a>
            <a className="block hover:text-brand-paper" href={`tel:${labels.phone.replace(/\s/g, "")}`}>
              {labels.phone}
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-bold tracking-[0.14em] text-brand-paper uppercase">
            {labels.institutional}
          </h2>
          <ul className="space-y-2 text-sm text-brand-paper/75">
            {institutional.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-bold tracking-[0.14em] text-brand-paper uppercase">
            {labels.legal}
          </h2>
          <ul className="space-y-2 text-sm text-brand-paper/75">
            <li>
              <Link href="/privacy" className="hover:text-brand-paper">
                {labels.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-brand-paper">
                {labels.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-paper/10">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-brand-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <p>{labels.copyright.replace("{year}", String(year))}</p>
          <p className="font-semibold text-brand-paper/85">{labels.trademark}</p>
        </div>
      </div>
    </footer>
  );
}
