import React from "react";

const MinusCircleSVG = (props) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            stroke="#fafafa"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);

export default MinusCircleSVG;