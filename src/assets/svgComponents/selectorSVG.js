import React from "react";

const SelectorSVG = (props) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
        />
    </svg>
);

export default SelectorSVG;