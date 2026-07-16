export const siteConfig = {
  name: "Atelier Arzu",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atelierarzu.com",
  phone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "905555555555",
  instagram: "https://instagram.com/atelierarzu",
  email: "merhaba@atelierarzu.com",
  city: "İstanbul",
  description:
    "Elde örülen, sınırlı sayıda üretilen kroşe çantalar ve sıcak atölye hikayeleri."
};

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}
