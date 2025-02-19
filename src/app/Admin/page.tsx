"use client";

import React, { useEffect, useState } from "react";
import StatsCard from "./_components/StatsCard";
import { User } from "lucide-react";
import { AllUserResType } from "./type";
import {
  DataTable,
  TableToolbalType,
} from "@/components/member-table-component/data-table";
import { AllUserColumns } from "@/components/member-table-component/_components/columnAllUsers";
import { Button } from "@/components/ui/button";
import DialogPaymentRequest from "./_components/dialog-payment-request";

const AdminPage = ({}: {}) => {
  const [data, setData] = useState<AllUserResType | null>();

  const fechAllUserAStats = async () => {
    const res = await fetch("http://localhost:5041/api/User/GetUsersAndStats");
    const rs = await res.json();
    setData(rs);
  };
  useEffect(() => {
    fechAllUserAStats();
  }, []);

  return (
    <div>
      {data && (
        <div className="p-5">
          <div className="w-fit mx-auto">
            <div className="flex space-x-4">
              <StatsCard
                icon={() => <User />}
                label={"Users"}
                vaule={data.usersCount}
              />
              <StatsCard
                icon={() => <User />}
                label={"Developer and Publisher"}
                vaule={data.dapCount}
              />
              <StatsCard
                icon={() => <User />}
                label={"Admin"}
                vaule={data.adminCount}
              />
              <StatsCard
                icon={() => <User />}
                label={"Games"}
                vaule={data.gamesCount}
              />
            </div>
            <div className="mt-3 float-right">
              <DialogPaymentRequest />
            </div>
            <DataTable
              RowsPerPageData={[5, 10]}
              data={data.users}
              columns={AllUserColumns}
              className="mt-8"
              TableToolbal={TableToolbalType.AllUser}
              fetchdata={fechAllUserAStats}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
