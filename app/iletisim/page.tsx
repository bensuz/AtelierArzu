import type { Metadata } from "next";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Atelier Arzu ile WhatsApp, Instagram veya e-posta üzerinden iletişime geçin. Kroşe çanta siparişi ve ürün bilgisi alın.",
  alternates: { canonical: "/iletisim" }
};

export default function ContactPage() {
  const faqs = [
    {
      question: "Siparişler ne kadar sürede hazırlanır?",
      answer: "Modele göre değişir; başlangıç koleksiyonunda ortalama 2-8 iş günü planlanır."
    },
    {
      question: "Renk değişikliği yapılabilir mi?",
      answer: "Uygun ip stoğu varsa koleksiyondaki modellerde renk uyarlaması yapılabilir."
    },
    {
      question: "Ürün görselleri gerçek mi?",
      answer:
        "Bu ilk sürümde görseller temsilidir. Gerçek ürün fotoğrafları çekildiğinde ürün galerileri güncellenecektir."
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="İletişim"
          title="Bir model, renk ya da sipariş fikri konuşalım."
          description="En hızlı yanıt için WhatsApp üzerinden yazabilirsiniz. Ürün linkiyle birlikte mesaj atarsanız model, renk ve hazırlık süresi daha hızlı netleşir."
        />
        <div className="rounded-lg border border-ink/10 bg-linen p-7">
          <WhatsAppButton message="Merhaba Atelier Arzu, kroşe çanta siparişi hakkında bilgi almak istiyorum." />
          <div className="mt-8 grid gap-4 text-sm text-ink/70">
            <a className="focus-ring flex items-center gap-3 rounded-md bg-shell p-4 hover:text-ink" href={`https://wa.me/${siteConfig.phone}`}>
              <MessageCircle aria-hidden="true" className="h-5 w-5 text-olive" />
              WhatsApp: +{siteConfig.phone}
            </a>
            <a className="focus-ring flex items-center gap-3 rounded-md bg-shell p-4 hover:text-ink" href={siteConfig.instagram}>
              <Instagram aria-hidden="true" className="h-5 w-5 text-olive" />
              Instagram: @atelierarzu
            </a>
            <a className="focus-ring flex items-center gap-3 rounded-md bg-shell p-4 hover:text-ink" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" className="h-5 w-5 text-olive" />
              {siteConfig.email}
            </a>
            <div className="flex items-center gap-3 rounded-md bg-shell p-4">
              <MapPin aria-hidden="true" className="h-5 w-5 text-olive" />
              {siteConfig.city} merkezli, Türkiye geneli gönderim
            </div>
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="font-serif text-4xl font-semibold">Sık sorulanlar</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-ink/10 bg-shell p-6">
              <h3 className="font-serif text-2xl font-semibold">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/68">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
