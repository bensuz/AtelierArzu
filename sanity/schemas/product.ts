import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ürün adı", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: { list: ["Omuz Çantası", "Mini Tote", "Pazar Çantası", "Portföy"] },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "collection", title: "Koleksiyon", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "price", title: "Fiyat metni", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "availability",
      title: "Stok durumu",
      type: "string",
      options: { list: ["Hazır", "Sipariş Üzerine", "Tükendi"] },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "materials", title: "Malzemeler", type: "array", of: [{ type: "string" }], validation: (rule) => rule.required().min(1) }),
    defineField({ name: "dimensions", title: "Ölçüler", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "colors", title: "Renkler", type: "array", of: [{ type: "string" }], validation: (rule) => rule.required().min(1) }),
    defineField({ name: "strap", title: "Askı", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "closure", title: "Kapama", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "care", title: "Bakım notu", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "makingTime", title: "Hazırlık süresi", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Ürün açıklaması", type: "text", rows: 4, validation: (rule) => rule.required().min(20) }),
    defineField({
      name: "image",
      title: "Ana görsel",
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
    defineField({
      name: "gallery",
      title: "Galeri",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Türkçe alt metin",
              type: "string",
              validation: (rule) => rule.max(140)
            })
          ]
        }
      ],
      validation: (rule) => rule.min(1).max(8)
    }),
    defineField({ name: "featured", title: "Öne çıkar", type: "boolean", initialValue: false }),
    defineField({ name: "seo", title: "SEO", type: "seo", validation: (rule) => rule.required() })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image"
    }
  }
});
