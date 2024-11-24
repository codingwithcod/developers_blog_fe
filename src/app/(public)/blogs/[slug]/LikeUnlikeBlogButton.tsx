"use client";
import apiEndpoints from "@/api/apiEndpoints";
import LoginAlert from "@/components/LoginAlert";
import { axiosClient } from "@/utils/axiosClient";
import { errorLog } from "@/utils/errorLog";
import { Session } from "next-auth";
import { FC, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

interface IPorps {
  likes: number;
  isLiked: boolean;
  blogId: string;
  session: Session | null;
}

const LikeUnlikeBlogButton: FC<IPorps> = ({ blogId, likes, isLiked, session }) => {
  const [blogLikes, setBlogLikes] = useState(likes);
  const [isBlogLiked, setIsBlogLiked] = useState(isLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLikeUnlike = async () => {
    setIsLoading(true);
    try {
      if (isBlogLiked) setBlogLikes((prev) => --prev);
      else setBlogLikes((prev) => ++prev);
      setIsBlogLiked((prev) => !prev);
      await axiosClient.post(apiEndpoints.blogs.likeUnlikeBlog(blogId));
    } catch (error) {
      errorLog(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {session ? (
        <button
          disabled={isLoading}
          onClick={handleToggleLikeUnlike}
          className="flex h-full items-center gap-3 rounded-full px-3 duration-500 hover:bg-muted"
        >
          {isBlogLiked ? <AiFillLike className="text-lg" /> : <AiOutlineLike className="text-lg" />}
          {blogLikes}
        </button>
      ) : (
        <LoginAlert message="Please make sure to log in to the application, then you will be able to like this blog.">
          <button className="flex h-full items-center gap-3 rounded-full px-3 duration-500 hover:bg-muted">
            <AiOutlineLike className="text-lg" />
            {blogLikes}
          </button>
        </LoginAlert>
      )}
    </>
  );
};

export default LikeUnlikeBlogButton;
