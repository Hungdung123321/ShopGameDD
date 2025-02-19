import { useAppContext } from "@/app/context-provider";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { FormWrapper } from "@/components/shared/form-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ScratchCardData,
  ScratchCardTelecomData,
  ScratchCardType,
} from "../type";
import AppSelect from "@/components/selects/app-select";

const ScratchCardForm = ({
  onSubmitHandler,
}: {
  onSubmitHandler?: () => void;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { user } = useAppContext();

  const form = useForm<z.infer<typeof ScratchCardType>>({
    resolver: zodResolver(ScratchCardType),
    defaultValues: {
      TelecomName: ScratchCardTelecomData[0].value,
      faceValue: Number(ScratchCardData[0].value),
      code: "",
      seri: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ScratchCardType>) {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const validatedFields = ScratchCardType.safeParse(values);

      if (!validatedFields.success) {
        setError("Invalid fields!");
        console.log("sadsa");
      } else {
        console.log("sadsa");
        const rs = await fetch(
          "http://localhost:5041/api/Payment/CreatePayment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user?.id,
              status: "Wating",
              telecomName: values.TelecomName,
              seri: values.seri,
              code: values.code,
              faceValue: values.faceValue,
              time: new Date().toISOString(),
            }),
          }
        );
        onSubmitHandler?.();
      }
    });
  }

  return (
    <div>
      <FormWrapper
        backButtonHref={() => {}}
        headerLabel="Payment"
        backButtonLabel=""
        className="w-full"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            <div className="flex space-x-5 items-center justify-between">
              <FormField
                control={form.control}
                name="TelecomName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      <p className="text-white mb-2">Telecom</p>
                    </FormLabel>
                    <AppSelect
                      data={ScratchCardTelecomData}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select the game have in your type"
                    />
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="faceValue"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      <p className="text-white mb-2">face Value</p>
                    </FormLabel>
                    <AppSelect
                      data={ScratchCardData}
                      onValueChange={(e) => field.onChange(Number(e))}
                      defaultValue={field.value.toString()}
                      placeholder="faceValue"
                    />
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-5 flex-row items-center justify-between">
              <FormField
                control={form.control}
                name="seri"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel>
                      <p className="text-white mb-2">seri:</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"bg-background p-2 rounded-lg"}
                        disabled={isPending}
                        placeholder="seri"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel>
                      <p className="text-white mb-2">code</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={"bg-background p-2 rounded-lg"}
                        disabled={isPending}
                        placeholder="code"
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
              className="w-full mt-6 bg-green-600 text-white p-2 rounded-lg"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Wating..." : "Add to Wallet"}
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
};

export default ScratchCardForm;
