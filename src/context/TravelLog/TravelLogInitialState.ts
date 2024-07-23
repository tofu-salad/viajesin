import { format } from "date-fns/format";
import { TravelLogState } from "./TravelLogProviderTypes";

export default {
  currentMarkerLocation: null,
  sideBarVisible: false,
  formData: {
    rating: 5,
    visitDate: format(new Date(), "yyyy-MM-dd") as unknown as Date,
    description: "",
    image: "",
    title: "",
    latitude: 90,
    longitude: 180,
  },
} satisfies TravelLogState;
