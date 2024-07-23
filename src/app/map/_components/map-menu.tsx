"use client";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
import { useContext, useEffect, useRef } from "react";
import TravelLogForm from "./travel-form";
import { Button } from "@/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/ui/card";
import { User } from "lucia";

export default function MapMenu({ userSession }: { userSession: User }) {
  const { state, dispatch } = useContext(TravelLogContext);
  const escKeyRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch({ type: "SET_SIDEBAR_VISIBLE", data: false });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const handleMenuVisibility = () => {
    dispatch({
      type: "SET_SIDEBAR_VISIBLE",
      data: !state.sideBarVisible,
    });
  };
  return (
    <div className="flex items-center justify-center">
      <Button
        ref={escKeyRef}
        onClick={handleMenuVisibility}
        variant="secondary"
        className="z-[999] flex items-center justify-center rounded-3xl fixed md:right-2 bottom-2 "
      >
        {state.sideBarVisible ? (
          <span className="pr-1 text-lg">cerrar</span>
        ) : (
          <span className="pr-1 text-lg">agregar</span>
        )}
        <ChevronLeft
          className={`relative top-[1px] left-1 h-4 w-4 transition duration-200 ${
            state.sideBarVisible ? "rotate-90" : ""
          }`}
          aria-hidden="true"
        />
      </Button>
      {state.sideBarVisible && (
        <Card className="fixed z-[998] bottom-14 md:right-2">
          <TravelLogForm userSession={userSession} />
        </Card>
      )}
    </div>
  );
}
