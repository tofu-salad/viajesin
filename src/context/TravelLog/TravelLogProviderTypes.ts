import { TravelLog } from "@/models/TravelLog.model";
import { Dispatch } from "react";

export type TravelLogState = {
  currentMarkerLocation: L.LatLng | null;
  sideBarVisible: boolean;
  formData: TravelLog;
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
type SetFormData = TravelLogAction & {
  type: "SET_FORM_DATA";
  data: TravelLog;
};
export type TravelLogActionType =
  | "SET_CURRENT_MARKER_LOCATION"
  | "SET_SIDEBAR_VISIBLE"
  | "SET_FORM_DATA";
export type TravelLogActionTypes =
  | SetCurrentMarkerLocationAction
  | SetSidebarVisible
  | SetFormData;
export type TravelLogDispatch = Dispatch<TravelLogActionTypes>;
