"use client";

import { AssetWithId } from "@/@types/asset.entity";
import { getAssetsByUser } from "@/components/modules/asset/server/asset.service";
import AssetCard from "@/components/modules/asset/ui/AssetCard";
import { useGlobalAuthenticationStore } from "@/components/modules/auth/store/store";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const PageAsset = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState<AssetWithId>();
  const address = useGlobalAuthenticationStore((state) => state.address);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const assetsData = await getAssetsByUser("asset_provider", address);
        const filteredAsset = assetsData.data.find(
          (a: AssetWithId) => a.id === id
        );
        setAsset(filteredAsset || null);
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
    };

    if (address) {
      fetchAsset();
    }
  }, [address, id]);

  return asset ? (
    <div className="flex justify-center items-center h-full mt-10">
      <AssetCard asset={asset} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PageAsset;
