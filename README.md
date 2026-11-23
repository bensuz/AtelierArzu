# Arzu’dan

Turkish portfolio and product-information site for a handmade crochet bag atelier.

## Tech

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS schemas and embedded Studio at `/studio`
- Local sample catalog without Sanity in development and static editorial articles

## Setup

Use Node.js 26.13.1 LTS (the version is pinned in `.nvmrc` and
`.node-version`) and npm 11.

```bash
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` and update:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_PHONE`
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_INSTAGRAM_HANDLE`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Use the business WhatsApp number in international format with digits only.
The WhatsApp buttons are disabled until a valid number is configured.
Sample products are available only in local development without Sanity
configuration. The production catalog uses published Sanity documents.
Static articles are available in every environment.

Set `SELLER_LEGAL_NAME` and `SELLER_BUSINESS_ADDRESS` to display verified seller
details on the contact page. Set `SELLER_KEP_EMAIL` if the business publishes a
registered electronic mail address.

The published catalog uses product photography from Sanity. Keep the product
itself accurate when retouching backgrounds, and record useful Turkish alt
text on each photo in Studio.

## Catalog and launch checks

Static articles are maintained in `lib/editorial-posts.json` with local cover
photos and catalog references. A published Sanity article with the same slug
takes precedence. Keep the slug when moving an article into Studio so its
public URL stays the same.
`sanity/product-seo-edits.json` records reviewed titles, descriptions and image
alt text for the current catalog, ready to enter in Studio.

- In Studio, add the exact TRY price where applicable, current availability,
  a tested capacity note, dispatch estimate, and a short first-person design
  note. Existing published price text remains supported.
- Add reviewed delivery, returns, and privacy text to **Site Ayarları**.
  Publishing those fields adds the corresponding footer links and sitemap
  entries.
- Set the final production URL, verify that domain in Google Search Console,
  submit `/sitemap.xml`, and inspect the homepage and priority product URLs.
  Test price and availability in Google's Rich Results Test.
- Link Instagram posts to the exact product or article they show. When
  analytics is reviewed and enabled, track WhatsApp opens as clicks and tally
  confirmed conversations and orders separately. Use consent-gated,
  production-only analytics and omit link URLs and message contents.
