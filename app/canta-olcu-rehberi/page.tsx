import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = publicPageMetadata({
  title: "Kroşe Çanta Ölçü Rehberi",
  description: "Mini kroşe çantaya ne sığar? Çantanın genişliğini, ağız açıklığını ve askı boyunu kendi eşyalarınızla nasıl karşılaştıracağınızı öğrenin.",
  path: "/canta-olcu-rehberi"
});

export default function BagSizeGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-5xl font-semibold leading-none sm:text-7xl">Kroşe çanta ölçü rehberi</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          Yanınızda en çok taşıdığınız eşyaları çıkarın. Yalnızca çantanın dış ölçülerine
          bakmak yerine, bu eşyaların çantanın ağzından geçip geçmeyeceğini de düşünün.
        </p>
      </header>
      <div className="mt-9 grid gap-4 md:grid-cols-3">
        <section className="rounded-lg border border-ink/10 bg-linen p-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight">İçine ne sığar?</h2>
          <p className="mt-3 leading-7 text-ink/75">
            Telefonu kılıfıyla, cüzdanı dolu hâliyle ölçün. Astar ve örgü kalınlığı
            kullanılabilir iç alanı etkileyebilir. Anahtarınızı da ekleyip eşyaların
            birlikte ne kadar yer kapladığına bakın.
          </p>
        </section>
        <section className="rounded-lg border border-ink/10 bg-linen p-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight">Ağız açıklığı</h2>
          <p className="mt-3 leading-7 text-ink/75">
            Gövdenin en geniş yeriyle çantanın girişi farklı olabilir. Sert ve uzun
            bir eşya taşıyacaksanız düz biçimde girişten geçebildiğini kontrol edin.
          </p>
        </section>
        <section className="rounded-lg border border-ink/10 bg-linen p-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight">Askı boyu</h2>
          <p className="mt-3 leading-7 text-ink/75">
            Rahat kullandığınız bir çantayı referans alın. Askının toplam boyu ile
            askının tepe noktası ve çantanın üst kenarı arasındaki düşüş farklı ölçülerdir.
          </p>
        </section>
      </div>
      <p className="mt-8 max-w-2xl leading-7 text-ink/75">
        Emin değilseniz modelin adını ve taşımak istediğiniz eşyanın ölçüsünü bize gönderin.
      </p>
      <div className="mt-5 flex flex-wrap gap-5">
        <Link href="/urunler" className="focus-ring rounded-sm font-semibold underline underline-offset-4 hover:text-[#741616]">
          Model ölçülerini karşılaştır
        </Link>
        <Link href="/iletisim" className="focus-ring rounded-sm font-semibold underline underline-offset-4 hover:text-[#741616]">
          Ölçü hakkında soru sor
        </Link>
      </div>
    </article>
  );
}
