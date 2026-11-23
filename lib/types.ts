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
  capacity?: string;
  designNote?: string;
  shippingEstimate?: string;
  image: string;
  gallery: string[];
  imageDetails?: ({ url: string | null; alt?: string | null } | null)[];
  updatedAt?: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
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
