import React from "react";
import BlogCategoryItem from "./BlogCategoryItem";
import GithubSlugger from "github-slugger";

const Categories = ({
  categories,
  active,
}: {
  categories: string[];
  active: string;
}) => {
  const slugger = new GithubSlugger();
  return (
    <section className="mt-6 border-t-2 text-gray-800 border-b-2 border-solid border-black py-4 flex items-center sm:items-start flex-wrap font-medium mx-6 ">
      {categories.map((c) => (
        <BlogCategoryItem
          key={c}
          link={`/categories/${c}`}
          name={c}
          currentSlug={active === slugger.slug(c)}
        />
      ))}
    </section>
  );
};

export default Categories;
