import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AppDatePicker = ({
  onChangeDate,
  initDate,
}: {
  onChangeDate?: (date: Date | null) => void;
  initDate?: Date;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <DatePicker
      className="mt-3"
      selected={initDate || startDate}
      onChange={(date) => {
        setStartDate(date);
        console.log(date?.toDateString());
        onChangeDate?.(date);
      }}
    />
  );
};

export default AppDatePicker;
