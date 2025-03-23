import { User, UserPayload } from "@/@types/user.entity";

export interface AuthenticationGlobalStore {
  address: string;
  name: string;
  loggedUser: User | null;
  isUserCreatedWithName: boolean;

  connectWalletStore: (address: string, name: string) => Promise<User>;
  disconnectWalletStore: () => void;
  updateUser: (address: string, payload: UserPayload) => Promise<User>;
  setIsUserCreatedWithName: (isUserCreatedWithName: boolean) => void;
}
