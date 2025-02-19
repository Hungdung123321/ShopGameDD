import React, { ReactNode } from "react";

interface IEventsLayout {
  children: ReactNode;
}

const EventsLayout = ({ children }: IEventsLayout) => {
  return <div>{children}</div>;
};

export default EventsLayout;
