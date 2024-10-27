"use client";
import { errorLog } from "@/utils/errorLog";
import { Button } from "./ui/button";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface IProps {
  followingId: string;
  isFollowed?: boolean;
}

const FollowButton: FC<IProps> = ({ followingId, isFollowed: isFollowedByUser }) => {
  const { toast } = useToast();
  const [isFollowed, setIsFollowed] = useState(isFollowedByUser);

  const handleFollowUnFollow = async () => {
    try {
      if (isFollowed) {
        const res = await axiosClient.delete(apiEndpoints.user.unFollowUser(followingId));
        toast({
          title: res.data.message,
        });
        setIsFollowed(false);
      } else {
        const res = await axiosClient.post(apiEndpoints.user.followUser(followingId));
        toast({
          title: res.data.message,
        });
        setIsFollowed(true);
      }
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
      className="w-24 rounded-full"
      onClick={handleFollowUnFollow}
    >
      {isFollowed ? "Followed" : "Follow"}
    </Button>
  );
};

export default FollowButton;
