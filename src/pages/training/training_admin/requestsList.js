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

export default function TrainingRequestsList() {
   const [requests, setRequests] = useState([])
   const [sectors, setSectors] = useState([])

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      axios.get('training-requests', {
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

   return (
      <div className="tw-rounded tw-shadow-md tw-bg-white tw-w-full tw-p-2 tw-pb-14" ref={containerRef}>
         <div className="tw-text-center tw-p-2 tw-mt-6 tw-text-lg tw-font-semibold">
            Захиалгат сургалтын хүсэлтүүд
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
