import apiEndpoints from "@/api/apiEndpoints";
import BlogCard from "@/components/BlogCard";
import { IBlog } from "@/interfaces/IBlog";
import { axiosClient } from "@/utils/axiosClient";
import { errorLog } from "@/utils/errorLog";
import React, { useEffect, useState } from "react";
import BlogCardSkeleton from "../BlogCardSkeleton";

const LikedBlogs = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  /** ---> Fetching blogs on component load. */
  useEffect(() => {
    fetchUsersLikedBlogs();
  }, []);

  const fetchUsersLikedBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get(apiEndpoints.blogs.getUsersLikedBlogs);
      setBlogs(res.data.blogs);
    } catch (error) {
      errorLog(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isError) {
    return (
      <>
        {isLoading && (
          <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 xl:grid-cols-3">
            {[...new Array(6)].map((_, index) => (
              <BlogCardSkeleton key={`likedblogskeleton-${index}`} />
            ))}
          </div>
        )}
        {!isLoading && blogs.length === 0 && (
          <div className="flex h-[20rem] w-full flex-col items-center justify-center">
            <p className="text-2xl text-muted-foreground">There is no blogs available</p>
            <p className="text-sm text-muted-foreground/70">You can also like blogs and see here</p>
          </div>
        )}

        {!isLoading && blogs.length > 0 && (
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

export default LikedBlogs;
