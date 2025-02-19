"use client";

import React, { useState } from "react";
import TeamForm, { CreateData } from "./_components/TeamForm";
import TextLabelInput, { InputType } from "@/components/Inputs/TextLabelInput";
import Upload_Img from "@/components/uploads/upload-img";
import { useAppContext } from "@/app/context-provider";

const CreateTeamPage = () => {
  const [image, setImage] = useState<any | null>(null);
  const [AboutContent, setAboutContent] = useState<string | undefined>(
    undefined
  );
  const { user, RefreshUser } = useAppContext();
  const getChildState = (file: any | null) => {
    setImage(file);
  };

  const onSubmit = async (data: CreateData) => {
    const { Country, TaxId, Name, Website } = data;

    if (image && AboutContent) {
      const formdata = new FormData();
      formdata.append("file", image);

      const resImageUrl = await fetch(
        "http://localhost:5041/api/Files/UploadFile/upload",
        {
          method: "POST",
          redirect: "follow",
          body: formdata,
        }
      );

      if (resImageUrl.ok) {
        const rs = await resImageUrl.json();
        const res = await fetch("http://localhost:5041/api/DAP/CreateDap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: Name,
            website: Website,
            country: Country,
            taxid: TaxId,
            logoUrl: rs.imageUrl,
            aboutContent: AboutContent,
            leaderId: user?.id,
          }),
        });
        await RefreshUser(user);
      }
    }
    return "";
  };

  return (
    <div className="flex p-4">
      <TeamForm onSubmitTeamForm={onSubmit} />
      <div className="w-full ml-8">
        <Upload_Img getFile={getChildState} />
        <TextLabelInput
          name={"About"}
          label={"About your Team"}
          type={InputType.TEXT_EDITOR}
          ClassName="mt-2"
          TextEditor_placeHoder_Text={"About for this Team"}
          onBlurTextEditor={(e) => {
            setAboutContent(JSON.stringify(e, null, 2));
          }}
        />
      </div>
    </div>
  );
};

export default CreateTeamPage;
