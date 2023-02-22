import SignIn from "@/components/Login";
import { getCurrentUser } from "@/lib/session";
import { getProviders } from "next-auth/react";
import Link from "next/link";

export default async function Home() {
  const providers = await getProviders();
  const session = await getCurrentUser();

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Viajesin</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {!session ? (
              <SignIn providers={providers} />
            ) : (
              <section>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={session.image!} alt={"Avatar del usuario"} />
                  </div>
                </div>
                <div>Bienvenido {session.name}</div>
                <Link href="/map" className="btn btn-primary">
                  Ir al Mapa
                </Link>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
