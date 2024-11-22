"use client";
import React, { FC, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { errorLog } from "@/utils/errorLog";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { TBlogStatus } from "@/interfaces/IBlog";

interface IProps {
  username: string;
  blogId: string;
  blogStatus: TBlogStatus;
  isReadLater: boolean;
  onClose: () => void;
}

const OptionDropdown: FC<IProps> = ({ blogId, username, isReadLater, blogStatus, onClose }) => {
  const { data } = useSession();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const boxRef = useRef<HTMLDivElement | null>(null);

  /** Closing dropdown if click outside. */
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    /** ---> Cleaning up event listener on unmount */
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [boxRef]);

  const handleAddRemoveBlogToReadLater = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (isReadLater) {
        await axiosClient.delete(apiEndpoints.blogs.removeBlogFromReadLater(blogId));
        toast({
          title: "Remove from read later.",
        });
      } else {
        await axiosClient.post(apiEndpoints.blogs.addBlogToReadLater(blogId));
        toast({
          title: "Saved to read later.",
        });
      }
    } catch (error) {
      errorLog(error);

      toast({
        title: isReadLater ? "Didn't remove from read later." : "Didn't save to read later.",
        variant: "destructive",
      });
    } finally {
      onClose();
    }
  };

  const handlePublishUnPublishBlogs = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (blogStatus === "draft") {
        await axiosClient.patch(apiEndpoints.blogs.updateBlog(blogId), {
          status: "published",
        });
        toast({
          title: "Blog published successfully.",
        });
      } else {
        await axiosClient.patch(apiEndpoints.blogs.updateBlog(blogId), {
          status: "draft",
        });
        toast({
          title: "Blog unpublished successfully.",
        });
      }
    } catch (error) {
      errorLog(error);
      toast({
        title: blogStatus === "draft" ? "Blog Didn't published." : "Blog Didn't unpublished.",
        variant: "destructive",
      });
    } finally {
      onClose();
    }
  };

  return (
    <div
      ref={boxRef}
      className="absolute bottom-10 right-0 z-50 min-w-40 rounded-md bg-muted shadow-md"
    >
      <div className="z-50 flex flex-col py-2">
        <Button
          className="rounded-none hover:bg-muted-foreground/30"
          variant={"secondary"}
          onClick={handleAddRemoveBlogToReadLater}
        >
          {isReadLater ? "Remove from Read later" : "Add to Read later"}
        </Button>
        {data?.user.username === username && currentTab === "myblogs" && (
          <Button
            className="rounded-none hover:bg-muted-foreground/50"
            variant={"secondary"}
            onClick={handlePublishUnPublishBlogs}
          >
            {blogStatus === "draft" ? (
              <span className="text-green-500">Publish</span>
            ) : (
              <span className="text-yellow-500">Unpublish</span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OptionDropdown;
