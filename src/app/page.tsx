"use client";

import { Toaster } from "@/components/ui/sonner";
import Header from "../components/layout/Header";

export default function Home() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="min-h-screen border-l-2 border-r-2 flex flex-col mx-20">
        <div className="flex-1 flex items-center justify-center border-b">
          Main Content
        </div>
      </div>
      <Toaster />
    </div>
  );
}
