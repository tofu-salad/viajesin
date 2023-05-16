"use client";

import { ReactNode, useReducer } from "react";
import TravelLogContext from "./TravelLogContext";
import TravelLogInitialState from "./TravelLogInitialState";
import { TravelLogActionTypes, TravelLogState } from "./TravelLogProviderTypes";

type TravelLogProviderProps = { children: ReactNode };

function TravelLogReducer(
  state: TravelLogState,
  action: TravelLogActionTypes
): TravelLogState {
  switch (action.type) {
    case "SET_CURRENT_MARKER_LOCATION": {
      return { ...state, currentMarkerLocation: action.data };
    }
    case "SET_SIDEBAR_VISIBLE": {
      return { ...state, sideBarVisible: action.data };
    }
    case "UPDATE_TRAVEL_LOG": {
      const updatedLogs = state.logs.map((log) =>
        log.id === action.data.id ? { ...log, ...action.data } : log
      );
      return { ...state, logs: updatedLogs };
    }
    default:
      return state;
  }
}
export default function TravelLogProvider({
  children,
}: TravelLogProviderProps) {
  const [state, dispatch] = useReducer(TravelLogReducer, TravelLogInitialState);

  return (
    <TravelLogContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
}
