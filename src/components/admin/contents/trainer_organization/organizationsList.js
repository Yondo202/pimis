import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import { DataGrid } from 'devextreme-react'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router'
import AlertContext from 'components/utilities/alertContext'
import { Column, FilterRow, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import { HeaderCell } from 'pages/training/training_admin/trainingsList'

export default function TrainerOrganizationsList() {
   const [organizations, setOrganizations] = useState([])

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      axios.get('trainings/organizations', {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         setOrganizations(res.data.data)
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сургалтын байгууллагуудыг татаж чадсангүй.' })
      })
   }, [])

   const history = useHistory()
   const handleAddOrg = () => history.push('/trainer-organizations/id')

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-rounded tw-shadow-md tw-bg-white tw-w-full tw-p-2">
         <div className="tw-text-lg tw-font-medium tw-p-2 tw-text-center tw-mt-4 tw-mb-6">
            Сургалт зохион байгуулагч байгууллагууд
         </div>

         <DataGrid
            dataSource={organizations}
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

            <Column dataField="organization_name" caption="Байгууллагын нэр" headerCellRender={HeaderCell} />
            <Column dataField="registration_number" caption="Улсын бүртгэлийн дугаар" headerCellRender={HeaderCell} />
            <Column dataField="createdAt" dataType="date" caption="Үүсгэсэн огноо" headerCellRender={HeaderCell} />
            <Column caption="Байгуулагын мэдээллийг засварлах" cellRender={data => <ButtonNavOrg data={data} />} alignment="center" headerCellRender={HeaderCell} />
         </DataGrid>

         <div className="tw-flex tw-justify-center">
            <button className="tw-py-2 tw-px-6 tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-12 tw-mb-6 tw-text-13px" onClick={handleAddOrg}>
               Сургалтын байгууллага нэмэх
            </button>
         </div>
      </div>
   )
}

const ButtonNavOrg = ({ data }) => {
   const trainingId = data.data?.id
   const history = useHistory()
   const handleClick = () => {
      if (trainingId !== null && trainingId !== undefined) {
         history.push(`/trainer-organizations/id/${data.data.id}`)
      }
   }
   return (
      <button
         className="tw-rounded-sm tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-px-2 tw-py-1 focus:tw-outline-none"
         onClick={handleClick}
         title="Байгууллагын мэдээллийг засах">
         Засах
      </button>
   )
}
