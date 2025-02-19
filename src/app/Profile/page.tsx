"use client";

import React, { ChangeEvent, useState } from "react";
import UpdateUserForm from "./_components/update-user";
import { useAppContext, User } from "../context-provider";
import { Input } from "@/components/ui/input";
import { UpdateUserVal } from "./type";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const ProfilePage = ({ user }: { user: User }) => {
  const [imagePreview, setImagePreview] = useState<string>(
    user.avartarUrl || "https://placehold.co/300x300/orange/white"
  );
  const [image, setImage] = useState<any | null>(null);
  const { RefreshUser } = useAppContext();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      console.log(reader.result);
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set image preview to state
      };
      reader.readAsDataURL(file);
      setImage(file);
    } else {
      setImage(null);
      setImagePreview(
        user.avartarUrl || "https://placehold.co/300x300/orange/white"
      );
    }
  };

  const onSubmitHandler = async (values: z.infer<typeof UpdateUserVal>) => {
    const res = await fetch("http://localhost:5041/api/User/UpdateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        name: values.name,
        gmail: values.email,
        password: values.newPassword,
      }),
    });
    RefreshUser(user);
  };

  const fetchuploadAvatar = async () => {
    const formdata = new FormData();
    formdata.append("Files", image);
    const resImagesUrl = await fetch(
      `http://localhost:5041/api/Files/UploadMutipleFile/upload-more?Namefolder=UserAvatar/${user.id}`,
      {
        method: "POST",
        redirect: "follow",
        body: formdata,
      }
    );
    if (resImagesUrl.ok) {
      const img = await resImagesUrl.json();
      const res = await fetch(`http://localhost:5041/api/User/UpdateAvatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: user.id,
          imgurl: img?.imagesUrl[0],
        }),
      });
      RefreshUser(user);
    }
  };

  return (
    <div className="flex p-4">
      <div className="flex-1">
        <div className="ml-10">
          <img
            className="w-[300px] h-[300px] rounded-md"
            src={imagePreview}
            alt=""
          />
          <Input
            className="w-[300px] bg-foreground mt-3 cursor-pointer"
            type="file"
            onChange={handleImageChange}
          />
          {image && (
            <Button
              onClick={fetchuploadAvatar}
              className={"w-[300px] text-white bg-blue-500 mt-4"}
            >
              Upload
            </Button>
          )}
        </div>
      </div>
      <div>
        <UpdateUserForm onSubmitHandler={onSubmitHandler} user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
