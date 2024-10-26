"use client";
import React, { ChangeEvent, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import SuccessAlert from "@/components/SuccessAlert";
import { handleMakeSlug } from "@/utils/handleMakeSlug";
import { errorLog } from "@/utils/errorLog";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";

type TStatus = "draft" | "published";

const NewBlog = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [mdContent, setMdContent] = useState("**Namaskar Developers!!**");
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
  const [isBlogSaved, setIsBlogSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (status: TStatus) => {
    if (!title || !slug || !thumbnail || !mdContent) {
      return toast({
        title: "All field Required!!",
        description: "Title, Thumbnail and Content is Required to save.",
        variant: "destructive",
        duration: 2000,
      });
    }
    if (status === "draft") {
      setIsSaving(true);
    } else {
      setIsPublishing(true);
    }

    try {
      await axiosClient.post(apiEndpoints.blogs.addBlog, {
        title,
        slug,
        thumbnail,
        status,
        content: mdContent,
      });
      setIsBlogSaved(true);
      setTitle("");
      setSlug("");
      setThumbnail("");
      setMdContent("**Namaskar Developers!!**");
    } catch (error) {
      errorLog(error);
      toast({
        title: "Blog saving failed !!",
        description: "Blog did not save, please try again",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsSaving(false);
      setIsPublishing(false);
    }
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
    <div className="container mt-20 flex flex-col sm:px-5 md:px-10 lg:px-20">
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
            disabled={isSaving || isPublishing}
            onClick={() => handleSave("draft")}
            className="w-24"
          >
            {isSaving ? "Saving.." : "Save"}
          </Button>
          <Button
            variant={"secondary"}
            disabled={isSaving || isPublishing}
            onClick={() => handleSave("published")}
            className="w-28"
          >
            {isPublishing ? "Publishing.." : "Publish"}
          </Button>
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
            className="border-muted-foreground/40 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={handleSlugChange}
            className="border-muted-foreground/40 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail</label>
          <Input
            id="thumbnail"
            name="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="border-muted-foreground/40 focus:border-primary"
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
          style={{ marginBottom: 30, background: "transparent" }}
          fullscreen={isEditorFullScreen}
          onHeightChange={() => setIsEditorFullScreen(false)}
        />
      </div>
    </div>
  );
};

export default NewBlog;
