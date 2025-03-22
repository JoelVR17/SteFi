import { StateCreator } from "zustand";
import { setCookie, deleteCookie } from "cookies-next";
import { AuthenticationGlobalStore } from "../@types/authentication.entity";
import {
  addUser,
  getUser,
  updateUser,
} from "@/components/modules/auth/server/authentication.firebase";
import { UserPayload } from "@/@types/user.entity";
import { toast } from "sonner";

const AUTHENTICATION_ACTIONS = {
  CONNECT_WALLET: "authentication/connect",
  DISCONNECT_WALLET: "authentication/disconnect",
  UPDATE_USER: "authentication/updateUser",
  REMOVE_API_KEY: "authentication/removeApiKey",
} as const;

export const useGlobalAuthenticationSlice: StateCreator<
  AuthenticationGlobalStore,
  [["zustand/devtools", never]],
  [],
  AuthenticationGlobalStore
> = (set) => {
  return {
    // Stores
    address: "",
    name: "",
    loggedUser: null,
    isUserCreatedWithName: false,

    // Modifiers
    connectWalletStore: async (address: string, name: string) => {
      const { success, data } = await getUser({ address });

      if (!success) {
        const { success: registrationSuccess, data: userData } = await addUser({
          address,
        });

        if (registrationSuccess) {
          set(
            {
              address,
              name,
              loggedUser: userData,
              isUserCreatedWithName: true,
            },
            false,
            AUTHENTICATION_ACTIONS.CONNECT_WALLET
          );
        }
      } else {
        set(
          { address, name, loggedUser: data },
          false,
          AUTHENTICATION_ACTIONS.CONNECT_WALLET
        );
      }
      setCookie("walletAddress", address, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      setCookie("userRole", data.role ?? "client", {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    },

    disconnectWalletStore: () => {
      deleteCookie("walletAddress", { path: "/" });
      set(
        { address: "", name: "", loggedUser: undefined },
        false,
        AUTHENTICATION_ACTIONS.DISCONNECT_WALLET
      );
    },

    updateUser: async (address: string, payload: UserPayload) => {
      const { success, data } = await updateUser({ address, payload });

      if (success) {
        set(
          {
            loggedUser: data,
            isUserCreatedWithName: false,
          },
          false,
          AUTHENTICATION_ACTIONS.UPDATE_USER
        );

        toast("Welcome to SteFi", {
          description: "Your profile has been created successfully",
        });
      }
    },
    setIsUserCreatedWithName: (isUserCreatedWithName: boolean) =>
      set({ isUserCreatedWithName }, false),
  };
};
