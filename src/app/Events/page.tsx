"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState } from "react";
import IC_TimeLine from "../../../public/icons/IC_TimeLine";

const EventsPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  console.log(selectedIndex);
  return (
    <div className="flex-1">
      <h1 className="text-white font-medium mb-4">Events in progress</h1>
      <div className="w-fit grid grid-cols-4">
        <div className="w-fit col-span-1 mx-4 mb-8">
          <div className="bg-foreground p-2 rounded-lg">
            <p className="text-center text-white">Summer Sale</p>
            <img
              src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
              alt=""
              className="w-full h-20 rounded-lg my-2"
            />
            <ProgressBar
              bgColor={"#4D83FF"}
              height={"10px"}
              labelSize={"10px"}
              completed={60}
              maxCompleted={100}
            />
          </div>
          <div className="bg-foreground p-2 rounded-lg my-2">
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row items-start mr-4">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2 text-white">End after</p>
                  <p className="text-xs ml-2">45 days left 3:51:06</p>
                </div>
              </div>

              <div className="flex-1 flex flex-row items-start">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2">Sale</p>
                  <p className="text-xs ml-2">90%</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 p-2 rounded-lg text-white">
            Join Sale
          </button>
        </div>
        <div className="w-fit col-span-1 mx-4 mb-8">
          <div className="bg-foreground p-2 rounded-lg">
            <p className="text-center text-white">Summer Sale</p>
            <img
              src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
              alt=""
              className="w-full h-20 rounded-lg my-2"
            />
            <ProgressBar
              bgColor={"#4D83FF"}
              height={"10px"}
              labelSize={"10px"}
              completed={60}
              maxCompleted={100}
            />
          </div>
          <div className="bg-foreground p-2 rounded-lg my-2">
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row items-start mr-4">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2 text-white">End after</p>
                  <p className="text-xs ml-2">45 days left 3:51:06</p>
                </div>
              </div>

              <div className="flex-1 flex flex-row items-start">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2">Sale</p>
                  <p className="text-xs ml-2">90%</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 p-2 rounded-lg text-white">
            Join Sale
          </button>
        </div>
        <div className="w-fit col-span-1 mx-4 mb-8">
          <div className="bg-foreground p-2 rounded-lg">
            <p className="text-center text-white">Summer Sale</p>
            <img
              src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
              alt=""
              className="w-full h-20 rounded-lg my-2"
            />
            <ProgressBar
              bgColor={"#4D83FF"}
              height={"10px"}
              labelSize={"10px"}
              completed={60}
              maxCompleted={100}
            />
          </div>
          <div className="bg-foreground p-2 rounded-lg my-2">
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row items-start mr-4">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2 text-white">End after</p>
                  <p className="text-xs ml-2">45 days left 3:51:06</p>
                </div>
              </div>

              <div className="flex-1 flex flex-row items-start">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2">Sale</p>
                  <p className="text-xs ml-2">90%</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 p-2 rounded-lg text-white">
            Join Sale
          </button>
        </div>
        <div className="w-fit col-span-1 mx-4 mb-8">
          <div className="bg-foreground p-2 rounded-lg">
            <p className="text-center text-white">Summer Sale</p>
            <img
              src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
              alt=""
              className="w-full h-20 rounded-lg my-2"
            />
            <ProgressBar
              bgColor={"#4D83FF"}
              height={"10px"}
              labelSize={"10px"}
              completed={60}
              maxCompleted={100}
            />
          </div>
          <div className="bg-foreground p-2 rounded-lg my-2">
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row items-start mr-4">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2 text-white">End after</p>
                  <p className="text-xs ml-2">45 days left 3:51:06</p>
                </div>
              </div>

              <div className="flex-1 flex flex-row items-start">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2">Sale</p>
                  <p className="text-xs ml-2">90%</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 p-2 rounded-lg text-white">
            Join Sale
          </button>
        </div>
        <div className="w-fit col-span-1 mx-4 mb-8">
          <div className="bg-foreground p-2 rounded-lg">
            <p className="text-center text-white">Summer Sale</p>
            <img
              src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
              alt=""
              className="w-full h-20 rounded-lg my-2"
            />
            <ProgressBar
              bgColor={"#4D83FF"}
              height={"10px"}
              labelSize={"10px"}
              completed={60}
              maxCompleted={100}
            />
          </div>
          <div className="bg-foreground p-2 rounded-lg my-2">
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row items-start mr-4">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2 text-white">End after</p>
                  <p className="text-xs ml-2">45 days left 3:51:06</p>
                </div>
              </div>

              <div className="flex-1 flex flex-row items-start">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2">Sale</p>
                  <p className="text-xs ml-2">90%</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 p-2 rounded-lg text-white">
            Join Sale
          </button>
        </div>
        <div className="w-fit col-span-1 mx-4 mb-8">
          <div className="bg-foreground p-2 rounded-lg">
            <p className="text-center text-white">Summer Sale</p>
            <img
              src="https://clan.cloudflare.steamstatic.com/images/27766192/4b8392f48e9ec3beeca91cdc1ba7134e78ac236c.jpg"
              alt=""
              className="w-full h-20 rounded-lg my-2"
            />
            <ProgressBar
              bgColor={"#4D83FF"}
              height={"10px"}
              labelSize={"10px"}
              completed={60}
              maxCompleted={100}
            />
          </div>
          <div className="bg-foreground p-2 rounded-lg my-2">
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row items-start mr-4">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2 text-white">End after</p>
                  <p className="text-xs ml-2">45 days left 3:51:06</p>
                </div>
              </div>

              <div className="flex-1 flex flex-row items-start">
                <div className="w-fit p-2 bg-background rounded-md">
                  <IC_TimeLine />
                </div>
                <div>
                  <p className="text-sm ml-2">Sale</p>
                  <p className="text-xs ml-2">90%</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 p-2 rounded-lg text-white">
            Join Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
