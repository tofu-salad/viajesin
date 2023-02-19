import { Dispatch } from "react";

export type TravelLogState = {
  currentMarkerLocation: L.LatLng | null;
  sideBarVisible: boolean;
};

type TravelLogAction = {
  type: TravelLogActionType;
  data: any;
};
type SetCurrentMarkerLocationAction = TravelLogAction & {
  type: "SET_CURRENT_MARKER_LOCATION";
  data: L.LatLng | null;
};
type SetSidebarVisible = TravelLogAction & {
  type: "SET_SIDEBAR_VISIBLE";
  data: boolean;
};

export type TravelLogActionType =
  | "SET_CURRENT_MARKER_LOCATION"
  | "SET_SIDEBAR_VISIBLE";
export type TravelLogActionTypes =
  | SetCurrentMarkerLocationAction
  | SetSidebarVisible;
export type TravelLogDispatch = Dispatch<TravelLogActionTypes>;
