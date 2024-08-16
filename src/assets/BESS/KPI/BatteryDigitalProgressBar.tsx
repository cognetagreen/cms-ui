import * as React from "react";

interface BatteryDigitalProgressBarProps {
    title : string;
    value : string;
}

const BatteryDigitalProgressBar : React.FC<BatteryDigitalProgressBarProps> = ({title, value}) => (
  <svg
    width={345}
    height={206}
    viewBox="0 0 315 186"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={315} height={186} rx={4} fill="url(#a)" />
    <rect x={40} y={102} width={230} height={40} rx={4} fill="#686B83" />
    <rect x={40} y={96} width={169} height={52} rx={4} fill="url(#b)" />
    <rect x={40} y={102} width={169} height={40} rx={4} fill="url(#c)" />
    <path
      stroke="#fff"
      d="M45.5 102v40m5-40v40m4-40v40m5-40v40m5-40v40m5-40v40m5-40v40m5-40v40m4-40v40m5-40v40m5-40v40m5-40v40m5-40v40m5-40v40m4-40v40m5-40v40m5-40v40m5-40v40m5-40v40m5-40v40m4-40v40m5-40v40m5-40v40m5-40v40m5-40v40m4-40v40m5-40v40m5-40v40m4-40v40m0-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4-40v40m4"
    />
    <text x={15} y={25} fill="#FBFDFF">
      {title}
    </text>
    <text x={130} y={70} fontSize="27px" fontWeight={600} fill="#40EFDF">
      {value}
    </text>
    <defs>
      <linearGradient
        id="a"
        x1={0}
        y1={0}
        x2={284}
        y2={186}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#001C3C" />
        <stop offset={1} stopColor="#023976" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={40}
        y1={96}
        x2={40}
        y2={150.6}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1EDBB7" stopOpacity={0.1} />
        <stop offset={0.545} stopColor="#10C0D6" />
        <stop offset={1} stopColor="#02A3F8" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="c"
        x1={40}
        y1={85.2}
        x2={40}
        y2={142}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#29F39A" />
        <stop offset={1} stopColor="#03A5F5" />
      </linearGradient>
    </defs>
  </svg>
);
export default BatteryDigitalProgressBar;
