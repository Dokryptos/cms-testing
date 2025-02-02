import { defineField, defineType, defineArrayMember } from "sanity";
import { isUniqueAcrossAllDocuments } from "../lib/isUniqueAcrossAllDocuments";

export const photoType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the project",
    }),
    defineField({
      name: "shortTitle",
      title: "Short Title",
      type: "string",
      description: "Short title of the project",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
        isUnique: isUniqueAcrossAllDocuments,
      },
      description: "The slug is the url path of the project",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "block", name: "block" })],
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "details",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
