import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import React from 'react'
import { useHistory } from 'react-router-dom'
import UrgudulPreview from './Preview'

export const UrgudulPreviewForUser = () => (
   <div className="tw-pt-8 tw-pb-16">
      <UrgudulPreview />
   </div>
)

export const UrgudulPreviewForAdmin = () => {
   const history = useHistory()

   return (
      <div className="tw-pb-12">
         <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-1 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px tw-mb-6" onClick={() => history.goBack()}>
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
            Буцах
         </button>
         <UrgudulPreview />
      </div>
   )
}
