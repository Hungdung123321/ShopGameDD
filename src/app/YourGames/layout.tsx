import React, { ReactNode } from "react";

interface IYourGameLayout {
  children: ReactNode;
}

const YourGameLayout = ({ children }: IYourGameLayout) => {
  return <div>{children}</div>;
};

export default YourGameLayout;
