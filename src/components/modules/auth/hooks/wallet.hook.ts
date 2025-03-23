"use client";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import { useGlobalAuthenticationStore } from "../store/store";
import { kit } from "@/lib/stellar-wallet-kit";
import { useRouter } from "next/navigation";

export const useWallet = () => {
  const { connectWalletStore, disconnectWalletStore, isUserCreatedWithName } =
    useGlobalAuthenticationStore();

  const router = useRouter();

  const connectWallet = async () => {
    await kit.openModal({
      modalTitle: "Connect to your favorite wallet",
      onWalletSelected: async (option: ISupportedWallet) => {
        kit.setWallet(option.id);

        const { address } = await kit.getAddress();
        const { name } = option;

        const user = await connectWalletStore(address, name);

        console.log(isUserCreatedWithName);

        if (!isUserCreatedWithName) {
          if (user?.role === "client") {
            router.push("/client");
          } else if (user?.role === "assetProvider") {
            router.push("/asset-provider");
          } else {
            router.push("/client");
          }
        }
      },
    });
  };

  const disconnectWallet = async () => {
    await kit.disconnect();
    disconnectWalletStore();
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (disconnectWallet) {
        await disconnectWallet();
        router.push("/");
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    handleConnect,
    handleDisconnect,
  };
};
