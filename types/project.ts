import type { Slug } from "@sanity/types";

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface BlockContent {
  _type: "block";
  children: Array<{ text: string }>;
}

export interface Project {
  _id: string;
  title: string;
  shortTitle?: string;
  slug: Slug;
  description: BlockContent[];
  thumbnail?: SanityImage;
  photo?: SanityImage[];
  tags?: string[];
  details?: BlockContent[];
}
