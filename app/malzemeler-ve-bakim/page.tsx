import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { YarnBallIcon } from "@/components/craft-icons";
import { SectionHeading } from "@/components/section-heading";
import { materials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Malzemeler ve Bakım",
  description:
    "Atelier Arzu kroşe çantalarında kullanılan pamuk iplik, deri, pirinç ve astar detayları ile bakım önerileri.",
  alternates: { canonical: "/malzemeler-ve-bakim" }
};

export default function MaterialsPage() {
  const careSteps = [
    "Makinede yıkamak yerine lekeli alanı nemli bezle temizleyin.",
    "Kuruturken doğrudan güneşten uzak, düz bir yüzey tercih edin.",
    "Formunu korumak için içini destekleyerek saklayın.",
    "Ağır eşyalarla uzun süre askıda bırakmayın."
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Malzemeler ve bakım"
        title="Dokusu güzel, kullanımı rahat ve bakımı sade."
        description="Her malzeme çantanın hem görünümünü hem de günlük kullanımını etkiler. Bu yüzden seçimi yalnızca renk üzerinden değil, dayanıklılık ve his üzerinden de yapıyoruz."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {materials.map((material) => (
          <article key={material.name} className="rounded-lg border border-ink/10 bg-shell p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linen text-olive">
                <YarnBallIcon className="h-6 w-6" />
              </span>
              <h2 className="font-serif text-3xl font-semibold">{material.name}</h2>
            </div>
            <p className="mt-3 text-sm font-semibold text-olive">{material.summary}</p>
            <p className="mt-4 leading-7 text-ink/68">{material.details}</p>
          </article>
        ))}
      </div>
      <section className="mt-16 rounded-lg bg-linen p-7 sm:p-10">
        <h2 className="font-serif text-4xl font-semibold">Bakım önerileri</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {careSteps.map((step) => (
            <div key={step} className="flex gap-3 rounded-lg bg-shell p-5">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-olive" />
              <p className="leading-7 text-ink/70">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
