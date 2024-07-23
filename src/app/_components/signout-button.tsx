"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Spinner } from "@/ui/loading-spinner";
import { logout } from "../_actions/logout-action";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    try {
      setLoading(true);
    } catch (e) {
      throw new Error("Falló al intentar cerrar sesión");
    } finally {
      async () => await logout();
    }
  };
  return (
    <form action={logout}>
      <Button
        variant={"secondary"}
        onClick={handleLogout}
        type="submit"
        className="border flex items-center hover:bg-secondary/50 w-full"
      >
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex justify-between items-center w-full ">
            <LogOut />
            <span>Cerrar sesión</span>
          </div>
        )}
      </Button>
    </form>
  );
}
