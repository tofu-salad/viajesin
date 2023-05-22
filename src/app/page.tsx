import SignIn, { SignInProps } from "@/components/Login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { desc, eq } from "drizzle-orm";
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
    <div className=" h-full">
      {!session ? (
        <Landing providers={providers} />
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 pt-4">
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
    <Card className="w-[350px] md:w-full md:h-[375px]">
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
    <div className=" text-center">
      <div className="flex justify-items-center">
        <AspectRatio ratio={16 / 9}>
          <Image
            width={1440}
            height={960}
            src="/img/viajesin.webp"
            alt="Image"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="p-6 scroll-m-20 border-b pb-2 text-2xl">
        <h2 className=" font-semibold tracking-tight transition-colors first:mt-0 bg-gradient-to-tr from-red-200 to-indigo-500 bg-clip-text text-transparent">
          ¡Creá tu diario de viaje!
        </h2>
        <p>Registrá y reviví tus aventuras con nuestra aplicación de viajes</p>
      </div>

      <Card className="h-full p-6 m-2">
        <h3>¡Regístrate ahora!</h3>
        <h3>Clic en el siquiente botón para iniciar sesión</h3>
        <SignIn providers={providers} />
      </Card>
      <Card className="absolute md:static inset-x-0 bottom-0 h-16 text-right items-center">
        redes -github
      </Card>
    </div>
  );
}
