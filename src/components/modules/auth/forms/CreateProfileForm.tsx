"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditProfileDialog } from "../hooks/useEditprofile.hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const EditProfileForm = () => {
  const { form, onSubmit } = useEditProfileDialog();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Role</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                defaultValue="comfortable"
                className="flex justify-evenly"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="assetProvider" id="r1" />
                  <Label htmlFor="r1">Asset Provider</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client" id="r2" />
                  <Label htmlFor="r2">Client</Label>
                </div>
              </RadioGroup>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="cursor-pointer">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
