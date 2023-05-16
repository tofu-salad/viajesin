import LoadingSpinner from "@/components/LoadingSpinner";
import MapMenu from "@/components/MapMenu";
import TravelLogProvider from "@/context/TravelLog/TravelLogProvider";
import { db } from "@/db/db";
import { travelLogs, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: LoadingSpinner,
});

export default async function Home() {
  const user = await getCurrentUser();
  const logs = await db
    .select()
    .from(travelLogs)
    .leftJoin(users, eq(travelLogs.userId, users.id));

  const parsedLogs = logs.map((log) => ({ ...log }));
  const real = JSON.parse(JSON.stringify(parsedLogs));
  if (!user) {
    return <div>Que haces aca perri no estas logeado</div>;
  }
  return (
    <main>
      <TravelLogProvider>
        <MapMenu />
        <Map logs={real} />
      </TravelLogProvider>
    </main>
  );
}
