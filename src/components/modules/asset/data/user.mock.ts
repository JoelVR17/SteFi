import { User } from "../../../../@types/user.entity";
import { CreatedAt } from "../../../../@types/dates.entity";

const nowAsCreatedAt = (offsetInDays = 0): CreatedAt => {
  const date = new Date(Date.now() - offsetInDays * 24 * 60 * 60 * 1000);
  return {
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: (date.getTime() % 1000) * 1_000_000,
  };
};

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Alice Smith",
    address: "123 Provider Street",
    role: "assetProvider",
    createdAt: nowAsCreatedAt(100),
  },
  {
    id: "u2",
    name: "Bob Johnson",
    address: "456 Client Avenue",
    role: "client",
    createdAt: nowAsCreatedAt(80),
  },
  {
    id: "u3",
    name: "Carol Lee",
    address: "789 Provider Lane",
    role: "assetProvider",
    createdAt: nowAsCreatedAt(120),
  },
  {
    id: "u4",
    name: "David Kim",
    address: "101 Client Blvd",
    role: "client",
    createdAt: nowAsCreatedAt(90),
  },
];
