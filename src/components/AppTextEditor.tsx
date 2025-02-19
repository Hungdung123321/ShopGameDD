"use client";

import { Content, Editor, EditorContent, useEditor } from "@tiptap/react";
import React, { useCallback, useState } from "react";
import { MinimalTiptapEditor } from "./minimal-tiptap";

const AppTextEditor = ({
  PlaceHolder,
  content,
  onBlur,
}: {
  PlaceHolder?: string;
  content?: Content;
  onBlur?: (e: Content) => void;
}) => {
  const [value, setValue] = useState<Content>("");
  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="json"
      placeholder="Type your description here..."
      autofocus={false}
      editable={true}
      editorClassName="focus:outline-none"
      onBlur={(content) => {
        // console.log(content);
        onBlur?.(content);
      }}
      content={content}
    />
  );
};

export default AppTextEditor;
