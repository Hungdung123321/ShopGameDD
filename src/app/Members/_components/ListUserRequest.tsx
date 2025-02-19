"use client";

import { useAppContext } from "@/app/context-provider";
import { UserRequestColumn } from "@/components/member-table-component/_components/columnUserRequest";
import { DataTable } from "@/components/member-table-component/data-table";
import React, { useEffect, useState } from "react";

const ListUserRequest = () => {
  const { user } = useAppContext();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (user) {
      const fetchMember = async () => {
        const res = await fetch(
          `http://localhost:5041/api/DAP/GetUserRequests/${user.teamId}`
        );
        const rs = await res.json();
        setData(rs);
      };
      fetchMember();
    }
  }, [user]);

  return data ? (
    <>
      <p className="text-2xl text-white mb-3">Request to yor team</p>
      <DataTable
        RowsPerPageData={[2]}
        data={data}
        columns={UserRequestColumn}
      />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default ListUserRequest;
