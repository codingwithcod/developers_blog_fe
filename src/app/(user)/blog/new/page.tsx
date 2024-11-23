import React from "react";
import AddUpdateBlog from "../AddUpdateBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write new blog | Developers Blog",
  description: "Write your blog with markdown and publish them to public.",
};

const NewBlog = () => {
  return <AddUpdateBlog />;
};

export default NewBlog;
