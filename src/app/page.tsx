"use client";

import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="min-h-screen border-l-2 border-r-2 flex flex-col mx-20">
        <div className="flex-1 w-full flex items-center justify-center border-b">
          <div className="w-3xl">
            <p className="text-center text-3xl font-bold">
              SteFi is the future of leasing: access motorcycles, computers, or
              solar panels by paying in installments with USDC. Secure
              ownership, no banks, 100% on blockchain.
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
