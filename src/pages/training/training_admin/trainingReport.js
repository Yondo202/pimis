import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'

export default function TrainingsReport() {
   const [state, setState] = useState([])

   useEffect(() => {
      axios.get('', {

      }).then(res => {

      }).catch(err => {

      })
   }, [])

   return (
      <div className="tw-text-gray-700 tw-text-sm">
         Сургалтын тайлан
      </div>
   )
}
