import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserSchema,
  UpdateUserInput,
} from "../schema/update-user.schema";
import { useGlobalAuthenticationStore } from "@/components/modules/auth/store/store";

export const useEditProfileDialog = () => {
  const [open, setOpen] = useState(false);

  const loggedUser = useGlobalAuthenticationStore((s) => s.loggedUser);
  const updateUser = useGlobalAuthenticationStore((s) => s.updateUser);
  const address = useGlobalAuthenticationStore((s) => s.address);

  const isUserCreatedWithName = !!loggedUser?.name;

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: loggedUser?.name || "",
      role: loggedUser?.role || "user",
    },
  });

  useEffect(() => {
    if (loggedUser) {
      form.reset({
        name: loggedUser.name || "",
        role: loggedUser.role || "user",
      });
    }
  }, [loggedUser, form]);

  const onSubmit = async (data: UpdateUserInput) => {
    await updateUser(address, data);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    isUserCreatedWithName,
    form,
    onSubmit,
  };
};
