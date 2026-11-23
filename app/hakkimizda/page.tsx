import { publicPageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { optionalImage } from "@/lib/assets";
import { getProducts } from "@/lib/sanity";
import { absoluteUrl, instagramUrl, siteConfig } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "Hakkımda · Arzu ve atölyesi",
  description:
    "Arzu’dan çantalarını kim, nasıl yapıyor? Arzu’nun kendi ağzından: tasarım kararları, hasır ip, askı ve son kontrol.",
  path: "/hakkimizda"
});

const process = [
  {
    title: "Önce kullanım",
    text: "Bir çantaya başlarken önce onu gün içinde nasıl kullanacağınızı düşünüyorum: omuzda mı taşınacak, içine telefon ve cüzdandan başka ne girecek, ağzı tek elle açılacak mı?"
  },
  {
    title: "İplik ve ölçü",
    text: "Sonra ipliği ve ölçüyü seçiyorum. Küçük bir örnek örüp dokuya bakıyorum; örgü sıklığı çantanın ne kadar tok duracağını ve boş hâlde nasıl göründüğünü belirliyor."
  },
  {
    title: "Askı ve kapama",
    text: "Askının boyunu ve bağlantısını modele göre kararlaştırıyorum. Çoğu modelde askıyı gövdeyle aynı iple örüyorum, böylece çanta bütün bir parça gibi duruyor."
  },
  {
    title: "Son kontrol",
    text: "Bitirdiğim her çantayı doldurup omuzda deniyorum. Ağız açıklığına, askı bağlantılarına ve çantanın doluyken nasıl durduğuna son kez bakmadan hiçbir çantayı göndermiyorum."
  }
];

export default async function AboutPage() {
  const products = await getProducts();
  const portrait = optionalImage("makerPortrait");
  const atWork = optionalImage("makerAtWork");
  const featured = products.slice(0, 3);
  const detailImage = products.find((product) => product.slug === "marina")?.gallery?.[1] ?? products[0]?.image;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.maker,
          jobTitle: "Tasarımcı ve el örgüsü çanta yapımcısı",
          worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          url: absoluteUrl("/hakkimizda"),
          ...(instagramUrl ? { sameAs: [instagramUrl] } : {})
        }}
      />

      <section className={`mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:py-20 ${portrait ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20" : ""}`}>
        <div className="max-w-2xl">
          <p className="eyebrow">Hakkımda</p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-charcoal sm:text-6xl lg:text-7xl">
            Merhaba, ben Arzu.
          </h1>
          <p className="mt-7 text-lg leading-8 text-charcoal/80">
            Gün içinde sık sık elime alacağım çantaları tasarlamak istedim. Arzu’dan, elde ördüğüm bu modelleri küçük koleksiyonlar hâlinde bir araya getirdiğim tasarım markam.
          </p>
          <p className="mt-4 text-lg leading-8 text-charcoal/80">
            Renkleri, dokuları ve ölçüleri ben seçiyorum; her çantayı ilk ilmekten son dikişe kadar kendim örüyorum.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/urunler" className="btn-primary">
              Çantaları görün
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="me noopener" className="btn-secondary">
                Instagram’da takip edin
              </a>
            )}
          </div>
        </div>
        {portrait && (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="image-frame aspect-[4/5] bg-sand">
              <Image src={portrait} alt="Arzu, atölyesinde" fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div aria-hidden="true" className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[0.5rem] border border-burgundy/20" />
          </div>
        )}
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div className="lg:sticky lg:top-[calc(var(--site-header-height)+2rem)] lg:h-fit">
              <p className="eyebrow">Nasıl çalışıyorum</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-charcoal sm:text-5xl">Bir çantanın tasarım süreci</h2>
              <p className="mt-5 text-charcoal/75">
                Çantalarımı hasır iple örüyorum; tüm modellerde malzeme, ölçü, askı ve kapama bilgisini ürün sayfasında ayrı ayrı yazıyorum.
              </p>
              <div className="image-frame mt-8 aspect-[4/3] bg-sand">
                {atWork ? (
                  <Image src={atWork} alt="Arzu çanta örerken" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                ) : detailImage ? (
                  <Image src={detailImage} alt="El örgüsü çantanın içi ve örgü dokusu" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                ) : null}
              </div>
            </div>
            <ol className="space-y-10">
              {process.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-5">
                  <span className="font-serif text-4xl italic leading-none text-burgundy/60">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-3xl text-charcoal">{step.title}</h3>
                    <p className="mt-3 text-base leading-8 text-charcoal/75 sm:text-lg">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow">Koleksiyondan</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-charcoal sm:text-5xl">Atölyeden çıkan son modeller</h2>
            </div>
            <Link href="/urunler" className="text-link">Tüm modeller</Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-charcoal/10 bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-charcoal sm:text-5xl">Aklınızda bir renk ya da ölçü mü var?</h2>
          <p className="mx-auto mt-5 max-w-xl leading-8 text-charcoal/75">
            Beğendiğiniz modeli bana gönderin. İplik stoğuna göre uygun renk, askı ve ölçü seçeneklerini sizinle paylaşayım.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton message="Merhaba, özel renk veya ölçü seçenekleri hakkında bilgi almak istiyorum." />
            <Link href="/sik-sorulan-sorular" className="btn-secondary">Sık sorulan sorular</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
