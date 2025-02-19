"use client";

import { FormWrapper } from "@/components/shared/form-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FindTeamValidation } from "@/lib/validations/Teams";
import { Button, Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChosesTeamsForm = ({
  onSubmitFindTeam,
  backButtonHref,
}: {
  onSubmitFindTeam?: (values: string | undefined) => void;
  backButtonHref?: () => void;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FindTeamValidation>>({
    resolver: zodResolver(FindTeamValidation),
    defaultValues: {
      Name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FindTeamValidation>) {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const validatedFields = FindTeamValidation.safeParse(values);

      if (!validatedFields.success) {
        setError("Invalid fields!");
      }

      if (validatedFields) {
        await onSubmitFindTeam?.(validatedFields.data?.Name);
      }
    });
  }

  return (
    <div>
      <FormWrapper
        backButtonLabel={"You want a new Team ?"}
        headerLabel="Find Teams"
        className="bg-foreground"
        backButtonHref={backButtonHref}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      <p className="text-white mb-2">Teams</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"bg-background p-2 rounded-lg"}
                        disabled={isPending}
                        placeholder="Name teams"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full mt-6 bg-background p-2 rounded-lg"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Searching" : "Search"}
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
};

export default ChosesTeamsForm;
