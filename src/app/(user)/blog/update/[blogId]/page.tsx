import React from "react";
import AddUpdateBlog from "../../AddUpdateBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update blog | Developers Blog",
  description: "Update your blog and publish them to direct public or save as draft.",
};

const UpdateBlog = () => {
  return <AddUpdateBlog />;
};

export default UpdateBlog;
