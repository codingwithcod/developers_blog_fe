"use client";
import React, { FC, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface IProps {
  params: {
    slug: string;
  };
}

const Blog: FC<IProps> = ({ params: { slug } }) => {
  const decodedSlug = decodeURIComponent(slug);

  const [markdown, setMarkDown] = useState(mdContent); //eslint-disable-line

  return (
    <div className="container flex min-h-[70vh] w-full flex-col px-32 pt-20">
      <div>
        <p className="text-2xl font-semibold tracking-widest">
          Blog / <span className="font-bold">{decodedSlug}</span>
        </p>
      </div>
      <div className="prose mt-10 min-h-96 w-full max-w-none rounded-lg p-5 prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-a:text-blue-300 prose-blockquote:bg-slate-100/10 prose-blockquote:px-5 prose-blockquote:py-[1px] prose-blockquote:text-orange-600 prose-strong:text-primary-foreground prose-ul:text-primary-foreground prose-table:text-primary-foreground prose-hr:text-red-500 dark:prose-h1:text-red-500">
        <Markdown
          className={"w-full"}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
};

export default Blog;

const mdContent = `A paragraph with *emphasis* and **strong importance**.

# This is Heading H1
## This is Heading H2
### This is Heading H3
#### This is Heading H4
##### This is Heading H5
###### This is Heading H6

---

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b | 
| - | - | 
| List A | List B | 
| List A | List B | 
| List A | List B | 
| List A | List B | 
| List A | List B | 
| List A | List B | 

# This is heading 1
this is paragraph which is very long to read and write but i am testing it to do the work correctly now lets check it is working **correct** or **not**.

> Below the very importent code you can copy it and make it your component for markdonw. this is the method which I am using to render markdown in application. let's make it long so that I can check it is working fine in two line or not also this is the **IMPORTENT**

\`\`\`js
 <div className="container flex min-h-[70vh] w-full flex-col pt-20">
      <div>
        <p className="text-2xl font-semibold tracking-widest">
          Blog / <span className="font-bold">{decodedSlug}</span>
        </p>
        <textarea
          className="mt-20 h-52 w-full rounded-lg border border-gray-300/30 bg-black p-3 text-white"
          value={markdown}
          onChange={(e) => setMarkDown(e.target.value)}
        ></textarea>
      </div>
      <div className="prose prose-h1:text-primary prose: prose-blockquote:text-orange-600 dark:prose-h1:text-red-500 mt-10 min-h-96 w-full max-w-none rounded-lg border border-gray-300/30 p-5">
        <Markdown
          className={"w-full"}
          children={markdown}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        />
      </div>
    </div>
\`\`\`
`;
