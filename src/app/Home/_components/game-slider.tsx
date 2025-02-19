import AppSlider from "@/components/AppSlider";
import React, { useState } from "react";
import { GameResType } from "../schema/game";
interface IGameSlider {
  games?: GameResType[];
}

const GameSlider = ({ games }: IGameSlider) => {
  const [currImg, setCurrImg] = useState<string>(
    games?.[0].imageUrl || "https://placehold.co/600x400"
  );

  return (
    <div className="relative flex-1 bg-foreground px-3 pb-3 pt-5 rounded-lg relative">
      <p className="absolute text-xl italic -top-3 left-3 text-white font-semibold">
        New Release
      </p>
      <div className="w-full h-64 opacity-25">
        <img src={currImg} alt="" className="w-full h-full rounded-lg" />
      </div>
      <div className="w-full h-fit absolute top-0 bottom-0 my-auto">
        <AppSlider
          onChange={(from, to) =>
            setCurrImg(games?.[to].imageUrl || "https://placehold.co/600x400")
          }
          games={games}
        />
      </div>
    </div>
  );
};

export default GameSlider;
