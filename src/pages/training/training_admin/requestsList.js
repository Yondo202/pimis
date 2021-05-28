import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { DataGrid, TabPanel } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter, MasterDetail, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import { HeaderCell } from './trainingsList'
import { Item } from 'devextreme-react/tab-panel'
import { RenderRichText } from './registeredUsersList'
import './style.css'
import ResetSVG from 'assets/svgComponents/resetSVG'
import FilterSVG from 'assets/svgComponents/filterSVG'

export default function TrainingRequestsList() {
   const [requests, setRequests] = useState([])
   const [sectors, setSectors] = useState([])

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      axios.get('trainings/requests', {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         console.log(res)
         setRequests(res.data.data)
      }).catch(err => {
         console.log(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Захиалгат сургалтын хүсэлтүүдийг татаж чадсангүй.' })
      })

      axios.get('business-sector').then(res => {
         console.log(res.data)
         setSectors(res.data.data)
      })
   }, [])

   const calculateCellSector = (rowdata) => {
      const sectorId = rowdata.business_sectorId
      return sectors.find(sector => sector.id === sectorId)?.bdescription_mon
   }

   const containerRef = useRef()

   const [width, setWidth] = useState()

   useEffect(() => {
      const handleResize = () => {
         setWidth(containerRef.current?.clientWidth)
         console.log(containerRef.current?.clientWidth)
      }
      if (width === undefined) handleResize()
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
   }, [])

   const [params, setParams] = useState({
      startDate: null,
      endDate: null,
   })

   const handleInputParams = (key, value) => setParams(prev => ({ ...prev, [key]: value }))

   const handleResetDates = () => setParams(prev => ({ ...prev, startDate: null, endDate: null }))

   const handleApplyFilter = () => {
      axios.get('trainings/requests', {
         headers: { Authorization: getLoggedUserToken() },
         params: params,
      }).then(res => {
         console.log(res)
         setRequests(res.data.data)
      }).catch(err => {
         console.error(err.response)
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Мэдээллийг татаж чадсангүй.' })
      })
   }

   return (
      <div className="tw-rounded tw-shadow-md tw-bg-white tw-w-full tw-p-2 tw-pb-14 tw-text-gray-700 tw-text-sm" ref={containerRef}>
         <div className="tw-text-center tw-p-2 tw-mt-6 tw-text-lg tw-font-medium">
            Захиалгат сургалтын хүсэлтүүд
         </div>

         <div className="tw-mt-4 tw-text-13px">
            <div className="tw-flex tw-items-center tw-mt-2 tw-pl-1.5">
               <span className="tw-font-medium tw-mr-2">Илгээсэн хугацаа:</span>
               <div className="tw-relative tw-p-0.5">
                  <input className="tw-border tw-border-gray-400 tw-rounded tw-w-full tw-p-1 focus:tw-ring-1 tw-ring-blue-500 focus:tw-outline-none" style={{ width: 136 }} type="date" value={params.startDate} onChange={e => handleInputParams('startDate', e.target.value)} />
                  {!params.startDate &&
                     <span className="tw-absolute tw-left-1 tw-bg-white tw-py-0.5 tw-pl-2 tw-pr-1 tw-text-gray-500" style={{ width: 102, top: 5 }}>Эхлэх хугацаа:</span>
                  }
               </div>
               <div className="tw-relative tw-p-0.5 tw-ml-3">
                  <input className="tw-border tw-border-gray-400 tw-rounded tw-w-full tw-p-1 focus:tw-ring-1 tw-ring-blue-500 focus:tw-outline-none" style={{ width: 136 }} type="date" value={params.endDate} onChange={e => handleInputParams('endDate', e.target.value)} />
                  {!params.endDate &&
                     <span className="tw-absolute tw-left-1 tw-bg-white tw-py-0.5 tw-pl-2 tw-pr-1 tw-text-gray-500" style={{ top: 5 }}>Дуусах хугацаа:</span>
                  }
               </div>
               <button className="tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-ml-2 tw-rounded tw-p-1 tw-flex tw-items-center focus:tw-outline-none" onClick={handleResetDates}>
                  <ResetSVG className="tw-w-4 tw-h-4" />
               </button>
            </div>
            <div className="tw-mt-2 tw-pl-2">
               <button className="tw-flex tw-items-center tw-px-3 tw-py-1 tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white focus:tw-outline-none tw-rounded" onClick={handleApplyFilter}>
                  <span className="">Шүүх</span>
                  <FilterSVG className="tw-w-4 tw-h-4 tw-ml-1" />
               </button>
            </div>
         </div>

         <DataGrid
            id="training-requests-datagrid"
            dataSource={requests}
            showBorders={true}
            wordWrapEnabled={true}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
            showColumnLines={true}
            loadPanel={{ enabled: true, height: 300, text: 'Уншиж байна' }}
            noDataText="Мэдээлэл байхгүй байна."
            width={width && width - 25}
         >
            <SearchPanel visible={true} width={240} placeholder="Хайх..." />
            <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
            <Paging defaultPageSize={40} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />
            <HeaderFilter visible={true} />
            <FilterRow visible={true} />

            <Column dataField="fullname" caption="Овог нэр" headerCellRender={HeaderCell} minWidth={160} />
            <Column dataField="employee_position" caption="Ажлын байрны албан тушаал" headerCellRender={HeaderCell} minWidth={160} />
            <Column dataField="registration_number" caption="Регистрийн дугаар" headerCellRender={HeaderCell} />
            <Column dataField="phone" caption="Утасны дугаар" headerCellRender={HeaderCell} />
            <Column dataField="company_email" caption="Имэйл хаяг" headerCellRender={HeaderCell} />
            <Column dataField="business_sectorId" caption="Харьялагдах салбар" calculateCellValue={calculateCellSector} headerCellRender={HeaderCell} minWidth={240} />
            <Column dataField="company_registration_number" caption="Улсын бүртгэлийн дугаар" headerCellRender={HeaderCell} />
            <Column dataField="participant_number" caption="Сургалтад хамрагдах ажилчдын тоо" headerCellRender={HeaderCell} minWidth={100} />
            <Column dataField="createdAt" dataType="date" caption="Ирүүлсэн хугацаа" headerCellRender={HeaderCell} />

            <MasterDetail enabled={true} component={MasterDetails} />
         </DataGrid>
      </div>
   )
}

const MasterDetails = ({ data }) => (
   <TabPanel>
      <Item title="Хуулийн этгээдийн товч тахилцуулга" render={() => <RenderRichText html={data.data.company_introduction} />} />
      <Item title="Сургалтын чиглэл, хэрэгцээ шаардлага" render={() => <RenderRichText html={data.data.training_request} />} />
      <Item title="Сургалтын үр өгөөж" render={() => <RenderRichText html={data.data.training_benefit} />} />
   </TabPanel>
)
