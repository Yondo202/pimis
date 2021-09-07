import React, { useState, useEffect, useContext, useRef } from 'react'
import PerformanceReport from './performanceReport'
import ProtectionReport from './protectionReport'
import axios from 'axiosbase'
import AlertContext from 'components/utilities/alertContext'
import useQuery from 'components/utilities/useQueryLocation'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import PrintSVG from 'assets/svgComponents/printSVG'
import { useReactToPrint } from 'react-to-print'
import FinalCostAttach from './finalCostAttach'

export default function ContractReports() {
   const AlertCtx = useContext(AlertContext)

   const projectId = useQuery().get('projectId')
   const userId = useQuery().get('userId')

   const [contract, setContract] = useState({})
   const [user, setUser] = useState({})

   useEffect(() => {
      if (projectId === null || projectId === undefined) {
         return
      }
      if (userId === null || userId === undefined) {
         return
      }
      axios.get(`users/${userId}`, {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         setUser(res.data.data)

         axios.get(`contracts?projectId=${projectId}`, {
            headers: { Authorization: getLoggedUserToken() }
         }).then(res => {
            const { signers, ...info } = res.data.data
            setContract(info)
         }).catch(err => {
            if (err.response.status === 490) {
               setContract(prev => ({
                  ...prev,
                  register_no: prev.register_no || (user.companyregister ?? null),
                  company_name: prev.company_name || (user.companyname ?? null)
               }))
               return
            }
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Гэрээг татаж чадсангүй.' })
         })
      })
   }, [projectId])

   const componentRef = useRef()

   const handlePrint = useReactToPrint({
      content: () => componentRef.current
   })

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-flex tw-justify-end">
               <button className="tw-mt-2 tw-mr-2 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-transition-shadow tw-font-light" onClick={handlePrint}>
                  <span className="tw-text-sm">Хэвлэх болон хадгалах</span>
                  <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
               </button>
            </div>

            <div className="" ref={componentRef}>
               <FinalCostAttach contract={contract} user={user} />
               <ProtectionReport contract={contract} />
               <PerformanceReport contract={contract} user={user} />
            </div>
         </div>
      </div>
   )
}
