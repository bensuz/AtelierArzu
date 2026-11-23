import type { Material, Product } from "@/lib/types";

const hero = "/images/atelier-hero.png";
const ege = "/images/ege-omuz-cantasi.png";
const mini = "/images/arzu-mini-tote.png";

export const products: Product[] = [
  {
    name: "Ege Omuz Çantası",
    slug: "ege-omuz-cantasi",
    category: "Omuz Çantası",
    collection: "Günlük Zarafet",
    price: "1.650 TL",
    availability: "Sipariş Üzerine",
    materials: ["Pamuk makrome ipi", "Deri askı", "Pirinç kapama"],
    dimensions: "28 x 22 x 8 cm",
    colors: ["Kum", "Karamel", "Ekru"],
    strap: "Ayarlanabilir deri omuz askısı",
    closure: "Pirinç çıtçıt kapama",
    care: "Nemli bezle nazikçe silin, gölgede kurutun ve formunu koruyarak saklayın.",
    makingTime: "5-7 iş günü",
    description:
      "Günlük kullanım için hafif, düzenli ve zamansız bir kroşe çanta. İnce deri askısı ve sade pirinç detayıyla şehir kombinlerine sıcak bir doku ekler.",
    image: ege,
    gallery: [ege, hero, mini, ege, hero],
    featured: true,
    seoTitle: "Ege Omuz Çantası - El Yapımı Kroşe Çanta",
    seoDescription:
      "Pamuk iplik ve deri askıyla elde örülen Ege Omuz Çantası. Sipariş üzerine üretilen zarif kroşe çanta modeli."
  },
  {
    name: "Arzu Mini Tote",
    slug: "arzu-mini-tote",
    category: "Mini Tote",
    collection: "Yumuşak Renkler",
    price: "1.350 TL",
    availability: "Hazır",
    materials: ["Pamuk iplik", "Pamuk astar", "El örgüsü sap"],
    dimensions: "22 x 18 x 7 cm",
    colors: ["Gül Kurusu", "Ekru"],
    strap: "Kısa el sapı",
    closure: "Açık tote formu, iç astarlı",
    care: "Leke oluşursa bölgesel temizlik yapın; makinede yıkamayın.",
    makingTime: "2-4 iş günü",
    description:
      "Küçük ama dikkat çekici bir parça. Yaz davetleri, kahve buluşmaları ve hafif günlük kullanım için elde örülen yumuşak formlu mini tote.",
    image: mini,
    gallery: [mini, ege, hero, mini, ege],
    featured: true,
    seoTitle: "Arzu Mini Tote - Gül Kurusu Kroşe Mini Çanta",
    seoDescription:
      "Gül kurusu pamuk iplikle elde örülen Arzu Mini Tote. Sıcak, zarif ve ulaşılabilir kroşe çanta."
  },
  {
    name: "Zeytin Pazar Çantası",
    slug: "zeytin-pazar-cantasi",
    category: "Pazar Çantası",
    collection: "Hafta Sonu",
    price: "1.500 TL",
    availability: "Sipariş Üzerine",
    materials: ["Pamuk makrome ipi", "Ahşap boncuk", "Güçlendirilmiş taban"],
    dimensions: "32 x 28 x 10 cm",
    colors: ["Zeytin", "Ekru", "Kum"],
    strap: "Yumuşak çift sap",
    closure: "Büzgü ipli ağız",
    care: "İçi doluyken askıda bırakmayın; düz zeminde form vererek saklayın.",
    makingTime: "6-8 iş günü",
    description:
      "Hafta sonu gezileri ve yazlık kombinler için tasarlanan geniş kroşe çanta. Büzgü detayı eşyaları daha güvenli taşımaya yardımcı olur.",
    image: hero,
    gallery: [hero, ege, mini, hero, ege],
    featured: false,
    seoTitle: "Zeytin Pazar Çantası - Geniş El Örgüsü Çanta",
    seoDescription:
      "Zeytin tonlarında, pamuk iplikle elde örülen geniş kroşe pazar çantası. Sipariş üzerine üretilir."
  }
];

export const materials: Material[] = [
  {
    name: "Hasır ip",
    summary: "Koleksiyondaki modellerin ana malzemesi. Hafif, tok duran ve örgü dokusunu net gösteren bir ip.",
    details:
      "Hasır ip, çantanın formunu boşken de korumasına yardımcı olur ve ilmeklerin dokusunu belirgin kılar. Açık dokulu (ajurlu) örülen modellerde ışığı geçirir; bu modellerde küçük eşyaları bir kese ya da cüzdan içinde taşımak pratik olur. Her modelin lif içeriğini ve bakım notunu ürün sayfasında ayrıca belirtiyorum."
  },
  {
    name: "Askılar ve kapamalar",
    summary: "Çoğu modelde askı gövdeyle aynı iple örülür; bazı modellerde metal zincir askı kullanılır.",
    details:
      "Askı boyu çantanın omuzda nereye oturacağını belirler; ürün sayfasında kısa, uzun ya da zincir askı olarak yazılır. Kapamalar çoğunlukla çıtçıt; büzgülü modellerde kordon ve ahşap boncuk kullanılır. Metal parçaları nemden uzak tutmak parlaklığını korur."
  },
  {
    name: "Örgü detayları",
    summary: "Çiçek motifleri, püsküller ve renkli kenar sıraları da aynı iple, elde örülür.",
    details:
      "Dekoratif parçalar çantaya sonradan dikilir ya da örgü sırasında gövdeye katılır. Çekiştirmeden, çantayı boşken düz bir yüzeyde saklamak bu detayların formunu korur. Takılma ya da sökülme olursa onarım için bana yazabilirsiniz."
  }
];

export const maker = {
  name: "Arzu",
  bio: "Bir çantaya başlarken önce onu gün içinde nasıl kullanacağınızı düşünüyorum. Sonra ipliği, ölçüyü ve askının omuzda nasıl duracağını seçiyorum. Her modeli kendim örüyor, bitirdiğimde astarından son dikişine kadar tek tek kontrol ediyorum."
};

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
