import { User, UserPayload } from "@/@types/user.entity";

export interface AuthenticationGlobalStore {
  address: string;
  name: string;
  loggedUser: User | null;
  isUserCreatedWithName: boolean;

  connectWalletStore: (address: string, name: string) => User | null;
  disconnectWalletStore: () => void;
  updateUser: (address: string, payload: UserPayload) => void;
  setIsUserCreatedWithName: (isUserCreatedWithName: boolean) => void;
}
