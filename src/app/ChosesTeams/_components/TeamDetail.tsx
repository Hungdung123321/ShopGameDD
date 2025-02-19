"use client";

import React, { useEffect, useState } from "react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { nFormatter } from "@/constants/common";
import TeamDetailFooter from "./TeamDetailFooter";

const TeamDetail = ({ id }: { id?: string }) => {
  const [Team, setTeam] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTeams = async () => {
        const res = await fetch(`http://localhost:5041/api/DAP/GetDAP/${id}`);
        const rs = await res.json();
        setTeam(rs);
      };
      fetchTeams();
    }
  }, []);

  const onApply = () => {};

  return (
    <div className={"p-2"}>
      {Team ? (
        <div>
          {/* <Link href={""}></Link> */}
          <div className="w-full flex justify-around bg-foreground text-base rounded-lg py-2">
            <div className="w-fit text-center">
              <p className="">Members</p>
              <p className="text-white font-medium text-2xl">
                {Team?.usersId.length}
              </p>
            </div>
            <div className="w-fit text-center">
              <p className="">Team</p>
              <p className="text-white font-medium text-2xl">{Team?.name}</p>
            </div>
            <div className="w-fit text-center">
              <p className="">Total Revenue</p>
              <p className="text-white font-medium text-2xl">
                {nFormatter(Team?.totalRevenue, 1) + " đ"}
              </p>
            </div>
          </div>
          <div className="flex">
            <MinimalTiptapEditor
              className="w-full border-none"
              editorContentClassName="p-5"
              output="json"
              placeholder="Type your description here..."
              autofocus={false}
              editable={false}
              editorClassName="focus:outline-none"
              content={JSON.parse(Team?.aboutContent)}
              isToobar={false}
            />
          </div>
          <TeamDetailFooter teamid={Team?.id} />
        </div>
      ) : (
        <p>Please wait.....</p>
      )}
    </div>
  );
};

export default TeamDetail;
