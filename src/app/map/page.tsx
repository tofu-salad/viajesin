import LoadingSpinner from "@/components/LoadingSpinner";
import MapMenu from "@/components/MapMenu";
import { db } from "@/db/db";
import { getCurrentUser } from "@/lib/session";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: LoadingSpinner,
});

export default async function Home() {
  const user = await getCurrentUser();
  const logs = await db.travelLogs.findMany({ where: { userId: user?.id } });

  const parsedLogs = logs.map((log) => ({ ...log }));
  const real = JSON.parse(JSON.stringify(parsedLogs));
  if (!user) {
    return <div>Que haces aca perri no estas logeado</div>;
  }
  return (
    <div>
      <MapMenu />
      <Map logs={real} />
    </div>
  );
}
