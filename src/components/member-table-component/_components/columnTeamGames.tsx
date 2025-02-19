"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import { YourGames } from "../schema";
import { nFormatter, VNvnd } from "@/constants/common";
import { Button } from "@/components/ui/button";
import ManageGamesDialog from "@/components/dialogs/ManageGamesDialog";
import { CreateGameDetail } from "@/lib/validations/Teams";
import { table } from "console";
import { getValueByLabel } from "@/components/Tabs/_components/game-detail";
import { Trash2 } from "lucide-react";
import DialogCustom from "@/components/dialogs/DialogCustom";
import Link from "next/link";
import { useAppContext } from "@/app/context-provider";
import { GameResType } from "@/app/Home/schema/game";
import { useEffect, useState } from "react";

export const columnTeamGames: ColumnDef<YourGames>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      const imgurls = Array.from(
        row.getValue("moreImageUrls") as Array<string>
      );
      imgurls.shift();

      const date = new Date(row.getValue("releasedDate"));

      return (
        <div className="flex space-x-2 items-center">
          <div className="flex items-center">
            <img
              className="rounded-lg"
              width={80}
              height={80}
              src={row.getValue("imageUrl")}
              alt=""
            />
            <span className="ml-2 max-w-[400px] truncate capitalize font-medium">
              <p className="text-white text-base">{row.getValue("name")}</p>
              <div className="flex my-1">
                {imgurls.map((e) => (
                  <img
                    className="mr-2 rounded-md"
                    width={100}
                    height={100}
                    key={e}
                    src={e}
                    alt=""
                  />
                ))}
              </div>
              <div className="flex">
                {Array.from(row.getValue("genres") as Array<string>).map(
                  (e) => (
                    <p className=" mr-1 text-[12px]" key={e}>
                      {e},
                    </p>
                  )
                )}
              </div>
              <p>{date.toString()}</p>
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "genres",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    enableHiding: false,
    filterFn: (row: any, id: any, value: any) => {
      let result = value.some((item1: any) =>
        row?.original[id].some((item2: string | any[]) => item2.includes(item1))
      );
      return result;
    },
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "moreImageUrls",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "releasedDate",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "version",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="version" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 items-center">
          <div>
            <span className="max-w-[200px] truncate capitalize font-medium">
              <p>{row.getValue("version")}</p>
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "features",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="features" />
    ),
    cell: ({ row }) => {
      const features = Array.from(row.getValue("features") as Array<string>);
      return (
        <div className="flex space-x-2 items-center">
          <div>
            <span className=" font-medium">
              {features.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </span>
          </div>
        </div>
      );
    },
    filterFn: (row: any, id: any, value: any) => {
      let result = value.some((item1: any) =>
        row?.original[id].some((item2: string | any[]) => item2.includes(item1))
      );
      return result;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="price" />
    ),
    cell: ({ row }) => {
      const [revenue, setRevenue] = useState<number | null>(null);
      const fetchRevenue = async () => {
        const res = await fetch(
          `http://localhost:5041/api/GamePurchased/GetRevenue/${row.getValue(
            "id"
          )}`
        );
        const rs = await res.json();
        setRevenue(rs?.revenue);
      };
      useEffect(() => {
        fetchRevenue();
      }, [revenue]);

      return (
        <div className="w-[200px] flex-col">
          <p className="text-white font-medium text-base">
            {"Price: " + VNvnd.format(row.getValue("price"))}
          </p>
          <p className="text-green-500 font-medium text-base">
            {revenue && "Revenue: " + VNvnd.format(row.getValue("price"))}
          </p>
        </div>
      );
    },
  },
];
