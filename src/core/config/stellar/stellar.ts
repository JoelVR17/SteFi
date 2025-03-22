import * as StellarSDK from "@stellar/stellar-sdk";

export const horizonServer: StellarSDK.Horizon.Server =
  new StellarSDK.Horizon.Server(`${process.env.SERVER_URL}`, {
    allowHttp: true,
  });

export const sorobanServer: StellarSDK.SorobanRpc.Server =
  new StellarSDK.SorobanRpc.Server(`${process.env.SOROBAN_SERVER_URL}`, {
    allowHttp: true,
  });

export const usdcToken: string | undefined =
  process.env.USDC_SOROBAN_CIRCLE_TOKEN_TEST;

export const usdcTokenPublic: string | undefined =
  process.env.USDC_STELLAR_CIRCLE_TEST_TOKEN;
