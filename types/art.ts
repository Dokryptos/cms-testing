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

export interface Art {
  _id: string;
  title: string;
  shortTitle?: string;
  description: BlockContent[];
  thumbnail?: SanityImage;
  details?: BlockContent[];
}
