import * as React from "react";
import { SVGProps } from "react";
const IC_GameType = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <rect width={2} height={2} x={13} y={14} fill="white" rx={1} />
    <rect width={2} height={6} x={7} y={11} fill="white" rx={1} />
    <rect
      width={2}
      height={6}
      x={11}
      y={13}
      fill="white"
      rx={1}
      transform="rotate(90 11 13)"
    />
    <rect width={2} height={2} x={16} y={12} fill="white" rx={1} />
    <path
      stroke="white"
      strokeLinecap="round"
      strokeWidth={2}
      d="M14 8v0c0-.417 0-.625-.034-.809a2 2 0 0 0-1.13-1.446c-.17-.078-.372-.129-.776-.23L12 5.5c-.461-.115-.692-.173-.883-.267a2 2 0 0 1-1.072-1.373C10 3.652 10 3.414 10 2.938V2"
    />
    <path
      stroke="white"
      strokeWidth={2}
      d="M3 14c0-2.559 0-3.838.62-4.72.16-.226.346-.43.554-.604C4.982 8 6.154 8 8.5 8h7c2.346 0 3.518 0 4.326.676.208.174.395.378.554.604.62.882.62 2.161.62 4.72 0 2.559 0 3.838-.62 4.72a3.15 3.15 0 0 1-.554.604C19.018 20 17.846 20 15.5 20h-7c-2.346 0-3.518 0-4.326-.676a3.15 3.15 0 0 1-.554-.604C3 17.838 3 16.559 3 14Z"
    />
  </svg>
);
export default IC_GameType;
