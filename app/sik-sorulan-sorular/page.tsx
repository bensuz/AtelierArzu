import Link from "next/link";
import { Plus } from "lucide-react";
import { publicPageMetadata } from "@/lib/metadata";

export const metadata = publicPageMetadata({
  title: "El Yapımı Kroşe Çantalar Hakkında Sık Sorulan Sorular",
  description: "Arzu’dan çantaları nerede örülüyor? WhatsApp siparişi, renk seçenekleri, hazırlık süresi, ölçü, bakım ve iade hakkında yanıtlar.",
  path: "/sik-sorulan-sorular"
});

type Question = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

const sections: { title: string; questions: Question[] }[] = [
  {
    title: "Çantalar ve atölye",
    questions: [
      {
        question: "Arzu’dan çantaları el yapımı mı?",
        answer: "Evet. Her çantayı Arzu tasarlıyor ve elde örüyor. İplik seçiminden askı ve kapama ayrıntılarına kadar her modelle kendisi ilgileniyor."
      },
      {
        question: "Çantalar nerede ve kim tarafından üretiliyor?",
        answer: "Arzu, çantaları Ankara’da kendi atölyesinde hazırlıyor. Koleksiyonlarını az sayıda üretiyor.",
        link: { href: "/hakkimizda", label: "Arzu’nun atölye hikâyesi" }
      },
      {
        question: "Çantaların renkleri değiştirilebilir mi?",
        answer: "Bazı modellerde iplik stoğuna ve örgüye uygun renklere göre değişiklik yapılabilir. Modelin adını ve istediğiniz rengi bize yazarsanız uygun seçenekleri paylaşırız."
      },
      {
        question: "Çantaların içine neler sığar?",
        answer: "İç hacim modele, astara ve ağız açıklığına göre değişir. Ürün sayfasındaki ölçüleri telefonunuzun kılıflı hâli ve cüzdanınızla karşılaştırın. Emin olmadığınızda eşyanın ölçüsünü bize yazabilirsiniz.",
        link: { href: "/canta-olcu-rehberi", label: "Çanta ölçü rehberini inceleyin" }
      },
      {
        question: "Örgü çanta nasıl temizlenir?",
        answer: "Ürün sayfasındaki bakım notunu esas alın. İplik, astar ve aksesuarlar farklı bakım gerektirebilir. Çantayı tamamen yıkamadan önce modelin bakım önerisini kontrol edin.",
        link: { href: "/malzemeler-ve-bakim", label: "Malzemeler ve bakım önerileri" }
      }
    ]
  },
  {
    title: "Sipariş, teslimat ve iade",
    questions: [
      {
        question: "WhatsApp’tan nasıl sipariş verilir?",
        answer: "Beğendiğiniz modelin adını veya bağlantısını bize gönderin. Renk ve ölçü isteklerinizi paylaşın. Ürün, toplam tutar ve teslimat bilgilerini yazılı olarak kontrol ettikten sonra siparişi onaylayabilirsiniz.",
        link: { href: "/siparis-rehberi", label: "Sipariş adımlarına bakın" }
      },
      {
        question: "Çantanın hazırlanması ve kargoya verilmesi ne kadar sürer?",
        answer: "Hazırlık süresi modele ve seçtiğiniz seçeneklere göre değişir. Onaydan önce tahmini kargoya veriliş tarihini ve teslimat süresini bizimle teyit edebilirsiniz."
      },
      {
        question: "Kargo ücreti ve toplam tutar ne zaman belli olur?",
        answer: "Ürün seçenekleri ve gönderim bilgileri netleştiğinde, kargo dahil ödeyeceğiniz toplam tutar sipariş onayından önce yazılı olarak paylaşılır."
      },
      {
        question: "Kişiye özel siparişler iade edilebilir mi?",
        answer: "İsteğinize veya kişisel ihtiyaçlarınıza göre özel olarak hazırlanan ürünler cayma hakkı istisnasına girebilir. Ayıplı ürünlere ilişkin yasal haklarınız saklıdır. Seçtiğiniz modele uygulanacak koşulları siparişi onaylamadan önce yazılı olarak teyit edebilirsiniz.",
        link: { href: "/iletisim", label: "İade koşulları için bize ulaşın" }
      }
    ]
  }
];

export default function FrequentlyAskedQuestionsPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-5xl font-semibold leading-none sm:text-7xl">Sık sorulan sorular</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          Çantanızı seçmeden önce ölçü, renk ve bakımla ilgili bilgilere göz atın.
          Sipariş, kargo ve iade hakkında merak ettikleriniz de burada.
        </p>
      </header>
      {sections.map((section) => (
        <section key={section.title} className="mt-10 rounded-lg border border-ink/10 bg-shell px-5 py-7 sm:px-8">
          <h2 className="font-serif text-4xl font-semibold text-[#741616]">{section.title}</h2>
          <div className="mt-3 divide-y divide-ink/10">
            {section.questions.map(({ question, answer, link }) => (
              <details key={question} name={section.title} className="faq-item group">
                <summary className="group/faq-trigger focus-ring cursor-pointer list-none rounded-md py-4 text-ink/80 hover:text-ink group-open:text-ink focus-visible:text-ink motion-safe:transition-colors [&::-webkit-details-marker]:hidden sm:py-5">
                  <h3 className="flex items-center justify-between gap-4 font-serif text-xl font-semibold leading-snug sm:text-2xl">
                    {question}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 bg-linen text-ink/80 group-hover/faq-trigger:border-ink/40 group-hover/faq-trigger:text-ink group-focus-visible/faq-trigger:text-ink motion-safe:transition-colors">
                      <Plus aria-hidden="true" className="h-4 w-4 group-open:rotate-45 motion-safe:transition-transform motion-safe:duration-300" />
                    </span>
                  </h3>
                </summary>
                <div className="max-w-3xl pb-5 pr-4 sm:pb-6 sm:pr-12">
                  <p className="leading-7 text-ink/75">{answer}</p>
                  {link && (
                    <Link href={link.href} className="focus-ring mt-3 inline-block rounded-sm font-semibold text-[#741616] underline underline-offset-4 hover:text-ink">
                      {link.label}
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
