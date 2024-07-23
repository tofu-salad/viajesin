import { SelectTravelLog } from "@/db/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { buttonVariants } from "@/ui/button";
import { User } from "lucia";
import { MapIcon } from "lucide-react";
import Link from "next/link";
import { fallBackLetters } from "@/lib/utils";
import React from "react";
import { DeleteAccountDialog } from "./delete-account-dialog";
import SignOutButton from "./signout-button";
import { LastVisitedPlaces } from "../map/_components/last-visited-places";

type Props = {
  userSession: User;
  visitedPlaces: SelectTravelLog[] | [];
};
export async function Dashboard({ userSession, visitedPlaces }: Props) {
  return (
    <div className="flex min-h-dvh h-full flex-col items-center justify-center gap-8">
      <div className="max-w-[400px]">
        <Profile user={userSession} />
      </div>
      <LastVisitedPlaces logs={visitedPlaces} />
      <DeleteAccountDialog />
    </div>
  );
}

function Profile({ user }: { user: User }) {
  return (
    <header className="flex flex-col items-center gap-4">
      <h1 className="text-5xl">{user.username}</h1>
      <Avatar className="w-40 h-40 ">
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback>{fallBackLetters(user.username)}</AvatarFallback>
      </Avatar>

      <div className="grid grid-cols-2 gap-4 w-60">
        <SignOutButton />
        <MapButton />
      </div>
    </header>
  );
}

function MapButton() {
  return (
    <Link
      className={`${buttonVariants({
        variant: "default",
      })} w-full flex justify-between`}
      href={"/map"}
    >
      Mapa
      <MapIcon />
    </Link>
  );
}
