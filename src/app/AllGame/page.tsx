"use client";
import React from "react";
import ListGame from "./_components/ListGame";
import { GameResType } from "../Home/schema/game";

const AllGamePage = ({ parrams }: { parrams?: string }) => {
  return (
    <div className="h-screen">
      <ListGame parrams={parrams} />
    </div>
  );
};

export default AllGamePage;
