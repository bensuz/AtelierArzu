"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryImage = { src: string; alt: string };

export function ProductGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const current = images[Math.min(index, images.length - 1)] ?? images[0];
  const multiple = images.length > 1;

  const step = useCallback(
    (direction: -1 | 1) => setIndex((value) => (value + direction + images.length) % images.length),
    [images.length]
  );

  function openLightbox() {
    const element = dialog.current;
    if (!element || element.open) return;
    element.showModal();
    setOpen(true);
  }

  function closeLightbox() {
    dialog.current?.close();
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <div className={multiple ? "flex min-w-0 flex-col lg:grid lg:grid-cols-[72px_1fr] lg:gap-4" : "min-w-0"}>
      {multiple && (
        <ul
          aria-label={`${name} fotoğrafları`}
          className="thumb-strip order-2 mt-3 flex w-full min-w-0 max-w-full gap-2 overflow-x-auto pb-1 lg:order-1 lg:mt-0 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {images.map((image, i) => (
            <li key={`${image.src}-${i}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}. fotoğrafı göster`}
                aria-current={i === index ? "true" : undefined}
                className={`focus-ring relative block h-[72px] w-[58px] overflow-hidden rounded-[0.25rem] bg-cream ring-1 ring-inset motion-safe:transition-[box-shadow,opacity] ${
                  i === index ? "ring-burgundy" : "opacity-75 ring-charcoal/10 hover:opacity-100"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="72px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <figure className="order-1 m-0 lg:order-2">
        <div className="image-frame aspect-[4/5]">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <button
            type="button"
            onClick={openLightbox}
            aria-label="Fotoğrafı büyüt"
            className="focus-ring absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-charcoal shadow-sm backdrop-blur hover:bg-ivory"
          >
            <Maximize2 aria-hidden="true" className="h-4 w-4" />
          </button>
          {multiple && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Önceki fotoğraf"
                className="focus-ring absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/85 text-charcoal shadow-sm backdrop-blur hover:bg-ivory lg:hidden"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Sonraki fotoğraf"
                className="focus-ring absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/85 text-charcoal shadow-sm backdrop-blur hover:bg-ivory lg:hidden"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
              <span className="absolute bottom-3 left-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-xs font-medium text-ivory lg:hidden" aria-live="polite">
                {index + 1} / {images.length}
              </span>
            </>
          )}
        </div>
        <figcaption className="sr-only">{current.alt}</figcaption>
      </figure>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialog.current) closeLightbox();
        }}
        aria-label={`${name} büyük fotoğraf`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-charcoal/95 p-0 text-ivory backdrop:bg-charcoal/80"
      >
        {open && (
          <div className="relative flex h-full w-full flex-col items-center justify-center p-4 sm:p-10">
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Kapat"
              className="focus-ring absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="relative h-[80dvh] w-full max-w-4xl">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            {multiple && (
              <div className="mt-4 flex items-center gap-4 text-sm">
                <button type="button" onClick={() => step(-1)} aria-label="Önceki fotoğraf" className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20">
                  <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>
                <span aria-live="polite">{index + 1} / {images.length}</span>
                <button type="button" onClick={() => step(1)} aria-label="Sonraki fotoğraf" className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20">
                  <ChevronRight aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
