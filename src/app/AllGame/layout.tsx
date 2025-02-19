"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import AllGamePage from "./page";
import FilterGames from "./_components/filter-games";
import FilterGamesMore from "./_components/filter-games-more";
import { GameFilters } from "@/components/types/game-filter";
import { Rss } from "lucide-react";
import { GameResType } from "../Home/schema/game";

const AllGameLayout = ({ children }: { children: ReactNode }) => {
  const childRef = useRef<HTMLDivElement | null>(null);
  const [parrams, setparrams] = useState<string | null>(null);
  const [filter, setFilter] = useState<GameFilters>({
    genre: [],
    maxPrice: undefined,
    minPrice: undefined,
    orderType: 0,
    releaseYear: [],
    search: "",
    teams: [],
  });

  useEffect(() => {
    const parrams = new URLSearchParams();
    filter.genre?.map((e) => parrams.append("Genres", e));
    filter.releaseYear?.map((e) => parrams.append("ReleaseYear", e.toString()));
    filter.teams?.map((e) => parrams.append("Teams", e));
    parrams.append("Search", filter.search || "");
    parrams.append("OrderType", filter.orderType?.toString() || "");
    parrams.append("MinPrice", filter.minPrice?.toString() || "");
    parrams.append("MaxPrice", filter.maxPrice?.toString() || "");
    // console.log(parrams.toString());
    setparrams(parrams.toString());
  }, [filter]);

  const toggleVisibility = () => {
    if (childRef.current) {
      const isHidden = childRef.current.style.display === "none";
      childRef.current.style.display = isHidden ? "" : "none";
    }
  };

  return (
    <div className="h-full p-6">
      <FilterGames
        defaultOrderValue={filter.orderType?.toString()}
        onChange={(s, o) => {
          setFilter((pre) => ({ ...pre, search: s, orderType: o }));
        }}
        onClickFilter={toggleVisibility}
      />
      <div className="flex flex-row mt-3">
        <FilterGamesMore
          ref={childRef}
          onChange={(e) => {
            setFilter((pre) => ({
              ...e,
              search: pre.search,
              orderType: pre.orderType,
            }));
          }}
        />
        <div className="flex-1 pl-2">
          {parrams ? <AllGamePage parrams={parrams} /> : <div>Loading....</div>}
        </div>
      </div>
    </div>
  );
};

export default AllGameLayout;
