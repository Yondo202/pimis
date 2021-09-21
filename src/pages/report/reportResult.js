import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'

export default function ReportResult() {
   const [exportDataGrowth, setExportDataGrowth] = useState({})

   useEffect(() => {
      axios.get('/reports/export-data-growth', {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         setExportDataGrowth(res.data.data)
      })
   }, [])

   return (
      <div className="">
         {Object.keys(exportDataGrowth).map((key, i) =>
            <div className="">
               {key} - exportDataGrowth[key]
            </div>
         )}
      </div>
   )
}
