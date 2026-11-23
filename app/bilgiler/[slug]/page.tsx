import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { cache } from "react";
import { publicPageMetadata } from "@/lib/metadata";
import { policyPages } from "@/lib/policies";
import { getPublishedPolicies } from "@/lib/sanity";

const getPolicy = cache(async (slug: string) => {
  if (!policyPages.some((page) => page.slug === slug)) return undefined;
  return (await getPublishedPolicies()).find((page) => page.slug === slug);
});

type PolicyPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const policy = await getPolicy((await params).slug);
  if (!policy) notFound();
  return publicPageMetadata({ title: policy.title, path: `/bilgiler/${policy.slug}` });
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const policy = await getPolicy((await params).slug);
  if (!policy) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-6xl">{policy.title}</h1>
      <div className="prose prose-lg mt-8 max-w-none prose-headings:font-serif prose-headings:text-ink">
        <PortableText value={policy.body as never} />
      </div>
    </article>
  );
}
