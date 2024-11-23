import React, { FC } from "react";
import AddUpdateBlog from "../../AddUpdateBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update blog | Developers Blog",
  description: "Update your blog and publish them to direct public or save as draft.",
};

interface IProps {
  params: {
    blogId: string;
  };
}

const UpdateBlog: FC<IProps> = ({ params: { blogId } }) => {
  return (
    <AddUpdateBlog
      isUpdateBlog
      blogId={blogId}
    />
  );
};

export default UpdateBlog;
