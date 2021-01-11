import React from "react";

const CloseSVG = (props) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export default CloseSVG;