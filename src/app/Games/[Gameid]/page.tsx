"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import IC_Infor from "../../../../public/icons/IC_Infor";
import IC_Setting from "../../../../public/icons/IC_Setting";
import IC_Box from "../../../../public/icons/IC_Box";
import IC_Back from "../../../../public/icons/IC_Back";
import { useAppContext } from "@/app/context-provider";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { VNvnd } from "@/constants/common";
import { ChartSpline, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GameDetailResType, GameResType } from "@/app/Home/schema/game";
import IC_GameType from "../../../../public/icons/IC_GameType";

enum GamePageType {
  INFORMATION,
  SETTING,
  BOX,
}

interface IGamePage {
  hideHeader?: boolean;
  className?: string;
  Gameid?: string;
  newHeader?: boolean;
}

const GamePage = ({
  newHeader,
  hideHeader = true,
  className,
  Gameid,
}: IGamePage) => {
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [selectedIndex, setSelectedIndex] = useState<number>(
    GamePageType.INFORMATION
  );
  const [game, setGame] = useState<GameDetailResType | null>(null);
  const { user, gameid } = useAppContext();
  const [revenue, setRevenue] = useState<number | null>(null);

  const fetchRevenue = async () => {
    const res = await fetch(
      `http://localhost:5041/api/GamePurchased/GetRevenue/${Gameid || gameid}`
    );
    const rs = await res.json();
    setRevenue(rs?.revenue);
  };

  useEffect(() => {
    if (Gameid || gameid) {
      const fetchGame = async () => {
        setLoading(true); // Set loading to true
        try {
          const res = await fetch(
            `http://localhost:5041/api/Game/GetGame/${Gameid || gameid}/${
              user?.id
            }`
          );
          const rs = await res.json();
          const data = rs as GameDetailResType;
          // data.game.moreImageUrls.shift();
          setGame(data);
        } catch (error) {
          console.error("Failed to fetch game details:", error);
        } finally {
          setLoading(false); // Set loading to false
        }
      };
      fetchGame();
      fetchRevenue();
    }
  }, [gameid, Gameid]);

  const renderBuyBtn = () => {
    if (game) {
      switch (game.gameState) {
        case 0:
          return (
            <Button onClick={onAddToCart} className="bg-green-500 text-white">
              {"Add to Cart"}
            </Button>
          );
        case 1:
          return (
            <Button disabled className="bg-green-900 text-gray-500">
              {"InCart"}
            </Button>
          );
        case 2:
          return (
            <Button disabled className="bg-green-900 text-gray-500">
              {"Purchased"}
            </Button>
          );
        default:
          break;
      }
    }
  };

  const onAddToCart = () => {
    const fetchAddToCart = async () => {
      const res = await fetch(
        `http://localhost:5041/api/Cart/AddUserGameCart/${user?.id}/${game?.game.id}`,
        {
          method: "POST",
          redirect: "follow",
        }
      );
      redirect("/Cart");
    };
    fetchAddToCart();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-xl">Loading game details...</p>
      </div>
    );
  }

  return (
    <>
      {newHeader && (
        <p className="ml-2 text-white tex-xl font-bold">{game?.game.name}</p>
      )}
      {hideHeader && (
        <div className="flex justify-between mb-4 px-6">
          <button
            className="flex"
            onClick={() => {
              route.back();
            }}
          >
            <IC_Back />
            <p className="ml-2">back</p>
          </button>
          <p className="text-white font-medium text-xl mr-20 flex items-center">
            <img
              width={40}
              height={40}
              className="rounded-md mr-2"
              src={game?.game.imageUrl}
              alt="Game Thumbnail"
            />
            {game?.game.name || "Name Game"}
          </p>
        </div>
      )}
      <div className="w-full flex p-3">
        <div className={cn("w-3/4", className)}>
          <div className="bg-foreground p-3 rounded-lg">
            {game ? (
              <Carousel width={"100%"}>
                {game.game.moreImageUrls.map((e) => (
                  <div key={e}>
                    <img src={e} alt="Game Screenshot" />
                    <p className="legend">{e}</p>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div></div>
            )}
          </div>
          <div className="w-full mt-3 bg-foreground p-3 rounded-lg">
            {game ? (
              <div>
                <p className="text-white font-bold text-xl mb-6">
                  About {game.game.name} {game.game.version}
                </p>
                <MinimalTiptapEditor
                  className="w-full border-none"
                  editorContentClassName="p-2"
                  output="json"
                  placeholder="Type your description here..."
                  autofocus={false}
                  editable={false}
                  editorClassName="focus:outline-none"
                  content={JSON.parse(game.game.about)}
                  isToobar={false}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="w-4"></div>
        <div className="w-2/4 h-1/3 bg-foreground rounded-lg p-3">
          <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <TabList>
              <Tab
                className={`${
                  selectedIndex === GamePageType.INFORMATION
                    ? "bg-background"
                    : "bg-foreground"
                } p-3 focus:outline-none rounded-t-lg`}
              >
                <IC_Infor />
              </Tab>
              <Tab
                className={`${
                  selectedIndex === GamePageType.SETTING
                    ? "bg-background"
                    : "bg-foreground"
                } p-3 focus:outline-none rounded-t-lg`}
              >
                <IC_Setting />
              </Tab>
              <Tab
                className={`${
                  selectedIndex === GamePageType.BOX
                    ? "bg-background"
                    : "bg-foreground"
                } p-3 focus:outline-none rounded-t-lg`}
              >
                <IC_Box />
              </Tab>
            </TabList>
            <TabPanels
              className={
                " max-h-96 bg-background rounded-b-lg rounded-tr-lg p-3 overflow-y-scroll"
              }
            >
              <TabPanel>
                <div className="relative w-full bg-foreground rounded-lg p-3 mb-3">
                  <p className="absolute italic -top-3 left-3 text-white font-semibold">
                    Description
                  </p>
                  {game ? (
                    <MinimalTiptapEditor
                      className="w-full border-none"
                      editorContentClassName="p-2"
                      output="json"
                      placeholder="Type your description here..."
                      autofocus={false}
                      editable={false}
                      editorClassName="focus:outline-none"
                      content={JSON.parse(game.game.description)}
                      isToobar={false}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="w-full bg-foreground rounded-lg p-3 mb-8">
                  <div className="flex justify-around">
                    <div className="flex">
                      <button className="p-2 bg-background rounded-md">
                        <IC_GameType />
                      </button>
                      <div className="ml-2">
                        <p className="text-white text-base">Version</p>
                        <p className="text-gray-400 text-xs">
                          {game?.game?.version || "None"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex">
                        <button className="p-2 bg-background rounded-md">
                          <IC_GameType />
                        </button>
                        <div className="ml-2">
                          <p className="text-white text-base">In Serie</p>
                          <p className="text-gray-400 text-xs">none</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-full bg-foreground rounded-lg pt-5 pb-3 my-8 grid grid-cols-2">
                  <p className="absolute italic -top-3 left-3 text-white font-semibold">
                    Genres
                  </p>
                  {game ? (
                    game.game.genres.map((e) => (
                      <Button
                        variant={"outline"}
                        key={e}
                        className="text-white m-2 col-span-1 py-2"
                      >
                        {e}
                      </Button>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="relative w-full bg-foreground rounded-lg p-3 mb-3 grid grid-cols-2">
                  <p className="absolute italic -top-3 left-3 text-white font-semibold">
                    Features
                  </p>
                  {game ? (
                    game.game.features.map((e) => (
                      <Button
                        variant={"outline"}
                        key={e}
                        className="text-white m-2 col-span-1 py-2"
                      >
                        {e}
                      </Button>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                {game ? (
                  <MinimalTiptapEditor
                    className="w-full border-none"
                    editorContentClassName="p-2"
                    output="json"
                    placeholder="Type your description here..."
                    autofocus={false}
                    editable={false}
                    editorClassName="focus:outline-none"
                    content={JSON.parse(game.game.systemRequirement)}
                    isToobar={false}
                  />
                ) : (
                  <div></div>
                )}
              </TabPanel>
              <TabPanel>
                <div>
                  <p className="text-white text-xl mb-2">Advance</p>
                  <div className="">
                    <button className="w-full bg-foreground p-2 flex justify-between">
                      <div className="w-40 h-20">
                        <img
                          src="https://gamegator.net./_next/image?url=https%3A%2F%2Fimages.gamegator.net%2FRnGcqHtYyfKYkpyGzrn-DQ%2Fco8gj5%2Ffit%3Dcover%252Cw%253D260&w=384&q=75"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <p>Dragon Age: The Veilguard Deluxe</p>
                        <p className="text-green-500 text-right">990.000đ</p>
                      </div>
                    </button>
                    <div></div>
                    <div></div>
                  </div>

                  <p className="text-white text-xl mb-2">Advance</p>
                  <div className="">
                    <button className="w-full bg-foreground p-2 flex justify-between">
                      <div className="w-40 h-20">
                        <img
                          src="https://gamegator.net./_next/image?url=https%3A%2F%2Fimages.gamegator.net%2FRnGcqHtYyfKYkpyGzrn-DQ%2Fco8gj5%2Ffit%3Dcover%252Cw%253D260&w=384&q=75"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <p>Dragon Age: The Veilguard Deluxe</p>
                        <p className="text-green-500 text-right">990.000đ</p>
                      </div>
                    </button>
                    <div></div>
                    <div></div>
                  </div>

                  <p className="text-white text-xl mb-2">Advance</p>
                  <div className="">
                    <button className="w-full bg-foreground p-2 flex justify-between">
                      <div className="w-40 h-20">
                        <img
                          src="https://gamegator.net./_next/image?url=https%3A%2F%2Fimages.gamegator.net%2FRnGcqHtYyfKYkpyGzrn-DQ%2Fco8gj5%2Ffit%3Dcover%252Cw%253D260&w=384&q=75"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <p>Dragon Age: The Veilguard Deluxe</p>
                        <p className="text-green-500 text-right">990.000đ</p>
                      </div>
                    </button>
                    <div></div>
                    <div></div>
                  </div>

                  <p className="text-white text-xl mb-2">Advance</p>
                  <div className="">
                    <button className="w-full bg-foreground p-2 flex justify-between">
                      <div className="w-40 h-20">
                        <img
                          src="https://gamegator.net./_next/image?url=https%3A%2F%2Fimages.gamegator.net%2FRnGcqHtYyfKYkpyGzrn-DQ%2Fco8gj5%2Ffit%3Dcover%252Cw%253D260&w=384&q=75"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <p>Dragon Age: The Veilguard Deluxe</p>
                        <p className="text-green-500 text-right">990.000đ</p>
                      </div>
                    </button>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
          {game ? (
            <p className="text-xl text-green-400 font-medium text-right py-2">
              Price: {VNvnd.format(game.game.price)}
            </p>
          ) : (
            <div></div>
          )}
          {user?.userRole === "USER" ? (
            <div className="flex items-center justify-end p-2">
              <Button className="bg-background p-2 mr-2">
                <Star />
              </Button>
              {renderBuyBtn()}
            </div>
          ) : (
            <div className="float-right flex">
              <ChartSpline color="white" />
              <p className="text-white text-base font-semibold">
                Revevue: {revenue ? VNvnd.format(revenue) : 0}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GamePage;
