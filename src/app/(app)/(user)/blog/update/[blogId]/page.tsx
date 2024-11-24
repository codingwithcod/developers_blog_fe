import React, { FC } from "react";
import AddUpdateBlog from "../../AddUpdateBlog";
import { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Update blog | Developers Blog",
  description: "Update your blog and publish them to direct public or save as draft.",
};

interface IProps {
  params: {
    blogId: string;
  };
}

const UpdateBlog: FC<IProps> = async ({ params: { blogId } }) => {
  const session = await auth();
  return (
    <AddUpdateBlog
      isUpdateBlog
      blogId={blogId}
      username={session?.user.username}
    />
  );
};

export default UpdateBlog;
