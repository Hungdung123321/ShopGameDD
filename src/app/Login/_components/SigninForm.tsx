"use client";

import { useAppContext } from "@/app/context-provider";
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
import { SignInValidation } from "@/lib/validations/auths";
import { Button, Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ISigninForm {
  backButtonHref?: () => void;
}

const SigninForm = ({ backButtonHref }: ISigninForm) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { setUser } = useAppContext();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const validatedFields = SignInValidation.safeParse(values);

      if (!validatedFields.success) {
        setError("Invalid fields!");
      }

      if (validatedFields.data) {
        const { email, password } = validatedFields.data;

        const res = await fetch("http://localhost:5041/api/User/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gmail: email,
            password: password,
          }),
        });

        if (!res.ok) {
          const rs = await res.json();
          setError(rs?.message || "This gmail not register yet");
        } else if (res.ok) {
          const rs = await res.json();
          setUser(rs.data.account);
          setSuccess("Login Success");
          // if (rs.data.account.isInTeam) {
          //   redirect("/Home");
          // } else {
          //   redirect("/ChosesTeams");
          // }
          redirect("/Home");
        }
      }
    });
  }

  return (
    <FormWrapper
      backButtonHref={backButtonHref}
      headerLabel="Sign In"
      backButtonLabel="Don't have account ?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <p className="text-white mb-2">Gmail</p>
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
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    <p className="text-white mb-2">Password</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={"bg-background p-2 rounded-lg"}
                      disabled={isPending}
                      placeholder="password"
                      type="password"
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
            {isPending ? "Signing..." : "Sign in"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default SigninForm;
