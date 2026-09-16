import { Logo } from "@/components/Logo";
import { Link } from "@/i18n/navigation";

type FooterProps = {
  labels: {
    tagline: string;
    institutional: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
    trademark: string;
    email: string;
    phone: string;
    home: string;
    programs: string;
    howItWorks: string;
    whoWeServe: string;
    about: string;
    contact: string;
  };
  year: number;
};

export function Footer({ labels, year }: FooterProps) {
  const institutional = [
    { href: "/", label: labels.home },
    { href: "/programs", label: labels.programs },
    { href: "/how-it-works", label: labels.howItWorks },
    { href: "/who-we-serve", label: labels.whoWeServe },
    { href: "/about", label: labels.about },
    { href: "/contact", label: labels.contact },
  ];

  return (
    <footer className="mt-auto border-t border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-brand-navy text-white">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-sm text-sm leading-relaxed text-white/75">{labels.tagline}</p>
          <div className="space-y-1 text-sm text-white/80">
            <a className="block hover:text-white" href={`mailto:${labels.email}`}>
              {labels.email}
            </a>
            <a className="block hover:text-white" href={`tel:${labels.phone.replace(/\s/g, "")}`}>
              {labels.phone}
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-bold tracking-wide text-white uppercase">
            {labels.institutional}
          </h2>
          <ul className="space-y-2 text-sm text-white/80">
            {institutional.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-bold tracking-wide text-white uppercase">
            {labels.legal}
          </h2>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/privacy" className="hover:text-white">
                {labels.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                {labels.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>{labels.copyright.replace("{year}", String(year))}</p>
          <p className="font-semibold text-white/85">{labels.trademark}</p>
        </div>
      </div>
    </footer>
  );
}
