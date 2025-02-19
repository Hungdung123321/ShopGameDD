import { z } from "zod";

export const AllUserType = z.object({
  users: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      avartarUrl: z.string(),
      wallet: z.number(),
      gmail: z.string(),
      password: z.string(),
      isInTeam: z.boolean(),
      isleader: z.boolean(),
      teamId: z.string(),
      userRole: z.string(),
    })
  ),
  usersCount: z.number(),
  dapCount: z.number(),
  adminCount: z.number(),
  gamesCount: z.number(),
});
export type AllUserResType = z.infer<typeof AllUserType>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  avartarUrl: z.string(),
  wallet: z.number(),
  gmail: z.string(),
  password: z.string(),
  isInTeam: z.boolean(),
  isleader: z.boolean(),
  teamId: z.string(),
  userRole: z.string(),
  isBlock: z.boolean(),
});
export type UserResType = z.infer<typeof UserSchema>;

export const PayinType = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    avartarUrl: z.string(),
  }),
  payment: z.object({
    TelecomName: z.string(),
    faceValue: z.number(),
    seri: z.string().min(1, "seri is require"),
    code: z.string().min(1, "code is require"),
    status: z.optional(z.string()),
    time: z.optional(z.date()),
  }),
});

export type PayinResType = z.infer<typeof PayinType>;
