"use client";
import React, { useEffect, useState } from "react";
import AppSlider from "@/components/AppSlider";
import "react-slideshow-image/dist/styles.css";
import IC_Game from "../../../public/icons/IC_Game";
import { AllGame } from "@/constants/common";
import { Button } from "@/components/ui/button";
import CardGame from "./_components/card-game";
import GameSlider from "./_components/game-slider";
import { GameResType } from "./schema/game";
import { useAppContext } from "../context-provider";

const HomePage = () => {
  const [games, setGames] = useState<GameResType[] | null>(null);
  const fetchAllGames = async () => {
    const res = await fetch("http://localhost:5041/api/Game/GetGames");
    const rs = await res.json();
    setGames(rs);
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  return (
    <div className="px-10 pb-20">
      <div className="w-full h-fit flex flex-row items-start mt-5">
        <div className="flex-1">
          {games ? (
            <div>
              {games.length !== 0 && <GameSlider games={games.slice(0, 3)} />}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {/* Events */}
        <div className="w-1/3 max-h-72 overflow-y-scroll pl-5">
          <p className="mb-2">Events in progress</p>
          <p className="text-center text-white mt-3 font-semibold">
            Đang phát triển{" "}
          </p>
          {/* <div className="w-fit mb-10">
            <div className="flex flex-row items-center">
              <img
                src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
                alt=""
                className="w-32 h-20 rounded-lg"
              />
              <div className="ml-3">
                <p>Summer Sale</p>
                <p>22/10/2024 - 30/10/2024</p>
              </div>
            </div>
            <Button
              className={"w-full bg-green-600 text-white rounded-lg py-1 mt-2"}
            >
              Join
            </Button>
          </div>

          <div className="w-fit mb-10">
            <div className="flex flex-row items-center">
              <img
                src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
                alt=""
                className="w-32 h-20 rounded-lg"
              />
              <div className="ml-3">
                <p>Summer Sale</p>
                <p>22/10/2024 - 30/10/2024</p>
              </div>
            </div>
            <Button
              className={"w-full bg-green-600 text-white rounded-lg py-1 mt-2"}
            >
              Join
            </Button>
          </div>

          <div className="w-fit mb-10">
            <div className="flex flex-row items-center">
              <img
                src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
                alt=""
                className="w-32 h-20 rounded-lg"
              />
              <div className="ml-3">
                <p>Summer Sale</p>
                <p>22/10/2024 - 30/10/2024</p>
              </div>
            </div>
            <Button
              className={"w-full bg-green-600 text-white rounded-lg py-1 mt-2"}
            >
              Join
            </Button>
          </div> */}
        </div>
      </div>
      <div>
        <p className="flex flex-row items-center mb-4">
          <IC_Game width={24} height={24} /> All Games
        </p>
        <div className="w-fit grid grid-cols-5 gap-x-4 gap-y-14">
          {games ? (
            games.map((item) => (
              <CardGame
                id={item?.id}
                imgUrl={item?.imageUrl}
                key={item?.id}
                genres={Array.from(item?.genres).toString()}
                price={item?.price}
                title={item?.name}
                game={item}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
