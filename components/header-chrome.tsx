"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SCROLL_THRESHOLD = 40;

/**
 * Sets `data-header` on <html>: "transparent" while the homepage hero is at the top of the
 * viewport, "solid" everywhere else. The header's colours are driven from CSS by this attribute.
 */
export function HeaderChrome() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const canBeTransparent = pathname === "/";
    let ticking = false;

    function apply() {
      ticking = false;
      root.dataset.header = canBeTransparent && window.scrollY < SCROLL_THRESHOLD ? "transparent" : "solid";
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.dataset.header = "solid";
    };
  }, [pathname]);

  return null;
}
