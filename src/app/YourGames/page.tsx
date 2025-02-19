"use client";

import ManageGamesDialog from "@/components/dialogs/ManageGamesDialog";
import {
  DataTable,
  TableToolbalType,
} from "@/components/member-table-component/data-table";
import React, { useEffect, useState } from "react";
import { YourGamesColumn } from "@/components/member-table-component/_components/columnYourGame";
import { useAppContext } from "../context-provider";

const YourGamesPage = () => {
  const [data, setData] = useState<any | null>(null);
  const [reload, setReload] = useState<string | null>(null);
  const { user } = useAppContext();

  const fetchYourgames = async () => {
    if (user) {
      const res = await fetch(
        `http://localhost:5041/api/Game/GetTeamGamesv2/${user?.teamId}`
      );
      const rs = await res.json();
      setData(rs);
    }
  };

  useEffect(() => {
    fetchYourgames();
  }, [user]);

  return (
    <div className="px-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium mb-4">Games</h1>
        <ManageGamesDialog
          onCreateGameHandler={() => {
            fetchYourgames();
          }}
          triggername="Publish Game"
        />
      </div>
      {data ? (
        <DataTable
          TableToolbal={TableToolbalType.YourGame}
          className="w-full"
          data={data}
          columns={YourGamesColumn}
          RowsPerPageData={[2, 5]}
          fetchdata={() => fetchYourgames()}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default YourGamesPage;
