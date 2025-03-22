"use client";
import { formatDistanceToNow } from "date-fns";

export function RelativeTime({ date }: { date: number }) {
  return (
    <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
  );
}
