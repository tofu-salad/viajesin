import { NavMenu } from "@/components/NavMenu";
import TravelLogProvider from "@/context/TravelLog/TravelLogProvider";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "Mapa de viajes",
  description: "El mapa",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  return (
    <TravelLogProvider>
      {session ? <NavMenu session={session} /> : null}
      <div className="w-screen h-screen">{children}</div>
    </TravelLogProvider>
  );
}
