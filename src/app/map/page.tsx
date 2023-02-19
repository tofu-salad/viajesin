import LoadingSpinner from "@/components/LoadingSpinner";
import MapMenu from "@/components/MapMenu";
import TravelLogProvider from "@/context/TravelLog/TravelLogProvider";
import client from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: LoadingSpinner,
});

export default async function Home() {
  const user = await getCurrentUser();
  const logs = await client.travelLog.findMany({
    where: { userId: user?.id },
  });
  const parsedLogs = JSON.parse(JSON.stringify(logs));
  if (!user) {
    return <div>Que haces aca perri no estas logeado</div>;
  }
  return (
    <main>
      <TravelLogProvider>
        <MapMenu />
        <Map logs={parsedLogs} />
      </TravelLogProvider>
    </main>
  );
}
