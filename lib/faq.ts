export type FaqQuestion = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
  /** Shown in the short homepage preview. */
  featured?: boolean;
};

export type FaqSection = { id: string; title: string; questions: FaqQuestion[] };

const cityNote = (city?: string) => (city ? `${city}’da ` : "");

export function getFaqSections(city?: string): FaqSection[] {
  return [
    {
      id: "cantalar",
      title: "Çantalar ve atölye",
      questions: [
        {
          question: "Çantalar gerçekten el yapımı mı?",
          answer: "Evet. Her çantayı ben tasarlıyor ve kendim örüyorum. İplik seçiminden askı ve kapama ayrıntısına kadar her modelle tek tek ilgileniyorum.",
          featured: true
        },
        {
          question: "Çantalar nerede üretiliyor?",
          answer: `Çantaları ${cityNote(city)}kendi atölyemde hazırlıyorum ve her modelden az sayıda üretiyorum.`,
          link: { href: "/hakkimizda", label: "Hikâyemi okuyun" }
        },
        {
          question: "Renk değişikliği yapılabilir mi?",
          answer: "Bazı modellerde iplik stoğuna ve örgüye uygun renklere göre değişiklik yapılabiliyor. Modelin adını ve istediğiniz rengi yazarsanız uygun seçenekleri paylaşırım.",
          featured: true
        },
        {
          question: "Çantaların içine neler sığar?",
          answer: "İç hacim modele, astara ve ağız açıklığına göre değişir. Ürün sayfasındaki ölçüleri telefonunuzun kılıflı hâli ve cüzdanınızla karşılaştırın. Emin olamadığınızda eşyanın ölçüsünü bana yazabilirsiniz.",
          link: { href: "/canta-olcu-rehberi", label: "Çanta ölçü rehberi" }
        },
        {
          question: "Örgü çanta nasıl temizlenir?",
          answer: "Ürün sayfasındaki bakım notunu esas alın. İplik, astar ve aksesuarlar farklı bakım gerektirebilir; çantayı tamamen yıkamadan önce modelin bakım önerisini kontrol edin.",
          link: { href: "/malzemeler-ve-bakim", label: "Malzemeler ve bakım" }
        }
      ]
    },
    {
      id: "siparis",
      title: "Sipariş, teslimat ve iade",
      questions: [
        {
          question: "WhatsApp’tan nasıl sipariş verilir?",
          answer: "Beğendiğiniz modelin adını veya bağlantısını gönderin, varsa renk isteğinizi yazın. Ürünü, kargo dahil toplam tutarı ve teslimat bilgisini yazılı olarak paylaştıktan sonra onayınızla sipariş kesinleşir.",
          link: { href: "/siparis-rehberi", label: "Sipariş adımları" },
          featured: true
        },
        {
          question: "Hazırlanması ve kargoya verilmesi ne kadar sürer?",
          answer: "Hazırlık süresi modele ve seçtiğiniz renge göre değişir; her ürün sayfasında belirtilir. Kesin kargoya veriliş tarihini onaydan önce birlikte netleştiririz.",
          featured: true
        },
        {
          question: "Kargo ücreti ve toplam tutar ne zaman belli olur?",
          answer: "Model, renk ve gönderim adresi netleştiğinde kargo dahil ödeyeceğiniz toplam tutarı sipariş onayından önce yazılı olarak paylaşırım."
        },
        {
          question: "Kişiye özel siparişler iade edilebilir mi?",
          answer: "İsteğinize göre özel olarak hazırlanan ürünler cayma hakkı istisnasına girebilir. Ayıplı ürünlere ilişkin yasal haklarınız saklıdır. Seçtiğiniz modele uygulanacak koşulları siparişi onaylamadan önce yazılı olarak teyit edebilirsiniz.",
          link: { href: "/iletisim", label: "İade koşulları için bana yazın" }
        }
      ]
    }
  ];
}

export function getFeaturedFaq(city?: string) {
  return getFaqSections(city).flatMap((section) => section.questions).filter((question) => question.featured);
}
