"use client";

import { useAppContext } from "@/app/context-provider";
import { MemberColumns } from "@/components/member-table-component/columns";
import { DataTable } from "@/components/member-table-component/data-table";
import React, { useEffect, useState } from "react";

const ListMember = () => {
  const { user } = useAppContext();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (user) {
      const fetchMember = async () => {
        const res = await fetch(
          `http://localhost:5041/api/DAP/GetMembers/${user.teamId}`
        );
        const rs = await res.json();
        setData(rs);
      };
      fetchMember();
    }
  });

  return data ? (
    <>
      <p className="text-2xl text-white mb-3">Members</p>
      <DataTable data={data} columns={MemberColumns} />
    </>
  ) : (
    <div></div>
  );
};

export default ListMember;
