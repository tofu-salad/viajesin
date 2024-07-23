import { Card } from "@/ui/card";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Landing() {
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
                <Link href={"/auth/login/discord"}>Log In</Link>
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
