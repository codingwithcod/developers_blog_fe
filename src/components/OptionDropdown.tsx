"use client";
import React, { FC } from "react";
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
  const handleAddRemoveBlogToReadLater = async () => {
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

  return (
    <div className="absolute bottom-10 right-0 z-50 min-w-40 rounded-md bg-muted shadow-md">
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
