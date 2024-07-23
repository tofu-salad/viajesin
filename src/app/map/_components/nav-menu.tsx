"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, Map } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
import { logout } from "@/app/_actions/logout-action";
import { User } from "lucia";
import { AvatarFallback } from "@/ui/avatar";
import { fallBackLetters } from "@/lib/utils";

type Props = {
  userSession: User;
};

export function NavMenu({ userSession }: Props) {
  const { state } = useContext(TravelLogContext);
  const hidden = state.sideBarVisible === true ? "hidden" : "";

  return (
    <div className={`fixed top-2 right-2 z-[998] ${hidden} md:block`}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer shadow-2xl rounded-full">
            <AvatarFallback className="w-12 h-12 rounded-full border shadow-xl">
              {fallBackLetters(userSession.username)}
            </AvatarFallback>
            <AvatarImage
              src={userSession.avatar}
              alt={userSession?.username}
              className="w-12 h-12 rounded-full border shadow-xl"
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 relative right-2" autoFocus>
          <Link href="/">
            <DropdownMenuItem className="cursor-pointer">
              <Map className="mr-2 h-4 w-4" />
              <span>Cuenta</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => await logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
