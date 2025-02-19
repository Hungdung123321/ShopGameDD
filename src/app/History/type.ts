import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  gameids: z.array(z.string()),
  totalMoney: z.number(),
  datePurchased: z.date(),
});

export type OrderResType = z.infer<typeof OrderSchema>;
