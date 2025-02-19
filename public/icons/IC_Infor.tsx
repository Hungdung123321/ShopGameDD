import { SVGProps } from "react";
const IC_Infor = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <circle cx={20} cy={20} r={15} stroke="white" strokeWidth={2} />
    <path
      fill="white"
      stroke="white"
      d="M20.833 12.5a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0Z"
    />
    <path stroke="white" strokeWidth={2} d="M20 28.333V16.667" />
  </svg>
);
export default IC_Infor;
