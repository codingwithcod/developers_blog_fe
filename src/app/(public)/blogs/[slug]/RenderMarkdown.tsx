"use client";
import React, { FC } from "react";
import MDEditor from "@uiw/react-md-editor";

interface IProps {
  content: string;
}

const RenderMarkdown: FC<IProps> = ({ content }) => {
  return (
    <MDEditor.Markdown
      source={content}
      style={{ whiteSpace: "pre-wrap", padding: 10 }}
    />
  );
};

export default RenderMarkdown;
