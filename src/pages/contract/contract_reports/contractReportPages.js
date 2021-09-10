import React from 'react'
import { useHistory } from 'react-router'
import ContractReports from './contractReports'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'

export function ContractReportsForUser() {
   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <ContractReports />
      </div>
   )
}

export function ContractReportsForAdmin() {
   const history = useHistory()

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pb-20">
         <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px tw-mb-6" onClick={() => history.goBack()}>
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
            Буцах
         </button>
         <ContractReports />
      </div>
   )
}
