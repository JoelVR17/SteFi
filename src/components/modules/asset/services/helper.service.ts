import { ApiResponse } from "@/@types/service.entity";
import {
  horizonServer,
  sorobanServer,
  usdcTokenPublic,
} from "@/core/config/stellar/stellar";
import { parseScVal } from "@/core/utils/parse.utils";
import { buildTransaction, signAndSendTransaction } from "@/lib/stellar";
import * as StellarSDK from "@stellar/stellar-sdk";

export async function sendTransaction(signedXdr: string): Promise<ApiResponse> {
  try {
    const transaction = StellarSDK.TransactionBuilder.fromXDR(
      signedXdr,
      StellarSDK.Networks.TESTNET
    );

    const response = await horizonServer.submitTransaction(transaction);

    if (!response.successful) {
      return {
        status: StellarSDK.rpc.Api.GetTransactionStatus.FAILED,
        message:
          "The transaction could not be sent to the Stellar network for some unknown reason. Please try again.",
      };
    }

    const data: any = await sorobanServer.getTransaction(response.hash);
    const transactionMeta = data.resultMetaXdr.v3().sorobanMeta();
    const returnValue = transactionMeta.returnValue();
    const result = parseScVal(returnValue);

    return {
      status: StellarSDK.rpc.Api.GetTransactionStatus.SUCCESS,
      message:
        "The transaction has been successfully sent to the Stellar network.",
      contract_id: result[0],
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function establishTrustline(
  sourceSecretKey: string
): Promise<ApiResponse> {
  try {
    const sourceKeypair: StellarSDK.Keypair =
      StellarSDK.Keypair.fromSecret(sourceSecretKey);
    const account = await sorobanServer.getAccount(sourceKeypair.publicKey());

    const usdcAsset = new StellarSDK.Asset("USDC", usdcTokenPublic);

    const operations = [StellarSDK.Operation.changeTrust({ asset: usdcAsset })];
    const transaction = buildTransaction(account, operations);

    const result = await signAndSendTransaction(
      transaction,
      sourceKeypair,
      sorobanServer,
      false
    );

    if (result.status !== "SUCCESS") {
      return {
        status: result.status,
        message:
          "An unexpected error occurred while trying to define the trustline in the USDC token. Please try again",
      };
    }

    return {
      status: result.status,
      message: "The trust line has been correctly defined in the USDC token",
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
