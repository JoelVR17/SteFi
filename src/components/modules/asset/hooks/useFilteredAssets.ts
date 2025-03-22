import { useState, useMemo } from "react";
import { Asset } from "@/components/modules/asset/types";
import { mockAssets } from "@/components/modules/asset/data/assets.mock";

export type FilterStatus = "all" | "purchased" | "not-purchased";

export const useFilteredAssets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const filteredAssets = useMemo(() => {
    return mockAssets.filter((asset: Asset) => {
      const matchesSearch =
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.asset_provider.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        asset.client.name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "purchased" && asset.purchased) ||
        (filterStatus === "not-purchased" && !asset.purchased);

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredAssets,
    totalAssets: mockAssets.length,
  };
};
