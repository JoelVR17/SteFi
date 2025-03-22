import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserSchema,
  UpdateUserInput,
} from "../schema/update-user.schema";
import { useGlobalAuthenticationStore } from "@/components/modules/auth/store/store";
import { UserPayload } from "@/@types/user.entity";

export const useEditProfileDialog = () => {
  const loggedUser = useGlobalAuthenticationStore((s) => s.loggedUser);
  const updateUser = useGlobalAuthenticationStore((s) => s.updateUser);
  const address = useGlobalAuthenticationStore((s) => s.address);

  const isUserCreatedWithName = !!loggedUser?.name;

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: loggedUser?.name || "",
      role: loggedUser?.role || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (payload: UserPayload) => {
    await updateUser(address, payload);
  };

  return {
    isUserCreatedWithName,
    form,
    onSubmit,
  };
};
