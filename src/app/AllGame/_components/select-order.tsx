import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";

const orderdata = [
  {
    Value: "0",
    FieldName: "Name",
    FieldValue: "A to Z",
  },
  {
    Value: "1",
    FieldName: "Name",
    FieldValue: "Z to A",
  },
  {
    Value: "2",
    FieldName: "Price",
    FieldValue: "Low to High",
  },
  {
    Value: "3",
    FieldName: "Price",
    FieldValue: "High to Low",
  },
  {
    Value: "4",
    FieldName: "Release Date",
    FieldValue: "Oldest to Latest",
  },
  {
    Value: "5",
    FieldName: "Release Date",
    FieldValue: "Latest to Oldest",
  },
];

const SelectOrder = ({
  onValueChange,
  defaultValue,
}: {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-[300px] bg-foreground">
        <div className="flex items-center">
          <div className="border-r-2 border-gray-400 pr-2 mr-2">Order</div>
          <SelectValue
            defaultValue={defaultValue}
            placeholder="Select a fruit"
          />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-foreground">
        <SelectGroup defaultValue={"0"}>
          {orderdata.map((e) => (
            <SelectItem key={e.Value} value={e.Value}>
              <p>
                {e.FieldName}: {e.FieldValue}
              </p>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectOrder;
