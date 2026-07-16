import { blogPost } from "@/sanity/schemas/blogPost";
import { material } from "@/sanity/schemas/material";
import { product } from "@/sanity/schemas/product";
import { seo } from "@/sanity/schemas/seo";
import { siteSettings } from "@/sanity/schemas/siteSettings";
import { teamMember } from "@/sanity/schemas/teamMember";

export const schemaTypes = [seo, product, blogPost, material, teamMember, siteSettings];
