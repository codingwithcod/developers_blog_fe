"use client";
import apiEndpoints from "@/api/apiEndpoints";
import { IComment } from "@/interfaces/IComment";
import { axiosClient } from "@/utils/axiosClient";
import { errorLog } from "@/utils/errorLog";
import React, { useState, useEffect, useRef, FC } from "react";

interface IProps {
  blogId: string;
}

const Comments: FC<IProps> = ({ blogId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(false); // eslint-disable-line
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
    <div ref={commentsRef}>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.content}</p>
              <small>
                By {comment.user.firstName} on {new Date(comment.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      ) : hasFetched ? (
        <p>No comments yet.</p>
      ) : (
        <p>Loading comments...</p>
      )}
    </div>
  );
};

export default Comments;
