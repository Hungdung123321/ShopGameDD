"use client";

import { Button } from "@headlessui/react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref?: () => void;
  showSocial?: boolean;
  className?: string;
}

export const FormWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  className,
}: FormWrapperProps) => {
  return (
    <Card className={cn("w-[360px] border-none h-full", className)}>
      <CardHeader>
        <h1 className="text-center text-xl font-medium text-white shadow-none">
          {headerLabel}
        </h1>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && ""}
      <CardFooter>
        <Button className={"mx-auto"} onClick={backButtonHref}>
          {backButtonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};
