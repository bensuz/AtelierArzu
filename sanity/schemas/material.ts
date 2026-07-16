import { defineField, defineType } from "sanity";

export const material = defineType({
  name: "material",
  title: "Malzeme",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Malzeme adı", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Kısa özet", type: "text", rows: 2, validation: (rule) => rule.required() }),
    defineField({ name: "details", title: "Detay", type: "text", rows: 4, validation: (rule) => rule.required() })
  ]
});
