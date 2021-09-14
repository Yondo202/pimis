import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import { useHistory } from 'react-router'
import { HeaderCell } from 'pages/training/training_admin/trainingsList'

export default function LaboratoriesList() {
   const AlertCtx = useContext(AlertContext)

   const [laboratories, setLaboratories] = useState([])

   useEffect(() => {
      axios.get('laboratories', {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         setLaboratories(res.data.data)
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Лабораторуудыг татаж чадсангүй.' })
      })
   }, [])

   const history = useHistory()
   const handleAddLab = () => history.push('/laboratories/id')

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-rounded tw-shadow-md tw-bg-white tw-w-full tw-p-2 tw-max-w-5xl">
         <div className="tw-text-lg tw-font-medium tw-p-2 tw-text-center tw-mt-4 tw-mb-6">
            Лабораторууд
         </div>

         <DataGrid
            dataSource={laboratories}
            showBorders={true}
            wordWrapEnabled={true}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
            showColumnLines={true}
            loadPanel={{ enabled: true, height: 300, text: 'Уншиж байна' }}
            noDataText="Мэдээлэл байхгүй байна."
         >
            <SearchPanel visible={true} width={240} placeholder="Хайх..." />
            <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
            <Paging defaultPageSize={20} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />
            <HeaderFilter visible={true} />
            <FilterRow visible={true} />

            <Column caption="Д/д" headerCellRender={HeaderCell} cellRender={cellRenderOrder} alignment="left" />
            <Column dataField="lab_name" caption="Лабораторын нэр" headerCellRender={HeaderCell} alignment="left" />
            <Column dataField="cert_given" caption="Чанарын гэрчилгээ өгсөн тоо" headerCellRender={HeaderCell} alignment="left" />
            <Column caption="Лабораторын мэдээлэл засварлах" cellRender={data => <ButtonNavLab data={data} />} alignment="center" headerCellRender={HeaderCell} />
         </DataGrid>

         <div className="tw-flex tw-justify-center">
            <button className="tw-py-1.5 tw-px-6 tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-12 tw-mb-6 tw-text-13px" onClick={handleAddLab}>
               Лаборатор нэмэх
            </button>
         </div>
      </div>
   )
}

const cellRenderOrder = (data) => {
   return `${data.rowIndex + 1}.`
}

const ButtonNavLab = ({ data }) => {
   const labId = data.data?.id
   const history = useHistory()
   const handleClick = () => {
      if (labId !== null && labId !== undefined) {
         history.push(`/laboratories/id/${labId}`)
      }
   }
   return (
      <button
         className="tw-rounded-sm tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-px-2 tw-py-1 focus:tw-outline-none"
         onClick={handleClick}
         title="Лабораторын мэдээлэл засах">
         Засах
      </button>
   )
}
