"use client";

import React, { useEffect, useState } from "react";
import LibaryPage from "./page";
import { useAppContext } from "../context-provider";
import { GameResType } from "../Home/schema/game";

const LibaryLayout = () => {
  const { user } = useAppContext();
  const [game, setGame] = useState<GameResType[] | null>(null);

  const fetchCarts = async () => {
    if (user) {
      const fetchCart = await fetch(
        `http://localhost:5041/api/User/GetGamesGpByUserId/${user.id}`
      );
      const rs = (await fetchCart.json()) as GameResType[];
      console.log(rs);
      setGame(rs);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [user, game]);

  return (
    <div>
      <LibaryPage games={game || undefined} />
    </div>
  );
};

export default LibaryLayout;
