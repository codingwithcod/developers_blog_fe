import apiEndpoints from "@/api/apiEndpoints";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { IBlog } from "@/interfaces/IBlog";
import { axiosClient } from "@/utils/axiosClient";
import { errorLog } from "@/utils/errorLog";
import Link from "next/link";
import React, { FC } from "react";
import { HiPencilSquare } from "react-icons/hi2";

interface IProps {
  userId: string;
}

const MyBlogs: FC<IProps> = async ({ userId }) => {
  try {
    const res = await axiosClient.get(apiEndpoints.blogs.getUsersAllBlogByUserId(userId));
    const blogs = res.data.blogs as IBlog[];

    return (
      <>
        {blogs.length === 0 && (
          <div className="flex h-[20rem] w-full flex-col items-center justify-center">
            <p className="text-2xl text-muted-foreground">There is no blogs available</p>
            <p className="text-sm text-muted-foreground/70">You can also Write your own blogs</p>
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

        {blogs.length > 0 && (
          <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => {
              return (
                <BlogCard
                  blog={blog}
                  key={blog._id}
                />
              );
            })}
          </div>
        )}
      </>
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

export default MyBlogs;
