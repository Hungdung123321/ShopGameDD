import React from "react";
import IC_Group from "../../../../public/icons/IC_Group";
import { cn } from "@/lib/utils";

const CardTeam = ({
  className,
  onClick,
  Name,
  follower,
  Members,
  Imgurl,
}: {
  className?: string;
  onClick?: () => void;
  Name?: string;
  follower?: number;
  Members?: number;
  Imgurl?: string;
}) => {
  return (
    <div className={cn(className)}>
      <button onClick={onClick} className="w-64 h-full">
        <img
          className="rounded-lg mb-2 "
          width={260}
          height={260}
          src={Imgurl || "https://placehold.co/260x260/6A00F5/white"}
          alt=""
        />
        <p className="text-lg font-medium text-white text-left">
          {Name || "ShopGameDD"}
        </p>
        <p className="flex">
          <IC_Group /> {Members || 0} members . {follower || 0} following
        </p>
      </button>
    </div>
  );
};

export default CardTeam;
