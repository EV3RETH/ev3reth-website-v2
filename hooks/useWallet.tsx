import { connect, ConnectConfig, keyStores, WalletConnection } from "near-api-js";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
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

interface Wallet {
  signIn: () => Promise<void>
  signOut: () => void;
  isSignedIn: boolean;
  accountId: string;
}
const useWalletAuth = (): Wallet | null => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const { state } = useContext(GlobalContext)
  const router = useRouter()
  const wallet = state.wallet

  useEffect(() => {
    setIsSignedIn(!!wallet?.isSignedIn())
  }, [wallet])

  if (!wallet) return null

  const signIn = async () => {
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
  const signOut = () => {
    wallet.signOut()
    setIsSignedIn(false)
    router.replace(router.pathname) //gets rid of the url params near browser wallet sets
  }
  // const account = wallet.account()
  const accountId = wallet.getAccountId()
  return {
    signIn,
    signOut,
    isSignedIn,
    accountId
  }

}

export default useWalletAuth;
