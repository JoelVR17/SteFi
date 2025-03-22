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
    token,
    monthly_payout,
  } = assetProperties;

  const monthly_fee_bps = Number(monthly_fee) * 100;
  const trustline = process.env.USDC_SOROBAN_CIRCLE_TOKEN_TEST;

  const adjustedPrice = adjustPricesToMicroUSDC(total_fee.toString());

  return StellarSDK.xdr.ScVal.scvMap([
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("total_fee"),
      val: StellarSDK.nativeToScVal(adjustedPrice, { type: "i128" }),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("token"),
      val: StellarSDK.xdr.ScVal.scvString(trustline || ""),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("client"),
      val: StellarSDK.Address.fromString(client.address).toScVal(),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("monthly_fee"),
      val: StellarSDK.nativeToScVal(monthly_fee_bps.toString(), {
        type: "i128",
      }),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("asset_provider"),
      val: StellarSDK.Address.fromString(asset_provider.address).toScVal(),
    }),
    new StellarSDK.xdr.ScMapEntry({
      key: StellarSDK.xdr.ScVal.scvSymbol("title"),
      val: StellarSDK.xdr.ScVal.scvString(title),
    }),
  ]);
}
