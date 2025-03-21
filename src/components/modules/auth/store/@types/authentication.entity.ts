import { User } from "@/components/@types/user";

export interface AuthenticationGlobalStore {
  address: string;
  name: string;
  loggedUser: User | undefined;


  connectWalletStore: (address: string, name: string) => void;
  disconnectWalletStore: () => void;
}
