import { createClient } from "@sanity/client";
import { products } from "@/lib/data";
import editorialPosts from "@/lib/editorial-posts.json";
import { formatTryPrice, parseTryPrice } from "@/lib/price";
import { policyPages } from "@/lib/policies";
import { applyReviewedCopy } from "@/lib/product-copy";
import type { BlogPost, Product } from "@/lib/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export const sanityConfigured = Boolean(projectId);
const useSampleContent = process.env.NODE_ENV === "development" && !sanityConfigured;

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published"
    })
  : null;

const productProjection = `{
  name,
  "slug": slug.current,
  category,
  collection,
  price,
  priceAmount,
  "updatedAt": _updatedAt,
  availability,
  materials,
  dimensions,
  colors,
  strap,
  closure,
  care,
  makingTime,
  description,
  capacity,
  designNote,
  shippingEstimate,
  "image": coalesce(image.asset->url, gallery[0].asset->url, "/images/atelier-hero.png"),
  "gallery": coalesce(gallery[].asset->url, [image.asset->url], ["/images/atelier-hero.png"]),
  "imageDetails": [image{"url": asset->url, alt}] + coalesce(gallery[]{"url": asset->url, alt}, []),
  featured,
  "seoTitle": seo.title,
  "seoDescription": seo.description
}`;

function cleanSlug(slug: string) {
  return slug.replace(/^\/+/, "");
}

function normalizeProduct(product: Product): Product {
  const gallery = product.gallery?.filter(Boolean) ?? [];
  const image = product.image || gallery[0] || "/images/atelier-hero.png";
  const normalizedGallery = Array.from(new Set([image, ...gallery]));
  const priceAmount = parseTryPrice(product.priceAmount, product.price);

  return applyReviewedCopy({
    ...product,
    slug: cleanSlug(product.slug),
    price: priceAmount !== undefined ? formatTryPrice(priceAmount) : product.price || "Fiyat için bilgi alın",
    priceAmount,
    image,
    gallery: normalizedGallery,
    seoTitle: product.seoTitle || product.name,
    seoDescription: product.seoDescription || product.description
  });
}

function normalizeProducts(items: Product[]) {
  return items.map(normalizeProduct);
}

const blogProjection = `{
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  "updatedAt": _updatedAt,
  author,
  "image": coalesce(image.asset->url, "/images/atelier-hero.png"),
  "imageAlt": image.alt,
  readTime,
  body[]{
    ...,
    _type == "image" => {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  },
  faq,
  "relatedProducts": coalesce(relatedProducts[]->slug.current, []),
  "seoTitle": coalesce(seo.title, title),
  "seoDescription": coalesce(seo.description, excerpt)
}`;

export async function getProducts(): Promise<Product[]> {
  if (!client) return useSampleContent ? normalizeProducts(products) : [];
  const result = await client.fetch<Product[]>(
    `*[_type == "product"] | order(featured desc, name asc) ${productProjection}`,
    {},
    { next: { revalidate: 300 } }
  );
  return normalizeProducts(result);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!client) return useSampleContent ? normalizeProducts(products).find((product) => product.slug === cleanSlug(slug)) : undefined;
  const result = await client.fetch<Product | null>(
    `*[_type == "product" && slug.current in [$slug, $slugWithSlash]][0] ${productProjection}`,
    { slug: cleanSlug(slug), slugWithSlash: `/${cleanSlug(slug)}` },
    { next: { revalidate: 300 } }
  );
  return result ? normalizeProduct(result) : undefined;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!client) return editorialPosts;
  const published = await client.fetch<BlogPost[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) ${blogProjection}`,
    {},
    { next: { revalidate: 300 } }
  ).catch((error: unknown) => {
    console.error("Could not load Sanity blog posts", error);
    return [];
  });
  const publishedSlugs = new Set(published.map((post) => post.slug));
  return [...published, ...editorialPosts.filter((post) => !publishedSlugs.has(post.slug))]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const editorialPost = editorialPosts.find((post) => post.slug === slug);
  if (!client) return editorialPost;
  const published = await client.fetch<BlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] ${blogProjection}`,
    { slug },
    { next: { revalidate: 300 } }
  ).catch((error: unknown) => {
    if (!editorialPost) throw error;
    console.error("Could not load Sanity version of blog post", error);
    return null;
  });
  return published ?? editorialPost;
}

export async function getPublishedPolicies() {
  if (!client) return [];
  const settings = await client.fetch<{
    deliveryAndReturns?: unknown[];
    privacyNotice?: unknown[];
    updatedAt?: string;
  } | null>(
    '*[_type == "siteSettings"] | order(_updatedAt desc)[0]{deliveryAndReturns, privacyNotice, "updatedAt": _updatedAt}',
    {},
    { next: { revalidate: 300 } }
  );

  return policyPages.flatMap((page) => {
    const body = settings?.[page.field];
    return body?.length ? [{ ...page, body, updatedAt: settings?.updatedAt }] : [];
  });
}
