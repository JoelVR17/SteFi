"use client";
import { remainingTime } from "@/core/utils/parse.utils";

export function RelativeTime({ date }: { date: number }) {
  return <span>{remainingTime(date)}</span>;
}
