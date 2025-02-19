"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ScratchCardResType } from "@/app/Payment/type";
import { formatDate, formatDateTime, VNvnd } from "@/constants/common";

export const ScratchCardColumns: ColumnDef<ScratchCardResType>[] = [
  {
    accessorKey: "telecomName",
    header: ({ column }) => <div>Card</div>,
    cell: ({ row }) => (
      <div>
        <p className="text-white font-medium text-base">
          {row.getValue("telecomName")}
        </p>
        <p>{VNvnd.format(row.getValue("faceValue"))}</p>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "seri",
    header: ({ column }) => <div>seri</div>,
    cell: ({ row }) => (
      <div>
        <p>{row.getValue("seri")}</p>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <div>status</div>,
    cell: ({ row }) => {
      const renderStatus = () => {
        switch (row.getValue("status")) {
          case "Wating":
            return <p className="text-yellow-400">{row.getValue("status")}</p>;
          case "Canceled":
            return <p className="text-red-600">{row.getValue("status")}</p>;
          case "Success":
            return <p className="text-green-500">{row.getValue("status")}</p>;
        }
      };

      return <div>{renderStatus()}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "time",
    header: ({ column }) => <div>Time</div>,
    cell: ({ row }) => (
      <div className="w-[200px]">
        <p>{formatDateTime(row.getValue("time") as string)}</p>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "faceValue",
    header: ({ column }) => <div></div>,
    cell: ({ row }) => <div></div>,
    enableSorting: false,
    enableHiding: true,
  },
];
