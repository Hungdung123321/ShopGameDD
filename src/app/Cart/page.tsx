"use client";

import React from "react";
import { GameResType } from "../Home/schema/game";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate, VNvnd } from "@/constants/common";
import { Trash2 } from "lucide-react";
import { useAppContext } from "../context-provider";
import { redirect } from "next/navigation";

const CartPage = ({
  games,
  onClickRemoveCart,
}: {
  games?: GameResType[];
  onClickRemoveCart?: () => void;
}) => {
  const { user, setGameid, RefreshUser } = useAppContext();

  const SumPrice = () => {
    if (games) {
      const sum = games.reduce((total, item) => total + item.price, 0);
      return sum;
    }
    return 0;
  };

  const onRemoveToCart = (gameid: string) => {
    const fetchRemoveToCart = async () => {
      const res = await fetch(
        `http://localhost:5041/api/Cart/RemoveUserGameCart/${user?.id}/${gameid}`,
        {
          method: "DELETE",
          redirect: "follow",
        }
      );
    };
    fetchRemoveToCart();
  };

  const onPurchase = () => {
    if (user && games) {
      if (user.wallet >= SumPrice()) {
        const gamesid = games.map((obj) => obj.id);
        const total = SumPrice();
        const fetchPurchase = async () => {
          const res = await fetch(
            `http://localhost:5041/api/User/PurchasedGames`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                gameids: gamesid,
                totalMoney: total,
                datePurchased: new Date().toISOString(),
              }),
            }
          );
          if (res.ok) {
            RefreshUser(user);
            redirect("/Libary");
          }
        };
        fetchPurchase();
      } else {
        redirect("/Payment");
      }
    }
  };

  return (
    <div className="h-screen ">
      <p className="text-center text-4xl m-2 text-white font-bold">Your Cart</p>
      <div className="w-9/12 h-4/6 p-2 bg-foreground m-auto rounded-lg">
        <div className="w-full h-[300px] bg-background rounded-lg px-4 overflow-y-scroll">
          {games ? (
            games.map((e) => (
              <div key={e.id}>
                <div className="flex space-x-2 items-center my-6">
                  <div className="flex items-center">
                    <img
                      className="rounded-lg"
                      width={80}
                      height={80}
                      src={e.imageUrl || "https://placehold.co/600x400"}
                      alt=""
                    />
                    <span className="ml-2 max-w-[400px] py-2 truncate capitalize font-medium">
                      <p className="text-white text-base">{e.name}</p>
                      <div className="flex">
                        {e.genres.map((e) => (
                          <p className=" mr-1 text-[12px]" key={e}>
                            {e},
                          </p>
                        ))}
                      </div>
                      <p className="text-white text-sm">
                        {formatDate(e.releasedDate)}
                      </p>
                      <div className="flex items-center">
                        <Link
                          className="bg-green-600 text-white p-1 mt-2 text-xs rounded-md"
                          href={{
                            pathname: `/Games/${e.name}`,
                          }}
                          onClick={() => {
                            setGameid(e.id || null);
                          }}
                        >
                          Game Detail
                        </Link>
                        <Link
                          href={"#"}
                          className="bg-red-500 text-white p-1 mt-2 text-xs rounded-md ml-2"
                          onClick={() => {
                            onRemoveToCart(e.id);
                            onClickRemoveCart?.();
                          }}
                        >
                          <Trash2 width={18} height={18} />
                        </Link>
                      </div>
                    </span>
                  </div>
                  <div className="flex-1 items-end">
                    <p className="text-right text-white">
                      {VNvnd.format(e.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <div className="">
          <Separator className="my-4 !bg-gray-400" />
          <div className="flex justify-between items-center px-10">
            <p className="text-white text-3xl font-bold">Total:</p>
            <p className="text-white text-xl font-bold">
              {VNvnd.format(SumPrice())}
            </p>
          </div>
          <div className="flex space-x-2 justify-end mt-10">
            {games?.length === 0 ? (
              <>
                <Button disabled={true} className="bg-green-900 text-gray-500">
                  Purchse as gif
                </Button>
                <Button disabled={true} className="bg-green-900  text-gray-500">
                  Purchse for myself
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-green-600 text-white">
                  Purchse as gif
                </Button>
                <Button
                  onClick={onPurchase}
                  className="bg-green-600  text-white"
                >
                  Purchase for myself
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
