"use client";
import apiEndpoints from "@/api/apiEndpoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IComment } from "@/interfaces/IComment";
import { axiosClient } from "@/utils/axiosClient";
import { errorLog } from "@/utils/errorLog";
import Link from "next/link";
import React, { useState, useEffect, useRef, FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface IProps {
  blogId: string;
}

const Comments: FC<IProps> = ({ blogId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasFetched) {
        handleFetchComments();
        setHasFetched(true);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (commentsRef.current) {
      observer.observe(commentsRef.current);
    }

    return () => {
      if (commentsRef.current) {
        observer.unobserve(commentsRef.current);
      }
    };
  }, [hasFetched]);

  const handleFetchComments = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get(apiEndpoints.blogs.getAllCommentsForABlog(blogId));
      setComments(res.data.comments);
    } catch (error) {
      errorLog(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={commentsRef}
      className="mt-10 min-h-52 w-full md:w-[70%]"
    >
      <h3 className="text-2xl font-semibold">Comments</h3>
      {isLoading &&
        [...new Array(3)].map((_, index) => {
          return (
            <div
              key={_ + index}
              className="my-2"
            >
              <div className="flex gap-3 py-2">
                {/* ---> Avatar  */}
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-full bg-muted"></div>
                </div>
                {/* ---> User name and comment  */}
                <div className="w-full">
                  <div className="flex">
                    <div className="w-full space-y-2 pr-2">
                      <div className="h-5 w-32 rounded-sm bg-muted"></div>

                      <div className="h-5 rounded-sm bg-muted/80"></div>
                    </div>

                    {/* ---> Options three dots  */}
                    <div className="justify-self-end">
                      <Button className="relative h-10 w-10 rounded-full bg-background text-muted-foreground shadow-none hover:bg-muted">
                        <BsThreeDotsVertical className="absolute text-lg" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {/* ---> Displaying comments after loading */}
      {!isLoading && (
        <>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => {
                const {
                  content,
                  user: { firstName, lastName, username, profilePic },
                } = comment;
                return (
                  <li
                    key={comment._id}
                    className="my-2"
                  >
                    <div className="flex gap-3 py-2">
                      {/* ---> Avatar  */}
                      <div className="flex items-start gap-3">
                        <Link href={`/u/@${username}`}>
                          <Avatar className="h-11 w-11">
                            <AvatarImage src={profilePic} />
                            <AvatarFallback className="text-xl">
                              {comment.user.firstName.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                      </div>
                      {/* ---> User name and comment  */}
                      <div className="w-full font-sans">
                        <div className="flex">
                          <div className="w-full pr-2">
                            <Link href={`/u/@${username}`}>
                              <h4 className="text-lg leading-5">
                                {firstName} {lastName}
                              </h4>
                            </Link>
                            <p className="text-base font-medium text-muted-foreground">{content}</p>
                          </div>

                          {/* ---> Options three dots  */}
                          <div className="justify-self-end">
                            <Button className="relative h-10 w-10 rounded-full bg-background text-muted-foreground shadow-none hover:bg-muted">
                              <BsThreeDotsVertical className="absolute text-lg" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="w-full text-center">
              <p className="mt-3">No comments yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
