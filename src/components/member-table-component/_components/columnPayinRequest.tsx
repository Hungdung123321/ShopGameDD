"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ScratchCardResType } from "@/app/Payment/type";
import { formatDate, formatDateTime, VNvnd } from "@/constants/common";
import { Button } from "@/components/ui/button";
import { CircleX, DollarSign } from "lucide-react";
import { PayinResType, PayinType, UserResType } from "@/app/Admin/type";
import { useAppContext } from "@/app/context-provider";

export const PayinRequesColumnt: ColumnDef<PayinResType>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => <div>User</div>,
    cell: ({ row }) => {
      const user = row.getValue("user") as UserResType;
      return (
        <div className="w-[200px] flex space-x-2">
          <img
            className="w-10 h-10"
            src={user.avartarUrl || "https://placehold.co/40x40"}
            alt="asdsa"
          />
          <div>
            <span className="text-white truncate capitalize font-medium">
              {user.name}
            </span>
            <span>
              <p className="italic text-xs">{user.id}</p>
            </span>
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => <div>Value</div>,
    cell: ({ row }) => {
      const payment = row.getValue("payment") as ScratchCardResType;
      // console.log(payment.TelecomName);
      return (
        <div>
          <p className="text-white font-medium text-base">
            {payment.telecomName}
          </p>
          <p>{VNvnd.format(payment.faceValue)}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "seri",
    header: ({ column }) => <div>seri</div>,
    cell: ({ row }) => {
      const payment = row.getValue("payment") as ScratchCardResType;
      // console.log(payment.TelecomName);
      return (
        <div>
          <p className="italic">{payment.seri}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "code",
    header: ({ column }) => <div>code</div>,
    cell: ({ row }) => {
      const payment = row.getValue("payment") as ScratchCardResType;
      // console.log(payment.TelecomName);
      return (
        <div>
          <p className="italic">{payment.code}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <div>status</div>,
    cell: ({ row }) => {
      const payment = row.getValue("payment") as ScratchCardResType;

      const renderStatus = () => {
        switch (payment.status) {
          case "Wating":
            return <p className="text-yellow-400">{payment.status}</p>;
          case "Canceled":
            return <p className="text-red-600">{payment.status}</p>;
          case "Success":
            return <p className="text-green-500">{payment.status}</p>;
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
    cell: ({ row }) => {
      const payment = row.getValue("payment") as ScratchCardResType;
      return (
        <div className="w-[200px]">
          <p>{formatDateTime(payment.time?.toString() as string)}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "action",
    header: ({ column }) => <div></div>,
    cell: ({ row, table }) => {
      const Userrow = row.getValue("user") as UserResType;
      const payment = row.getValue("payment") as ScratchCardResType;
      const { RefreshUser, user } = useAppContext();
      const { fetchdata } = table.options.meta;
      const fetchAcceptPayment = async () => {
        const res = await fetch(
          `http://localhost:5041/api/Payment/AcceptPayment/${Userrow.id}/${payment.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        await fetchdata();
        await RefreshUser(user);
      };

      const fetchCancelPayment = async () => {
        const res = await fetch(
          `http://localhost:5041/api/Payment/setPaymentStatusCanceled/${payment.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        await fetchdata();
      };

      const renderButton = () => {
        switch (payment.status) {
          case "Wating":
            return (
              <div className="flex space-x-3">
                <Button onClick={fetchAcceptPayment} className="bg-green-600">
                  <DollarSign color="white" />
                </Button>
                <Button onClick={fetchCancelPayment} className="bg-red-600">
                  <CircleX color="white" />
                </Button>
              </div>
            );
          case "Canceled":
            return <p className="">Canceled</p>;
          case "Success":
            return <p className="">Accept</p>;
        }
      };

      return <div className="">{renderButton()}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
];
