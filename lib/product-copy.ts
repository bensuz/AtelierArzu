import editorialSource from "@/lib/product-editorial.json";
import seoEdits from "@/sanity/product-seo-edits.json";
import type { Product, ProductEditorial } from "@/lib/types";

/**
 * Reviewed spelling corrections for values typed without Turkish characters in Studio.
 * Matching is exact (after trimming, case-insensitive) so unknown values pass through unchanged.
 * These change spelling only; they never change the meaning of a record.
 */
const valueCorrections: Record<string, string> = {
  // collection
  "gunluk": "Günlük",
  // materials
  "hasir ip": "Hasır ip",
  // closure
  "cit cit": "Çıtçıt",
  "citcit": "Çıtçıt",
  // strap
  "uzun aski": "Uzun askı",
  "kisa aski": "Kısa askı",
  "uzun metal aski": "Uzun metal askı",
  "kalin kisa aski": "Kalın kısa askı",
  // colours
  "kirmizi": "Kırmızı",
  "yesil": "Yeşil",
  "nar cicegi": "Nar Çiçeği",
  // preparation time
  "10 gun": "10 gün",
  // care
  "makinada yikamayiniz.": "Makinede yıkamayınız.",
  "makinada yikamayiniz": "Makinede yıkamayınız.",
  "makinede yikamayiniz": "Makinede yıkamayınız.",
  "makinede yikamayiniz.": "Makinede yıkamayınız.",
  "makinede yikanmamalidir.": "Makinede yıkamayınız.",
  // short descriptions
  "renkli cicek desenli omuz cantasi": "Renkli çiçek desenli omuz çantası.",
  "oliva el orgusu omuz cantasi": "Oliva el örgüsü omuz çantası.",
  "siena cizgili hasir canta": "Siena çizgili hasır çanta."
};

/** Word-level corrections used only for short image alt texts and SEO titles typed without diacritics. */
const wordCorrections: Record<string, string> = {
  orgusu: "örgüsü",
  orgu: "örgü",
  cantasi: "çantası",
  cantasidir: "çantası",
  canta: "çanta",
  cantalar: "çantalar",
  acik: "açık",
  hasir: "hasır",
  gunluk: "günlük",
  kullanim: "kullanım",
  icin: "için",
  kucuk: "küçük",
  cicek: "çiçek",
  cicegi: "çiçeği",
  cizgili: "çizgili",
  kirmizi: "kırmızı",
  yesil: "yeşil",
  kahverengi: "kahverengi",
  el: "el"
};

export function correctValue(value: string | null | undefined) {
  if (!value) return value ?? "";
  const trimmed = value.trim();
  const corrected = valueCorrections[trimmed.toLocaleLowerCase("tr-TR")];
  return corrected ?? trimmed;
}

export function correctWords(value: string | null | undefined) {
  if (!value) return value ?? "";
  const words = value
    .trim()
    .split(/\s+/)
    .map((word) => {
      const bare = word.toLocaleLowerCase("tr-TR").replace(/[.,;:!?]+$/, "");
      const replacement = wordCorrections[bare];
      if (!replacement) return word;
      const punctuation = word.slice(bare.length);
      const isCapitalised = /^[A-ZÇĞİÖŞÜ]/.test(word);
      const fixed = isCapitalised ? replacement.charAt(0).toLocaleUpperCase("tr-TR") + replacement.slice(1) : replacement;
      return fixed + punctuation;
    });
  return words.join(" ");
}

/** "40cm x 50cm " -> "40 × 50 cm". Only normalises the format; values are untouched. */
export function formatDimensions(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d+(?:[.,]\d+)?)\s*cm?\s*[x×X]\s*(\d+(?:[.,]\d+)?)\s*cm?(?:\s*[x×X]\s*(\d+(?:[.,]\d+)?)\s*cm?)?\s*$/i);
  if (!match) return trimmed;
  const parts = [match[1], match[2], match[3]].filter(Boolean);
  return `${parts.join(" × ")} cm`;
}

type EditorialEntry = { original?: { description?: string }; editorial?: ProductEditorial };
const editorialEntries = editorialSource as unknown as Record<string, EditorialEntry | string>;

export function getEditorial(slug: string): ProductEditorial | undefined {
  const entry = editorialEntries[slug];
  return entry && typeof entry === "object" ? entry.editorial : undefined;
}

export function getReviewedSeo(slug: string) {
  return seoEdits.find((entry) => entry.slug === slug);
}

/** Applies reviewed spelling and copy to a Studio record without touching any factual field. */
export function applyReviewedCopy(product: Product): Product {
  const reviewedFields: NonNullable<Product["reviewedFields"]> = {};
  const track = <K extends keyof NonNullable<Product["reviewedFields"]>>(key: K, before: string, after: string) => {
    if (before.trim() !== after.trim()) reviewedFields[key] = before;
    return after;
  };

  const collection = track("collection", product.collection ?? "", correctValue(product.collection));
  const closure = track("closure", product.closure ?? "", correctValue(product.closure));
  const strap = track("strap", product.strap ?? "", correctValue(product.strap));
  const care = track("care", product.care ?? "", correctValue(product.care));
  const makingTime = track("makingTime", product.makingTime ?? "", correctValue(product.makingTime));
  const description = track("description", product.description ?? "", correctValue(product.description));
  const dimensions = track("dimensions", product.dimensions ?? "", formatDimensions(product.dimensions ?? ""));
  const materials = (product.materials ?? []).map((item) => correctValue(item));
  if (materials.join("|") !== (product.materials ?? []).join("|")) reviewedFields.materials = (product.materials ?? []).join(", ");
  const colors = (product.colors ?? []).map((item) => correctValue(item));
  if (colors.join("|") !== (product.colors ?? []).join("|")) reviewedFields.colors = (product.colors ?? []).join(", ");

  const reviewedSeo = getReviewedSeo(product.slug);
  const imageDetails = product.imageDetails?.map((detail, index) => {
    if (!detail) return detail;
    const reviewedAlt = index === 0
      ? reviewedSeo?.imageAlt
      : reviewedSeo?.galleryAlt?.[index - 1]?.alt;
    return { ...detail, alt: reviewedAlt || correctWords(detail.alt) || detail.alt };
  });

  const editorial = getEditorial(product.slug);
  const seoTitle = reviewedSeo?.seo.title || correctWords(product.seoTitle) || product.name;
  const seoDescription = reviewedSeo?.seo.description || editorial?.intro || correctWords(product.seoDescription) || description;

  return {
    ...product,
    collection,
    closure,
    strap,
    care,
    makingTime,
    description,
    dimensions,
    materials,
    colors,
    imageDetails,
    editorial,
    seoTitle,
    seoDescription,
    reviewedFields: Object.keys(reviewedFields).length ? reviewedFields : undefined
  };
}
