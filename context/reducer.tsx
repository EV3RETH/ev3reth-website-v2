import { Action, GlobalState } from "./globalProvider";
import { SET_NFTS, SET_WALLET } from "./actions";

const reducer = (state: GlobalState, action: Action): GlobalState => {
  const { type, payload } = action;

  switch (type) {
    case SET_WALLET:
      return {
        ...state,
        wallet: payload
      };
    case SET_NFTS:
      return {
        ...state,
        nfts: payload
      }
    default:
      return state;
  }
};

export default reducer;