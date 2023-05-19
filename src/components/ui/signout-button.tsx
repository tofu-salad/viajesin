"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <Button
      variant={"secondary"}
      onClick={() => signOut()}
      className="border flex justify-between hover:bg-secondary/50"
    >
      <LogOut className="w-4 h-4"></LogOut>
      <span className="text-xs">Cerrar sesión</span>
    </Button>
  );
}
