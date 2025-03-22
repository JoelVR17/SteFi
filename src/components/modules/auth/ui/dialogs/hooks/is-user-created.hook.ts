import { useGlobalAuthenticationStore } from "../../../store/store";

export const useIsUserCreated = () => {
  const setIsUserCreatedWithName = useGlobalAuthenticationStore(
    (s) => s.setIsUserCreatedWithName
  );

  const handleClose = () => setIsUserCreatedWithName(false);

  return { handleClose };
};
