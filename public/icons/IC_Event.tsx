import { SVGProps } from "react";
const IC_Event = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M25.217 2.5H14.783M33.083 9.017l-2.55 2.55M6.917 9.017l2.55 2.55M20 37.5c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15ZM20 14.567v4.6"
    />
    <path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 25.833a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Z"
    />
  </svg>
);
export default IC_Event;
