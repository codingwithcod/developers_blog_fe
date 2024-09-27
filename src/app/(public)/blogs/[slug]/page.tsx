import React, { FC } from "react";

interface IProps {
  params: {
    slug: string;
  };
}

const Blog: FC<IProps> = ({ params: { slug } }) => {
  const decodedSlug = decodeURIComponent(slug);

  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-widest">Blog Slug</h1>
        <p className="text-4xl font-bold">{decodedSlug}</p>
      </div>
    </div>
  );
};

export default Blog;
