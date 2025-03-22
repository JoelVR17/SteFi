"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Wallet } from "lucide-react";
import { useGlobalAuthenticationStore } from "../modules/auth/store/store";
import { useWallet } from "../modules/auth/hooks/wallet.hook";
import { IsUserCreatedDialog } from "../modules/auth/ui/dialogs/IsUserCreated";
import Image from "next/image";

const Header = () => {
  const address = useGlobalAuthenticationStore((state) => state.address);
  const loggedUser = useGlobalAuthenticationStore((state) => state.loggedUser);
  const isUserCreatedWithName = useGlobalAuthenticationStore(
    (state) => state.isUserCreatedWithName
  );

  const { handleConnect, handleDisconnect } = useWallet();

  return (
    <div className="flex w-full justify-between">
      <Link href="/">
        <Image width={170} height={10} src="/favicon.ico" alt="logo" />
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex w-40">
          <p className="truncate text-sm italic">{loggedUser?.name}</p>
        </div>

        <div className="flex gap-3 w-40">
          <p className="truncate text-sm italic">{address}</p>
        </div>

        {!address ? (
          <Button className="cursor-pointer" onClick={handleConnect}>
            <Wallet />
            Connect
          </Button>
        ) : (
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleDisconnect}
          >
            <LogOut />
            Disconnect
          </Button>
        )}
      </div>

      <IsUserCreatedDialog isOpen={isUserCreatedWithName} />
    </div>
  );
};

export default Header;
