"use client";

import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { FormWrapper } from "@/components/shared/form-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignUpValidation } from "@/lib/validations/auths";
import { Button, Input } from "@headlessui/react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

interface ISignupForm {
  backButtonHref?: () => void;
}

const SignupForm = ({ backButtonHref }: ISignupForm) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // console.log(values)
    setError("");
    setSuccess("");

    startTransition(async () => {
      const validatedFields = SignUpValidation.safeParse(values);

      if (!validatedFields.success) {
        setError("Invalid fields!");
      }

      if (validatedFields.data) {
        const { email, password, name } = validatedFields.data;

        const res = await fetch("http://localhost:5041/api/User/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            gmail: email,
            password: password,
            role: 0,
          }),
        });
        if (!res.ok) {
          setError("Failed Sign up this gmail already register");
        } else if (res.ok) {
          setSuccess("Success");
        }
      }
    });
  }

  return (
    <FormWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref={backButtonHref}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <p className="text-white mb-2">Username</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={"bg-background p-2 rounded-lg"}
                      disabled={isPending}
                      placeholder="your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <p className="text-white mb-2">Email</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className={"bg-background p-2 rounded-lg"}
                      placeholder="mail@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <p className="text-white mb-2">Password</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className={"bg-background p-2 rounded-lg"}
                      type="password"
                      placeholder="your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <p className="text-white mb-2">Comfirm Password</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className={"bg-background p-2 rounded-lg"}
                      type="password"
                      placeholder="confirm your password"
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
            {isPending ? "Submitting..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default SignupForm;
