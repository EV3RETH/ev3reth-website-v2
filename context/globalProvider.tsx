import { useRouter } from "next/router";
import { ReactNode, createContext, Dispatch, useReducer, useEffect, useContext } from "react";
import { WalletConnection, Contract } from 'near-api-js'
import { setNfts, setOwners, setWallet} from "./actions";
import reducer from "./reducer";
import { getWalletConnection } from "../hooks/useWallet";
import { getAllDisplayOwners, Token } from "../hooks/useContract";
import { OwnerMap, OWNERS } from "../utils/contentMapping";

export interface GlobalState {
  wallet: WalletConnection | null;
  nfts: Token[] | null;
  owners: OwnerMap
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
  nfts: null,
  owners: OWNERS
}

const initContext: InitContext = {
  state: initState,
  dispatch: () => null
}

export const GlobalContext = createContext(initContext);

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initState)
  const router = useRouter()
  const isTestnet = router.query?.network === "testnet";
  const network = isTestnet ? "testnet" : "mainnet";

  useEffect(() => {
    (async () => {
      //Load wallet and set in state
      const wallet = await getWalletConnection(network)
      dispatch(setWallet(wallet))

      const owners = await getAllDisplayOwners(wallet)
      dispatch(setOwners(owners))
    })()
  }, [network])

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