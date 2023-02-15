import MapMenu from "@/components/MapMenu";
import client from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import dynamic from "next/dynamic";

export default async function Home() {
  const user = await getCurrentUser();
  const logs = await client.travelLog.findMany({
    where: { userId: user?.id },
  });

  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });
  const parsedLogs = JSON.parse(JSON.stringify(logs));
  return (
    <main>
      <MapMenu />
      <Map logs={parsedLogs} />
    </main>
  );
}
