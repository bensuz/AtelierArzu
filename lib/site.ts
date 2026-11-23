const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim();
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim();
const businessCity = process.env.NEXT_PUBLIC_BUSINESS_CITY?.trim();

function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  // Vercel exposes the production domain of the project at build time.
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return `https://${vercelProduction}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Arzu’dan",
  /** ASCII-safe brand name for places where typography is not supported (URLs, file names). */
  slug: "arzudan",
  url: resolveSiteUrl(),
  phone:
    whatsappPhone && whatsappPhone !== "905555555555" && /^[1-9]\d{7,14}$/.test(whatsappPhone)
      ? whatsappPhone
      : undefined,
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.trim().replace(/^@/, "") || "zuzununcantasi",
  /** Only a confirmed address is shown. Leave the variable empty to hide e-mail everywhere. */
  email: supportEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportEmail) ? supportEmail : undefined,
  sellerName: process.env.SELLER_LEGAL_NAME?.trim(),
  sellerAddress: process.env.SELLER_BUSINESS_ADDRESS?.trim(),
  sellerKep: process.env.SELLER_KEP_EMAIL?.trim(),
  /**
   * City shown on the contact page and FAQ. Defaults to the value used on the current site;
   * set NEXT_PUBLIC_BUSINESS_CITY to change it or to "-" to hide it until confirmed.
   */
  city: businessCity === "-" ? undefined : businessCity || "Ankara",
  maker: "Arzu",
  description:
    "Arzu’nun tasarlayıp elde ördüğü kroşe çantalar. Az sayıda hazırlanan modeller, WhatsApp üzerinden sipariş."
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
  return new URL(path, `${siteConfig.url}/`).toString();
}
