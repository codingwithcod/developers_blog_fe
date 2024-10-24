import React from "react";
import BlogCard from "../BlogCard";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { IBlog } from "@/interfaces/IBlog";
import { errorLog } from "@/utils/errorLog";

const MostReadBlogsSection = async () => {
  try {
    const res = await axiosClient.get(apiEndpoints.blogs.getAllBlogs);
    const blogs = res.data.blogs as IBlog[];

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
                key={blog._id}
              />
            );
          })}
        </div>
      </section>
    );
  } catch (error) {
    errorLog(error);
    return (
      <div className="container flex min-h-[90vh] flex-col items-center justify-center pb-20 pt-24 text-center sm:px-5 md:px-10 lg:px-20">
        <h1 className="text-lg">Failed to fetch blogs</h1>
        <p className="text-sm text-muted-foreground">
          There was an issue fetching the blogs. Please try again later.
        </p>
      </div>
    );
  }
};

export default MostReadBlogsSection;
