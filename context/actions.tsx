import type { WalletConnection } from "near-api-js";
import { Token } from "../hooks/useContract";
import { Action } from "./globalProvider";

export const SET_WALLET = "SET_WALLET";
export const setWallet = (wallet: WalletConnection): Action => ({
  type: SET_WALLET,
  payload: wallet
})

export const SET_NFTS = "SET_NFTS";
export const setNfts = (nfts: Token[]): Action => ({
  type: SET_NFTS,
  payload: nfts
}) 