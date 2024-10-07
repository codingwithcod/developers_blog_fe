"use client";
import React from "react";
import { IBlog } from "@/interfaces/blog";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiPencilSquare } from "react-icons/hi2";
import { blogs as constantBlogs } from "@/constant/blogs";

const Blogs = () => {
  // ...(JSON.parse(localStorage.getItem("blogs") ?? "[]") as IBlog[]),
  const localBlogs = [...constantBlogs] as IBlog[];

  return (
    <div className="container flex h-[60vh] flex-col items-center sm:px-5 md:px-10 lg:px-20">
      {localBlogs.length === 0 && (
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
      <div className="mt-24 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {localBlogs.map((blog) => {
          return (
            <BlogCard
              blog={blog}
              key={blog.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
