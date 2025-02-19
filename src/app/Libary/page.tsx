"use client";

import React, { useEffect, useState } from "react";
import { GameResType } from "../Home/schema/game";
import { Button } from "@/components/ui/button";
import GamePage from "../Games/[Gameid]/page";
import { useAppContext } from "../context-provider";

const LibaryPage = ({ games }: { games?: GameResType[] }) => {
  const [gameid, setGameId] = useState<string | null>(null);
  console.log(games);
  const renderListGame = () => {
    if (games) {
      return games.map((e) => (
        <Button
          onClick={() => setGameId(e.id)}
          key={e.id}
          className="h-fit bg-background text-white"
        >
          <div className="w-full flex justify-start items-center">
            <img
              className="rounded-md mr-2"
              width={40}
              height={40}
              src={e.imageUrl}
              alt=""
            />
            <p>{e.name}</p>
          </div>
        </Button>
      ));
    }
  };

  const renderListGameEmpty = () => {
    return <p className="w-[200px] text-center">None Games</p>;
  };

  return (
    <div className="h-screen">
      {games ? (
        <div className="flex flex-row w-full h-full">
          <div className="flex-2 h-[500px] p-2 rounded-lg overflow-y-scroll flex flex-col bg-foreground space-y-2 ml-2">
            <p className="text-white text-xl font-bold text-center">My Games</p>
            {games.length !== 0 ? renderListGame() : renderListGameEmpty()}
          </div>
          <div className="flex-1 w-[400px]">
            {games.length !== 0 && (
              <GamePage
                Gameid={gameid || games[0].id}
                hideHeader={false}
                className="w-2/3"
                newHeader={true}
              />
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default LibaryPage;
