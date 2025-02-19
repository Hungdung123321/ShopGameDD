import { ScratchCardResType } from "@/app/Payment/type";
import { ScratchCardColumns } from "@/components/member-table-component/_components/columnHistoryPayment";
import { PayinRequesColumnt } from "@/components/member-table-component/_components/columnPayinRequest";
import {
  DataTable,
  TableToolbalType,
} from "@/components/member-table-component/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { PayinResType } from "../type";

const DialogPaymentRequest = () => {
  const [Payments, setPayments] = useState<PayinResType[] | null>(null);
  // const { user } = useAppContext();

  const fetchPayments = async () => {
    const res = await fetch(
      `http://localhost:5041/api/Payment/GetAllPayinRequest`
    );
    const rs = await res.json();
    setPayments(rs);
  };

  useEffect(() => {
    fetchPayments();
  }, [setPayments]);

  return (
    <Dialog>
      <DialogTrigger className="text-white font-medium p-2 rounded-lg bg-foreground">
        Pay in request
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">List Pay in request</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          {Payments && (
            <DataTable
              className="w-fit"
              RowsPerPageData={[5]}
              data={Payments || []}
              TableToolbal={TableToolbalType.None}
              columns={PayinRequesColumnt}
              fetchdata={fetchPayments}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPaymentRequest;
