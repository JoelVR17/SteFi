import { z } from "zod";

export const assetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  monthly_fee: z.number().nonnegative(),
  total_fee: z.number().nonnegative(),
  purchased: z.boolean(),
  deadline: z.number().int().positive(),
  next_due_date: z.number().int().positive(),
  grace_period_end: z.number().int().positive(),
  asset_provider: z.string().min(1, "Asset Provider is required"),
  client: z.string().min(1, "Client is required"),
  token: z.string().min(1, "Token is required"),
  monthly_payout: z.record(z.number().int().positive(), z.bigint()),
});
