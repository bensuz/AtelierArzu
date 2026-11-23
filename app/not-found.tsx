import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-8 lg:py-28">
      <div className="grid place-items-center rounded-lg bg-cream p-10">
        <Image
          src="/images/arzudan-monogram.png"
          alt=""
          width={706}
          height={422}
          sizes="(min-width: 768px) 220px, 160px"
          className="h-auto w-40 md:w-56"
        />
      </div>
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.98] text-charcoal sm:text-6xl">Bu sayfayı bulamadım.</h1>
        <p className="mt-5 max-w-md text-base leading-7 text-charcoal/75">
          Bağlantı değişmiş olabilir. Ana sayfaya dönebilir ya da koleksiyona göz atabilirsiniz.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">Ana sayfaya dön</Link>
          <Link href="/urunler" className="btn-secondary">Koleksiyonu incele</Link>
        </div>
      </div>
    </section>
  );
}
