# Atelier Arzu

Turkish portfolio and product-information site for a handmade crochet bag atelier.

## Tech

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS schemas and embedded Studio at `/studio`
- Local fallback content until Sanity environment variables are configured

## Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and update:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_PHONE`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

The three files in `public/images` are temporary AI-generated placeholders. Replace them with real product photography before launch; product galleries already reuse these placeholders in 5-image sets.
# AtelierArzu
