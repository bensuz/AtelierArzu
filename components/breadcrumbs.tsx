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
      <nav aria-label="Sayfa yolu" className="mb-8 text-sm text-ink/70">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map(({ href, label }, index) => (
            <li key={href} className="flex items-baseline gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page">{label}</span>
              ) : (
                <Link href={href} className="focus-ring rounded-sm hover:text-[#741616] hover:underline">
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
