import { SVGProps } from "react";
const IC_Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="white"
      fillRule="evenodd"
      d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-12a5 5 0 0 0-5 5 1 1 0 1 0 2 0 3 3 0 0 1 3-3 1 1 0 1 0 0-2Z"
      clipRule="evenodd"
    />
    <path stroke="white" strokeLinecap="round" strokeWidth={2} d="m20 20-2-2" />
  </svg>
);
export default IC_Search;
