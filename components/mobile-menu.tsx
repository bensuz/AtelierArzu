"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { NavItem } from "@/components/nav-links";
import { WhatsAppIcon } from "@/components/whatsapp-button";

type MobileMenuProps = {
  items: NavItem[];
  extras: NavItem[];
  whatsappHref?: string;
  instagramHref?: string;
  instagramHandle?: string;
};

const subscribeNoop = () => () => {};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ items, extras, whatsappHref, instagramHref, instagramHandle }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  // The panel is portalled to <body> so the fixed header (logo + toggle) stays above it.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  // Close after navigation (state reset during render, so no effect-driven re-render).
  const [seenPathname, setSeenPathname] = useState(pathname);
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setOpen(false);
  }

  // Scroll lock, inert background, keyboard handling and focus management while open.
  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      delete root.dataset.menu;
      return;
    }

    root.dataset.menu = "open";
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    background.forEach((el) => el.setAttribute("inert", ""));

    const panel = panelRef.current;
    const button = buttonRef.current;
    const firstLink = panel?.querySelector<HTMLElement>("a[href]");
    const focusTimer = window.setTimeout(() => firstLink?.focus(), 60);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      // Keep focus inside the header button + panel while the menu is open.
      const focusable = [
        button,
        ...Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
      ].filter((el): el is HTMLElement => Boolean(el));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || !focusable.includes(active as HTMLElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 768px)");
    function onViewportChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
      root.style.overflow = previousOverflow;
      background.forEach((el) => el.removeAttribute("inert"));
      delete root.dataset.menu;
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        className="header-menu-button focus-ring relative flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 bg-ivory text-charcoal md:hidden"
      >
        <span className="relative block h-5 w-5">
          <Menu aria-hidden="true" className={`absolute inset-0 h-5 w-5 motion-safe:transition-all motion-safe:duration-200 ${open ? "scale-75 opacity-0" : "scale-100 opacity-100"}`} />
          <X aria-hidden="true" className={`absolute inset-0 h-5 w-5 motion-safe:transition-all motion-safe:duration-200 ${open ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
        </span>
      </button>

      {mounted && createPortal(
      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        aria-hidden={!open}
        className={`mobile-panel fixed inset-0 z-[55] flex flex-col bg-ivory text-charcoal md:hidden ${open ? "mobile-panel-open" : "pointer-events-none"}`}
      >
        <div className="h-[var(--site-header-height)] shrink-0" aria-hidden="true" />
        <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-8 pt-4">
          <nav aria-label="Mobil menü">
            <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {items.map((item, index) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href} className="mobile-panel-item" style={{ "--i": index } as React.CSSProperties}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      tabIndex={open ? 0 : -1}
                      className={`focus-ring flex items-center justify-between rounded-sm py-4 font-serif text-[2rem] leading-none ${active ? "text-burgundy" : "text-charcoal"}`}
                    >
                      {item.label}
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${active ? "bg-burgundy" : "bg-transparent"}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="mt-6 grid gap-1">
              {extras.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="mobile-panel-item" style={{ "--i": items.length + index } as React.CSSProperties}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      tabIndex={open ? 0 : -1}
                      className={`focus-ring inline-block rounded-sm py-2 text-base ${active ? "text-burgundy" : "text-charcoal/75"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mobile-panel-item mt-auto pt-10" style={{ "--i": items.length + extras.length } as React.CSSProperties}>
            {whatsappHref ? (
              <a href={whatsappHref} tabIndex={open ? 0 : -1} className="btn-primary w-full">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp’tan yazın
              </a>
            ) : (
              <Link href="/iletisim" tabIndex={open ? 0 : -1} className="btn-primary w-full">
                Bize yazın
              </Link>
            )}
            {instagramHref && (
              <a
                href={instagramHref}
                target="_blank"
                rel="me noopener"
                tabIndex={open ? 0 : -1}
                className="focus-ring mt-5 inline-flex items-center gap-2 rounded-sm text-sm text-charcoal/70"
              >
                <Instagram aria-hidden="true" className="h-4 w-4" />
                @{instagramHandle}
              </a>
            )}
          </div>
        </div>
      </div>,
        document.body
      )}
    </>
  );
}
