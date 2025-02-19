"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import { UserResType } from "@/app/Admin/type";
import { VNvnd } from "@/constants/common";
import { useEffect, useState } from "react";
import { DapProfileResType } from "@/app/DapProfile/type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export const AllUserColumns: ColumnDef<UserResType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("userRole") as string;
      const renderUserRole = () => {
        switch (role) {
          case "LEADER":
            return <p className="italic text-sm text-yellow-400">Leader</p>;
          case "MEMBER":
            return <p className="italic text-sm text-green-500">Member</p>;
          case "USER":
            return <p className="italic text-sm text-white">User</p>;
          case "ADMIN":
            return <p className="italic text-sm text-red-600">Admin</p>;
        }
      };

      return (
        <div className="w-fit flex space-x-2">
          <img
            className="w-10 h-10"
            src={row.getValue("avartarUrl") || "https://placehold.co/40x40"}
            alt="asdsa"
          />
          <div>
            <span className="text-white truncate capitalize font-medium">
              {row.getValue("name")}
            </span>
            <span>
              {/* <p>{role + ""}</p> */}
              <div>{renderUserRole()}</div>
              <p className="italic text-xs">{row.getValue("id")}</p>
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "teamId",
    header: ({ column }) => <div className="text-center">Team</div>,
    cell: ({ row }) => {
      const teamid = row.getValue("teamId");
      const [team, setTeam] = useState<DapProfileResType | null>(null);
      useEffect(() => {
        if (teamid) {
          const fetchTeam = async () => {
            const res = await fetch(
              `http://localhost:5041/api/DAP/GetDAPImgAndName/${teamid}`
            );
            const rs = await res.json();
            setTeam(rs);
          };
          fetchTeam();
        }
      }, []);

      return (
        <div>
          {team && row.getValue("isInTeam") ? (
            <Link
              href={{
                pathname: "/DapProfile",
                query: { dapid: team.id },
              }}
            >
              <img
                className="w-10 h-10 mx-auto rounded-md"
                src={team.logoUrl}
                alt=""
              />
              <p className="text-white text-center">{team.name}</p>
            </Link>
          ) : (
            <div className="text-center">{"Not In Team"}</div>
          )}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "gmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className={cn("text-white")}> {row.getValue("gmail")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "Revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => {
      const teamid = row.getValue("teamId");
      const [team, setTeam] = useState<DapProfileResType | null>(null);
      useEffect(() => {
        if (teamid) {
          const fetchTeam = async () => {
            const res = await fetch(
              `http://localhost:5041/api/DAP/GetDAPImgAndName/${teamid}`
            );
            const rs = await res.json();
            setTeam(rs);
          };
          fetchTeam();
        }
      }, []);

      return (
        <div>
          {team ? (
            <p className="text-center text-white text-base">
              {VNvnd.format(team.totalRevenue)}
            </p>
          ) : (
            <div className="text-center">{"Not In Team"}</div>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    accessorKey: "isInTeam",
    header: ({ column }) => <div></div>,
    cell: ({ row }) => {
      return <div></div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <div></div>,
    cell: ({ row }) => <div></div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "isBlock",
    header: ({ column }) => <div>Is Block</div>,
    cell: ({ row }) => {
      const isblock = row.getValue("isBlock") as string;
      return (
        <div>
          <p>{isblock.toString()}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const fetchSetAdmin = async () => {
        const res = await fetch(
          `http://localhost:5041/api/User/AssignAdminTiUser/${row.getValue(
            "id"
          )}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      };

      const fetchSetDev = async () => {
        const res = await fetch(
          `http://localhost:5041/api/User/AssigniDevToUser/${row.getValue(
            "id"
          )}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      };

      const fetchSetUser = async () => {
        const res = await fetch(
          `http://localhost:5041/api/User/AssigniUserToUser/${row.getValue(
            "id"
          )}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      };

      const fetchSetUserBlock = async () => {
        const res = await fetch(
          `http://localhost:5041/api/User/setBlockUser/${row.getValue("id")}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await fetchdata();
        table.getColumn("id")?.setFilterValue(row.getValue("id"));
      };

      const fetchSetUserUnBlock = async () => {
        const res = await fetch(
          `http://localhost:5041/api/User/setUnBlockUser/${row.getValue("id")}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await fetchdata();
        table.getColumn("id")?.setFilterValue(row.getValue("id"));
      };

      const { fetchdata } = table.options.meta;

      return (
        <div className="flex space-x-4">
          {!row.getValue("isBlock") ? (
            <Button
              onClick={fetchSetUserBlock}
              className="text-white bg-red-600"
            >
              Block
            </Button>
          ) : (
            <Button
              onClick={fetchSetUserUnBlock}
              className="text-white bg-foreground"
            >
              Un Block
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2">
              <DropdownMenuItem>
                <Button
                  onClick={async () => {
                    await fetchSetAdmin();
                    await fetchdata();
                    table.getColumn("id")?.setFilterValue(row.getValue("id"));
                  }}
                  className="text-white w-full bg-red-600"
                >
                  Assgin To Admin
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  onClick={async () => {
                    await fetchSetDev();
                    await fetchdata();
                    table.getColumn("id")?.setFilterValue(row.getValue("id"));
                  }}
                  className="text-white w-full bg-green-600"
                >
                  Assgin To Developer
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  onClick={async () => {
                    await fetchSetUser();
                    await fetchdata();
                    table.getColumn("id")?.setFilterValue(row.getValue("id"));
                  }}
                  className="text-white w-full bg-gray-500"
                >
                  Assgin To User
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
