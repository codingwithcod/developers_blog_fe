import { blogs } from "@/constant/blogs";
import React from "react";
import BlogCard from "../BlogCard";

const MostReadBlogsSection = () => {
  return (
    <section className="py-5">
      <h2 className="mb-10 text-center text-xl font-semibold sm:mb-20 sm:text-3xl">
        Most Reads Blogs you would like
      </h2>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {blogs.map((blog) => {
          return (
            <BlogCard
              blog={blog}
              key={blog.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MostReadBlogsSection;
