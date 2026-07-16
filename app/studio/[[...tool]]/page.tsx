"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="min-h-screen bg-shell px-6 py-16 text-ink">
        <StudioChromeStyle />
        <div className="mx-auto max-w-2xl rounded-lg border border-ink/10 bg-linen p-8">
          <h1 className="font-serif text-4xl font-semibold">Sanity Studio</h1>
          <p className="mt-4 leading-7 text-ink/70">
            Studio&apos;yu açmak için önce <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> ve{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET</code> ortam değişkenlerini ekleyin.
            Bu değerler eklenene kadar site yerel başlangıç içeriğini kullanır.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <StudioChromeStyle />
      <NextStudio config={config} />
    </>
  );
}

function StudioChromeStyle() {
  return (
    <style>{`
      body > header,
      body > footer {
        display: none !important;
      }

      body > main {
        min-height: 100vh;
      }
    `}</style>
  );
}
