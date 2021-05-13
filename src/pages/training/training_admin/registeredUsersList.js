import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import { DataGrid, TabPanel } from 'devextreme-react'
import { useQuery } from 'components/utilities/useQueryLocation'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { Column, FilterRow, HeaderFilter, MasterDetail, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { useHistory } from 'react-router'
import { HeaderCell } from './trainingsList'
import FileCard from 'pages/attachments/fileCard'
import { Item } from 'devextreme-react/tab-panel'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import './style.css'

export default function TrainingRegisteredUsersList() {
   const [registeredUsers, setRegisteredUsers] = useState([])
   const [sectors, setSectors] = useState([])

   const query = useQuery()
   const trainingId = query.get('trainingId')
   const trainingName = query.get('trainingName')

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      if (trainingId !== undefined && trainingId !== null) {
         axios.get('training-registrations', {
            headers: { Authorization: getLoggedUserToken() },
            params: { trainingId: trainingId },
         }).then(res => {
            console.log(res)
            setRegisteredUsers(res.data.data)
         }).catch(err => {
            console.error(err)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Бүртгүүлсэн хэрэглэгчдийг татаж чадсангүй.' })
         })
      } else {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Бүртгүүлсэн хэрэглэгчдийг харах сургалтаа сонгоно уу.' })
      }

      axios.get('business-sector').then(res => {
         console.log(res.data)
         setSectors(res.data.data)
      })
   }, [])

   const history = useHistory()

   const calculateCellSector = (rowdata) => {
      const sectorId = rowdata.business_sectorId
      return sectors.find(sector => sector.id === sectorId)?.bdescription_mon
   }

   return (
      <div className="tw-absolute tw-w-full tw-text-gray-700 tw-text-sm">
         <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px" onClick={() => history.push('/trainings')}>
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
            Буцах
         </button>

         <div className="tw-rounded tw-shadow-md tw-bg-white tw-w-full tw-p-2 tw-mt-6 tw-pb-14">
            <div className="tw-text-center tw-p-2 tw-mt-6 tw-text-lg tw-font-semibold">
               <span className="tw-italic tw-mr-2">"{trainingName}"</span>
               cургалтанд бүртгүүлсэн хэрэглэгчид
            </div>

            <DataGrid
               id="registred-users-datagrid"
               dataSource={registeredUsers}
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
               <Paging defaultPageSize={40} />
               <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />
               <HeaderFilter visible={true} />
               <FilterRow visible={true} />

               <Column dataField="fullname" caption="Овог нэр" headerCellRender={HeaderCell} minWidth={160} />
               <Column dataField="gender" caption="Хүйс" headerCellRender={HeaderCell} />
               <Column dataField="register_number" caption="Регистрийн дугаар" headerCellRender={HeaderCell} />
               <Column dataField="phone" caption="Утасны дугаар" headerCellRender={HeaderCell} />
               <Column dataField="email" caption="Имэйл хаяг" headerCellRender={HeaderCell} />
               <Column dataField="company_name" caption="Байгууллагын нэр" headerCellRender={HeaderCell} />
               <Column dataField="employee_position" caption="Одоогийн ажлын албан тушаал" headerCellRender={HeaderCell} minWidth={160} />
               <Column dataField="business_sectorId" caption="Үйл ажиллагаа явуулдаг салбар" calculateCellValue={calculateCellSector} headerCellRender={HeaderCell} minWidth={240} />
               <Column dataField="annual_sales" caption="Жилийн борлуулалтын тоо хэмжээ" headerCellRender={HeaderCell} />

               <MasterDetail enabled={true} component={MasterDetails} />
            </DataGrid>
         </div>
      </div>
   )
}

const MasterDetails = ({ data }) => {
   const registeredUser = data.data

   return (
      <TabPanel>
         <Item title="Сургаалтын өгөөж ба хүлээлт" render={() => <RenderRichText html={registeredUser.training_benefit} />} />
         <Item title="Байгууллагын танилцуулга" render={() => <RenderRichText html={registeredUser.company_introduction} />} />
         <Item title="Хавсаргасан файлууд" render={() => <RenderAttachedFiles introFile={registeredUser.company_introduction_file} reqFile={registeredUser.company_request_file} regFile={registeredUser.register_file} />} />
      </TabPanel>
   )
}

export const RenderRichText = ({ html }) => (
   <div className="tw-px-2 tw-pt-3 tw-pb-5 tw-text-gray-700">
      {html
         ? <div className="tw-p-2 tw-rounded tw-shadow-inner tw-border tw-border-gray-300" style={{ minHeight: 128, maxWidth: 726 }} dangerouslySetInnerHTML={{ __html: html }} />
         : <div className="tw-rounded tw-bg-gray-200 tw-text-gray-600 tw-italic tw-p-2 tw-font-medium tw-my-8" style={{ maxWidth: 726 }}>
            Бичвэр оруулаагүй байна.
         </div>
      }
   </div>
)

const RenderAttachedFiles = ({ introFile, reqFile, regFile }) => (
   <div className="tw-flex tw-flex-wrap tw-px-2 tw-py-2 tw-text-gray-700">
      <FileCardContainer label="Байгууллагын танилцуулга" file={introFile} />
      <FileCardContainer label="Байгууллагын хүсэлт" file={reqFile} />
      <FileCardContainer label="Иргэний үнэмлэхний хуулбар" file={regFile} />
   </div>
)

const FileCardContainer = ({ label, file }) => {
   const FilePreviewCtx = useContext(FilePreviewContext)
   const AlertCtx = useContext(AlertContext)
   const handleDownloadFile = (id) => {
      axios.get(`attach-files/${id}`, {
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
      <div className="tw-flex tw-flex-col tw-mr-6 tw-mb-4">
         <span className="tw-font-medium tw-mb-3">
            {label}
         </span>
         {file
            ? <FileCard name={file?.name} type={file?.mimetype} size={file?.size} downloadFile={() => handleDownloadFile(file?.id)} />
            : <div className="tw-rounded tw-bg-gray-200 tw-text-gray-600 tw-italic tw-p-2 tw-font-medium">
               Файл хавсаргаагүй байна.
            </div>
         }
      </div>
   )
}
