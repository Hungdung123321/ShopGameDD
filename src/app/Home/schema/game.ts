import z from "zod";
import { RGBColor } from "colorthief";
import { AccountRes } from "@/lib/schemas/account";

export const GameRes = z
  .object({
    id: z.string(),
    name: z.string(),
    developer: z.string(),
    version: z.number(),
    genres: z.array(z.string()),
    features: z.array(z.string()),
    releasedDate: z.string().datetime(),
    price: z.number(),
    imageUrl: z.string(),
    moreImageUrls: z.array(z.string()),
    about: z.string(),
    description: z.string(),
    systemRequirement: z.string(),
    bgColor: z.optional(z.string()),
  })
  .strict();

export type GameResType = z.TypeOf<typeof GameRes>;

export const GameDetailRes = z
  .object({
    game: z.object({
      id: z.string(),
      name: z.string(),
      developer: z.string(),
      version: z.number(),
      genres: z.array(z.string()),
      features: z.array(z.string()),
      releasedDate: z.string().datetime(),
      price: z.number(),
      imageUrl: z.string(),
      moreImageUrls: z.array(z.string()),
      about: z.string(),
      description: z.string(),
      systemRequirement: z.string(),
    }),
    gameState: z.optional(z.number()),
  })
  .strict();

export type GameDetailResType = z.TypeOf<typeof GameDetailRes>;
