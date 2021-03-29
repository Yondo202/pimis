import React from "react";

const MinusSVG = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth ?? 2}
      d="M20 12H4"
    />
  </svg>
);

export default MinusSVG;