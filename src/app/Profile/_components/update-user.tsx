import { User } from "@/app/context-provider";
import React, { useState, useTransition } from "react";
import { UpdateUserVal } from "../type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "@/components/shared/form-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { Button } from "@/components/ui/button";

const UpdateUserForm = ({
  user,
  onSubmitHandler,
}: {
  user?: User;
  onSubmitHandler?: (values: z.infer<typeof UpdateUserVal>) => void;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateUserVal>>({
    resolver: zodResolver(UpdateUserVal),
    defaultValues: {
      email: user?.gmail,
      name: user?.name,
      currentPassword: "",
      newPassword: "",
      oldPass: user?.password,
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateUserVal>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const validatedFields = UpdateUserVal.safeParse(values);

      if (!validatedFields.success) {
        setError("Invalid fields!");
      }

      if (validatedFields.data) {
        onSubmitHandler?.(validatedFields.data);
      }
    });
  }

  return (
    <div>
      <FormWrapper
        backButtonHref={() => {}}
        headerLabel="Change Profile"
        backButtonLabel=""
        className="w-[800px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="w-full space-y-9">
              <div className="flex items-center space-x-9">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel>
                        <p className="text-white">Gmail</p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={"bg-background p-2 rounded-lg"}
                          disabled={isPending}
                          placeholder="gmail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel>
                        <p className="text-white">Name</p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={"bg-background p-2 rounded-lg"}
                          disabled={isPending}
                          placeholder="Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-9">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel>
                        <p className="text-white">Current Password</p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={"bg-background p-2 rounded-lg"}
                          disabled={isPending}
                          placeholder="Current Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel>
                        <p className="text-white">New Password</p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={"bg-background p-2 rounded-lg"}
                          disabled={isPending}
                          placeholder="New Password"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              className="w-full mt-6 bg-blue-500 float-right text-white p-2 rounded-md"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
};

export default UpdateUserForm;
