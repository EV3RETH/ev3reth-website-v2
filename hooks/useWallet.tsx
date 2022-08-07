import { connect, ConnectConfig, keyStores, WalletConnection } from "near-api-js";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { setNfts } from "../context/actions";
import { GlobalContext } from "../context/globalProvider";

export const getWalletConnection = async (network: "testnet" | "mainnet") => {
  const testnetConfig: ConnectConfig = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    headers: {}
    // explorerUrl: "https://explorer.testnet.near.org",
  };
  const mainnetConfig: ConnectConfig = {
    networkId: "mainnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    headers: {}
    // explorerUrl: "https://explorer.mainnet.near.org",
  };

  const config = network === "testnet" ? testnetConfig : mainnetConfig;

  // connect to NEAR
  const nearConnection = await connect(config);

  // create wallet connection
  return new WalletConnection(nearConnection, "EV3RETH");
}

const signIn = async (wallet: WalletConnection) => {
  try {
    await wallet.requestSignIn(
      {
        // contractId?: string;
        // methodNames?: string[];
        // successUrl?: string;
        // failureUrl?: string;
      },
      "EV3RETH", //title
    );
  } catch (e) {
    alert(e)
  }
}
