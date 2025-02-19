import React, { useState } from "react";
import TextLabelInput, { InputType } from "@/components/Inputs/TextLabelInput";
import { FormWrapper } from "@/components/shared/form-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInValidation } from "@/lib/validations/auths";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  CreateGameDetail,
  CreateGameValidation,
} from "@/lib/validations/Teams";
import DropdownMutilSearch from "@/components/dropdowns/DropdownMutilSearch";
import { Button } from "@/components/ui/button";
import { GameVersion, GameVersionString, VNvnd } from "@/constants/common";
import AppSelect, { AppSelectItemData } from "@/components/selects/app-select";
import { GameFeatures, Genres } from "@/constants/dropdown-data";
import Currency_Input from "@/components/Inputs/currency-input";

const GameTypeData: AppSelectItemData[] = [
  {
    Label: GameVersionString[GameVersion.Standard],
    value: GameVersion.Standard.toString(),
  },
  {
    Label: GameVersionString[GameVersion.Deluxe],
    value: GameVersion.Deluxe.toString(),
  },
  {
    Label: GameVersionString[GameVersion.Premium],
    value: GameVersion.Premium.toString(),
  },
  {
    Label: GameVersionString[GameVersion.Ultimates],
    value: GameVersion.Ultimates.toString(),
  },
  {
    Label: GameVersionString[GameVersion.EarlyAccess],
    value: GameVersion.EarlyAccess.toString(),
  },
  {
    Label: GameVersionString[GameVersion.Demo],
    value: GameVersion.Demo.toString(),
  },
  {
    Label: GameVersionString[GameVersion.Patch],
    value: GameVersion.Patch.toString(),
  },
  {
    Label: GameVersionString[GameVersion.DLC],
    value: GameVersion.DLC.toString(),
  },
];

export function getValueByLabel(label?: string) {
  const foundItem = GameTypeData.find((item) => item.Label === label);
  return foundItem ? foundItem.value : undefined; // Return the value or undefined if not found
}

const GameDetail = ({
  onSubmitGameDetail,
  data,
}: {
  onSubmitGameDetail?: (values: CreateGameDetail) => void;
  data?: CreateGameDetail;
}) => {
  const form = useForm<CreateGameDetail>({
    resolver: zodResolver(CreateGameValidation),
    defaultValues: {
      name: data?.name || "",
      serie: "",
      version: data?.version || "",
      genres: data?.genres || [],
      features: data?.features || [],
      releasedDate: data?.releasedDate || new Date().toISOString(),
      price: data?.price || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof CreateGameValidation>) {
    const validatedFields = CreateGameValidation.safeParse(values);
    if (validatedFields.data) {
      // const { name, serie, gametype, genres } = validatedFields.data;
      // console.log(validatedFields.data);
      await onSubmitGameDetail?.(validatedFields.data);
    }
  }

  return (
    <FormWrapper
      backButtonHref={() => {}}
      headerLabel="Game Content"
      backButtonLabel=""
      className="w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col mb-10">
                  <FormLabel>
                    <p className="text-white ">Name</p>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      className={" bg-foreground p-2 rounded-lg"}
                      //   disabled={isPending}
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <div className="flex-1 flex-col">
              <div className="flex flex-row">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="serie"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>
                          <p className="text-white">Serie</p>
                          <p className="text-sm/6 font-medium text-white/50">
                            {"(optional) This game is in any your series"}
                          </p>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-foreground">
                              <SelectValue placeholder="Select the game have in your Series" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-foreground">
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="mt-2">
                          You can create new Serie in here{" "}
                          <Link className="underline" href="/examples/forms">
                            Series
                          </Link>
                          .
                        </FormDescription>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-6"></div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="version"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>
                          <p className="text-white">Game version</p>
                          <p className="text-sm/6 font-medium text-white/50">
                            {"(require) Chose type for this game "}
                          </p>
                        </FormLabel>
                        <AppSelect
                          data={GameTypeData}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          placeholder="Select the game have in your type"
                        />
                        <FormDescription className="mt-2">
                          {"Ex: Standard,Deluxe,Premium"}
                        </FormDescription>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="h-6"></div>
              <div className="flex flex-row">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="genres"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>
                          <p className="text-white">Genres</p>
                          <p className="text-sm/6 font-medium text-white/50">
                            {"(require) Select genres for this game"}
                          </p>
                        </FormLabel>
                        <DropdownMutilSearch
                          data={Genres}
                          onChange={field.onChange}
                          defaultValue={field.value}
                        />
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-6"></div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>
                          <p className="text-white">Features</p>
                          <p className="text-sm/6 font-medium text-white/50">
                            {"(require) Select game features"}
                          </p>
                        </FormLabel>
                        <DropdownMutilSearch
                          data={GameFeatures}
                          onChange={field.onChange}
                          defaultValue={field.value}
                        />
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="releasedDate"
              render={({ field }) => (
                <FormItem>
                  <TextLabelInput
                    type={InputType.DATE_PICKER}
                    name="Release Date"
                    label="Date the game finished"
                    ClassName={"my-4"}
                    onChangeDate={(date) => {
                      field.onChange(date?.toISOString());
                    }}
                    initDate={new Date(field.value)}
                  />
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p className="text-white">Price</p>
                    <p className="text-sm/6 font-medium text-white/50">
                      {"(require) How much price for this game ?"}
                    </p>
                  </FormLabel>
                  <div className="flex justify-between">
                    <Currency_Input
                      value={field.value}
                      onCurrencyChange={(e) => {
                        field.onChange(e.float);
                      }}
                    />
                    <p className="text-white text-2xl font-semibold">
                      {VNvnd.format(field.value)}
                    </p>
                  </div>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white text-center mt-8 mr-2 py-4 px-10 rounded-md float-right"
            variant="default"
          >
            Next
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default GameDetail;
