import z from "zod";

export const AccountRes = z
  .object({
    data: z.object({
      id: z.string(),
      name: z.string(),
      avartarUrl: z.string(),
      wallet: z.number(),
      gmail: z.string(),
      password: z.string(),
      isInTeam: z.boolean(),
      isleader: z.boolean(),
      teamId: z.string(),
      isBlock: z.boolean(),
      userRole: z.string(),
      requstToTeam: z.array(
        z.object({
          id: z.string(),
          leaderId: z.string(),
          name: z.string(),
          logoUrl: z.string(),
          type: z.string(),
        })
      ),
    }),
    message: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;
