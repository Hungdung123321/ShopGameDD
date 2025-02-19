import React, { useEffect, useState } from "react";
import { FilterGameMutiple } from "./filter-games-mutiple";
import { NameTeamRes } from "@/lib/validations/Teams";

const FilterGameMutipleDev = ({
  onChange,
}: {
  onChange?: (values: string[]) => void;
}) => {
  const [team, setTeam] = useState<any | null>(null);

  useEffect(() => {
    const fetchDev = async () => {
      const res = await fetch("http://localhost:5041/api/DAP/GetDAPs");
      const rs = (await res.json()) as NameTeamRes[];
      const options = rs.map((e) => {
        return { value: e.id, label: e.name };
      });
      setTeam(options);
    };
    fetchDev();
  }, [setTeam]);

  return (
    <div>
      {team && (
        <FilterGameMutiple
          onChange={(e) => {
            onChange?.(e);
          }}
          title={"Developers"}
          options={team}
        />
      )}
    </div>
  );
};

export default FilterGameMutipleDev;
