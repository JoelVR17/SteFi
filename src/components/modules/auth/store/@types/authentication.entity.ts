import { User } from "@/@types/user.entity";

export interface AuthenticationGlobalStore {
  address: string;
  name: string;
  loggedUser: User | null;
  isUserCreatedWithName: boolean;

  connectWalletStore: (address: string, name: string) => void;
  disconnectWalletStore: () => void;
}
