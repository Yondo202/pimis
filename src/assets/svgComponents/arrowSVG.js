import React from "react";

const ArrowSVG = (props) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
    </svg>
);

export default ArrowSVG;