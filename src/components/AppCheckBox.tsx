"use client";

import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import IC_Close from "../../public/icons/IC_Close";

const AppCheckBox = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <Checkbox
      checked={enabled}
      onChange={setEnabled}
      className="group block size-4 rounded bg-background data-[checked]:bg-blue-500"
    >
      <svg
        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Checkbox>
  );
};

export default AppCheckBox;
