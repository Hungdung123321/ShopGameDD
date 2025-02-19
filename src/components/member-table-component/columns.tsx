"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Member } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { cn } from "@/lib/utils";
import { DataTableRowActions } from "./data-table-row-actions";

export const MemberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <div></div>,
    cell: ({ row }) => <div></div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <img
            className="w-10 h-10"
            src={row.getValue("avartarUrl") || "https://placehold.co/40x40"}
            alt="asdsa"
          />
          <div>
            <span className="max-w-[500px] truncate capitalize font-medium">
              {row.getValue("name")}
            </span>
            <span>
              {row.getValue("isleader") ? (
                <p className="italic text-sm text-yellow-400">Leader</p>
              ) : (
                <p className="italic text-sm text-green-500">Member</p>
              )}
              <p className="text-white text-xs">{row.getValue("id")}</p>
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "wallet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="wallet" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[50px] items-center pr-4">
          <span className={cn("capitalize")}> {row.getValue("wallet")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "gmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[50px] items-center">
          <span className={cn("text-white")}> {row.getValue("gmail")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "avartarUrl",
    header: ({ column }) => <div></div>,
    cell: ({ row }) => {
      return <div></div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "userRole",
    header: ({ column }) => <div></div>,
    cell: ({ row }) => {
      return <div></div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "isleader",
    header: ({ column }) => <div></div>,
    cell: ({ row }) => {
      return <div></div>;
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
