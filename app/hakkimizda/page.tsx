import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Atelier Arzu'nun el yapımı kroşe çanta atölyesi, üretim yaklaşımı ve ekip hikayesi.",
  alternates: { canonical: "/hakkimizda" }
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="self-center">
          <SectionHeading
            eyebrow="Hakkımızda"
            title="El emeğini günlük hayatın zarafetiyle buluşturan küçük bir atölye."
            description="Atelier Arzu, kroşe tekniğinin sıcak dokusunu sade, kullanışlı ve uzun süre sevilecek çanta formlarına taşımak için kuruldu."
          />
          <p className="mt-6 text-base leading-8 text-ink/70">
            Her modelde önce kullanım senaryosu düşünülür: telefon, cüzdan,
            anahtar, küçük bakım ürünleri ve çantanın gün boyu elde nasıl
            hissettirdiği. Ardından ip, renk, askı ve kapama detayları seçilir.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-linen">
          <Image
            src="/images/atelier-hero.png"
            alt="Atelier Arzu çalışma masasında kroşe çantalar ve iplikler"
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
            eyebrow="Ekip"
            title="Atölyenin arkasındaki eller"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {team.map((member) => (
              <article key={member.name} className="rounded-lg border border-ink/10 bg-shell p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
                  {member.role}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold">{member.name}</h2>
                <p className="mt-4 leading-7 text-ink/68">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-4xl font-semibold">Özel renk ya da ölçü fikriniz mi var?</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink/68">
          Koleksiyondaki modeller üzerinden renk, askı ve küçük ölçü uyarlamaları
          konuşabiliriz. En hızlı yanıt için WhatsApp üzerinden yazabilirsiniz.
        </p>
        <div className="mt-8">
          <WhatsAppButton message="Merhaba Atelier Arzu, özel renk veya ölçü seçeneği hakkında bilgi almak istiyorum." />
        </div>
      </section>
    </div>
  );
}
