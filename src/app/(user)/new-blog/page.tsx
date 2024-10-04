"use client";
import React, { ChangeEvent, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import SuccessAlert from "@/components/SuccessAlert";
import { handleMakeSlug } from "@/utils/handleMakeSlug";

const NewBlog = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [mdContent, setMdContent] = useState("**Namaskar Developers!!**");
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
  const [isBlogSaved, setIsBlogSaved] = useState(false);

  const handleSave = () => {
    if (!title || !slug || !thumbnail || !mdContent) {
      return toast({
        title: "All field Required!!",
        description: "Title, Thumbnail and Content is Required to save.",
        variant: "destructive",
        duration: 2000,
      });
    }

    const localBlogs = JSON.parse(localStorage.getItem("blogs") ?? "[]");

    const blogs = [
      {
        id: `bid${Date.now()}`,
        title,
        slug,
        thumbnail,
        content: mdContent,
        createdAt: Date.now(),
        reads: 1,
        userName: "The AbhiPatel",
      },
      ...localBlogs,
    ];

    localStorage.setItem("blogs", JSON.stringify(blogs));
    setIsBlogSaved(true);
    setTitle("");
    setSlug("");
    setThumbnail("");
    setMdContent("**Namaskar Developers!!**");
  };

  /** Handling Title and Slug */
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const slug = handleMakeSlug(value);
    setTitle(value);
    setSlug(slug);
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const slug = handleMakeSlug(value);
    setSlug(slug);
  };

  return (
    <div className="container mt-20 flex h-[70vh] w-full flex-col">
      {isBlogSaved && (
        <div className="mb-5">
          <SuccessAlert
            title="Success"
            description="Your blog saved successfully."
            onClose={() => setIsBlogSaved(false)}
          />
        </div>
      )}

      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Write New Blog</h1>
        <div className="flex gap-3">
          <Button
            variant={"outline"}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant={"secondary"}>Publish</Button>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <div>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="border-muted-foreground focus:border-muted"
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={handleSlugChange}
            className="border-muted-foreground focus:border-muted"
          />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail</label>
          <Input
            id="thumbnail"
            name="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="border-muted-foreground focus:border-muted"
          />
        </div>
      </div>
      <div className="mt-10">
        <Button
          variant={"outline"}
          onClick={() => setIsEditorFullScreen(true)}
        >
          Open Editor Full Screen
        </Button>
      </div>
      <div className="mt-5 w-full">
        <MDEditor
          value={mdContent}
          onChange={(text) => setMdContent(text ?? "")}
          height={300}
          style={{ marginBottom: 30 }}
          fullscreen={isEditorFullScreen}
          onHeightChange={() => setIsEditorFullScreen(false)}
        />
        {/* <MDEditor.Markdown
          source={value}
          style={{ whiteSpace: "pre-wrap", padding: 10 }}
        /> */}
      </div>
    </div>
  );
};

export default NewBlog;
