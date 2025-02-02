import { defineField, defineType, defineArrayMember } from "sanity";
import { isUniqueAcrossAllDocuments } from "../lib/isUniqueAcrossAllDocuments";
import { ArchiveIcon } from "@sanity/icons";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ArchiveIcon,
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
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: "The slug is the url path of the project",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "block", name: "block" })],
      description: "Write the description of your project",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "The first img use for the présentation project",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          name: "image",
          options: {
            hotspot: true,
          },
        }),
        // defineArrayMember({
        //   type: "mux.video",
        //   name: "video",
        // }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string", name: "tag" })],
      description: "Tags for the project",
    }),
    defineField({
      name: "details",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
