import SignIn, { SignInProps } from "@/components/Login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";
import { getProviders } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MapIcon } from "lucide-react";
import { db } from "@/db/db";
import { travelLogs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { LastVisitedPlaces } from "@/components/LastVisitedPlaces";
import SignOutButton from "@/components/ui/signout-button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { UserSession } from "@/types/next-auth";

export default async function Home() {
  const providers = await getProviders();
  const session = await getCurrentUser();

  const lastVisitedPlaces = session
    ? await db
        .select()
        .from(travelLogs)
        .where(eq(travelLogs.userId, session.id))
        .limit(5)
        .orderBy(desc(travelLogs.visitDate))
    : [];

  return (
    <div className=" h-full bg-gradient-to-tr from-slate-100 to-orange-100">
      {/*flex items-center justify-center*/}
      {!session ? (
        <Landing providers={providers} />
      ) : (
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-2 pt-4">
          <LoggedIn session={session} />
          <LastVisitedPlaces logs={lastVisitedPlaces} />
        </div>
      )}
    </div>
  );
}

function LoggedIn({ session }: { session: UserSession }) {
  const fallBackLetters = session.name
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join(" ");

  return (
    <Card className="w-[350px] md:w-full md:h-[375px] flex justify-between flex-col">
      <CardHeader className="flex items-center">
        <CardTitle className="text-center">{session.name}</CardTitle>
        <Avatar className="w-20 h-20 md:w-40 md:h-40">
          <AvatarImage src={session.image!} alt={session.name!} />
          <AvatarFallback>{fallBackLetters}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <p className="truncate text-sm text-gray-500 text-center">
          {session.email}
        </p>
      </CardContent>
      <CardFooter className="grid gap-2 grid-cols-2 ">
        <Link
          className={`${buttonVariants({
            variant: "default",
          })} w-full text-xs flex justify-between`}
          href={"/map"}
        >
          Mapa
          <MapIcon className="w-4 h-4" />
        </Link>
        <SignOutButton />
      </CardFooter>
    </Card>
  );
}
function Landing({ providers }: SignInProps) {
  return (
    <div className="text-center">
      <div className="flex m-2 blur-sm justify-items-center">
        <AspectRatio ratio={16 / 9}>
          <Image
            width={1024}
            height={683}
            src="/img/viajes.jpg"
            alt="Image"
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <Card className="mt-5 h-12">
        <h1>Viajesin</h1>
      </Card>
      <Card className="h-5">
        <h2>Registra tus aventuras y comparte tus viajes</h2>
      </Card>
      <Card className="h-80 ">
        <h3>¡Regístrate ahora!</h3>
        <h3>Clic en el siquiente botón para iniciar seción</h3>
        <SignIn providers={providers} />
      </Card>
    </div>
  );
}
