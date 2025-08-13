export type ParamsProps = Promise<{ slug: string }>;

export type SearchParamsProps = Promise<{
   type?: string; minPrice?: number; maxPrice?: number; sort?: string; page?: string; name?: string; [key: string]: string | string[] | number | undefined; cat?:string;
}>;

export type Blog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  publishAt: string; // ISO string
  updatedAt: string; // ISO string
  tags: string[];
  isPublished: boolean;
  url: string; // Computed field
};

export type BlogListProps = {
  blogs: Blog[];
};

export type BlogTagProps = {
  link?: string;
  name: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export type Heading = {
  level: "one" | "two" | "three";
  text: string;
  slug: string;
};
