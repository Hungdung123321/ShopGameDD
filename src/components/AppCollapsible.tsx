import React, { ReactNode, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";

const AppCollapsible = ({
  children,
  value,
  title,
}: {
  children?: ReactNode;
  value?: boolean;
  title?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(value || false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full h-fit bg-foreground px-2 py-3 space-y-2 rounded-lg"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between cursor-pointer">
          <p className="text-white font-semibold">{title}</p>
          <ChevronsUpDown className="h-4 w-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default AppCollapsible;
