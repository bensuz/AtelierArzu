import { createClient } from "@sanity/client";
import { blogPosts, products } from "@/lib/data";
import type { BlogPost, Product } from "@/lib/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export const sanityConfigured = Boolean(projectId);

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
  availability,
  materials,
  dimensions,
  colors,
  strap,
  closure,
  care,
  makingTime,
  description,
  "image": coalesce(image.asset->url, gallery[0].asset->url, "/images/atelier-hero.png"),
  "gallery": coalesce(gallery[].asset->url, [image.asset->url], ["/images/atelier-hero.png"]),
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

  return {
    ...product,
    slug: cleanSlug(product.slug),
    image,
    gallery: normalizedGallery,
    seoTitle: product.seoTitle || product.name,
    seoDescription: product.seoDescription || product.description
  };
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
  author,
  "image": coalesce(image.asset->url, "/images/atelier-hero.png"),
  readTime,
  body,
  faq,
  "relatedProducts": relatedProducts[]->slug.current,
  "seoTitle": seo.title,
  "seoDescription": seo.description
}`;

export async function getProducts(): Promise<Product[]> {
  if (!client) return products;
  const result = await client.fetch<Product[]>(
    `*[_type == "product"] | order(featured desc, name asc) ${productProjection}`,
    {},
    { next: { revalidate: 300 } }
  );
  return result.length ? normalizeProducts(result) : products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!client) return products.find((product) => product.slug === slug);
  const result = await client.fetch<Product | null>(
    `*[_type == "product" && slug.current in [$slug, $slugWithSlash]][0] ${productProjection}`,
    { slug: cleanSlug(slug), slugWithSlash: `/${cleanSlug(slug)}` },
    { next: { revalidate: 300 } }
  );
  return result ? normalizeProduct(result) : products.find((product) => product.slug === cleanSlug(slug));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!client) return blogPosts;
  const result = await client.fetch<BlogPost[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) ${blogProjection}`,
    {},
    { next: { revalidate: 300 } }
  );
  return result.length ? result : blogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!client) return blogPosts.find((post) => post.slug === slug);
  const result = await client.fetch<BlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] ${blogProjection}`,
    { slug },
    { next: { revalidate: 300 } }
  );
  return result ?? blogPosts.find((post) => post.slug === slug);
}
