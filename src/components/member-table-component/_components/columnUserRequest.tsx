"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import { UserRqToTeam } from "../schema";
import { cn } from "@/lib/utils";
import { SpellCheck, Trash2 } from "lucide-react";
import { Button } from "@headlessui/react";
import DialogCustom from "@/components/dialogs/DialogCustom";
import { useAppContext } from "@/app/context-provider";
import { useState } from "react";

export const UserRequestColumn: ColumnDef<UserRqToTeam>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 items-center">
          <img
            className="w-10 h-10 rounded-md"
            src={row.getValue("avartarUrl") || "https://placehold.co/40x40"}
            alt="asdsa"
          />
          <div>
            <span className="max-w-[500px] truncate capitalize font-medium">
              {row.getValue("name")}
            </span>
          </div>
        </div>
      );
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
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "isInTeam",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { user } = useAppContext();
      const [isAccept, setAccept] = useState<boolean>(false);
      const [isRemoved, setIsRemoved] = useState<boolean>(false);

      const onAccept = async () => {
        if (user) {
          const res = await fetch(
            `http://localhost:5041/api/DAP/AddUserToTeam/${
              user.teamId
            }/${row.getValue("id")}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const rs = await res.json();
          setAccept(true);
          // console.log(rs?.message);
        }
      };

      const onRemoved = async () => {
        if (user) {
          const res = await fetch(
            `http://localhost:5041/api/DAP/RemoveUserToTeam/${
              user.teamId
            }/${row.getValue("id")}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const rs = await res.json();
          setIsRemoved(true);
          // console.log(rs?.message);
        }
      };

      const renderButton = () => {
        return (
          <>
            {!row.getValue("isInTeam") ? (
              <DialogCustom
                classNameTrigger={"p-2 rounded-lg bg-green-500 mr-2"}
                TriggerContent={() => <SpellCheck color="white" />}
                FooterContent={() => (
                  <Button
                    type="button"
                    className="bg-white text-black px-2 rounded-lg"
                    onClick={onAccept}
                  >
                    Accept
                  </Button>
                )}
              />
            ) : (
              <Button className="p-2 rounded-lg bg-gray-400 text-white mr-2 text-xs">
                Already Other Team
              </Button>
            )}
            <DialogCustom
              classNameTrigger={"p-2 rounded-lg bg-red-600"}
              TriggerContent={() => <Trash2 color="white" />}
              FooterContent={() => (
                <Button
                  type="button"
                  className="bg-red-600 text-white px-2 rounded-lg"
                  onClick={onRemoved}
                >
                  Removed
                </Button>
              )}
            />
          </>
        );
      };
      return (
        <div className="flex w-[100px]">
          {isRemoved || isAccept ? (
            <div>{isRemoved ? "Removed" : "Accepted"}</div>
          ) : (
            renderButton()
          )}
        </div>
      );
    },
  },
];
