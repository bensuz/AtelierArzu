import Link from "next/link";
import { Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getFaqSections } from "@/lib/faq";
import { publicPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "Sık Sorulan Sorular",
  description: "Arzu’dan çantaları nasıl üretiliyor? WhatsApp siparişi, renk seçenekleri, hazırlık süresi, ölçü, bakım ve iade hakkında yanıtlar.",
  path: "/sik-sorulan-sorular"
});

export default function FrequentlyAskedQuestionsPage() {
  const sections = getFaqSections(siteConfig.city);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: sections.flatMap((section) =>
            section.questions.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer }
            }))
          )
        }}
      />
      <article className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { href: "/sik-sorulan-sorular", label: "Sık sorulan sorular" }]} />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <header className="lg:sticky lg:top-[calc(var(--site-header-height)+2rem)] lg:h-fit">
            <p className="eyebrow">Yardım</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.98] text-charcoal sm:text-6xl">Sık sorulan sorular</h1>
            <p className="mt-6 text-lg leading-8 text-charcoal/80">
              Çantanızı seçmeden önce ölçü, renk ve bakımla ilgili bilgilere göz atın. Sipariş, kargo ve iade hakkında merak ettikleriniz de burada.
            </p>
            <nav aria-label="Soru başlıkları" className="mt-8">
              <ul className="space-y-2 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-link">{section.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 border-t border-charcoal/10 pt-6">
              <p className="text-sm text-charcoal/70">Sorunuzun yanıtını bulamadınız mı?</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <WhatsAppButton message="Merhaba, bir sorum olacaktı." label="WhatsApp’tan sorun" />
                <Link href="/iletisim" className="btn-secondary">İletişim</Link>
              </div>
            </div>
          </header>

          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-[calc(var(--site-header-height)+1rem)]">
                <h2 className="font-serif text-3xl text-burgundy sm:text-4xl">{section.title}</h2>
                <div className="mt-4 divide-y divide-charcoal/10 border-y border-charcoal/10">
                  {section.questions.map(({ question, answer, link }) => (
                    <details key={question} name={section.id} className="faq-item group">
                      <summary className="group/faq-trigger focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-5 text-charcoal/85 hover:text-charcoal group-open:text-charcoal [&::-webkit-details-marker]:hidden">
                        <h3 className="font-serif text-xl leading-snug sm:text-2xl">{question}</h3>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-charcoal/15 text-charcoal/70 group-hover/faq-trigger:border-burgundy group-hover/faq-trigger:text-burgundy motion-safe:transition-colors">
                          <Plus aria-hidden="true" className="h-4 w-4 group-open:rotate-45 motion-safe:transition-transform motion-safe:duration-300" />
                        </span>
                      </summary>
                      <div className="max-w-2xl pb-6 pr-4 sm:pr-12">
                        <p className="leading-7 text-charcoal/75">{answer}</p>
                        {link && (
                          <Link href={link.href} className="text-link mt-3 inline-block">{link.label}</Link>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
