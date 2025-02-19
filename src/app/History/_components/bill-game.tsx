import { useAppContext } from "@/app/context-provider";
import { GameResType } from "@/app/Home/schema/game";
import { VNvnd } from "@/constants/common";
import React, { useEffect, useState } from "react";

const BillGame = ({ gameids }: { gameids: string[] }) => {
  const [games, setGames] = useState<GameResType[] | null>(null);
  console.log(games);
  useEffect(() => {
    if (gameids) {
      const fetchData = async () => {
        const fetchTeam = await fetch(
          `http://localhost:5041/api/Game/GetGamesByListGameid/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gameids: gameids,
            }),
          }
        );
        const rs = await fetchTeam.json();
        setGames(rs);
      };
      fetchData();
    }
  }, [gameids]);

  return (
    <div className="bg-foreground rounded-lg">
      {games ? (
        <div>
          {games.map((e) => {
            return (
              <div
                key={e.id}
                className="flex flex-row text-white items-center justify-between p-2"
              >
                <div className="flex items-center">
                  <img
                    className="rounded-lg"
                    width={80}
                    height={80}
                    src={e.imageUrl}
                    alt=""
                  />
                  <p className="ml-2">{e.name + " " + e.version}</p>
                </div>
                <p>{VNvnd.format(e.price)}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BillGame;
