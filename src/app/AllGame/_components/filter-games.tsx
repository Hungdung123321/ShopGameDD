import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SelectOrder from "./select-order";

const FilterGames = ({
  onClickFilter,
  onChange,
  defaultOrderValue,
}: {
  onClickFilter?: () => void;
  onChange?: (search: string, orderType: Number) => void;
  defaultOrderValue?: string;
}) => {
  const [savedString, setSavedString] = useState<string>("");
  const [order, setorder] = useState<Number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onChange?.(savedString, order);
  }, [savedString, order]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <Button
          onClick={onClickFilter}
          className="p-2 rounded-lg bg-foreground"
        >
          <Filter color="white" />
        </Button>
        <div className="flex-1 flex items-center mx-3 px-2 bg-foreground rounded-lg">
          <Search color="white" />
          <Input
            ref={inputRef}
            className="bg-transparent border-none text-white"
            type="search"
            placeholder="Search Games"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSavedString(inputRef?.current?.value as string);
              }
            }}
          />
        </div>
        <SelectOrder
          defaultValue={defaultOrderValue}
          onValueChange={(e) => setorder(Number(e))}
        />
      </div>
    </div>
  );
};

export default FilterGames;
