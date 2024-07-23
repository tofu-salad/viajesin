import { validateRequest } from "@/lib/auth";
import { Landing } from "./_components/Landing";

export default async function Home() {
  const { user } = await validateRequest();
  // const lastVisitedPlaces = await getLastVisitedPlacesBySession(session);

  return (
    <main className="h-screen">
      {!user ? (
        <Landing />
      ) : (
        <div>
          logged in
          {/* <CardNav className=" flex content-center bg-slate-900 h-8 p-10"> */}
          {/*   <div className="h-10 w-10  bg-gray-950 flex rounded-full justify-center items-center"> */}
          {/*     <img src="favicon.ico" alt="logo" /> */}
          {/*   </div> */}
          {/*   <Link */}
          {/*     className={`${buttonVariants({ */}
          {/*       variant: "link", */}
          {/*     })} ml-auto bg-slate-900 text-l text-white`} */}
          {/*     href={"/map"} */}
          {/*   > */}
          {/*     Mapa */}
          {/*   </Link> */}
          {/*   <SignOutButtonNav /> */}
          {/* </CardNav> */}
          {/* <div className="flex flex-col md:flex-row h-full justify-center items-center gap-2 pt-4"> */}
          {/*   <LoggedIn session={session} /> */}
          {/*   <LastVisitedPlaces logs={lastVisitedPlaces} /> */}
          {/* </div> */}
        </div>
      )}
    </main>
  );
}
