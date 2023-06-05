"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Spinner } from "./loading-spinner";

export default function SignOutButtonNav() {
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
      onClick={handleLogout}
      className="flex items-center bg-slate-900 "
    >
      {loading ? (
        <Spinner />
      ) : (
        <div className="">
          <span className="text-l text-white ">Cerrar sesión</span>
        </div>
      )}
    </Button>
  );
}