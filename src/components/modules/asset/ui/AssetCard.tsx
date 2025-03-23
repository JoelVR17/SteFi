"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  CreditCard,
  ImageIcon,
  Upload,
  User,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelativeTime } from "./RelativeTime";
import Link from "next/link";
import { Asset } from "@/@types/asset.entity";

export default function AssetCard({ asset }: { asset: Asset }) {
  const [imageUrl, setImageUrl] = useState<string | null>(asset.image || null);
  const [isUploading, setIsUploading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const demoAsset: Asset = asset || {
    title: "Premium Analytics Tool",
    monthly_fee: 100,
    total_fee: 1200,
    purchased: true,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 30,
    next_due_date: Date.now() + 1000 * 60 * 60 * 24 * 7,
    grace_period_end: Date.now() + 1000 * 60 * 60 * 24 * 10,
    asset_provider: { name: "Alice" },
    client: { name: "Bob" },
    token: "token-abc-123",
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{demoAsset.title}</h2>
          </div>
          <Badge variant={demoAsset.purchased ? "default" : "outline"}>
            {demoAsset.purchased ? (
              <span className="flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Purchased
              </span>
            ) : (
              <span className="flex items-center">
                <X className="h-3 w-3 mr-1" />
                Not Purchased
              </span>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
              Monthly Fee
            </p>
            <p className="text-lg font-bold">
              {formatCurrency(demoAsset.monthly_fee)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
              Total Fee
            </p>
            <p className="text-lg font-bold">
              {formatCurrency(demoAsset.total_fee)}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Next Due Date
            </p>
            <RelativeTime date={demoAsset.next_due_date} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Grace Period Ends
            </p>
            <RelativeTime date={demoAsset.grace_period_end} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Deadline
            </p>
            <RelativeTime date={demoAsset.deadline} />
          </div>
        </div>

        <div className="pt-2">
          <Link
            href={`/client/${demoAsset.token}`}
            className="w-full cursor-pointer"
          >
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium flex items-center">
            <User className="h-4 w-4 mr-1 text-muted-foreground" />
            Provider:
          </p>
          <Avatar className="h-6 w-6">
            <AvatarImage src={demoAsset.asset_provider.avatar} />
            <AvatarFallback>
              {demoAsset.asset_provider.name?.[0] || "A"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">
            {demoAsset.asset_provider.name || "Unknown"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium flex items-center">
            <User className="h-4 w-4 mr-1 text-muted-foreground" />
            Client:
          </p>
          <Avatar className="h-6 w-6">
            <AvatarImage src={demoAsset.client.avatar} />
            <AvatarFallback>{demoAsset.client.name?.[0] || "C"}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{demoAsset.client.name || "Unknown"}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
