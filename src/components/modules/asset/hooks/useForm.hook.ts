import { z } from "zod";
import { useForm } from "react-hook-form";
import { assetSchema } from "../schema/schema";
import { addAsset } from "../server/asset.service";
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

  const onSubmit = async (formData: any) => {
    //await initializeAsset(formData);

    console.log(formData);
    const { token, monthly_payout, ...rest } = formData;

    const convertedMonthlyPayout: Record<string, string> = {};
    for (const [key, value] of Object.entries(monthly_payout || {})) {
      convertedMonthlyPayout[String(key)] = (value as string).toString();
    }

    const payload = {
      ...rest,
      token: process.env.NEXT_PUBLIC_TOKEN,
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
