export type CmsSection = {
  key: string;
  title: string;
  fields: Record<string, string>;
  images: Record<string, string>;
};

export type CmsPage = {
  slug: string;
  name: string;
  sections: CmsSection[];
};

export type CmsBits = {
  fields: Record<string, string>;
  images: Record<string, string>;
};
