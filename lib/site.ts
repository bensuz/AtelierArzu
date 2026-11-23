const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim();

export const siteConfig = {
  name: "Arzu’dan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://atelierarzu.com",
  phone:
    whatsappPhone && whatsappPhone !== "905555555555" && /^[1-9]\d{7,14}$/.test(whatsappPhone)
      ? whatsappPhone
      : undefined,
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.trim().replace(/^@/, "") || "zuzununcantasi",
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "merhaba@atelierarzu.com",
  sellerName: process.env.SELLER_LEGAL_NAME?.trim(),
  sellerAddress: process.env.SELLER_BUSINESS_ADDRESS?.trim(),
  sellerKep: process.env.SELLER_KEP_EMAIL?.trim(),
  city: "Ankara",
  description:
    "Elde örülen, sınırlı sayıda üretilen ve günlük hayata sıcak bir dokunuş ekleyen kroşe çantalar."
};

export const instagramUrl = siteConfig.instagramHandle && /^[a-zA-Z0-9._]+$/.test(siteConfig.instagramHandle)
  ? `https://www.instagram.com/${siteConfig.instagramHandle}/`
  : undefined;

export function whatsappUrl(message?: string) {
  if (!siteConfig.phone) return undefined;
  const url = new URL(`https://wa.me/${siteConfig.phone}`);
  if (message) url.searchParams.set("text", message);
  return url.toString();
}

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}
