import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl border border-ink/10 bg-shell md:grid-cols-[0.8fr_1.2fr]">
        <div className="grid min-h-48 place-items-center bg-linen p-8 sm:p-12">
          <Image
            src="/images/arzudan-monogram.png"
            alt=""
            width={706}
            height={422}
            sizes="(min-width: 768px) 240px, 176px"
            className="h-auto w-44 md:w-60"
          />
        </div>
        <div className="p-8 sm:p-14 md:py-20">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#741616]">404</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-none text-ink sm:text-6xl">
            Bu sayfayı bulamadık.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-ink/75">
            Bağlantı değişmiş olabilir. Ana sayfaya dönebilir ya da Arzu’nun koleksiyonunu
            keşfedebilirsiniz.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/" className="focus-ring inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2 text-sm font-semibold text-shell hover:bg-[#44372e] motion-safe:transition-colors">
              Ana sayfaya dön
            </Link>
            <Link href="/urunler" className="focus-ring inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold transition-colors hover:bg-linen">
              Koleksiyonu incele
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
