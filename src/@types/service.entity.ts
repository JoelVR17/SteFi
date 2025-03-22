import * as StellarSDK from "@stellar/stellar-sdk";
import { Asset } from "./asset.entity";

export interface ApiResponse {
  status: StellarSDK.rpc.Api.GetTransactionStatus;
  message?: string;
  contract_id?: string;
  asset?: Asset;
}
