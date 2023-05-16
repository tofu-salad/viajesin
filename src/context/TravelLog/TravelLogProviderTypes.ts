import {
  TravelLog,
  TravelLogWithId,
} from "@/models/TravelLog.model";
import { Dispatch } from "react";

export type TravelLogState = {
  currentMarkerLocation: L.LatLng | null;
  sideBarVisible: boolean;
  logs: TravelLogWithId[];
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
type UpdateTravelLogAction = TravelLogAction & {
  type: "UPDATE_TRAVEL_LOG";
  data: TravelLog;
};
export type TravelLogActionType =
  | "SET_CURRENT_MARKER_LOCATION"
  | "SET_SIDEBAR_VISIBLE"
  | "UPDATE_TRAVEL_LOG";
export type TravelLogActionTypes =
  | SetCurrentMarkerLocationAction
  | SetSidebarVisible
  | UpdateTravelLogAction;
export type TravelLogDispatch = Dispatch<TravelLogActionTypes>;
