"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Spinner } from "./loading-spinner";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    try {
      setLoading(true);
    } catch (e) {
      throw new Error("Falló al intentar cerrar sesión");
    } finally {
      signOut();
    }
  };
  return (
    <Button
      variant={"secondary"}
      onClick={handleLogout}
      className="border flex items-center hover:bg-secondary/50"
    >
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-between w-full ">
          <LogOut className="w-4 h-4"></LogOut>
          <span className="text-xs">Cerrar sesión</span>
        </div>
      )}
    </Button>
  );
}
