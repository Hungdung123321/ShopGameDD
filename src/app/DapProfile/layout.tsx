"use client";

import React, { ReactNode, useEffect, useState } from "react";
import DapProfilePage from "./page";
import { useSearchParams } from "next/navigation";
import { DapProfileResType } from "./type";

interface IDapProfileLayout {
  children: ReactNode;
}
const DapProfileLayout = ({}: IDapProfileLayout) => {
  const searchParams = useSearchParams();
  const dapid = searchParams.get("dapid");
  const [dap, setDap] = useState<DapProfileResType>();

  const fetchDap = async () => {
    const res = await fetch(`http://localhost:5041/api/DAP/GetDAP/${dapid}`);
    const rs = await res.json();
    setDap(rs);
  };

  useEffect(() => {
    fetchDap();
  }, []);

  return <div className="p-4">{dap && <DapProfilePage dap={dap} />}</div>;
};

export default DapProfileLayout;
