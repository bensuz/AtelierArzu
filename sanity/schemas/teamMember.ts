import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Ekip Üyesi",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ad", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Rol", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "bio", title: "Biyografi", type: "text", rows: 4, validation: (rule) => rule.required() })
  ]
});
