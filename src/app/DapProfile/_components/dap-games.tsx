import { GameResType } from "@/app/Home/schema/game";
import { columnTeamGames } from "@/components/member-table-component/_components/columnTeamGames";
import {
  DataTable,
  TableToolbalType,
} from "@/components/member-table-component/data-table";
import React, { useEffect, useState } from "react";

const DapGames = ({ dapid }: { dapid?: string }) => {
  const [games, setGames] = useState<GameResType[] | null>(null);
  const fetchAllGames = async () => {
    const res = await fetch(
      `http://localhost:5041/api/Game/GetTeamGames/${dapid}`
    );
    const rs = await res.json();
    setGames(rs);
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  return (
    <div>
      {games && (
        <DataTable
          TableToolbal={TableToolbalType.YourGame}
          className="w-[1000px]"
          data={games}
          columns={columnTeamGames}
          RowsPerPageData={[2, 5]}
          fetchdata={() => fetchAllGames()}
        />
      )}
    </div>
  );
};

export default DapGames;
