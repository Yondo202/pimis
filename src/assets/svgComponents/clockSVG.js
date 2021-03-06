import React from "react";

const ClockSVG = (props) => (
   <svg viewBox="0 0 24 24" {...props}>
      <path
         fill="none"
         stroke="currentColor"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
   </svg>
);

export default ClockSVG;