"use client";
import { FC } from "react";
import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";
import { blogs } from "@/constant/blogs";
import Image from "next/image";

interface IProps {
  params: {
    slug: string;
  };
}

const Blog: FC<IProps> = ({ params: { slug } }) => {
  // const query = useSearchParams();
  // const decodedSlug = decodeURIComponent(slug);
  // const localBlogs = JSON.parse(localStorage.getItem("blogs") ?? "[]") as IBlog[];
  // const blog = blogs.find((blog) => blog.id === query.get("id"));

  const blog = blogs.find((blog) => blog.slug === slug);

  return (
    <div className="container flex min-h-[70vh] w-full flex-col px-32 pt-20 sm:px-5 md:px-10 lg:px-40">
      {!blog && (
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">This Blog is not exist or unavailable</p>
        </div>
      )}
      {blog && (
        <>
          <div>
            <p className="text-2xl font-semibold tracking-widest">
              <Link
                href={`/blogs`}
                className="duration-300 hover:text-blue-400 hover:underline"
              >
                Blogs
              </Link>
              / <span className="font-bold">{blog.title}</span>
            </p>
            <div className="flex items-center justify-center py-5">
              <div className="h-[20rem]">
                <Image
                  src={blog.thumbnail}
                  height={400}
                  width={400}
                  alt={blog.title}
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <MDEditor.Markdown
              source={blog.content}
              style={{ whiteSpace: "pre-wrap", padding: 10 }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;

/* /** This is my research on how we can render makrdown with style using tailwind css. */

// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";

/* <div className="prose mt-10 min-h-96 w-full max-w-none rounded-lg p-5 prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-a:text-blue-300 prose-blockquote:bg-slate-100/10 prose-blockquote:px-5 prose-blockquote:py-[1px] prose-blockquote:text-orange-600 prose-strong:text-primary-foreground prose-ul:text-primary-foreground prose-table:text-primary-foreground prose-hr:text-red-500 dark:prose-h1:text-red-500">
        <Markdown
          className={"w-full"}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markdown}
        </Markdown>
      </div> */
