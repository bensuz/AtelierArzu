import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Yazısı",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: { list: ["Stil", "Bakım", "Rehber", "Trend"] },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "excerpt", title: "Özet", type: "text", rows: 3, validation: (rule) => rule.required().min(20).max(220) }),
    defineField({ name: "publishedAt", title: "Yayın tarihi", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "author", title: "Yazar", type: "string", initialValue: "Atelier Arzu", validation: (rule) => rule.required() }),
    defineField({
      name: "image",
      title: "Kapak görseli",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Türkçe alt metin",
          type: "string",
          validation: (rule) => rule.max(140)
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({ name: "readTime", title: "Okuma süresi", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "faq",
      title: "SSS",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Soru", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "answer", title: "Cevap", type: "text", rows: 3, validation: (rule) => rule.required() })
          ]
        }
      ]
    }),
    defineField({
      name: "relatedProducts",
      title: "İlgili ürünler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }]
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", validation: (rule) => rule.required() })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image"
    }
  }
});
