import React, { useState } from "react";
import CurrencyInput, {
  CurrencyInputOnChangeValues,
  CurrencyInputProps,
} from "react-currency-input-field";

const Currency_Input = (
  props: {
    onCurrencyChange?: (values: CurrencyInputOnChangeValues) => void;
  } & CurrencyInputProps
) => {
  const { onCurrencyChange, onKeyDown, prefix, ...rest } = props;
  const limit = 10000000;
  const handleOnValueChange: CurrencyInputProps["onValueChange"] = (
    _value,
    name,
    _values
  ) => {
    onCurrencyChange?.(_values || { float: 0, formatted: "đ0", value: "0" });
  };

  return (
    <CurrencyInput
      {...rest}
      onValueChange={handleOnValueChange}
      allowDecimals={true}
      prefix={"đ"}
      step={10}
    />
  );
};

export default Currency_Input;
