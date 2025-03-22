"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditProfileDialog } from "../hooks/useEditprofile.hook";

export const EditProfileForm = () => {
  const { form, onSubmit, setOpen } = useEditProfileDialog();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await onSubmit(data);
        setOpen(false);
      })}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" {...register("name")} className="col-span-3" />
        </div>
        {errors.name && (
          <p className="text-sm text-red-500 col-span-4">
            {errors.name.message}
          </p>
        )}

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Role
          </Label>
          <Select
            value={watch("role")}
            onValueChange={(value) =>
              setValue("role", value as "assetProvider" | "client")
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assetProvider">assetProvider</SelectItem>
              <SelectItem value="client">Client</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
};
