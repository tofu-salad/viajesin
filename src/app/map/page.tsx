import { getTravelLogsById } from "@/db/queries";
import { validateRequest } from "@/lib/auth";
import dynamic from "next/dynamic";
import MapMenu from "./_components/map-menu";
import LoadingSpinner from "@/ui/loading-spinner";
const Map = dynamic(() => import("./_components/map"), {
  ssr: false,
  loading: LoadingSpinner,
});

export default async function Home() {
  const { user } = await validateRequest();
  const logs = user ? await getTravelLogsById(user.id) : [];

  const parsedLogs = logs.map((log) => ({ ...log }));
  const real = JSON.parse(JSON.stringify(parsedLogs));
  if (!user) {
    return <div>Que haces aca perri no estas logeado</div>;
  }
  return (
    <div className="min-h-screen">
      <MapMenu userSession={user} />
      <Map logs={real} />
    </div>
  );
}
