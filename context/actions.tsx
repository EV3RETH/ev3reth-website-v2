import type { WalletConnection } from "near-api-js";
import { Action } from "./globalProvider";

export const SET_WALLET = "SET_WALLET";
export const setWallet = (wallet: WalletConnection): Action => ({
  type: SET_WALLET,
  payload: wallet
})

