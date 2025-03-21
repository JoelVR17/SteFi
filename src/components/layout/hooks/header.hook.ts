import { useGlobalAuthenticationStore } from "@/components/modules/auth/store/store";

export const useHeader = () => {
  const address = useGlobalAuthenticationStore((state) => state.address);

  return {
    address,
  };
};
