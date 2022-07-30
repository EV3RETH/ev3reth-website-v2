import { useRouter } from "next/router";
import { ReactNode, createContext, Dispatch, useReducer, useEffect } from "react";
import { WalletConnection, Contract } from 'near-api-js'
import { setNfts, setWallet} from "./actions";
import reducer from "./reducer";
import { getWalletConnection } from "../hooks/useWallet";
import { getAllEv3rethNfts, getAllNfts, getParasNfts, Token } from "../hooks/useContract";

export interface GlobalState {
  wallet: WalletConnection | null;
  nfts: Token[];
}

export interface Action {
  type: string;
  payload: any;
}

interface InitContext {
  state: GlobalState;
  dispatch: Dispatch<Action>
}

interface ProviderProps {
  children: ReactNode
}

const initState: GlobalState = {
  wallet: null,
  nfts: []
}

const initContext: InitContext = {
  state: initState,
  dispatch: () => null
}

export const GlobalContext = createContext(initContext);

const GlobalProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initState)
  const router = useRouter()
  const isTestnet = router.query?.network === "testnet";
  const network = isTestnet ? "testnet" : "mainnet";

  // useEffect(() => {
  //   (async () => {
  //     //Load wallet and set in state
  //     const wallet = await getWalletConnection(network)
  //     dispatch(setWallet(wallet))

  //     //Fetch owned NFTs and set in state
  //     const nfts = await getAllEv3rethNfts(wallet)
  //     dispatch(setNfts(nfts))
  //   })()
  // }, [network])

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider