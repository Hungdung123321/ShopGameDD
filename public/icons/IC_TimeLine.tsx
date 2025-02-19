import { SVGProps } from "react";
const IC_TimeLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="white"
      d="M12 6.72c0-.248 0-.373.057-.475a.483.483 0 0 1 .223-.198c.108-.044.218-.03.438-.004A6 6 0 1 1 7.2 15.6c-.133-.177-.2-.266-.215-.381a.483.483 0 0 1 .06-.293c.06-.1.167-.162.382-.286l4.213-2.432c.131-.076.197-.114.244-.167a.451.451 0 0 0 .094-.162c.022-.067.022-.143.022-.295V6.72Z"
    />
    <circle cx={12} cy={12} r={8.5} stroke="white" />
  </svg>
);
export default IC_TimeLine;
