"use client";

import React, { ChangeEvent, useState } from "react";
import UplpoadFile from "../ui/uplpoad-file";

const Upload_Img = ({
  getFile,
  width,
  heght,
  curentImg,
}: {
  getFile?: (file: any | null) => void;
  width?: number;
  heght?: number;
  curentImg?: string;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set image preview to state
      };
      getFile?.(file);
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  return (
    <div>
      <p className="text-white font-medium mb-2">Upload Logo Teams</p>
      <div className="flex justify-between">
        <img
          className="rounded-lg mb-2 bg-slate-200"
          width={width || 260}
          height={heght || 260}
          src={imagePreview || curentImg}
        />

        <UplpoadFile onChange={handleImageChange} className="mr-10 w-[500px]" />
      </div>
    </div>
  );
};

export default Upload_Img;
