import { GameVersion } from "@/constants/common";
import { Genres } from "@/constants/dropdown-data";
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const expenseSchema = z.object({
  id: z.string(),
  label: z.string(),
  note: z.string(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
  amount: z.number(),
  date: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const MemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  wallet: z.number(),
  gmail: z.string(),
  avartarUrl: z.string(),
  isleader: z.boolean(),
  userRole: z.enum(["Leader", "Member"]),
});

export type Member = z.infer<typeof MemberSchema>;

export const UserRqToTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  gmail: z.string(),
  avartarUrl: z.string(),
  isInTeam: z.boolean(),
});

export type UserRqToTeam = z.infer<typeof UserRqToTeamSchema>;

export const YourGamesSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  moreImageUrls: z.array(z.string()),
  releasedDate: z.date(),
  price: z.number(),
  genres: z.array(z.string()),
  features: z.array(z.string()),
  version: z.string(),
});

export type YourGames = z.infer<typeof YourGamesSchema>;
