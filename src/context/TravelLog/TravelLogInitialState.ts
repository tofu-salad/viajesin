import { TravelLogState } from "./TravelLogProviderTypes";

export default {
  currentMarkerLocation: null,
  sideBarVisible: false,
  formData: {
    rating: 5,
    visitDate: new Date(),
    description: "",
    image: "",
    title: "",
    latitude: 90,
    longitude: 180,
  },
} satisfies TravelLogState;
