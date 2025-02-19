"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import IC_Group from "../../../public/icons/IC_Group";
import { DapProfileResType } from "./type";
import { VNvnd } from "@/constants/common";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import DapGames from "./_components/dap-games";

const DapProfilePage = ({ dap }: { dap: DapProfileResType }) => {
  return (
    <div className="flex-1 h-screen flex flex-row items-center">
      <div className="w-64 h-full mr-3">
        <img
          className="rounded-lg mb-2 "
          src={dap.logoUrl || "https://placehold.co/600x400"}
          alt="logo"
          width={260}
          height={260}
        />
        <p className="text-lg font-medium text-white">{dap.name}</p>
        <p className="flex">
          <IC_Group className="" /> {dap.usersId.length} members
        </p>
        <p>total revenue: {VNvnd.format(dap.totalRevenue)}</p>
      </div>
      <div className="flex-1 h-full">
        <MinimalTiptapEditor
          className="w-full border-none"
          editorContentClassName="p-2"
          output="json"
          placeholder="Type your description here..."
          autofocus={false}
          editable={false}
          editorClassName="focus:outline-none"
          content={JSON.parse(dap.aboutContent)}
          isToobar={false}
        />
        <div className="px-3 pb-6">
          <h1 className=" text-xl font-normal my-5">One time game Revenue</h1>
          <TabGroup>
            <TabList>
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                Game
              </Tab>
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                DLC
              </Tab>
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                Sound track
              </Tab>
            </TabList>
            <TabPanels className={"mt-5"}>
              <TabPanel>
                <DapGames dapid={dap.id} />
              </TabPanel>
              <TabPanel>
                <p className="text-center text-2xl font-medium text-white">
                  đang phát triển
                </p>
              </TabPanel>
              <TabPanel>
                <p className="text-center text-2xl font-medium text-white">
                  đang phát triển
                </p>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};

export default DapProfilePage;
