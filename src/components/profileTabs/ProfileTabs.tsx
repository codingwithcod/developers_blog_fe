"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { FC, useEffect, useState } from "react";
import MyBlogs from "./MyBlogs";
import LikedBlogs from "./LikedBlogs";
import ReadLaterBlogs from "./ReadLaterBlogs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TTabs = "myblogs" | "liked" | "read-later";

interface IProps {
  userId: string;
}

const ProfileTabs: FC<IProps> = ({ userId }) => {
  const searchParams = useSearchParams();
  const rotuer = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") ?? "myblogs");

  /** ---> Setting up query params on component load. */
  useEffect(() => {
    if (!searchParams.toString()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "myblogs");
      rotuer.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  const handleTabChange = (tab: TTabs) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    rotuer.replace(`${pathname}?${params.toString()}`);
    setActiveTab(tab);
  };

  return (
    <Tabs
      defaultValue="liked"
      className="w-full"
      value={activeTab}
    >
      <TabsList className="my-2">
        <TabsTrigger
          onClick={() => handleTabChange("myblogs")}
          value="myblogs"
        >
          My Blogs
        </TabsTrigger>
        <TabsTrigger
          onClick={() => handleTabChange("liked")}
          value="liked"
        >
          Liked{" "}
        </TabsTrigger>
        <TabsTrigger
          onClick={() => handleTabChange("read-later")}
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
