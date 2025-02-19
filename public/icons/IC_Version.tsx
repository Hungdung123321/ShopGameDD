import { SVGProps } from "react";
const IC_Version = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m10.222 14.489-.711 7.11 9.245-9.955L13.778 8.8l.71-6.4-9.244 9.955 4.978 2.134Z"
    />
  </svg>
);
export default IC_Version;
