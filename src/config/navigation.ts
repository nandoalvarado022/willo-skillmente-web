export const NAV_ROUTES = [
  { href: "/", labelKey: "home" },
  { href: "/programs", labelKey: "programs" },
  { href: "/how-it-works", labelKey: "howItWorks" },
  { href: "/who-we-serve", labelKey: "whoWeServe" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
] as const;

export type NavLabelKey = (typeof NAV_ROUTES)[number]["labelKey"];

export type NavLabels = Record<NavLabelKey, string>;

export type NavItem = {
  href: string;
  label: string;
};

export function getNavItems(labels: NavLabels): NavItem[] {
  return NAV_ROUTES.map(({ href, labelKey }) => ({
    href,
    label: labels[labelKey],
  }));
}
