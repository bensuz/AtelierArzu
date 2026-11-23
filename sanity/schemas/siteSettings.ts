import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site başlığı", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Site açıklaması", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "whatsappPhone", title: "WhatsApp telefon", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "email", title: "E-posta", type: "email" }),
    defineField({
      name: "deliveryAndReturns",
      title: "Teslimat, İade ve Cayma Hakkı",
      type: "array",
      of: [{ type: "block" }],
      description: "İncelenmiş metni girin. Boş bırakılırsa ilgili site sayfası gösterilmez."
    }),
    defineField({
      name: "privacyNotice",
      title: "KVKK Aydınlatma Metni",
      type: "array",
      of: [{ type: "block" }],
      description: "İşletmenin veri işleme süreçlerine göre incelenmiş metni girin."
    })
  ]
});
