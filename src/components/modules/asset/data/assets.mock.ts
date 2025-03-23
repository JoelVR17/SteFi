import { Asset } from "@stellar/stellar-sdk";
import { mockUsers } from "./user.mock";

export const mockAssets: Asset[] = [
  {
    title: "Premium Analytics Tool",
    monthly_fee: 100,
    total_fee: 1200,
    purchased: true,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 30,
    next_due_date: Date.now() + 1000 * 60 * 60 * 24 * 7,
    grace_period_end: Date.now() + 1000 * 60 * 60 * 24 * 10,
    asset_provider: mockUsers[0], // Alice
    client: mockUsers[1], // Bob
    token: "token-abc-123",
  },
  {
    title: "CRM License",
    monthly_fee: 80,
    total_fee: 960,
    purchased: false,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 45,
    next_due_date: Date.now() + 1000 * 60 * 60 * 24 * 15,
    grace_period_end: Date.now() + 1000 * 60 * 60 * 24 * 20,
    asset_provider: mockUsers[2], // Carol
    client: mockUsers[3], // David
    token: "token-def-456",
  },
  {
    title: "Cloud Hosting",
    monthly_fee: 150,
    total_fee: 1800,
    purchased: true,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 60,
    next_due_date: Date.now() + 1000 * 60 * 60 * 24 * 10,
    grace_period_end: Date.now() + 1000 * 60 * 60 * 24 * 15,
    asset_provider: mockUsers[0], // Alice
    client: mockUsers[3], // David
    token: "token-ghi-789",
  },
];
