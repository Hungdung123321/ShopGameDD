import * as React from "react";
import { SVGProps } from "react";
const IC_DAP = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="white" d="M4 12h6v2h4v-2h6v6H4v-6Z" />
    <path
      fill="white"
      d="M11 11h2v2h-2v-2ZM15 8V6H9v2H4v3h6v-1h4v1h6V8h-5Zm-5 0V7h4v1h-4Z"
    />
  </svg>
);
export default IC_DAP;
