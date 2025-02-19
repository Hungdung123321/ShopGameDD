"use client";

import React, { ReactNode, useEffect, useState } from "react";
import CartPage from "./page";
import { GameResType } from "../Home/schema/game";
import { useAppContext } from "../context-provider";

const CartLayout = () => {
  const { user } = useAppContext();
  const [game, setGame] = useState<GameResType[] | null>(null);

  const fetchCarts = async () => {
    if (user) {
      const fetchCart = await fetch(
        `http://localhost:5041/api/Cart/GetGamesInCartByUserid/${user?.id}`
      );
      const rs = (await fetchCart.json()) as GameResType[];
      setGame(rs);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [user, game]);

  return (
    <div>
      {game && <CartPage onClickRemoveCart={fetchCarts} games={game} />}
    </div>
  );
};

export default CartLayout;
