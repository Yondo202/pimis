import React from 'react'

export default function RowLabel({ label, style }) {
   return <div className="tw-border-t tw-border-b tw-border-gray-400 tw-px-2 tw-pt-1.5 tw-pb-1" style={style}>
      {label}
   </div>
}
