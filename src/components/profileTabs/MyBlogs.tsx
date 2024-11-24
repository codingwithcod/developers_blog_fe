"use client";
import apiEndpoints from "@/api/apiEndpoints";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { IBlog } from "@/interfaces/IBlog";
import { axiosClient } from "@/utils/axiosClient";
import { errorLog } from "@/utils/errorLog";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import BlogCardSkeleton from "../BlogCardSkeleton";

interface IProps {
  userId: string;
}

const MyBlogs: FC<IProps> = ({ userId }) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  /** ---> Fetching blogs on component load. */
  useEffect(() => {
    fetchUsersBlogs();
  }, []);

  const fetchUsersBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get(apiEndpoints.blogs.getUsersAllBlogByUserId(userId));
      setBlogs(res.data.blogs);
    } catch (error) {
      errorLog(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onPublishUnpublish = (blogId: string) => {
    setBlogs((blogs) =>
      blogs.map((blog) => {
        if (blog._id === blogId) {
          return { ...blog, status: blog.status === "draft" ? "published" : "draft" };
        }
        return blog;
      })
    );
  };

  if (!isError) {
    return (
      <>
        {isLoading && (
          <div className="grid grid-cols-1 gap-10 py-5 sm:grid-cols-2 xl:grid-cols-3">
            {[...new Array(6)].map((_, index) => (
              <BlogCardSkeleton key={`myblogskeleton-${index}`} />
            ))}
          </div>
        )}
        {!isLoading && blogs.length === 0 && (
          <div className="flex h-[20rem] w-full flex-col items-center justify-center text-center">
            <p className="text-2xl text-muted-foreground">There is no blogs available</p>
            <p className="text-sm text-muted-foreground/70">You can also Write your own blogs</p>
            <Link href={`/blog/new`}>
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

        {!isLoading && blogs.length > 0 && (
          <div className="grid grid-cols-1 gap-10 py-5 sm:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => {
              return (
                <BlogCard
                  blog={blog}
                  key={blog._id}
                  onPublishUnpublish={() => onPublishUnpublish(blog._id)}
                />
              );
            })}
          </div>
        )}
      </>
    );
  } else {
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

export default MyBlogs;
