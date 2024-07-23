import { Avatar, AvatarImage } from "@/ui/avatar";
import { buttonVariants } from "@/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeaderMobile,
  CardTitle,
} from "@/ui/card";
import SignOutButton from "@/ui/signout-button";
import { MapIcon } from "lucide-react";
import Link from "next/link";

function Dashboard({ userSession }) {
  const fallBackLetters = userSession.name
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join(" ");

  return (
    <Card className="w-[350px] md:h-[375px]">
      <CardHeaderMobile className="grid grid-flow-col m-6">
        <div className="">
          <Avatar className=" w-20 h-20 ">
            <AvatarImage src={userSession.image!} alt={userSession.name!} />
            {/* <AvatarFallback>{fallBackLetters}</AvatarFallback> */}
          </Avatar>
        </div>
        <div className="ml-5 self-center text-ellipsis overflow-hidden">
          <CardTitle className="p-2 ">{userSession.name}</CardTitle>
          <CardContent>
            <p className="p-2">{userSession.email}</p>
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
