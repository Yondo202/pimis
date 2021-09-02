import React, { useState, useEffect, useContext } from 'react'
import PerformanceReport from './performanceReport'
import ProtectionReport from './protectionReport'
import axios from 'axiosbase'
import AlertContext from 'components/utilities/alertContext'
import useQuery from 'components/utilities/useQueryLocation'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'

export default function ContractReports() {
   const AlertCtx = useContext(AlertContext)

   const projectId = useQuery().get('projectId')

   const [contract, setContract] = useState({})

   useEffect(() => {
      if (projectId === null || projectId === undefined) {
         return
      }
      axios.get(`contracts?projectId=${projectId}`, {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         const { signers, ...info } = res.data.data
         setContract(info)
      }).catch(err => {
         if (err.response.status === 490) {
            setContract(prev => ({
               ...prev,
               company_name: localStorage.getItem('companyname')
            }))
            return
         }
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Гэрээг татаж чадсангүй.' })
      })
   }, [projectId])

   return (
      <div className="">
         <ProtectionReport contract={contract} />
         <PerformanceReport contract={contract} />
      </div>
   )
}
