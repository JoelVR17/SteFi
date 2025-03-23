import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";
import { useIsUserCreated } from "./hooks/is-user-created.hook";
import { EditProfileForm } from "../../forms/CreateProfileForm";

interface IsUserCreatedProps {
  isOpen: boolean;
}

export function IsUserCreatedDialog({ isOpen }: IsUserCreatedProps) {
  const { handleClose } = useIsUserCreated();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="dark:text-white">Create profile</DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Complete your profile here!
          </DialogDescription>
        </DialogHeader>

        <EditProfileForm />
      </DialogContent>
    </Dialog>
  );
}
