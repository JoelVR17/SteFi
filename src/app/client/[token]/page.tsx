"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const getAssetByToken = (token: string) => {
  return {
    title: "Premium Analytics Tool",
    monthly_fee: 100,
    total_fee: 1200,
    purchased: true,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 30,
    next_due_date: Date.now() + 1000 * 60 * 60 * 24 * 7,
    grace_period_end: Date.now() + 1000 * 60 * 60 * 24 * 10,
    asset_provider: {
      name: "Alice",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    client: { name: "Bob", avatar: "/placeholder.svg?height=40&width=40" },
    token,
    description:
      "A comprehensive analytics tool that provides detailed insights into user behavior, conversion rates, and engagement metrics. This premium version includes advanced reporting features, custom dashboards, and API access.",
    features: [
      "Real-time data visualization",
      "Custom report builder",
      "User journey mapping",
      "Conversion funnel analysis",
      "API access for data integration",
      "Export capabilities in multiple formats",
    ],
  };
};

export default function AssetDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const asset = getAssetByToken(token);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6 pl-0 flex items-center"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assets
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{asset.title}</h1>
              <p className="text-muted-foreground">Token: {asset.token}</p>
            </div>
            <Badge variant={asset.purchased ? "default" : "outline"}>
              {asset.purchased ? "Purchased" : "Not Purchased"}
            </Badge>
          </div>

          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt={asset.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{asset.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              {asset.features.map((feature, index) => (
                <li key={index} className="text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Pricing</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  Monthly Fee
                </span>
                <span className="font-bold">
                  {formatCurrency(asset.monthly_fee)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  Total Fee
                </span>
                <span className="font-bold">
                  {formatCurrency(asset.total_fee)}
                </span>
              </div>
              <Separator />
              <Button className="w-full">
                {asset.purchased ? "Manage Subscription" : "Purchase Now"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Important Dates</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  Next Due Date
                </span>
                <span>{formatDate(asset.next_due_date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  Grace Period Ends
                </span>
                <span>{formatDate(asset.grace_period_end)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  Deadline
                </span>
                <span>{formatDate(asset.deadline)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Parties</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={asset.asset_provider.avatar} />
                  <AvatarFallback>
                    {asset.asset_provider.name?.[0] || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{asset.asset_provider.name}</p>
                  <p className="text-sm text-muted-foreground">Provider</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={asset.client.avatar} />
                  <AvatarFallback>
                    {asset.client.name?.[0] || "C"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{asset.client.name}</p>
                  <p className="text-sm text-muted-foreground">Client</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
