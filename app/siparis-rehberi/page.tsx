import { publicPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "WhatsApp’tan Kroşe Çanta Siparişi Nasıl Verilir?",
  description: "Arzu’dan el yapımı kroşe çanta siparişinin adımları. Model seçin, WhatsApp’tan yazın, fiyatı ve teslimat süresini onaydan önce öğrenin.",
  path: "/siparis-rehberi"
});

export default function OrderGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="font-serif text-5xl font-semibold leading-none sm:text-7xl">Nasıl sipariş verilir?</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          Beğendiğiniz çantayı seçin, modelin adını ya da bağlantısını bize WhatsApp’tan gönderin.
          Renk seçeneklerini, ücreti ve hazırlık süresini birlikte netleştirebilirsiniz.
        </p>
      </header>
      <ol className="mt-9 list-decimal space-y-7 border-y border-ink/10 py-8 pl-6 marker:font-semibold marker:text-[#741616]">
        <li className="pl-2">
          <h2 className="font-serif text-3xl font-semibold">Modeli seçin</h2>
          <p className="mt-2 max-w-2xl leading-7 text-ink/75">
            Ürün sayfasında çantanın ölçüsüne, askısına ve renklerine bakın. Özel renk ya da ölçü düşünüyorsanız ilk mesajınızda belirtin.
          </p>
        </li>
        <li className="pl-2">
          <h2 className="font-serif text-3xl font-semibold">Sipariş özetini kontrol edin</h2>
          <p className="mt-2 max-w-2xl leading-7 text-ink/75">
            Siz onay vermeden önce seçtiğiniz modeli, kargo dahil toplam tutarı,
            tahmini teslimatı ve sipariş koşullarını yazılı olarak paylaşırız.
          </p>
        </li>
        <li className="pl-2">
          <h2 className="font-serif text-3xl font-semibold">Ödeme ve teslimatı teyit edin</h2>
          <p className="mt-2 max-w-2xl leading-7 text-ink/75">
            Sipariş özetini onayladıktan sonra ödeme ve gönderim bilgilerini bizimle teyit edin.
            Siparişinizle ilgili sorularınız için aynı görüşmeden bize yazabilirsiniz.
          </p>
        </li>
      </ol>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/urunler" className="focus-ring inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold hover:bg-linen">
          Koleksiyonu incele
        </Link>
        {siteConfig.phone ? (
          <WhatsAppButton message="Merhaba, sipariş hakkında bilgi almak istiyorum." />
        ) : (
          <Link href="/iletisim" className="focus-ring inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2 text-sm font-semibold text-shell hover:bg-[#44372e] motion-safe:transition-colors">
            Bize ulaşın
          </Link>
        )}
      </div>
      <Link href="/sik-sorulan-sorular" className="focus-ring mt-7 inline-block rounded-sm font-semibold underline underline-offset-4 hover:text-[#741616]">
        Renk, bakım ve iade hakkında sık sorulan sorular
      </Link>
    </article>
  );
}
