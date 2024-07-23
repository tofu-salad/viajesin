import { DivIcon } from "leaflet";

export const ClickIcon = new DivIcon({
  className: "leaflet-custom-icon  text-red-500/80 ",
  iconAnchor: [16, 20],
  popupAnchor: [0, -24],
  iconSize: [28, 28],
  html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin"><line x1="12" x2="12" y1="17" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg>
        </svg>
        `,
});

export const DefaultIcon = new DivIcon({
  className: "leaflet-custom-icon text-pink-200",
  iconAnchor: [16, 20],
  popupAnchor: [-5, -20],
  iconSize: [32, 32],
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-milestone"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path><path d="M12 13v8"></path><path d="M12 3v3"></path></svg>
        `,
});
