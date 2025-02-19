import TextLabelInput, { InputType } from "@/components/Inputs/TextLabelInput";
import content from "../../../app/ChosesTeams/_components/content.json";
import contentDescription from "../../../constants/Description.json";
import contentsystrq from "../../../constants/systrq.json";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const GameDescription = ({
  onClick,
  d,
  a,
  s,
}: {
  onClick?: (d: string | null, a: string | null, s: string | null) => void;
  d?: string;
  a?: string;
  s?: string;
}) => {
  const [Description, setDescription] = useState<string | null>(null);
  const [About, setAbout] = useState<string | null>(null);
  const [Sysr, setSysr] = useState<string | null>(null);

  useEffect(() => {
    if (!d && !a && !s) {
      setDescription(JSON.stringify(contentDescription, null, 2));
      setAbout(JSON.stringify(content, null, 2));
      setSysr(JSON.stringify(contentsystrq, null, 2));
    } else {
      setDescription(d || null);
      setAbout(a || null);
      setSysr(s || null);
    }
  }, []);

  return (
    <div>
      <TextLabelInput
        name={"Description"}
        label={"Description your game"}
        type={InputType.TEXT_EDITOR}
        ClassName="mb-6"
        AppTextEditorContent={d ? JSON.parse(d) : contentDescription}
        onBlurTextEditor={(e) => setDescription(JSON.stringify(e, null, 2))}
      />
      <TextLabelInput
        name={"About"}
        label={"About your game"}
        type={InputType.TEXT_EDITOR}
        ClassName="mb-6"
        AppTextEditorContent={a ? JSON.parse(a) : content}
        onBlurTextEditor={(e) => setAbout(JSON.stringify(e, null, 2))}
      />
      <TextLabelInput
        name={"System requirement "}
        label={"System requirement  your game"}
        type={InputType.TEXT_EDITOR}
        AppTextEditorContent={s ? JSON.parse(s) : contentsystrq}
        ClassName="mb-5"
        onBlurTextEditor={(e) => setSysr(JSON.stringify(e, null, 2))}
      />
      <Button
        type="submit"
        className="bg-blue-500 text-white text-center mr-2 py-4 px-10 rounded-md float-right"
        variant="default"
        onClick={() => {
          onClick?.(Description, About, Sysr);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default GameDescription;
