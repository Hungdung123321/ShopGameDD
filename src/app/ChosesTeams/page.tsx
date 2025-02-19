"use client";

import React, { useEffect, useState } from "react";
import ChosesTeamsForm from "./_components/ChosesTeamsForm";
import CardTeam from "./_components/CardTeam";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { redirect } from "next/navigation";
import TeamDetail from "./_components/TeamDetail";
import HistoryRequest from "./_components/HistoryRequest";
import { useAppContext } from "../context-provider";

enum TeamsContent {
  Teams,
  TeamDetail,
}

interface TeamDetail {
  page: TeamsContent;
  TeamId?: string;
}

const ChosesPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<TeamDetail>({
    page: TeamsContent.Teams,
    TeamId: undefined,
  });
  const [data, setData] = useState<any | null>(null);
  // const { user } = useAppContext();
  useEffect(() => {
    // console.log(user?.id);
    const fetchTeams = async () => {
      const res = await fetch("http://localhost:5041/api/DAP/GetDAPs");
      const rs = await res.json();
      // console.log(rs);
      setData(rs);
    };
    fetchTeams();
  }, []);

  async function onSubmit(name: string | undefined) {
    setSelectedIndex({
      page: TeamsContent.Teams,
      TeamId: undefined,
    });

    const res = await fetch(
      `http://localhost:5041/api/DAP/Search/search?name=${name}`
    );
    const rs = await res.json();
    setData(rs);
  }

  return (
    <div className="flex flex-row px-4 pb-10">
      <div className="w-fit mr-4">
        <ChosesTeamsForm
          onSubmitFindTeam={onSubmit}
          backButtonHref={() => redirect("ChosesTeams/CreateTeam")}
        />
        <HistoryRequest />
      </div>
      <div className="flex-1">
        <TabGroup
          selectedIndex={selectedIndex.page}
          onChange={(index) => setSelectedIndex({ page: index })}
        >
          <TabList>
            <Tab></Tab>
            <Tab></Tab>
            <button
              className={"text-xl text-white font-medium"}
              onClick={() =>
                setSelectedIndex({
                  page: TeamsContent.Teams,
                  TeamId: undefined,
                })
              }
            >
              {selectedIndex.page === TeamsContent.Teams ? "Teams" : "<- Back"}
            </button>
          </TabList>
          <TabPanels className={"mt-2"}>
            <TabPanel>
              <div className="grid grid-cols-3">
                {data ? (
                  data.map((e: any) => (
                    <CardTeam
                      key={e?.id}
                      onClick={() => {
                        setSelectedIndex({
                          page: TeamsContent.TeamDetail,
                          TeamId: e?.id,
                        });
                      }}
                      className="col-span-1 mb-4"
                      Members={e.usersId.length}
                      follower={e.follower}
                      Name={e.name}
                      Imgurl={e.logoUrl}
                    />
                  ))
                ) : (
                  <p>Loading ...</p>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <TeamDetail id={selectedIndex.TeamId} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ChosesPage;
