import React from "react";
import { IBlog } from "@/interfaces/blog";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiPencilSquare } from "react-icons/hi2";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { errorLog } from "@/utils/errorLog";

const Blogs = async () => {
  try {
    const res = await axiosClient.get(apiEndpoints.blogs.getAllBlogs);
    const blogs = res.data.blogs as IBlog[];
    return (
      <div className="container flex min-h-[90vh] flex-col items-center pb-20 pt-24 sm:px-5 md:px-10 lg:px-20">
        {blogs.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-end">
            <p className="text-2xl">There is no blogs available</p>
            <p className="text-muted-foreground">You can also Write your own blogs</p>
            <Link href={`/new-blog`}>
              <Button
                variant={"outline"}
                size={"sm"}
                className="mt-4 w-20 gap-1 rounded-full"
              >
                <HiPencilSquare className="text-sm" />
                Write
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {blogs.map((blog) => {
            return (
              <BlogCard
                blog={blog}
                key={blog.slug}
              />
            );
          })}
        </div>
      </div>
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

export default Blogs;
