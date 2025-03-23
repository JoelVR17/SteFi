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

      let user = null;

      if (!success) {
        const { success: registrationSuccess, data: userData } = await addUser({
          address,
        });

        if (registrationSuccess) {
          user = userData;

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

          return user;
        }
      } else {
        user = data;

        set(
          {
            address,
            name,
            loggedUser: data,
          },
          false,
          AUTHENTICATION_ACTIONS.CONNECT_WALLET
        );
      }

      setCookie("walletAddress", address, {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

      setCookie("userRole", user?.role ?? "client", {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

      return user;
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
