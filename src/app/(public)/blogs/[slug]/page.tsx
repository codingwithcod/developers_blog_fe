"use client";
import React, { FC, useEffect, useState } from "react";
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IBlog } from "@/interfaces/blog";
import MDEditor from "@uiw/react-md-editor";

interface IProps {
  params: {
    slug: string;
  };
}

const Blog: FC<IProps> = ({ params: { slug } }) => {
  const query = useSearchParams();
  const decodedSlug = decodeURIComponent(slug);
  const [mdContent, setMdContent] = useState("");

  const localBlogs = JSON.parse(localStorage.getItem("blogs") ?? "[]") as IBlog[];

  useEffect(() => {
    if (localBlogs.length > 0) {
      const blog = localBlogs.find((blog) => blog.id === query.get("id"));
      setMdContent(blog?.content ?? "");
    }
  }, []);

  return (
    <div className="container flex min-h-[70vh] w-full flex-col px-32 pt-20 sm:px-5 md:px-10 lg:px-20">
      <div>
        <p className="text-2xl font-semibold tracking-widest">
          <Link
            href={`/blogs`}
            className="duration-300 hover:text-blue-400 hover:underline"
          >
            Blogs
          </Link>
          / <span className="font-bold">{decodedSlug}</span>
        </p>
      </div>
      {/* /** This is my research on how we can render makrdown with style using tailwind css. */}
      {/* <div className="prose mt-10 min-h-96 w-full max-w-none rounded-lg p-5 prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-a:text-blue-300 prose-blockquote:bg-slate-100/10 prose-blockquote:px-5 prose-blockquote:py-[1px] prose-blockquote:text-orange-600 prose-strong:text-primary-foreground prose-ul:text-primary-foreground prose-table:text-primary-foreground prose-hr:text-red-500 dark:prose-h1:text-red-500">
        <Markdown
          className={"w-full"}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markdown}
        </Markdown>
      </div> */}
      <div className="mt-10">
        <MDEditor.Markdown
          source={mdContent}
          style={{ whiteSpace: "pre-wrap", padding: 10 }}
        />
      </div>
    </div>
  );
};

export default Blog;

// eslint-disable-next-line
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

// eslint-disable-next-line
const mdContent2 = `<!--rehype:ignore:start-->
React Markdown Preview
===
<!--rehype:ignore:end-->

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Build and Deploy](https://github.com/uiwjs/react-markdown-preview/actions/workflows/ci.marster.yml/badge.svg)](https://github.com/uiwjs/react-markdown-preview/actions/workflows/ci.marster.yml)
[![Downloads](https://img.shields.io/npm/dm/@uiw/react-markdown-preview.svg?style=flat)](https://www.npmjs.com/package/@uiw/react-markdown-preview)
[![Coverage Status](https://uiwjs.github.io/react-markdown-preview/badge.svg)](https://uiwjs.github.io/react-markdown-preview/coverage/lcov-report/)
[![npm version](https://img.shields.io/npm/v/@uiw/react-markdown-preview.svg)](https://www.npmjs.com/package/@uiw/react-markdown-preview)
[![npm unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/react-markdown-preview/file/README.md)
[![Repo Dependents](https://badgen.net/github/dependents-repo/uiwjs/react-markdown-preview)](https://github.com/uiwjs/react-markdown-preview/network/dependents)

React component preview markdown text in web browser. The minimal amount of CSS to replicate the GitHub Markdown style. The current [document website](https://uiwjs.github.io/react-markdown-preview/) is converted using this react component.

## Features

- 🌒 Support dark-mode/night-mode. \`@v4\`
- 🙆🏼‍♂️ GitHub style: The markdown content is rendered as close to the way it's rendered on GitHub as possible.
- 🏋🏾‍♂️ Support [GFM](https://github.github.com/gfm/) (autolink literals, footnotes, strikethrough, tables, tasklists).
- 🍭 Support automatic code block highlight.
- 🐝 Support for defining styles via comment.
- ⛳️ Support for [GFM footnotes](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/)
- ⛳️ Support for [Github Alert](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)

## Quick Start

\`\`\`bash
$ npm install @uiw/react-markdown-preview --save
\`\`\`

## Usage Example

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/react-markdown-preview-co1mj?fontsize=14&hidenavigation=1&theme=dark)

\`\`\`jsx mdx:preview&checkered=0
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = \`
## MarkdownPreview

> todo: React component preview markdown text.
\`;

export default function Demo() {
  return (
    <MarkdownPreview source={source} style={{ padding: 16 }} />
  )
}
\`\`\``;
