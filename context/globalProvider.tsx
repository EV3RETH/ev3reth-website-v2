import { useRouter } from "next/router";
import { ReactNode, createContext, Dispatch, useReducer, useEffect } from "react";
import type { WalletConnection } from 'near-api-js'
import { setWallet} from "./actions";
import reducer from "./reducer";
import { getWalletConnection } from "../hooks/useWallet";

export interface GlobalState {
  wallet: WalletConnection | null
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
  wallet: null
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

  useEffect(() => {
    (async () => {
      const wallet = await getWalletConnection(network)
      dispatch(setWallet(wallet))
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