import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface IDialogCustom {
  classNameTrigger?: string;
  TriggerContent?: () => void;
  FooterContent?: () => void;
}

const DialogCustom = ({
  classNameTrigger,
  TriggerContent,
  FooterContent,
}: IDialogCustom) => {
  return (
    <Dialog>
      <DialogTrigger className={cn(classNameTrigger)}>
        {TriggerContent?.() || "open"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="p-2">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="bg-foreground" variant="outline">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            {FooterContent?.() || (
              <Button type="button" className="bg-foreground" variant="outline">
                Close
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCustom;
