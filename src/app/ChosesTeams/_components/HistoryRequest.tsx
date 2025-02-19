"use client";

import { useAppContext } from "@/app/context-provider";
import { Button } from "@headlessui/react";
import React, { useEffect, useState } from "react";

const HistoryRequest = () => {
  const [data, setData] = useState<any | null>(null);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);
  const { user } = useAppContext();

  useEffect(() => {
    setIsCanceled(false);
    if (user) {
      const fetchTeams = async () => {
        const res = await fetch(
          `http://localhost:5041/api/User/GetUser/${user.id}`
        );
        const rs = await res.json();
        setData(rs.requstToTeam);
      };
      fetchTeams();
    }
  });

  const onCancel = (item: any) => {
    const fecthCanelItem = async () => {
      const res = await fetch(
        `http://localhost:5041/api/User/RemoveRequsetToteam`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            teamId: item?.id,
          }),
        }
      );
      const rs = await res.json();
      setIsCanceled(true);
    };
    fecthCanelItem();
  };

  const renderItem = () => {
    return data.map((e: any) => {
      return (
        <div key={e?.id} className="flex items-center mb-6">
          <img
            className="rounded-lg mb-2 "
            width={80}
            height={80}
            src={e?.logoUrl || "https://placehold.co/80x80/6A00F5/white"}
            alt=""
          />
          <div className="ml-2 h-full flex flex-col justify-between">
            <p className="text-white text-xl">{e?.name}</p>
            <p className="italic">{isCanceled ? "Canceled" : "Wating....."}</p>
            <div className="mt-2">
              {isCanceled ? (
                <div></div>
              ) : (
                <>
                  <Button
                    className={"bg-red-600 w-20 h-10 text-white p-2 rounded-lg"}
                    onClick={() => onCancel(e)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={
                      "bg-foreground w-20 h-10 ml-2 text-white p-2 rounded-lg"
                    }
                  >
                    View
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full mt-4">
      <p className="text-white font-medium text-xl mb-8">Wating Team Aplly:</p>
      {data ? renderItem() : <div></div>}
    </div>
  );
};

export default HistoryRequest;
