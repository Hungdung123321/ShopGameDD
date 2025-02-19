"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import ScratchCardForm from "./_components/ScratchCardForm";
import { CreditCard } from "lucide-react";
import {
  DataTable,
  TableToolbalType,
} from "@/components/member-table-component/data-table";
import historypay from "./_components/historypay.json";
import { ScratchCardColumns } from "@/components/member-table-component/_components/columnHistoryPayment";
import { ScratchCardResType } from "./type";
import { useAppContext } from "../context-provider";

const PaymentPage = () => {
  const [Payments, setPayments] = useState<ScratchCardResType[] | null>(null);
  const { user } = useAppContext();

  const fetchPayments = async () => {
    if (user) {
      const res = await fetch(
        `http://localhost:5041/api/Payment/GetPaymentByUserId/${user.id}`
      );
      const rs = await res.json();
      setPayments(rs);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user]);

  return (
    <div className="flex items-start space-x-5 p-3">
      <TabGroup className={"flex-1 bg-foreground p-3"}>
        <TabList>
          <Tab className={"py-2 px-4 bg-background"}>
            <div className="text-center flex items-center">
              <div>
                <div className="flex">
                  <CreditCard className="ml-4" color="white" />
                  <p className="text-white text-center font-semibold ml-2">
                    Card
                  </p>
                </div>
                <p>scratch card top up</p>
              </div>
            </div>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className={"bg-background"}>
            <ScratchCardForm onSubmitHandler={fetchPayments} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <div className="w-1/3">
        <p className="text-white font-semibold text-xl">History pay</p>
        <DataTable
          RowsPerPageData={[5]}
          data={Payments || []}
          TableToolbal={TableToolbalType.None}
          columns={ScratchCardColumns}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
