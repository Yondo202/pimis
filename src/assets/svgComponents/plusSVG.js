import React from "react";

const PlusSVG = (props) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={props.strokeWidth ?? 2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
    </svg>
);

export default PlusSVG;