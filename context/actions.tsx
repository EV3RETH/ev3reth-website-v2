import type { WalletConnection } from "near-api-js";
import { Token } from "../hooks/useContract";
import { OwnerMap } from "../utils/contentMapping";
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

export const SET_OWNERS = "SET_OWNERS";
export const setOwners = (owners: OwnerMap): Action => ({
  type: SET_OWNERS,
  payload: owners
})