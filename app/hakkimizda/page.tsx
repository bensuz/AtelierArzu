import { publicPageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { maker } from "@/lib/data";

export const metadata = publicPageMetadata({
  title: "Hakkımızda",
  description:
    "Arzu’nun evinde tasarlayıp el emeğiyle ürettiği kroşe çantaların ve küçük atölyesinin hikâyesi.",
  path: "/hakkimizda"
});

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="self-center">
          <SectionHeading
            as="h1"
            eyebrow="Hakkımızda"
            title="Arzu’dan nasıl doğdu?"
            description="Gün içinde sık sık elime alacağım çantaları tasarlamak istedim. Arzu’dan, elde ördüğüm bu modelleri küçük koleksiyonlar halinde bir araya getirdiğim tasarım markam."
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-linen">
          <Image
            src="/images/atelier-hero.png"
            alt="Kroşe çantalar ve iplikler"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="bg-linen py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Bir çantanın tasarım süreci"
            description={maker.bio}
          />
          <p className="mt-4 font-serif text-xl text-ink">— {maker.name}</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-4xl font-semibold">Özel renk ya da ölçü fikriniz mi var?</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink/68">
          Beğendiğiniz modeli bize gönderin. Uygun renk, askı ve ölçü seçeneklerini sizinle paylaşalım.
        </p>
        <div className="mt-8">
          <WhatsAppButton message="Merhaba, özel renk veya ölçü seçenekleri hakkında bilgi almak istiyorum." />
        </div>
      </section>
    </div>
  );
}
