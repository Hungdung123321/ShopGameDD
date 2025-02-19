import * as z from "zod";
// import { countries } from "countries-list";

export const FindTeamValidation = z.object({
  Name: z.string(),
});

export const NameTeamn = z.object({
  id: z.string(),
  name: z.string(),
});

export const CreateTeamValidation = z.object({
  data: z.object({
    Name: z.string().min(1, "Name Team is required"),
    TaxId: z
      .string()
      .min(1, "Tax id is required")
      .max(13, "Max tax id is 13 characters"),
    Country: z.string().min(1, "Country id is required"),
    Website: z.string().optional(),
  }),
});

export const CreateGameValidation = z.object({
  name: z.string().min(1, "Name game is required"),
  serie: z.string(),
  version: z.string().min(1, "version is required"),
  genres: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  releasedDate: z.string().datetime(),
  price: z
    .number()
    .positive()
    .min(50000, "price must be greater than or equal to đ50,000")
    .max(10000000),
  description: z.optional(z.string()),
  about: z.optional(z.string()),
  systemRequirement: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
  moreImageUrls: z.optional(z.array(z.string())),
  id: z.optional(z.string()),
  developerId: z.optional(z.string()),
});

export type CreateGameDetail = z.TypeOf<typeof CreateGameValidation>;

export type NameTeamRes = z.TypeOf<typeof NameTeamn>;
