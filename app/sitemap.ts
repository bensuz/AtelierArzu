import type { MetadataRoute } from "next";
import { getBlogPosts, getProducts, getPublishedPolicies } from "@/lib/sanity";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, policies] = await Promise.all([getProducts(), getBlogPosts(), getPublishedPolicies()]);
  const staticRoutes = ["", "/urunler", "/hakkimizda", "/malzemeler-ve-bakim", "/blog", "/iletisim", "/siparis-rehberi", "/sik-sorulan-sorular", "/canta-olcu-rehberi"];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route)
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/urunler/${product.slug}`),
      lastModified: product.updatedAt
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt ?? post.publishedAt
    })),
    ...policies.map((policy) => ({
      url: absoluteUrl(`/bilgiler/${policy.slug}`),
      lastModified: policy.updatedAt
    }))
  ];
}
