"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search, Filter, Download, Plus, Calendar } from "lucide-react";
import type { Asset, AssetWithId } from "@/@types/asset.entity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormHook } from "@/components/modules/asset/hooks/useForm.hook";
import { FormProvider } from "react-hook-form";
import { getAssetsByUser } from "@/components/modules/asset/server/asset.service";
import { useGlobalAuthenticationStore } from "@/components/modules/auth/store/store";
import Link from "next/link";
import { shortenAddress } from "../../components/modules/client/hooks/useShortenAddress.hook";

export default function AssetProviderDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");
  const address = useGlobalAuthenticationStore((state) => state.address);

  const [assets, setAssets] = useState<AssetWithId[]>([]);

  const fetchAssets = async () => {
    try {
      const assetsData = await getAssetsByUser("asset_provider", address);
      setAssets(assetsData.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    if (address) {
      fetchAssets();
    }
  }, [address]);

  const { form, onSubmit } = useFormHook();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateForInput = (timestamp: number) => {
    if (!timestamp) return "";
    return new Date(timestamp).toISOString().split("T")[0];
  };

  const handleOpenModal = (asset = null) => {
    setEditingAsset(asset);
    setIsModalOpen(true);
    setActiveTab("details");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAsset(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">My Asset Portfolio</h1>
            <p className="text-muted-foreground">Assets you own and manage</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button onClick={() => handleOpenModal()}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Asset
            </Button>
          </div>
        </div>

        {/* Assets Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Monthly Fee</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Next Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets?.length > 0 ? (
                  assets?.map((asset: AssetWithId) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <div className="font-medium">
                          <Link href={"/asset-provider/" + asset.id}>
                            {asset.title}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className="truncate w-12">
                        <span>{shortenAddress(asset?.client)}</span>
                      </TableCell>
                      <TableCell>{formatCurrency(asset.monthly_fee)}</TableCell>
                      <TableCell>{formatDate(asset.deadline)}</TableCell>
                      <TableCell>
                        {formatDate(asset.grace_period_end)}
                      </TableCell>
                      <TableCell>{formatDate(asset.next_due_date)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-lg font-medium">No assets found</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Try adjusting your search or add a new asset
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Asset Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingAsset ? "Edit Asset" : "Create New Asset"}
            </DialogTitle>
            <DialogDescription>
              {editingAsset
                ? "Make changes to your asset here. Click save when you're done."
                : "Fill in the details for your new asset. Click create when you're done."}
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                await onSubmit(data);
                await fetchAssets();
                handleCloseModal();
              })}
              className="space-y-4"
            >
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Title<span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Title"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="monthly_fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Monthly Fee
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Monthly Fee"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value
                                ? Number(e.target.value)
                                : "";
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="total_fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Total Fee
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Total Fee"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value
                                ? Number(e.target.value)
                                : "";
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Start Date
                  </Label>
                  <Input
                    id="start_date"
                    type="date"
                    defaultValue={
                      editingAsset
                        ? formatDateForInput(editingAsset.start_date)
                        : ""
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    End Date
                  </Label>
                  <Input
                    id="end_date"
                    type="date"
                    defaultValue={
                      editingAsset
                        ? formatDateForInput(editingAsset.end_date)
                        : ""
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="next_payment">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Next Payment Date
                </Label>
                <Input
                  id="next_payment"
                  type="date"
                  defaultValue={
                    editingAsset
                      ? formatDateForInput(editingAsset.next_payment)
                      : ""
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Client<span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Client address"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-6">
                <Button className="cursor-pointer" type="submit">
                  Create Asset
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
