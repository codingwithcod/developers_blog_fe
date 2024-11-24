"use client";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import SuccessAlert from "@/components/SuccessAlert";
import { handleMakeSlug } from "@/utils/handleMakeSlug";
import { errorLog } from "@/utils/errorLog";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { Label } from "@/components/ui/label";
import { HiOutlinePhoto } from "react-icons/hi2";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";
import { IBlogPost } from "@/interfaces/IBlogPost";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

type TStatus = "draft" | "published";

interface IProps {
  isUpdateBlog?: boolean;
  blogId?: string;
  username?: string;
}

const AddUpdateBlog: FC<IProps> = ({ isUpdateBlog, blogId, username }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File | null>(null);
  const [mdContent, setMdContent] = useState("**Namaskar Developers!!**");
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
  const [isBlogSaved, setIsBlogSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [isFetchingBlogToBeUpdated, setIsFetchingBlogToBeUpdated] = useState(Boolean(isUpdateBlog));

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  /** ---> Fetching blog if update blog page. */
  useEffect(() => {
    if (isUpdateBlog) {
      handleFetchBlogToBeUpdated();
    }
  }, []);

  const handleFetchBlogToBeUpdated = async () => {
    setIsFetchingBlogToBeUpdated(true);
    try {
      if (!blogId) return;
      const res = await axiosClient.get(apiEndpoints.blogs.getBlogById(blogId));
      const blog = res.data.blog as IBlogPost;
      setTitle(blog.title);
      setSlug(blog.slug);
      setThumbnail(blog.thumbnail);
      setMdContent(blog.content);
    } catch (error) {
      errorLog(error);
    } finally {
      setIsFetchingBlogToBeUpdated(false);
    }
  };

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
      const thumbnail = await handleUploadThumbnail();
      await axiosClient.post(apiEndpoints.blogs.addBlog, {
        title,
        slug,
        ...(thumbnail ? { thumbnail } : {}),
        status,
        content: mdContent,
      });
      setIsBlogSaved(true);
      setTitle("");
      setSlug("");
      setThumbnail("");
      setMdContent("**Namaskar Developers!!**");
      setImageErrorMessage("");
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

  const handleUpdateBlog = async (status: TStatus) => {
    if (!title || !slug || !thumbnail || !mdContent) {
      return toast({
        title: "All field Required!!",
        description: "Title, Thumbnail and Content is Required to update.",
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
      if (!blogId) return;
      const thumbnail = await handleUploadThumbnail();
      await axiosClient.patch(apiEndpoints.blogs.updateBlog(blogId), {
        title,
        slug,
        ...(thumbnail ? { thumbnail } : {}),
        status,
        content: mdContent,
      });
      router.replace(`/u/@${username}?tab=myblogs`);
    } catch (error) {
      errorLog(error);
      toast({
        title: "Blog updaing failed !!",
        description: "Blog did not update, please try again",
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

  const handleSelectThumbnail = () => {
    if (thumbnailInputRef) {
      thumbnailInputRef.current?.click();
    }
  };

  const handleThumbnailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFile = e.target.files[0];
      const oneMb = 1 * 1024 * 1024;
      if (selectedFile.size > oneMb) {
        setImageErrorMessage("Thumbnail Image must be less than 1 MB.");
      } else {
        setThumbnail(URL.createObjectURL(selectedFile));
        setImageErrorMessage("");
        setSelectedThumbnailFile(selectedFile);
      }
    }
  };

  const handleUploadThumbnail = async (): Promise<string | null> => {
    if (selectedThumbnailFile) {
      try {
        const fileName = selectedThumbnailFile.name.replace(
          `.${selectedThumbnailFile.type.slice(6)}`,
          ""
        ); /** ---> Removing file extention */
        const res = await axiosClient.get(apiEndpoints.blogs.requestThumbnailUpload(fileName));
        const data = res.data;
        const formData = new FormData();
        formData.append("file", selectedThumbnailFile);
        formData.append("public_id", data.public_id);
        formData.append("signature", data.signature);
        formData.append("timestamp", data.timestamp.toString());
        formData.append("api_key", data.api_key);

        const cloudinaryRes = await axios.post(data.upload_url, formData);
        return cloudinaryRes.data.secure_url as string;
      } catch (error) {
        errorLog(error);
        return null;
      }
    } else {
      return null;
    }
  };

  if (isFetchingBlogToBeUpdated) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-slowSpin" />
      </div>
    );
  }

  return (
    <div className="container mt-20 flex flex-col">
      {isBlogSaved && (
        <div className="mb-5">
          <SuccessAlert
            title="Success"
            description="Your blog saved successfully."
            onClose={() => setIsBlogSaved(false)}
          />
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex w-full flex-col gap-3">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              className="border-muted-foreground/40 focus:border-primary"
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              disabled={isUpdateBlog}
              onChange={handleSlugChange}
              className="border-muted-foreground/40 focus:border-primary"
            />
          </div>
          <div className="flex flex-col justify-start gap-1">
            <Label
              htmlFor="thumbnail"
              className="w-fit"
            >
              Thumbnail
            </Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              type="file"
              ref={thumbnailInputRef}
              accept="image/*"
              onChange={handleThumbnailInputChange}
              className="hidden"
            />
            <button
              onClick={handleSelectThumbnail}
              className="flex h-32 w-52 items-center justify-center rounded-md border"
            >
              {thumbnail ? (
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={thumbnail}
                    alt="thumbnail"
                    width={400}
                    height={300}
                    className="h-full w-full object-contain"
                  />
                </AspectRatio>
              ) : (
                <HiOutlinePhoto className="h-12 w-12 text-muted-foreground/50" />
              )}
            </button>
            <p className="mb-2 text-sm text-red-500">{imageErrorMessage}</p>
          </div>
        </div>
        <div className="hidden w-[30%] md:block">
          <div className="sticky top-24 flex flex-col items-end gap-3">
            <Button
              variant={"outline"}
              disabled={isSaving || isPublishing}
              onClick={() => (isUpdateBlog ? handleUpdateBlog("draft") : handleSave("draft"))}
              className="w-28"
            >
              {isSaving ? "Saving.." : "Save"}
            </Button>
            <Button
              variant={"secondary"}
              disabled={isSaving || isPublishing}
              onClick={() =>
                isUpdateBlog ? handleUpdateBlog("published") : handleSave("published")
              }
              className="w-28 bg-green-600/80"
            >
              {isPublishing ? "Publishing.." : "Publish"}
            </Button>
          </div>
        </div>
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
      <div className="mb-5 flex w-full justify-end md:hidden">
        <div className="flex items-end gap-3">
          <Button
            variant={"outline"}
            disabled={isSaving || isPublishing}
            onClick={() => (isUpdateBlog ? handleUpdateBlog("draft") : handleSave("draft"))}
            className="w-28"
          >
            {isSaving ? "Saving.." : "Save"}
          </Button>
          <Button
            variant={"secondary"}
            disabled={isSaving || isPublishing}
            onClick={() => (isUpdateBlog ? handleUpdateBlog("published") : handleSave("published"))}
            className="w-28 bg-green-600/80"
          >
            {isPublishing ? "Publishing.." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateBlog;
