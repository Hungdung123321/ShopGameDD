"use client";

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
import { Button } from "@/components/ui/button";
import AddGameTab from "../Tabs/AddGameTab";
import { useState } from "react";
import { CreateGameDetail } from "@/lib/validations/Teams";

const RouteIdentifier = "show-info";

export default function ManageGamesDialog({
  onCreateGameHandler,
  triggername,
  className,
  currentGameData,
  onUpdateGameHandler,
}: {
  onCreateGameHandler?: () => void;
  triggername?: string;
  className?: string;
  currentGameData?: CreateGameDetail;
  onUpdateGameHandler?: () => void;
}) {
  const [open, setOpen] = useState(false);
  console.log(currentGameData?.about);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            className ||
            "bg-foreground text-white text-center mr-2 py-4 px-10 rounded-md"
          }
          variant="default"
        >
          {triggername || "Games"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-5/6 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            {currentGameData ? "Edit Your Game" : "Publish Your Game"}
          </DialogTitle>
          <DialogDescription>Fill information your game</DialogDescription>
          <AddGameTab
            setOpen={(e) => {
              setOpen(e);
            }}
            currentGameData={currentGameData}
            onCreateGameHandler={onCreateGameHandler}
            onUpdateGameHandler={() => {
              onUpdateGameHandler?.();
              setOpen(false);
            }}
          />
        </DialogHeader>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
