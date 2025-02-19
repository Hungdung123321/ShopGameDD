import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DataTableFacetedFilterProps {
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onChange?: (selectedValues: string[]) => void;
}

export function FilterGameMutiple({
  title,
  options,
  onChange,
}: DataTableFacetedFilterProps) {
  const [selectedValues, setSelectedValues] = React.useState<Set<string>>(
    new Set()
  );

  const handleSelect = (value: string) => {
    const updatedSelectedValues = new Set(selectedValues);
    if (updatedSelectedValues.has(value)) {
      updatedSelectedValues.delete(value);
    } else {
      updatedSelectedValues.add(value);
    }
    setSelectedValues(updatedSelectedValues);
    onChange?.(Array.from(updatedSelectedValues));
  };

  return (
    <Command className="!bg-foreground ">
      <CommandInput placeholder={title} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value);
            return (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary scroll-smooth",
                    isSelected
                      ? "bg-blue-500 text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className={cn("h-4 w-4")} />
                </div>
                {option.icon && (
                  <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
                <span>{option.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
      {selectedValues.size > 0 && (
        <div className="">
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setSelectedValues(new Set());
                onChange?.([]);
              }}
              className="justify-center text-center"
            >
              Clear filters
            </CommandItem>
          </CommandGroup>
        </div>
      )}
    </Command>
  );
}
