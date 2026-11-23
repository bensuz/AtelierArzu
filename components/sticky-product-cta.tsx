"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/whatsapp-button";

type StickyProductCtaProps = {
  href?: string;
  price: string;
  name: string;
  /** id of the in-page CTA; the bar hides while that CTA or the footer is visible. */
  watchId: string;
};

export function StickyProductCta({ href, price, name, watchId }: StickyProductCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    const footer = document.querySelector("footer");
    if (!target) return;
    const state = { ctaVisible: true, footerVisible: false };
    const update = () => setVisible(!state.ctaVisible && !state.footerVisible);
    const ctaObserver = new IntersectionObserver(([entry]) => { state.ctaVisible = entry.isIntersecting; update(); });
    ctaObserver.observe(target);
    let footerObserver: IntersectionObserver | undefined;
    if (footer) {
      footerObserver = new IntersectionObserver(([entry]) => { state.footerVisible = entry.isIntersecting; update(); });
      footerObserver.observe(footer);
    }
    return () => {
      ctaObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, [watchId]);

  if (!href) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-burgundy/10 bg-ivory/95 px-4 pt-3 backdrop-blur lg:hidden motion-safe:transition-transform motion-safe:duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-serif text-xl leading-tight text-charcoal">{name}</p>
          <p className="text-sm font-semibold text-charcoal/80">{price}</p>
        </div>
        <a href={href} tabIndex={visible ? 0 : -1} className="btn-primary shrink-0 !px-5">
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp’tan sor
        </a>
      </div>
    </div>
  );
}
