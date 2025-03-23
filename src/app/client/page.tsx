"use client";

import { Search, Filter, Plus } from "lucide-react";
import AssetCard from "../../components/modules/asset/ui/AssetCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFilteredAssets } from "../../components/modules/asset/hooks/useFilteredAssets";
import { useEffect, useState } from "react";
import { getAssetsByUser } from "@/components/modules/asset/server/asset.service";
import { useGlobalAuthenticationStore } from "@/components/modules/auth/store/store";

export default function Page() {
  const address = useGlobalAuthenticationStore((state) => state.address);
  const [assets, setAssets] = useState([]);
  const { setSearchQuery, setFilterStatus, totalAssets } = useFilteredAssets();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const assetsData = await getAssetsByUser("client", address);
        setAssets(assetsData.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    if (address) {
      fetchAssets();
    }
  }, [address]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Your Assets</h1>
          <p className="text-muted-foreground">
            Browse and manage your digital assets
          </p>
        </div>

        {assets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset, index) => (
              <AssetCard key={index} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/20">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No assets found</h3>
            <p className="text-muted-foreground text-center mt-2">
              We couldn't find any assets matching your search criteria. Try
              adjusting your filters or search query.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
