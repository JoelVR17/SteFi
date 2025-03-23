"use client";

import { Calendar, Check, CreditCard, User, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelativeTime } from "./RelativeTime";
import { Asset } from "@/@types/asset.entity";

export default function AssetCard({ asset }: { asset: Asset }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{asset.title}</h2>
          </div>
          <Badge variant={asset.purchased ? "default" : "outline"}>
            {asset.purchased ? (
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
              {formatCurrency(asset.monthly_fee)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
              Total Fee
            </p>
            <p className="text-lg font-bold">
              {formatCurrency(asset.total_fee)}
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
            <RelativeTime date={asset.next_due_date} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Grace Period Ends
            </p>
            <RelativeTime date={asset.grace_period_end} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Deadline
            </p>
            <RelativeTime date={asset.deadline} />
          </div>
        </div>

        {/* <div className="pt-2">
          <Link
            href={`/client/${asset.token}`}
            className="w-full cursor-pointer"
          >
            <Button className="w-full">View Details</Button>
          </Link>
        </div> */}
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium flex items-center">
            <User className="h-4 w-4 mr-1 text-muted-foreground" />
            Client:
          </p>
          <span className="text-sm w-40 truncate">{asset.client}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
