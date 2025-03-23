"use client";

import type React from "react";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Plus,
  Calendar,
  CreditCard,
  User,
  X,
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormHook } from "@/components/modules/asset/hooks/useForm.hook";
import { Form, FormProvider } from "react-hook-form";
import {
  leasedAssets,
  availableClients,
} from "@/components/modules/asset/data/leased.mock";

export default function AssetProviderDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");

  const { form, onSubmit } = useFormHook();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateForInput = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  // Filter assets based on search query
  const filteredAssets = leasedAssets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.client.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleOpenModal = (asset = null) => {
    setEditingAsset(asset);
    setIsModalOpen(true);
    setActiveTab("details");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAsset(null);
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle saving the asset data
    console.log("Saving asset:", editingAsset);
    handleCloseModal();
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
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button onClick={() => handleOpenModal()}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Asset
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets by title, ID, or client..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Assets</p>
                <p className="text-2xl font-bold">{leasedAssets.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    leasedAssets.reduce(
                      (sum, asset) => sum + asset.monthly_fee,
                      0
                    )
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Total Contract Value
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    leasedAssets.reduce(
                      (sum, asset) => sum + asset.total_fee,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <div className="font-medium">{asset.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {asset.id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={asset.client.avatar} />
                            <AvatarFallback>
                              {asset.client.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span>{asset.client.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(asset.monthly_fee)}</TableCell>
                      <TableCell>{formatDate(asset.start_date)}</TableCell>
                      <TableCell>{formatDate(asset.end_date)}</TableCell>
                      <TableCell>{formatDate(asset.next_payment)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            asset.status === "active"
                              ? "default"
                              : asset.status === "pending"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {asset.status}
                        </Badge>
                      </TableCell>
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

        {/* Create New Asset Card */}
        <Card
          className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => handleOpenModal()}
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Create New Asset</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Add a new asset to your portfolio to lease to clients
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create Asset
            </Button>
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
