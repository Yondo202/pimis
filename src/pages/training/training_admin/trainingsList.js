import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import AlertContext from 'components/utilities/alertContext'

export default function TrainingList() {
   const [trainings, setTrainings] = useState([])

   useEffect(() => {
      axios.get('trainings', {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         console.log(res)
         setTrainings(res.data.data)
      }).catch(err => {
         console.error(err.response)
      })
   }, [])

   const history = useHistory()
   const handleAddTraining = () => history.push(`/trainings/id`)

   return (
      <div className="tw-absolute tw-rounded tw-shadow-md tw-bg-white tw-w-full tw-p-2">
         <div className="tw-text-center tw-p-2 tw-mt-6 tw-text-lg tw-font-semibold">
            Сургалтууд
         </div>

         <DataGrid
            dataSource={trainings}
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

            <Column dataField="training_name" caption="Сургалтын нэр" headerCellRender={HeaderCell} />
            <Column dataField="module_file.name" caption="Сургалтын агуулга, файлаар" cellRender={data => <ButtonFliePreview data={data} />} headerCellRender={HeaderCell} width={160} />
            <Column dataField="training_type" caption="Сургалтын төрөл" headerCellRender={HeaderCell} />
            <Column dataField="training_method" caption="Сургалтын хэлбэр" headerCellRender={HeaderCell} />
            <Column dataField="start_date" caption="Сургалт эхлэх өдөр" headerCellRender={HeaderCell} />
            <Column dataField="end_date" caption="Сургалт дуусах өдөр" headerCellRender={HeaderCell} />
            <Column dataField="start_time" caption="Сургалтын цаг" headerCellRender={HeaderCell} />
            <Column dataField="organizer" caption="Сургалт зохион байгуулах байгууллага" headerCellRender={HeaderCell} />
            <Column dataField="location" caption="Байршил, сургалт зохион байгуулагдах хаяг" headerCellRender={HeaderCell} />
            <Column dataField="participant_number" caption="Оролцогчдын тоо" cellRender={data => <ButtonNavRegisteredUsers data={data} />} alignment="center" headerCellRender={HeaderCell} />
            <Column dataField="scope" caption="Сургалтын цар хүрээ" headerCellRender={HeaderCell} />
            <Column caption="Сургалтын мэдээллийг засварлах" cellRender={data => <ButtonNavTraining data={data} />} alignment="center" headerCellRender={HeaderCell} />
         </DataGrid>

         <div className="tw-flex tw-justify-center">
            <button className="tw-py-1.5 tw-px-6 tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-12 tw-mb-6" onClick={handleAddTraining}>
               Сургалт нэмэх
            </button>
         </div>
      </div>
   )
}

export const HeaderCell = (data) => (
   <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-13px">
      {data.column.caption}
   </div>
)

const ButtonNavTraining = ({ data }) => {
   const trainingId = data.data?.id
   const history = useHistory()
   const handleClick = () => {
      if (trainingId !== null && trainingId !== undefined) {
         history.push(`/trainings/id/${data.data.id}`)
      }
   }
   return (
      <button
         className="tw-rounded-sm tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-px-2 tw-py-1 focus:tw-outline-none"
         onClick={handleClick}
         title="Сургалтын мэдээллийг засах">
         Засах
      </button>
   )
}

const ButtonFliePreview = ({ data }) => {
   const module_file = data.data?.module_file
   const FilePreviewCtx = useContext(FilePreviewContext)
   const AlertCtx = useContext(AlertContext)
   const handleDownloadFile = () => {
      axios.get(`attach-files/${module_file?.id}`, {
         headers: { Authorization: getLoggedUserToken() },
         responseType: 'blob',
      }).then(res => {
         console.log(res)
         const URL = window.URL.createObjectURL(res.data)
         FilePreviewCtx.setFile({ open: true, src: URL })
      }).catch(err => {
         console.log(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг татахад алдаа гарлаа.' })
      })
   }
   return (
      <button
         className="tw-rounded-sm tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-px-2 tw-py-1 focus:tw-outline-none tw-truncate"
         style={{ width: 138 }}
         onClick={handleDownloadFile}
         title={module_file?.name}>
         {module_file?.name}
      </button>
   )
}

const ButtonNavRegisteredUsers = ({ data }) => {
   const training = data.data
   const history = useHistory()
   const handleClick = () => history.push({
      pathname: '/trainings/registered-users',
      search: new URLSearchParams({
         trainingId: training?.id,
         trainingName: training?.training_name,
      }).toString()
   })
   return (
      <button
         className="tw-rounded-sm tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-px-2 tw-py-1 focus:tw-outline-none"
         onClick={handleClick}
         title="Бүртгүүлсэн хэрэглэгчдийг харах">
         {training?.registeredUserCount} / {training?.participant_number}
      </button>
   )
}
