import { getCurrentUser } from "@/lib/session";
import TravelLogForm from "@/ui/TravelForm";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div>
      <TravelLogForm userId={user?.id} />
    </div>
  );
}
