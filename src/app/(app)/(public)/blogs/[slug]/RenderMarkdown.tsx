/* eslint-disable */
"use client";

import React, { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "katex/dist/katex.min.css";

interface IProps {
  content: string;
}

const RenderMarkdown: FC<IProps> = ({ content }) => {
  return (
    <div className="mt-12 pb-16">
      <article className="prose-tbody:!border-0 prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-h1:mb-6 prose-h1:mt-16 prose-h1:text-4xl prose-h1:tracking-tight prose-h2:mb-5 prose-h2:mt-14 prose-h2:border-b prose-h2:pb-3 prose-h2:text-3xl prose-h2:tracking-tight prose-h3:mb-4 prose-h3:mt-10 prose-h3:text-2xl prose-h3:tracking-tight prose-h4:mb-3 prose-h4:mt-8 prose-h4:text-xl prose-h4:tracking-tight prose-p:my-6 prose-p:text-base prose-p:leading-7 prose-a:font-medium prose-a:text-primary prose-a:no-underline prose-a:transition-colors hover:prose-a:text-primary/80 hover:prose-a:underline prose-blockquote:my-8 prose-blockquote:rounded-r prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-strong:font-semibold prose-strong:text-foreground prose-em:italic prose-code:rounded prose-code:border prose-code:bg-muted prose-code:px-[0.4rem] prose-code:py-[0.2rem] prose-code:font-mono prose-code:text-sm prose-code:font-semibold prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:!my-0 prose-pre:!border-0 prose-pre:!bg-transparent prose-pre:!p-0 prose-ol:my-6 prose-ol:leading-7 prose-ul:my-6 prose-ul:leading-7 prose-li:my-2 prose-table:!my-0 prose-table:!border-0 prose-thead:!border-0 prose-tr:!border-0 prose-th:!border-0 prose-th:!bg-transparent prose-th:!p-0 prose-td:!border-0 prose-td:!p-0 prose-img:my-10 prose-img:rounded-lg prose-img:shadow-lg prose-hr:my-16 prose-hr:border-border">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={{
            // Code blocks with syntax highlighting
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");

              return !inline && match ? (
                <CodeBlockWithCopy
                  language={match[1]}
                  code={codeString}
                />
              ) : (
                <code
                  className={cn("not-prose", className)}
                  {...props}
                >
                  {children}
                </code>
              );
            },

            // Remove the default pre wrapper when we have code blocks
            pre({ children, ...props }: any) {
              return <>{children}</>;
            },

            // Headings with anchor links
            h1({ children, ...props }: any) {
              const id = typeof children === "string" ? slugify(children) : undefined;
              return (
                <h1
                  id={id}
                  {...props}
                >
                  {children}
                </h1>
              );
            },
            h2({ children, ...props }: any) {
              const id = typeof children === "string" ? slugify(children) : undefined;
              return (
                <h2
                  id={id}
                  {...props}
                >
                  <a
                    href={`#${id}`}
                    className="text-foreground no-underline hover:underline"
                  >
                    {children}
                  </a>
                </h2>
              );
            },
            h3({ children, ...props }: any) {
              const id = typeof children === "string" ? slugify(children) : undefined;
              return (
                <h3
                  id={id}
                  {...props}
                >
                  <a
                    href={`#${id}`}
                    className="text-foreground no-underline hover:underline"
                  >
                    {children}
                  </a>
                </h3>
              );
            },

            // Images with Next.js Image component
            img({ src, alt, ...props }: any) {
              if (!src) return null;
              return (
                <span className="my-8 block">
                  <Image
                    src={src}
                    alt={alt || ""}
                    width={800}
                    height={600}
                    className="h-auto w-full rounded-lg"
                    {...props}
                  />
                  {alt && (
                    <span className="mt-2 block text-center text-sm text-muted-foreground">
                      {alt}
                    </span>
                  )}
                </span>
              );
            },

            // Links with Next.js Link component
            a({ href, children, ...props }: any) {
              const isExternal = href?.startsWith("http");
              if (isExternal) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }
              return (
                <Link
                  href={href || "#"}
                  {...props}
                >
                  {children}
                </Link>
              );
            },

            // Tables
            table({ children, ...props }: any) {
              return (
                <div className="not-prose my-16 w-full overflow-x-auto rounded-lg border border-border">
                  <table
                    className="w-full border-collapse"
                    {...props}
                  >
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children, ...props }: any) {
              return (
                <thead
                  className="border-b-2 border-border bg-muted/50"
                  {...props}
                >
                  {children}
                </thead>
              );
            },
            tr({ children, ...props }: any) {
              return (
                <tr
                  className="border-b border-border transition-colors hover:bg-muted/30"
                  {...props}
                >
                  {children}
                </tr>
              );
            },
            th({ children, ...props }: any) {
              return (
                <th
                  className="border-r border-border bg-muted/50 px-6 py-4 text-left text-sm font-semibold last:border-r-0"
                  {...props}
                >
                  {children}
                </th>
              );
            },
            td({ children, ...props }: any) {
              return (
                <td
                  className="border-r border-border px-6 py-4 text-sm last:border-r-0"
                  {...props}
                >
                  {children}
                </td>
              );
            },

            // Blockquote
            blockquote({ children, ...props }: any) {
              return (
                <blockquote
                  className="my-8 rounded-r border-l-4 border-primary bg-muted/50 px-5 py-3"
                  {...props}
                >
                  {children}
                </blockquote>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

// Code block component with copy button
const CodeBlockWithCopy: FC<{ language: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="not-prose group relative my-8">
      <div className="absolute right-3 top-3 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 border border-border/50 bg-background/80 p-0 opacity-0 backdrop-blur-sm transition-all hover:bg-background group-hover:opacity-100"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          background: "rgb(15 23 42)",
          fontSize: "0.875rem",
          lineHeight: "1.7",
          borderRadius: "0.5rem",
          border: "1px solid rgb(51 65 85)",
        }}
        showLineNumbers={false}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

// Helper function to create slugs for headings
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default RenderMarkdown;
