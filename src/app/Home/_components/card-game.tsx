import { VNvnd } from "@/constants/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import IC_Window from "../../../../public/icons/IC_Window";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ColorThief, { RGBColor } from "colorthief";
import { GameResType } from "../schema/game";
import { useAppContext } from "@/app/context-provider";

interface ICardGame {
  id?: string;
  imgUrl?: string;
  title?: string;
  genres?: string;
  price?: number;
  game?: GameResType;
}

const CardGame = (props: ICardGame) => {
  const { imgUrl, genres, price, title, id, game } = props;
  const [dominantColor, setDominantColor] = useState<RGBColor | null>(null);
  const { setGameid } = useAppContext();

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      imgUrl ||
      "https://gamegator.net./_next/image?url=https%3A%2F%2Fimages.gamegator.net%2Fco7uj1&w=384&q=75";

    img.onload = () => {
      const colorThief = new ColorThief();
      const colorPalette = colorThief.getPalette(img, 6);
      setDominantColor(colorPalette?.[0] || null);
    };
  }, [imgUrl]);

  return (
    <div
      style={{
        backgroundColor: dominantColor ? `rgb(${dominantColor.join(",")})` : "",
      }}
      className={cn(
        "relative w-fit h-full group p-2 col-span-1 rounded-lg  shadow-lg"
      )}
    >
      <Link
        href={{
          pathname: `/Games/${title}`,
        }}
        onClick={() => {
          setGameid(id || null);
        }}
      >
        <img
          className="rounded-lg object-cover"
          src={
            imgUrl ||
            "https://gamegator.net./_next/image?url=https%3A%2F%2Fimages.gamegator.net%2Fco7uj1&w=384&q=75"
          }
          width={260}
          height={260}
          alt="Game Image"
        />
        <div className="p-4">
          <h3 className="text-base font-semibold text-white">
            {`${title} ${game?.version}` || "Game Title"}
          </h3>
          <p className="w-32 font-medium text-gray-200 text-xs truncate">
            {genres || "Action, Adventure"}
          </p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-base font-semibold text-white">
              {VNvnd.format(price || 100000)}
            </p>
            <IC_Window width={18} height={18} />
          </div>
        </div>
      </Link>
      <div
        style={{
          backgroundColor: dominantColor
            ? `rgb(${dominantColor.join(",")})`
            : "",
        }}
        className="absolute rounded-b-lg  p-1 left-0 right-0 hidden group-hover:block text-white"
      >
        <Button variant={"default"} className="w-full p-1 bg-transparent-base ">
          + Add to list
        </Button>
      </div>
    </div>
  );
};

export default CardGame;
