import { createContext } from "react";
import TravelLogInitialState from "./TravelLogInitialState";
import { TravelLogDispatch, TravelLogState } from "./TravelLogProviderTypes";

type TravelLogContext = {
  state: TravelLogState;
  dispatch: TravelLogDispatch;
};

export default createContext<TravelLogContext>({
  state: TravelLogInitialState,
  dispatch: () => {},
});
