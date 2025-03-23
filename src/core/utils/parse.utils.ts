import { Asset } from "@/@types/asset.entity";
import * as StellarSDK from "@stellar/stellar-sdk";

export function adjustPricesToMicroUSDC(price: string): string {
  const microUSDC = BigInt(Math.round(parseFloat(price) * 1e7));
  return microUSDC.toString();
}

export function microUSDToDecimal(microUSDC: bigint | number): number {
  return Number(microUSDC) / 1e7;
}

export function parseScVal(scVal: any) {
  if (!scVal) return undefined;

  switch (scVal.switch().name) {
    case "u64":
      return scVal.u64().toString();
    case "string":
      return scVal.str().toString();
    case "vec":
      return scVal.vec().map((item: any) => parseScVal(item));
    case "map":
      const mapObj: { [key: string]: any } = {};
      scVal.map().forEach((entry: any) => {
        const key = parseScVal(entry.key());
        const value = parseScVal(entry.val());
        mapObj[key] = value;
      });
      return mapObj;
    default:
      return StellarSDK.scValToNative(scVal);
  }
}

export function parseAsset(assetProperties: Asset) {
  const {
    title,
    monthly_fee,
    total_fee,
    purchased,
    deadline,
    next_due_date,
    grace_period_end,
    asset_provider,
    client,
  } = assetProperties;

  const monthly_fee_bps = Number(monthly_fee) * 100;
  const trustline = process.env.USDC_SOROBAN_CIRCLE_TOKEN_TEST;

  const adjustedPrice = adjustPricesToMicroUSDC(total_fee.toString());

  return StellarSDK.xdr.ScVal.scvMap([
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("asset_provider"),
      val: StellarSDK.Address.fromString(asset_provider.address).toScVal(),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("client"),
      val: StellarSDK.Address.fromString(client).toScVal(),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("deadline"),
      val: StellarSDK.xdr.ScVal.scvU64(
        StellarSDK.xdr.Uint64.fromString(deadline.toString())
      ),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("grace_period_end"),
      val: StellarSDK.xdr.ScVal.scvU64(
        StellarSDK.xdr.Uint64.fromString(grace_period_end.toString())
      ),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("monthly_fee"),
      val: StellarSDK.nativeToScVal(monthly_fee_bps.toString(), {
        type: "i128",
      }),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("monthly_payouts"),
      val: StellarSDK.xdr.ScVal.scvMap([]),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("next_due_date"),
      val: StellarSDK.xdr.ScVal.scvU64(
        StellarSDK.xdr.Uint64.fromString(next_due_date.toString())
      ),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("purchased"),
      val: StellarSDK.xdr.ScVal.scvBool(purchased),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("title"),
      val: StellarSDK.xdr.ScVal.scvString(title),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("token"),
      val: StellarSDK.xdr.ScVal.scvString(trustline || ""),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("total"),
      val: StellarSDK.nativeToScVal(adjustedPrice, { type: "i128" }),
    }),
  ]);
}

export const remainingTime = (timestamp: number) => {
  const now = Date.now();
  const diference = timestamp - now;

  console.log("now:", now, "timestamp:", timestamp, "diference:", diference);

  if (diference <= 0) {
    return "The deadline has passed";
  }

  const seconds = Math.floor(diference / 1000) % 60;
  const minutes = Math.floor(diference / (1000 * 60)) % 60;
  const hours = Math.floor(diference / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diference / (1000 * 60 * 60 * 24));

  return `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
};
