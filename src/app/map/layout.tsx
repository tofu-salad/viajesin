import TravelLogProvider from "@/context/TravelLog/TravelLogProvider";
import { NavMenu } from "./_components/nav-menu";
import { validateRequest } from "@/lib/auth";

export const metadata = {
  title: "Mapa de viajes",
  description: "El mapa",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  return (
    <TravelLogProvider>
      {user ? <NavMenu userSession={user} /> : null}
      <main>{children}</main>
    </TravelLogProvider>
  );
}
