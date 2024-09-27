"use client";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";

const NewBlog = () => {
  const [value, setValue] = React.useState("**Namaskar Developers!!**");

  const handleSave = () => {
    const localBlogs = JSON.parse(localStorage.getItem("blogs") ?? "[]");

    const blogs = [
      {
        id: Date.now(),
        content: value,
      },
      ...localBlogs,
    ];
    localStorage.setItem("blogs", JSON.stringify(blogs));
    setValue("**Namaskar Developers!!**");
  };

  return (
    <div className="container my-20 flex h-[70vh] w-full flex-col">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold tracking-widest">New Blog</h1>
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
      <div className="mt-10 w-full">
        <MDEditor
          value={value}
          onChange={(e) => setValue(e ?? "")}
          height={400}
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
