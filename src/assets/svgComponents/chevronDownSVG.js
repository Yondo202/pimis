import React from "react";

const ChevronDownSVG = (props) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
        />
    </svg>
);

export default ChevronDownSVG;