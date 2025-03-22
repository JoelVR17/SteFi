import React from "react";
import EditProfileForm from "../forms/CreateUser.form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";
import { useIsUserCreated } from "./hooks/is-user-created.hook";

interface IsUserCreatedProps {
  isOpen: boolean;
}

export function IsUserCreatedDialog({ isOpen }: IsUserCreatedProps) {
  const { handleClose } = useIsUserCreated();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Edit profile</DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <EditProfileForm />
      </DialogContent>
    </Dialog>
  );
}
