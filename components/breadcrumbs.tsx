import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";

type BreadcrumbItem = { label: string; href: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map(({ href, label }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: label,
            item: absoluteUrl(href)
          }))
        }}
      />
      <nav aria-label="Sayfa yolu" className="mb-8 text-[0.8125rem] text-charcoal/60">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map(({ href, label }, index) => (
            <li key={href} className="flex items-baseline gap-2">
              {index > 0 && <span aria-hidden="true" className="text-charcoal/30">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page" className="text-charcoal/80">{label}</span>
              ) : (
                <Link href={href} className="focus-ring rounded-sm hover:text-burgundy">
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
