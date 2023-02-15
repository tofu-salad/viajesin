"use client";

import { TravelLogWithId } from "@/models/TravelLog.model";
import L, { DivIcon, LatLngTuple, LeafletMouseEvent } from "leaflet";
import { useEffect, useLayoutEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { atom, useAtom } from "jotai";

const CustomDefaultIcon = new DivIcon({
  className: "leaflet-custom-icon",
  iconAnchor: [16, 20],
  popupAnchor: [0, -20],
  iconSize: [32, 32],
  html: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        `,
});
const ClickIcon = new DivIcon({
  className: "leaflet-custom-icon text-blue-400",
  iconAnchor: [16, 20],
  popupAnchor: [0, -20],
  iconSize: [32, 32],
  html: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        `,
});

type TravelLogMapProps = {
  logs: TravelLogWithId[];
};
L.Map.prototype.options.attributionControl = false;

const InitMap = ({ logs }: TravelLogMapProps) => {
  const map = useMap();

  const handleMouseLeave = () => {
    map.dragging.disable();
  };
  const handleMouseEnter = () => {
    if (!map.dragging.enabled()) {
      map.dragging.enable();
    }
  };
  useEffect(() => {
    map.getContainer().addEventListener("mouseleave", handleMouseLeave);
    map.getContainer().addEventListener("mouseenter", handleMouseEnter);
    return () => {
      map.getContainer().removeEventListener("mouseleave", handleMouseLeave);
      map.getContainer().removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [map, handleMouseLeave, handleMouseEnter]);

  useLayoutEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
      if (logs.length > 0) {
        const bounds = new L.LatLngBounds(
          logs.map((log) => [log.latitude, log.longitude])
        );
        map.fitBounds(bounds);
      } else {
        map.setZoom(6);
        map.setView([-34, -64]);
      }
      // TODO: less hacky way...
    }, 200);
  }, [map, logs]);
  return null;
};

export const positionAtom = atom<LatLngTuple | string>("");
export default function Map({ logs }: TravelLogMapProps) {
  const [position, setPosition] = useAtom(positionAtom);

  const handleClick = (latLng: LatLngTuple) => {
    setPosition(latLng);
  };

  return (
    <MapContainer
      className="h-screen w-screen"
      style={{ background: "#171717" }}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1.1}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'"
        maxZoom={10}
        minZoom={3}
      />
      <InitMap logs={logs} />
      {logs &&
        logs.map((log) => {
          return (
            <Marker
              key={log.id}
              position={[log.latitude, log.longitude]}
              icon={CustomDefaultIcon}
            >
              <Popup className="w-95">
                <p>{log.title}</p>
                <p>Puntuacion: {log.rating}</p>
                <div>
                  <img src={log.image} alt={log.title} />
                </div>
                <p>{log.description}</p>
                <p>{new Date(log.visitDate.toString()).toLocaleDateString()}</p>
              </Popup>
            </Marker>
          );
        })}
      <LocationMarker position={position} onClick={handleClick} />
    </MapContainer>
  );
}

function LocationMarker({
  position,
  onClick,
}: {
  position: LatLngTuple | string;
  onClick: (latLng: LatLngTuple) => void;
}) {
  const handleMapClick = (e: LeafletMouseEvent) => {
    onClick([e.latlng.lat, e.latlng.lng]);
  };

  const map = useMapEvents({
    click: handleMapClick,
  });

  return position === "" ? null : (
    <Marker position={position as LatLngTuple} icon={ClickIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
