"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import { OrderResType } from "./type";
import { useAppContext } from "../context-provider";
import { VNvnd } from "@/constants/common";
import BillGame from "./_components/bill-game";

const HistoryPage = () => {
  const [orders, setOrder] = useState<OrderResType[] | null>(null);
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const fetchTeam = await fetch(
          `http://localhost:5041/api/Order/GetUseOrders/${user.id}`
        );
        const rs = await fetchTeam.json();
        setOrder(rs);
      };
      fetchData();
    }
  }, [user]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const renderOrders = () => {
    if (orders) {
      if (orders.length === 0) {
        return <p className="text-center">None Orders</p>;
      }
      return (
        <Accordion className="" type="single" collapsible>
          {orders.map((e) => {
            return (
              <AccordionItem key={e.id} value={e.id}>
                <AccordionTrigger>
                  <p className="italic">
                    Purchased At: {formatDate(e.datePurchased.toString())}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <BillGame gameids={e.gameids} />
                  <p className="text-2xl font-medium text-white text-right py-4">
                    Total: {VNvnd.format(e.totalMoney)}
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      );
    }
  };

  return (
    <div>
      <div className="m-auto w-10/12">{renderOrders()}</div>
    </div>
  );
};

export default HistoryPage;
