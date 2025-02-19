"use client";

import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { FormWrapper } from "@/components/shared/form-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateTeamValidation } from "@/lib/validations/Teams";
import { Button, Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface CreateData {
  Name: string;
  TaxId: string;
  Country: string;
  Website?: string | undefined;
}

const TeamForm = ({
  onSubmitTeamForm,
}: {
  onSubmitTeamForm?: (data: CreateData) => Promise<string>;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTeamValidation>>({
    resolver: zodResolver(CreateTeamValidation),
    defaultValues: {
      data: {
        Name: "",
        TaxId: "",
        Country: "",
        Website: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof CreateTeamValidation>) {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const validatedFields = CreateTeamValidation.safeParse(values);

      if (!validatedFields.success) {
        setError("Invalid fields!");
      }

      if (validatedFields.data) {
        const message = await onSubmitTeamForm?.({
          ...validatedFields.data.data,
        });
        if (message) {
          setError(message);
        } else {
          setSuccess("Created");
          redirect("/ChosesTeams");
        }
      }
    });
  }

  return (
    <div>
      <FormWrapper
        backButtonLabel={"You want a new Team ?"}
        headerLabel="ChoseTeams"
        className="bg-foreground h-fit"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="data.Name"
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
              <FormField
                control={form.control}
                name="data.TaxId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      <p className="text-white mb-2">Tax Id</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"bg-background p-2 rounded-lg"}
                        disabled={isPending}
                        placeholder="Tax Id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="data.Website"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      <p className="text-white mb-2">Website</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"bg-background p-2 rounded-lg"}
                        disabled={isPending}
                        placeholder="Website"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="data.Country"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      <p className="text-white mb-2">Country</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"bg-background p-2 rounded-lg"}
                        disabled={isPending}
                        placeholder="Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              className="w-full mt-6 bg-background p-2 rounded-lg"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
};

export default TeamForm;
