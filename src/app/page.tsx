import { validateRequest } from "@/lib/auth";
import { Landing } from "./_components/landing";
import { Dashboard } from "./_components/dashboard";
import { getLastFiveVisitedPlaces } from "@/db/queries";

export default async function Home() {
  const { user } = await validateRequest();
  const lastVisitedPlaces = await getLastFiveVisitedPlaces(user);

  return (
    <main className="h-screen">
      {!user ? (
        <Landing />
      ) : (
        <Dashboard userSession={user} visitedPlaces={lastVisitedPlaces} />
      )}
    </main>
  );
}
