"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewBlog = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [mdContent, setMdContent] = useState("**Namaskar Developers!!**");
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);

  const handleSave = () => {
    if (!title || !thumbnail || !mdContent) {
      toast({
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
        thumbnail,
        content: mdContent,
        createdAt: Date.now(),
        reads: 1,
        userName: "The AbhiPatel",
      },
      ...localBlogs,
    ];
    localStorage.setItem("blogs", JSON.stringify(blogs));
    setTitle("");
    setThumbnail("");
    setMdContent("**Namaskar Developers!!**");
  };

  return (
    <div className="container mt-20 flex h-[70vh] w-full flex-col">
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
            className=""
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail</label>
          <Input
            className=""
            id="thumbnail"
            name="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
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
