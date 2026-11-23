export type ProductEditorial = {
  /** One or two sentences that make this model recognisable. */
  intro: string;
  /** Concrete, visible or data-backed features. */
  highlights: string[];
  /** How and where the bag is comfortable to use. */
  usage?: string;
  /** Arzu's own note on material, form or strap choice. Shown only when written by her. */
  makerNote?: string;
};

export type Product = {
  name: string;
  slug: string;
  category: string;
  collection: string;
  price: string;
  priceAmount?: number;
  availability: "Hazır" | "Sipariş Üzerine" | "Tükendi";
  materials: string[];
  dimensions: string;
  colors: string[];
  strap: string;
  closure: string;
  care: string;
  makingTime: string;
  description: string;
  /** Free-text capacity note written in Studio ("İçine ne sığar?"). */
  capacity?: string;
  /** Verified list of items that fit; only rendered when confirmed for the model. */
  fits?: string[];
  designNote?: string;
  shippingEstimate?: string;
  image: string;
  gallery: string[];
  imageDetails?: ({ url: string | null; alt?: string | null } | null)[];
  updatedAt?: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  /** Reviewed editorial copy layered over the Studio record (see lib/product-editorial.json). */
  editorial?: ProductEditorial;
  /** Original Studio values that were replaced by reviewed copy, kept for comparison. */
  reviewedFields?: Partial<Record<"description" | "collection" | "materials" | "closure" | "strap" | "care" | "makingTime" | "colors" | "dimensions", string>>;
};

export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image: string;
  imageAlt?: string;
  readTime: string;
  body: unknown[];
  faq: { question: string; answer: string }[];
  relatedProducts: string[];
  seoTitle: string;
  seoDescription: string;
};

export type Material = {
  name: string;
  summary: string;
  details: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};
