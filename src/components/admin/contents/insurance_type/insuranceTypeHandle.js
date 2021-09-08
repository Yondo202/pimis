import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { DataGrid } from 'devextreme-react'
import { Column, Editing, HeaderFilter, Paging, Scrolling } from 'devextreme-react/data-grid'

export default function InsuranceTypeHandle() {
   const AlertCtx = useContext(AlertContext)

   const [insuranceTypes, setInsuranceTypes] = useState([])

   useEffect(() => {
      axios.get('insurances/insurance-types', {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         setInsuranceTypes(res.data.data)
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Даатгалын бүтээгдэхүүнүүдийг татаж чадсангүй.' })
      })
   }, [])

   const onRowInserted = (e) => {
      axios.post('insurances/insurance-types', e.data, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         setInsuranceTypes(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Даатгалын бүтээгдэхүүнийг хадгаллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Даатгалын бүтээгдэхүүнийг нэмж чадсангүй.' })
         axios.get('insurances/insurance-types').then(res => {
            setInsuranceTypes(res.data.data)
         })
      })
   }

   const onRowUpdated = (e) => {
      axios.put('insurances/insurance-types', e.data, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         setInsuranceTypes(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Даатгалын бүтээгдэхүүнийг өөрчиллөө.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Даатгалын бүтээгдэхүүнийг өөрчилж чадсангүй.' })
         axios.get('currency-rates').then(res => {
            setInsuranceTypes(res.data.data)
         })
      })
   }

   const onRowRemoved = (e) => {
      axios.delete('insurances/insurance-types', {
         headers: { Authorization: getLoggedUserToken() },
         params: { id: e.data.id },
      }).then(res => {
         setInsuranceTypes(res.data.data)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Ханшийн мэдээллийг устгалаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Ханшийн мэдээллийг устгаж чадсангүй.' })
         axios.get('insurances/insurance-types').then(res => {
            setInsuranceTypes(res.data.data)
         })
      })
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-pb-10">
         <div className="tw-p-4 tw-pb-8 tw-bg-white tw-rounded tw-shadow-md tw-max-w-2xl">
            <div className="tw-text-lg tw-font-medium tw-p-2 tw-pt-4 tw-text-center">
               Даатгалын бүтээгдэхүүнүүд тохируулах
            </div>

            <DataGrid
               dataSource={insuranceTypes}
               showBorders={true}
               onRowInserted={onRowInserted}
               onRowUpdated={onRowUpdated}
               onRowRemoved={onRowRemoved}
               rowAlternationEnabled={true}
               showRowLines={true}
               showColumnLines={true}
               columnAutoWidth={true}
            >
               <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
               <Paging defaultPageSize={20} />
               <HeaderFilter visible={true} />
               <Editing
                  mode="row"
                  allowUpdating={true}
                  allowDeleting={true}
                  allowAdding={true}
               />

               <Column caption="Д/д" alignment="right" headerCellRender={HeaderCell} cellRender={cellRenderOrder} />
               <Column dataField="description_mon" caption="Даатгалын бүтээгдэхүүн" alignment="right" headerCellRender={HeaderCell} />
               <Column dataField="description" caption="Даатгалын бүтээгдэхүүн англиар" alignment="right" headerCellRender={HeaderCell} />
            </DataGrid>
         </div>
      </div>
   )
}

const HeaderCell = (data) => (
   <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-sm tw-inline-flex">
      {data.column.caption}
   </div>
)

const cellRenderOrder = (data) => {
   return data.key.id ? `${data.rowIndex + 1}.` : ''
}
