"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { FC, useState } from "react";
import MyBlogs from "./MyBlogs";
import LikedBlogs from "./LikedBlogs";
import ReadLaterBlogs from "./ReadLaterBlogs";

interface IProps {
  userId: string;
}

const ProfileTabs: FC<IProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("myblogs");

  return (
    <Tabs
      defaultValue="liked"
      className="w-full"
      value={activeTab}
    >
      <TabsList className="my-2">
        <TabsTrigger
          onClick={() => setActiveTab("myblogs")}
          value="myblogs"
        >
          My Blogs
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setActiveTab("liked")}
          value="liked"
        >
          Liked{" "}
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setActiveTab("read-later")}
          value="read-later"
        >
          Read Later
        </TabsTrigger>
      </TabsList>
      <hr />
      <TabsContent value="myblogs">
        <MyBlogs userId={userId} />
      </TabsContent>
      <TabsContent value="liked">
        <LikedBlogs />
      </TabsContent>
      <TabsContent value="read-later">
        <ReadLaterBlogs />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
