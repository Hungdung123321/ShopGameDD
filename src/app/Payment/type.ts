import { AppSelectItemData } from "@/components/selects/app-select";
import { z } from "zod";

export const ScratchCardType = z.object({
  id: z.optional(z.string()),
  TelecomName: z.string(),
  faceValue: z.number(),
  seri: z.string().min(1, "seri is require"),
  code: z.string().min(1, "code is require"),
  status: z.optional(z.string()),
  time: z.optional(z.date()),
});

export type ScratchCardResType = z.infer<typeof ScratchCardType>;

export const ScratchCardData: AppSelectItemData[] = [
  {
    Label: "10.000",
    value: "10000",
  },
  {
    Label: "20.000",
    value: "20000",
  },
  {
    Label: "30.000",
    value: "30000",
  },
  {
    Label: "50.000",
    value: "50000",
  },
  {
    Label: "100.000",
    value: "100000",
  },
  {
    Label: "200.000",
    value: "200000",
  },
  {
    Label: "300.000",
    value: "300000",
  },
  {
    Label: "500.000",
    value: "500000",
  },
];

export const ScratchCardTelecomData = [
  {
    Label: "Viettel",
    value: "Viettel",
  },
  {
    Label: "Mobiphone",
    value: "Mobiphone",
  },
  {
    Label: "Vinaphone",
    value: "Vinaphone",
  },
  {
    Label: "ZiNG",
    value: "ZiNG",
  },
];
