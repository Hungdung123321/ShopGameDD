import { z } from "zod";

export const DapProfileRes = z.object({
  id: z.string(),
  leaderId: z.string(),
  name: z.string(),
  website: z.string(),
  country: z.string(),
  logoUrl: z.string(),
  aboutContent: z.string(),
  totalRevenue: z.number(),
  usersId: z.array(z.string()),
});

export type DapProfileResType = z.infer<typeof DapProfileRes>;
