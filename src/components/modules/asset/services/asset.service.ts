import { ApiResponse } from "@/@types/service.entity";
import { sorobanServer } from "@/core/config/stellar/stellar";
import { parseAsset } from "@/core/utils/parse.utils";
import { buildInvokeContractOperation } from "@/lib/stellar";
import * as StellarSDK from "@stellar/stellar-sdk";
import { sendTransaction } from "./helper.service";
import { signTransaction } from "@stellar/freighter-api";
import { useGlobalAuthenticationStore } from "../../auth/store/store";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { Asset } from "@/@types/asset.entity";

export const initializeAsset = async (
  assetProperties: Asset,
  address: string
): Promise<ApiResponse> => {
  try {
    const wasmHash = process.env.WASM_HASH || "";

    const account = await sorobanServer.getAccount(address);
    const assetScVal = parseAsset(assetProperties);

    const operations = [assetScVal];
    const operation = buildInvokeContractOperation(
      address,
      wasmHash,
      "deploy",
      "create_asset",
      operations
    );

    let transaction = new StellarSDK.TransactionBuilder(account, {
      fee: StellarSDK.BASE_FEE,
      networkPassphrase: StellarSDK.Networks.TESTNET,
    })
      .addOperation(operation)
      .setTimeout(30)
      .build();

    const unsignedTransaction = await sorobanServer.prepareTransaction(
      transaction
    );

    const { signedTxXdr } = await signTransaction(unsignedTransaction.toXDR(), {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    sendTransaction(signedTxXdr);

    return {
      status: StellarSDK.rpc.Api.GetTransactionStatus.SUCCESS,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
