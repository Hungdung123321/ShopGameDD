import { SVGProps } from "react";
const IC_Setting = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path
      stroke="white"
      strokeWidth={2}
      d="M4.415 21.945c-.529-.95-.793-1.426-.793-1.945 0-.519.264-.994.793-1.945l2.97-5.338 3.139-5.242c.558-.933.838-1.4 1.287-1.659.45-.26.993-.268 2.08-.285L20 5.433l6.108.098c1.088.017 1.632.026 2.081.285.45.26.729.726 1.288 1.66l3.138 5.24 2.97 5.34c.529.95.793 1.425.793 1.944 0 .519-.264.994-.793 1.945l-2.97 5.338-3.139 5.242c-.558.933-.838 1.4-1.287 1.659-.45.26-.993.268-2.08.285L20 34.567l-6.108-.098c-1.088-.017-1.632-.026-2.081-.285-.45-.26-.729-.726-1.287-1.66l-3.14-5.24-2.969-5.34Z"
    />
    <circle cx={20} cy={20} r={5} stroke="white" strokeWidth={2} />
  </svg>
);
export default IC_Setting;
