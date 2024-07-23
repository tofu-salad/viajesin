"use client";

import { Button } from "./button";
import { useState } from "react";
import { Spinner } from "./loading-spinner";
import { logout } from "@/app/_actions/logout-action";

export default function SignOutButtonNav() {
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
    <Button onClick={handleLogout} className="flex items-center bg-slate-900 ">
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
