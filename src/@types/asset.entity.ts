import { User } from "./user.entity";
export interface Asset {
  title: string;
  monthly_fee: number;
  total_fee: number;
  purchased: boolean;
  deadline: number;
  next_due_date: number;
  grace_period_end: number;
  asset_provider: User;
  client: User;
  token: string;
  monthly_payout: Record<number, bigint>;
}
