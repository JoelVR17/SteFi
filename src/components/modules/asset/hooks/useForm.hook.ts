import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { assetSchema } from "../schema/schema";
import { initializeAsset } from "../services/asset.service";

export const useFormHook = () => {
  const form = useForm<z.infer<typeof assetSchema>>({
    //resolver: zodResolver(assetSchema),
    defaultValues: {
      title: "",
      monthly_fee: 0,
      total_fee: 0,
      purchased: false,
      deadline: Date.now(),
      next_due_date: Date.now(),
      grace_period_end: Date.now(),
      asset_provider: { id: "", name: "" },
      client: "",
      token: "",
      monthly_payout: {},
    },
    mode: "onChange",
  });

  const onSubmit = (payload: any) => {
    console.log(payload);
    initializeAsset(payload);
  };

  return { form, onSubmit };
};
