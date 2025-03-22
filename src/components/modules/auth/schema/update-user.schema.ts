import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum(["assetProvider", "client"]),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
