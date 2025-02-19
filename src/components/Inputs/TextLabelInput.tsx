"use client";

import React from "react";
import { Description, Field, Input, Label, Select } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import DropdownMutilSearch from "../dropdowns/DropdownMutilSearch";
import AppDatePicker from "../AppDatePicker";
import AppTextEditor from "../AppTextEditor";
import { Content, Editor } from "@tiptap/react";

export enum InputType {
  INPUT,
  COMBOBOX,
  MUTILSELECTSEARCH,
  DATE_PICKER,
  TEXT_EDITOR,
}

interface ITextLabelInput {
  type: InputType;
  name?: string;
  label?: string;
  ClassName?: string;
  TextEditor_placeHoder_Text?: string;
  AppTextEditorContent?: Content;
  Editor?: Editor | null;
  onBlurTextEditor?: (e: Content) => void;
  onChangeDate?: (date: Date | null) => void;
  initDate?: Date;
}

const TextLabelInput = (props: ITextLabelInput) => {
  const {
    type,
    name,
    label,
    ClassName,
    TextEditor_placeHoder_Text,
    AppTextEditorContent,
    onBlurTextEditor,
    onChangeDate,
    initDate,
  } = props;

  const RenderInput = () => {
    switch (props.type) {
      case InputType.INPUT:
        return (
          <Input
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        );

      case InputType.COMBOBOX:
        return (
          <Field>
            <div className="relative">
              <Select
                className={clsx(
                  "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  // Make the text of each option black on Windows
                  "*:text-white"
                )}
              >
                <option className="bg-foreground " value="active">
                  Active
                </option>
                <option className="bg-foreground " value="paused">
                  Paused
                </option>
                <option className="bg-foreground " value="delayed">
                  Delayed
                </option>
                <option className="bg-foreground " value="canceled">
                  Canceled
                </option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="false"
              />
            </div>
          </Field>
        );

      case InputType.MUTILSELECTSEARCH:
        return <DropdownMutilSearch data={["test"]} />;
      case InputType.DATE_PICKER:
        return (
          <AppDatePicker initDate={initDate} onChangeDate={onChangeDate} />
        );
      case InputType.TEXT_EDITOR:
        return (
          <AppTextEditor
            content={AppTextEditorContent || ""}
            PlaceHolder={TextEditor_placeHoder_Text}
            onBlur={(e) => onBlurTextEditor?.(e)}
          />
        );
    }
  };

  return (
    <Field className={`z-50 ${ClassName}`}>
      <Label className="text-sm/6 font-medium text-white">
        {name || "Name"}
      </Label>
      <Description className="text-sm/6 text-white/50">
        {label || "Use your real name so people will recognize you."}
      </Description>
      <div>{RenderInput()}</div>
    </Field>
  );
};

export default TextLabelInput;
