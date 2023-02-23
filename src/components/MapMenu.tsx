"use client";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
import { Transition } from "@headlessui/react";
import { useContext, useEffect } from "react";
import TravelLogForm from "./TravelForm";

export default function MapMenu() {
  const { state, dispatch } = useContext(TravelLogContext);
  const handleMenuVisibility = () => {
    dispatch({
      type: "SET_SIDEBAR_VISIBLE",
      data: !state.sideBarVisible,
    });
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch({
          type: "SET_SIDEBAR_VISIBLE",
          data: false,
        });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="fixed top-2 right-2 text-right z-[999] h-full flex flex-col gap-2">
      <div>
        <button onClick={handleMenuVisibility} className="btn btn-accent">
          <span>Menu</span>
          <ChevronDownIcon />
        </button>
      </div>
      <div className="fixed top-0 right-0 overflow-auto md:relative md:h-[90%]">
        <Transition
          show={state.sideBarVisible}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="md:w-full md:h-full w-screen h-screen ">
            <TravelLogForm
              onCancel={() =>
                dispatch({ type: "SET_SIDEBAR_VISIBLE", data: false })
              }
              onComplete={() =>
                dispatch({ type: "SET_SIDEBAR_VISIBLE", data: false })
              }
            />
          </div>
        </Transition>
      </div>
    </div>
  );
}
function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
