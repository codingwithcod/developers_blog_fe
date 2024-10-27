"use client";
import { errorLog } from "@/utils/errorLog";
import { Button } from "./ui/button";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { FC } from "react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface IProps {
  followingId: string;
  isFollowed?: boolean;
}

const FollowButton: FC<IProps> = ({ followingId, isFollowed }) => {
  const { toast } = useToast();

  const handleFollowUnFollow = async () => {
    try {
      await axiosClient.post(apiEndpoints.user.followUser(followingId));
      toast({
        title: "Followed successfully",
      });
    } catch (error) {
      errorLog(error);
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Button
      variant={isFollowed ? "default" : "outline"}
      className="rounded-full"
      onClick={handleFollowUnFollow}
    >
      {isFollowed ? "Followed" : "Follow"}
    </Button>
  );
};

export default FollowButton;
