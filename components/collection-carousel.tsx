"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export function CollectionCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const trackId = useId();
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const list = track.current;
    if (!list) return;

    function update() {
      if (!list) return;
      const start = list.scrollLeft <= 2;
      const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 2;
      setEdges((current) => current.start === start && current.end === end ? current : { start, end });
    }

    const observer = new ResizeObserver(update);
    observer.observe(list);
    list.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: -1 | 1) {
    const list = track.current;
    if (!list || (direction === -1 ? edges.start : edges.end)) return;
    const positions = Array.from(list.children, (item) => (item as HTMLElement).offsetLeft);
    const position = direction === 1
      ? positions.find((left) => left > list.scrollLeft + 2)
      : positions.findLast((left) => left < list.scrollLeft - 2);
    if (position !== undefined) list.scrollTo({ left: position });
  }

  const buttonClass = "focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 bg-ivory text-charcoal hover:border-burgundy hover:text-burgundy aria-disabled:cursor-default aria-disabled:opacity-30 motion-safe:transition-colors";

  return (
    <div>
      <div className="mb-5 flex justify-end gap-2">
        <button type="button" className={buttonClass} aria-label="Önceki model" aria-controls={trackId} aria-disabled={edges.start} onClick={() => move(-1)}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button type="button" className={buttonClass} aria-label="Sonraki model" aria-controls={trackId} aria-disabled={edges.end} onClick={() => move(1)}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
      <ul
        ref={track}
        id={trackId}
        aria-label="Koleksiyon modelleri"
        className="collection-track relative flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 pt-1 sm:gap-6 motion-safe:scroll-smooth"
      >
        {children}
      </ul>
    </div>
  );
}
