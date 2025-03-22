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

const leasedAssets = [
  {
    id: "AST-001",
    title: "Premium Analytics Tool",
    description:
      "Advanced analytics platform with real-time data processing and visualization capabilities.",
    monthly_fee: 100,
    total_fee: 1200,
    client: {
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    start_date: "2023-01-15T10:30:00Z",
    end_date: "2024-01-15T10:30:00Z",
    next_payment: "2023-04-15T10:30:00Z",
  },
  {
    id: "AST-002",
    title: "CRM License",
    description:
      "Enterprise CRM solution for managing customer relationships and sales pipelines.",
    monthly_fee: 80,
    total_fee: 960,
    client: { name: "Jane Doe", avatar: "/placeholder.svg?height=40&width=40" },
    status: "active",
    start_date: "2023-02-20T14:45:00Z",
    end_date: "2024-02-20T14:45:00Z",
    next_payment: "2023-04-20T14:45:00Z",
  },
  {
    id: "AST-003",
    title: "Cloud Hosting",
    description:
      "Scalable cloud hosting solution with dedicated resources and 24/7 support.",
    monthly_fee: 150,
    total_fee: 1800,
    client: {
      name: "David Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    start_date: "2022-11-05T09:15:00Z",
    end_date: "2023-11-05T09:15:00Z",
    next_payment: "2023-04-05T09:15:00Z",
  },
  {
    id: "AST-004",
    title: "Design Software",
    description:
      "Professional design suite with advanced tools for graphic design and UI/UX work.",
    monthly_fee: 60,
    total_fee: 720,
    client: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "overdue",
    start_date: "2023-03-10T16:20:00Z",
    end_date: "2024-03-10T16:20:00Z",
    next_payment: "2023-03-10T16:20:00Z",
  },
  {
    id: "AST-005",
    title: "Marketing Automation",
    description:
      "Comprehensive marketing automation platform for email campaigns and lead generation.",
    monthly_fee: 120,
    total_fee: 1440,
    client: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "pending",
    start_date: "2023-03-18T11:10:00Z",
    end_date: "2024-03-18T11:10:00Z",
    next_payment: "2023-04-18T11:10:00Z",
  },
];

// Mock clients for dropdown
const availableClients = [
  {
    id: "CLT-001",
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLT-002",
    name: "Jane Doe",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLT-003",
    name: "David Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLT-004",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLT-005",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLT-006",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLT-007",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function AssetProviderDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");

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
                  <TableHead className="text-center">Actions</TableHead>
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
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenModal(asset)}
                          >
                            Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                More
                                <MoreHorizontal className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuLabel>
                                Manage Asset
                              </DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Update pricing
                              </DropdownMenuItem>
                              <DropdownMenuItem>Modify terms</DropdownMenuItem>
                              <DropdownMenuItem>
                                Contact client
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>
                                Asset Status
                              </DropdownMenuLabel>
                              <DropdownMenuItem>
                                Mark as active
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Mark as pending
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Terminate lease
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="client">Client</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSaveAsset}>
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Asset Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter asset title"
                    defaultValue={editingAsset?.title || ""}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your asset"
                    rows={4}
                    defaultValue={editingAsset?.description || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={editingAsset?.status || "active"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly_fee">
                      <CreditCard className="h-4 w-4 inline mr-2" />
                      Monthly Fee
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        $
                      </span>
                      <Input
                        id="monthly_fee"
                        type="number"
                        className="pl-8"
                        defaultValue={editingAsset?.monthly_fee || ""}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total_fee">
                      <CreditCard className="h-4 w-4 inline mr-2" />
                      Total Contract Value
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        $
                      </span>
                      <Input
                        id="total_fee"
                        type="number"
                        className="pl-8"
                        defaultValue={editingAsset?.total_fee || ""}
                        required
                      />
                    </div>
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
              </TabsContent>

              <TabsContent value="client" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="client">
                    <User className="h-4 w-4 inline mr-2" />
                    Assign Client
                  </Label>
                  <Select defaultValue={editingAsset?.client?.name || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableClients.map((client) => (
                        <SelectItem key={client.id} value={client.name}>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={client.avatar} />
                              <AvatarFallback>{client.name[0]}</AvatarFallback>
                            </Avatar>
                            {client.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button variant="outline" type="button" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Client
                  </Button>
                </div>
              </TabsContent>

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCloseModal}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAsset ? "Save Changes" : "Create Asset"}
                </Button>
              </DialogFooter>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
