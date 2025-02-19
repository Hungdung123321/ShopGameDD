import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormControl } from "../ui/form";
import { SelectProps } from "@radix-ui/react-select";

export interface AppSelectItemData {
  Label: string;
  value: string;
}

interface IAppSelect {
  data: AppSelectItemData[];
  placeholder?: string;
}

const AppSelect = (props: IAppSelect & SelectProps) => {
  const { placeholder, data, ...rest } = props;
  return (
    <Select {...rest}>
      <FormControl>
        <SelectTrigger className="bg-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="bg-foreground">
        {data.map((e) => (
          <SelectItem key={e.value} value={e.value}>
            {e.Label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AppSelect;
