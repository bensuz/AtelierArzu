import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PublicPage = {
  title: string;
  description?: string;
  path: string;
  image?: { url: string; alt: string };
  article?: { publishedTime?: string; modifiedTime?: string; authors?: string[] };
};

export function publicPageMetadata({ title, description, path, image, article }: PublicPage): Metadata {
  const url = absoluteUrl(path);
  const shareTitle = `${title} | ${siteConfig.name}`;
  const shareImage = image
    ? { ...image, url: absoluteUrl(image.url) }
    : { url: absoluteUrl("/images/atelier-hero.png"), alt: "Kroşe çantalar ve iplikler", width: 1536, height: 1024 };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description: description ?? siteConfig.description,
      url,
      siteName: siteConfig.name,
      locale: "tr_TR",
      images: [shareImage],
      ...(article ? { type: "article", ...article } : { type: "website" })
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: description ?? siteConfig.description,
      images: [shareImage]
    }
  };
}
