import { useRouter } from "next/router";
import { ReactNode, createContext, Dispatch, useReducer, useEffect } from "react";
import { WalletConnection, Contract } from 'near-api-js'
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

interface Token {
  token_id: number;
  account_id: string;
}
interface NftsContract extends Contract {
  nft_tokens_for_owner: (props: {
    account_id: string,
    from_index: string | null, // default: 0
    limit: number | null, // default: unlimited (could fail due to gas limit)
  }) => Promise<Token[]>
} 
const ev3rethContracts = ["ev3.neartopia.near", "mint.snxev3.near"]

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

      let nfts: Token[] = []

      await Promise.all(ev3rethContracts.map(async(contractId) => {
        const contract: NftsContract = new Contract(
          wallet.account(),
          contractId,
          {
            viewMethods: ['nft_tokens_for_owner'],
            changeMethods: []
          }
        ) as any
        
        const contractNfts = await contract.nft_tokens_for_owner({
          account_id: wallet.getAccountId(),
          from_index: "0",
          limit: 33
        })
        nfts = [...nfts, ...contractNfts]
      }))
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