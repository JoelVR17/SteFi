import { CreatedAt } from "./dates.entity";

export interface User {
  id: string;
  createdAt: CreatedAt;
  name: string;
  address: string;
  role: "assetProvider" | "client" | "";
}

export type UserPayload = Omit<User, "createdAt" | "updatedAt" | "id">;
