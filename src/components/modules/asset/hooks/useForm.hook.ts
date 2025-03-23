"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { assetSchema } from "../schema/schema";
import { addAsset } from "../server/asset.service";
import { initializeAsset } from "../services/asset.service";
import { useGlobalAuthenticationStore } from "../../auth/store/store";

export const useFormHook = () => {
  const address = useGlobalAuthenticationStore((state) => state.address);

  const form = useForm<z.infer<typeof assetSchema>>({
    //resolver: zodResolver(assetSchema),
    defaultValues: {
      title: "",
      monthly_fee: 0,
      total_fee: 0,
      purchased: false,
      deadline: 0,
      next_due_date: 0,
      grace_period_end: 0,
      asset_provider: address,
      client: "",
      token: "",
      monthly_payout: {},
    },
    mode: "onChange",
  });

  const onSubmit = async (formData: any) => {
    console.log(formData);
    const { token, monthly_payout, ...rest } = formData;

    const convertedMonthlyPayout: Record<string, string> = {};
    for (const [key, value] of Object.entries(monthly_payout || {})) {
      await initializeAsset(formData, address);
      convertedMonthlyPayout[String(key)] = (value as string).toString();
    }

    const payload = {
      ...rest,
      asset_provider: address,
      monthly_payout: convertedMonthlyPayout,
    };

    const response = await addAsset({ payload });

    if (response.success) {
      console.log("Asset saved:", response.data);
    } else {
      console.error("Error saving asset:", response.message);
    }
  };

  return { form, onSubmit };
};
