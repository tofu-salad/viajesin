import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignIn from "./login-buttons";

export function Landing() {
  return (
    <div className="text-center h-dvh md:grid md:grid-cols-12">
      <HeroImage />
      <LogInInfo />
      <Footer />
    </div>
  );
}
function HeroImage() {
  return (
    <section className="flex justify-items-center md:col-span-8 ">
      <Image
        width={1440}
        height={960}
        src="/img/viajesin.webp"
        alt="Image"
        className="h-[125px] md:h-screen object-cover rounded-b-lg md:rounded-none"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAI0lEQVQIW2N89P/0/0cMJgyXGBgYGP8Xzv/PkGrC8OjHOwYApv0MBT22d94AAAAASUVORK5CYII="
        loading="eager"
      />
    </section>
  );
}
function LogInInfo() {
  return (
    <section className="md:col-span-4">
      <div className="flex flex-col items-center justify-center h-full px-6">
        <div className="px-6 scroll-m-20 border-b pb-2 text-2xl relative">
          <Image
            src={"/img/app.png"}
            width={371}
            height={401}
            alt="mapa interactivo"
            className="object-cover h-[100px] md:h-[150px] w-full rounded-xl border-indigo-100/25 border absolute md:static -top-10 left-0 right-0"
          />
          <Image
            src={"/img/viajesin_logo.png"}
            alt="logo"
            height={512}
            width={1024}
            className="pt-[100px] md:pt-0"
          />
          <h2 className=" text-4xl font-semibold tracking-tight transition-colors first:mt-0 bg-gradient-to-tr from-red-200 to-indigo-500 bg-clip-text text-transparent">
            <p className="text-lg">
              Registráte y reviví tus aventuras con el mapa interactivo.
            </p>
          </h2>
        </div>

        <section className="w-full p-2 flex flex-col gap-4 items-center">
          <h3>¡Iniciá sesión ahora!</h3>
          <SignIn />
        </section>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-0 p-4 w-full flex justify-end">
      <Link
        href="https://github.com/zeroCalSoda/viajesin"
        target="_blank"
        aria-label="Repositorio de Github"
      >
        <Github className="hover:text-indigo-500/80" />
      </Link>
    </footer>
  );
}
