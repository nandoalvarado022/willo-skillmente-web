"use client";

import { useState } from "react";
import type { NavItem } from "@/config/navigation";
import { Link } from "@/i18n/navigation";

type MobileMenuProps = {
  items: NavItem[];
  cta: string;
  openLabel: string;
  closeLabel: string;
};

export function MobileMenu({ items, cta, openLabel, closeLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 z-50 border-b border-[var(--line)] bg-[var(--bg)] px-4 py-4 shadow-lg"
        >
          <nav className="container-site flex flex-col gap-1" aria-label="Mobile">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-[var(--ink)] hover:bg-[var(--surface)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn-primary mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              {cta}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
