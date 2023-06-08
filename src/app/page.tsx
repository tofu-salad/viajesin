import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardNav,
  CardHeaderMobile,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";
import { getProviders } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Github, MapIcon } from "lucide-react";
import { db } from "@/db/db";
import { LastVisitedPlaces } from "@/components/LastVisitedPlaces";
import SignOutButton from "@/components/ui/signout-button";
import Image from "next/image";
import { UserSession } from "@/types/next-auth";
import SignIn, { SignInProps } from "@/components/ui/login-buttons";
import SignOutButtonNav from "@/components/ui/signout-buttonNav";

export default async function Home() {
  const providers = await getProviders();
  const session = await getCurrentUser();

  const lastVisitedPlaces = session
    ? await db.travelLogs.findMany({
        take: 5,
        where: { userId: session.id },
        orderBy: { visitDate: "asc" },
      })
    : [];

  return (
    <main className="h-screen">
      {!session ? (
        <Landing providers={providers} />
      ) : (
        <div>
          <CardNav className=" flex content-center bg-slate-900 h-8 p-10">
            <img src="favicon.ico" alt="logo" />
            <Link
              className={`${buttonVariants({
              variant: "link"})} ml-auto bg-slate-900 text-l text-white`}
              href={"/map"}>
              Mapa
          </Link>
          <SignOutButtonNav/>
          </CardNav>
          <div className="flex flex-col md:flex-row h-full justify-center items-center gap-2 pt-4">
            <LoggedIn session={session} />
            <LastVisitedPlaces logs={lastVisitedPlaces} />
          </div>
        </div>
      )}
    </main>
  );
}

function LoggedIn({ session }: { session: UserSession }) {
  const fallBackLetters = session.name
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join(" ");

  return (
      
    <Card className="w-[350px] md:h-[375px]">
        <CardHeaderMobile className="grid grid-flow-col m-6">
          <div className="">
            <Avatar className=" w-20 h-20 ">
              <AvatarImage src={session.image!} alt={session.name!} />
              <AvatarFallback>{fallBackLetters}</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-5 self-center text-ellipsis overflow-hidden">
            <CardTitle className="p-2 ">
              {session.name}
            </CardTitle>          
            <CardContent>
              <p className="p-2">
                {session.email}fdgddsfgsdgf
              </p>
            </CardContent>
          </div>
        </CardHeaderMobile>
{/*


        <CardHeader className="">
          <CardTitle className="text-end border-8 ">
            {session.name}
          </CardTitle>
          <Avatar className="border-8 w-20 h-20 md:w-40 md:h-40 ">
            <AvatarImage src={session.image!} alt={session.name!} />
            <AvatarFallback>{fallBackLetters}</AvatarFallback>
          </Avatar>
          <CardContent>
            <p className="border-8 truncate text-sm text-gray-500 text-end">
              {session.email}
            </p>
          </CardContent>
        </CardHeader>*/}
      
      <CardFooter className="grid gap-2 grid-cols-2 hidden">
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
    <div className="text-center h-full md:grid md:grid-cols-12">
      <section className="flex justify-items-center md:col-span-8 ">
        <Image
          width={1440}
          height={960}
          src="/img/viajesin.webp"
          alt="Image"
          className="h-auto md:h-screen object-cover rounded-lg"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAI0lEQVQIW2N89P/0/0cMJgyXGBgYGP8Xzv/PkGrC8OjHOwYApv0MBT22d94AAAAASUVORK5CYII="
          loading="eager"
        />
      </section>

      <section className="md:col-span-4">
        <div className="flex flex-col items-center">
          <div className="p-6 scroll-m-20 border-b pb-2 text-2xl">
            <h2 className=" font-semibold tracking-tight transition-colors first:mt-0 bg-gradient-to-tr from-red-200 to-indigo-500 bg-clip-text text-transparent">
              ¡Creá tu diario de viaje!
            </h2>
            <p className="text-[70%]">
              Registrá y reviví tus aventuras con nuestra aplicación de viajes
            </p>
          </div>

          <section className="w-full p-2">
            <Card className="p-6">
              <h3>¡Regístrate ahora!</h3>
              <div>
                <h3>Clic en el siquiente botón para iniciar sesión</h3>
                <SignIn providers={providers} />
              </div>
            </Card>
          </section>
        </div>
      </section>

      <footer className="absolute bottom-0 p-4 w-full flex justify-end">
        <Link
          href="https://github.com/zeroCalSoda/viajesin"
          target="_blank"
          aria-label="Repositorio de Github"
        >
          <Github className="hover:text-indigo-500/80" />
        </Link>
      </footer>
    </div>
  );
}
