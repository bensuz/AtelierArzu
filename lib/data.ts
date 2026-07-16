import type { BlogPost, Material, Product, TeamMember } from "@/lib/types";

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
    name: "Pamuk Makrome İpi",
    summary: "Tok duruş, belirgin örgü dokusu ve günlük kullanım için dengeli esneklik.",
    details:
      "Çantanın formunu korumasına yardımcı olurken elde örülen ilmeklerin dokusunu net gösterir. Yaz aylarında hafif ve nefes alan bir his verir."
  },
  {
    name: "Deri ve Pirinç Detaylar",
    summary: "Sade kroşe yüzeyi küçük ama kalıcı aksesuarlarla tamamlar.",
    details:
      "Askı, kapama ve bağlantı noktalarında kullanılan detaylar çantanın kullanım ömrünü ve şehirli görünümünü güçlendirir."
  },
  {
    name: "Pamuk Astar",
    summary: "Mini ve açık formlu modellerde iç kullanım rahatlığı sağlar.",
    details:
      "Astar, küçük eşyaların örgü aralarından görünmesini azaltır ve çantanın iç yüzeyini daha düzenli hale getirir."
  }
];

export const team: TeamMember[] = [
  {
    name: "Arzu",
    role: "Kurucu ve Tasarımcı",
    bio: "Her modelin ölçüsünü, ip seçimini ve son dokunuşlarını elde kontrol eder. Amacı, özel hissettiren ama günlük hayata kolayca giren çantalar üretmek."
  },
  {
    name: "Atölye Ekibi",
    role: "Üretim ve Kalite Kontrol",
    bio: "Siparişlerin örüm sürecini, astar ve aksesuar kontrollerini takip eder. Her çanta gönderimden önce form, dikiş ve kullanım rahatlığı açısından incelenir."
  }
];

export const blogPosts: BlogPost[] = [
  {
    title: "Kroşe Çanta Nasıl Kombinlenir?",
    slug: "krose-canta-nasil-kombinlenir",
    category: "Stil",
    excerpt:
      "Keten elbiselerden şehirli takımlara kadar kroşe çantayı modern ve sade kombinlere taşımanın yolları.",
    publishedAt: "2026-06-10",
    author: "Atelier Arzu",
    image: hero,
    readTime: "4 dk",
    body: [
      "Kroşe çantalar yalnızca plaj stiline ait değil. Doğru renk, form ve aksesuar seçimiyle şehirde de sıcak ve özenli bir görünüm verir.",
      "Kum, ekru ve zeytin tonları gardıroptaki beyaz gömlek, keten pantolon, denim ve sade elbiselerle kolay eşleşir. Daha dikkat çekici bir görünüm için gül kurusu gibi yumuşak renkleri tek vurgu parçası olarak kullanabilirsiniz.",
      "Günlük kullanımda omuz askılı modeller daha pratik olurken, mini tote formları akşamüstü buluşmaları ve yaz davetlerinde daha zarif durur."
    ],
    faq: [
      {
        question: "Kroşe çanta kışın kullanılır mı?",
        answer:
          "Evet. Özellikle deri detaylı ve tok formlu modeller triko, kaşe ve denimle dengeli bir dokusal kontrast oluşturur."
      }
    ],
    relatedProducts: ["ege-omuz-cantasi", "arzu-mini-tote"],
    seoTitle: "Kroşe Çanta Nasıl Kombinlenir?",
    seoDescription:
      "Kroşe çantaları günlük, yazlık ve şehirli kombinlerde kullanmak için sade stil önerileri."
  },
  {
    title: "El Yapımı Kroşe Çanta Bakımı",
    slug: "el-yapimi-krose-canta-bakimi",
    category: "Bakım",
    excerpt:
      "Pamuk iplikli kroşe çantaların formunu, rengini ve dokusunu uzun süre korumak için temel bakım rehberi.",
    publishedAt: "2026-06-18",
    author: "Atelier Arzu",
    image: ege,
    readTime: "3 dk",
    body: [
      "El yapımı kroşe çantalar nazik bakım ister. Çantayı makinede yıkamak yerine lekeli alanı nemli ve açık renkli bir bezle hafifçe silmek en güvenli yöntemdir.",
      "Kuruturken doğrudan güneş altında bırakmayın. Düz bir zeminde, çantanın içine temiz kağıt yerleştirerek formunu destekleyebilirsiniz.",
      "Saklama sırasında ağır eşyalar altında kalmaması ve askısından uzun süre asılı durmaması çantanın formunu korur."
    ],
    faq: [
      {
        question: "Kroşe çanta makinede yıkanır mı?",
        answer:
          "Önerilmez. Makine yıkaması form kaybına ve aksesuar hasarına neden olabilir."
      }
    ],
    relatedProducts: ["ege-omuz-cantasi"],
    seoTitle: "El Yapımı Kroşe Çanta Bakımı",
    seoDescription:
      "Pamuk iplikli kroşe çantalar için temizlik, kurutma ve saklama önerileri."
  },
  {
    title: "Kroşe Çanta Alırken Nelere Bakmalı?",
    slug: "krose-canta-alirken-nelere-bakmali",
    category: "Rehber",
    excerpt:
      "Malzeme, ölçü, astar ve askı detaylarıyla doğru el yapımı çanta seçimi.",
    publishedAt: "2026-07-01",
    author: "Atelier Arzu",
    image: mini,
    readTime: "5 dk",
    body: [
      "Kroşe çanta seçerken ilk bakılması gereken konu kullanım amacı. Günlük kullanım için omuz askısı, tok taban ve güvenli kapama daha işlevseldir.",
      "Malzeme seçimi de çantanın görünümünü belirler. Pamuk makrome ipi daha belirgin ve tok bir örgü dokusu verir; ince pamuk iplikler ise daha yumuşak ve zarif durur.",
      "Astar, kapama ve askı bağlantıları küçük ayrıntılar gibi görünse de çantanın günlük kullanım rahatlığını doğrudan etkiler."
    ],
    faq: [
      {
        question: "Sipariş üzerine çanta ne kadar sürede hazırlanır?",
        answer:
          "Modele göre değişmekle birlikte başlangıç koleksiyonunda ortalama 5-8 iş günü planlanır."
      }
    ],
    relatedProducts: ["zeytin-pazar-cantasi", "arzu-mini-tote"],
    seoTitle: "Kroşe Çanta Alırken Nelere Bakmalı?",
    seoDescription:
      "El yapımı kroşe çanta seçerken malzeme, ölçü, astar ve askı detayları için satın alma rehberi."
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
