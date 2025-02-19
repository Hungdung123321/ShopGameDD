import { User } from "lucide-react";
import React from "react";

const StatsCard = ({
  vaule,
  label,
  icon,
}: {
  vaule?: Number;
  label?: string;
  icon?: () => void;
}) => {
  return (
    <div className="w-[250px] h-fit text-white bg-foreground p-3 rounded-md border border-white/50">
      <div className="flex items-center justify-between">
        <p className="font-medium">{label || "StatsCard"}</p>
        {icon?.() || <p></p>}
      </div>
      <p className="text-white text-2xl font-medium">
        +{vaule?.toString() || ""}
      </p>
    </div>
  );
};

export default StatsCard;
