import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { blogs } from "@/constant/blogs";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="container min-h-dvh w-full bg-background">
      <section className="mt-52 flex h-[25rem] w-full flex-col items-center gap-2">
        <h1 className="text-7xl font-semibold">Developers Blog</h1>
        <p className="text-lg tracking-[0.34em]">For Developers by Developers</p>

        <div className="mt-10 flex gap-4">
          <Link href={"/blogs"}>
            <Button
              variant={"secondary"}
              className="rounded-full"
              role="link"
            >
              Read Blogs
            </Button>
          </Link>

          <Button
            variant={"outline"}
            className="rounded-full"
          >
            Search Blogs
          </Button>
        </div>
      </section>
      <section>
        <h2 className="mb-20 text-center text-3xl font-semibold">
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
    </main>
  );
};

export default Home;
