import React, { ReactNode } from "react";
import IC_Event from "../../../public/icons/IC_Event";
import IC_Game from "../../../public/icons/IC_Game";
import IC_Home_dark from "../../../public/icons/IC_Home_dark";
import IC_Version from "../../../public/icons/IC_Version";
import IC_Members from "../../../public/icons/IC_Members";
import IC_Players from "../../../public/icons/IC_Players";
import IC_DAP from "../../../public/icons/IC_DAP";

interface IHomelayout {
  children: ReactNode;
}

const Homelayout = ({ children }: IHomelayout) => {
  return (
    <div className="h-screen p-3">
      <div className="w-full bg-foreground flex flex-row justify-around rounded-lg">
        <a className="flex flex-row items-center my-auto p-4" href="">
          <div className="w-fit bg-background p-2 rounded-md">
            <IC_Version width={28} height={28} className="mx-auto" />
          </div>
          <div className="ml-2">
            <p className="text-xs text-primary">Version</p>
            <p className="text-lg text-primary font-semibold">V1.0</p>
          </div>
        </a>

        <a className="flex flex-row items-center my-auto p-4" href="">
          <div className="w-fit bg-background p-2 rounded-md">
            <IC_Game width={28} height={28} className="mx-auto" />
          </div>
          <div className="ml-2">
            <p className="text-xs text-primary">All Game</p>
            <p className="text-lg text-primary font-semibold">2,282+</p>
          </div>
        </a>

        <a className="flex flex-row items-center my-auto p-4" href="">
          <div className="w-fit bg-background p-2 rounded-md">
            <IC_Players width={28} height={28} className="mx-auto" />
          </div>
          <div className="ml-2">
            <p className="text-xs text-primary">Players</p>
            <p className="text-lg text-primary font-semibold">2,282+</p>
          </div>
        </a>

        <a className="flex flex-row items-center my-auto p-4" href="">
          <div className="w-fit bg-background p-2 rounded-md">
            <IC_DAP width={28} height={28} className="mx-auto" />
          </div>
          <div className="ml-2">
            <p className="text-xs text-primary">Developer and Publisher</p>
            <p className="text-lg text-primary font-semibold">2,282+</p>
          </div>
        </a>
      </div>
      {children}
    </div>
  );
};

export default Homelayout;
