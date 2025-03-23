"use client";

import { Search } from "lucide-react";
import AssetCard from "../../components/modules/asset/ui/AssetCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAssetsByUser } from "@/components/modules/asset/server/asset.service";
import { useGlobalAuthenticationStore } from "@/components/modules/auth/store/store";

export default function Page() {
  const address = useGlobalAuthenticationStore((state) => state.address);
  const [assets, setAssets] = useState([]);

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

        {assets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset, index) => (
              <AssetCard key={index} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
