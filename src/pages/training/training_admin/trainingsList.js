import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router'
import FilePreviewContext from 'components/utilities/filePreviewContext'
import AlertContext from 'components/utilities/alertContext'
import FilterSVG from 'assets/svgComponents/filterSVG'
import ResetSVG from 'assets/svgComponents/resetSVG'
import { Transition, animated } from 'react-spring/renderprops'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'

export default function TrainingsList() {
   const [trainings, setTrainings] = useState([])
   const [userRole, setUserRole] = useState(localStorage.getItem('role'))
   const [trainerOrgId, setTrainerOrgId] = useState(+localStorage.getItem('trainerOrganizationId'))

   useEffect(() => {
      axios.get('trainings', {
         headers: { Authorization: getLoggedUserToken() },
         params: userRole === 'trainer' && { organizationId: trainerOrgId },
      }).then(res => {
         setTrainings(res.data.data)
      })
   }, [])

   const history = useHistory()
   const handleAddTraining = () => history.push(`/trainings/id`)

   const [params, setParams] = useState({
      status: 'all',
      startDate: null,
      endDate: null,
   })

   const handleInputParams = (key, value) => setParams(prev => ({ ...prev, [key]: value }))

   const handleResetDates = () => setParams(prev => ({ ...prev, startDate: null, endDate: null }))

   const AlertCtx = useContext(AlertContext)

   const handleApplyFilter = () => {
      axios.get('trainings', {
         headers: { Authorization: getLoggedUserToken() },
         params: params,
      }).then(res => {
         setTrainings(res.data.data)
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сургалтын мэдээллийг татаж чадсангүй.' })
      })
   }

   return (
      <div className="tw-absolute tw-rounded tw-shadow-md tw-bg-white tw-w-full tw-p-2 tw-text-gray-700 tw-text-sm">
         <div className="tw-text-center tw-p-2 tw-mt-6 tw-text-lg tw-font-medium">
            Сургалтууд
         </div>

         <div className="tw-mt-4 tw-text-13px">
            <div className="tw-pl-2">
               <span className="tw-font-medium tw-mr-2">Төлөв:</span>
               <DropdownButton refObj={refObjStatus} value={params.status} fn={handleInputParams} buttonWidth={136} />
            </div>
            <div className="tw-flex tw-items-center tw-mt-2 tw-pl-1.5">
               <span className="tw-font-medium tw-mr-2">Хугацаа:</span>
               <div className="tw-relative tw-p-0.5">
                  <input className="tw-border tw-border-gray-400 tw-rounded tw-w-full tw-p-1 focus:tw-ring-1 tw-ring-blue-500 focus:tw-outline-none" style={{ width: 136 }} type="date" value={params.startDate ?? ''} onChange={e => handleInputParams('startDate', e.target.value)} />
                  {!params.startDate &&
                     <span className="tw-absolute tw-left-1 tw-bg-white tw-py-0.5 tw-pl-2 tw-pr-1 tw-text-gray-500" style={{ width: 102, top: 5 }}>Эхлэх хугацаа:</span>
                  }
               </div>
               <div className="tw-relative tw-p-0.5 tw-ml-2">
                  <input className="tw-border tw-border-gray-400 tw-rounded tw-w-full tw-p-1 focus:tw-ring-1 tw-ring-blue-500 focus:tw-outline-none" style={{ width: 136 }} type="date" value={params.endDate ?? ''} onChange={e => handleInputParams('endDate', e.target.value)} />
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
            <Column dataField="start_date" dataType="date" caption="Эхлэх өдөр" headerCellRender={HeaderCell} />
            <Column dataField="end_date" dataType="date" caption="Дуусах өдөр" headerCellRender={HeaderCell} />
            <Column dataField="start_time" caption="Сургалтын цаг" calculateCellValue={calculateCellValueTime} headerCellRender={HeaderCell} />
            <Column dataField="trainerOrganization.organization_name" caption="Сургалт зохион байгуулагч" headerCellRender={HeaderCell} />
            <Column dataField="location" caption="Байршил хаяг" headerCellRender={HeaderCell} />
            <Column dataField="participant_number" caption="Оролцогчдын тоо" cellRender={data => <ButtonNavRegisteredUsers data={data} />} alignment="center" headerCellRender={HeaderCell} />
            <Column dataField="scope" caption="Сургалтын цар хүрээ" headerCellRender={HeaderCell} />
            <Column caption="Сургалтын мэдээллийг засварлах" cellRender={data => <ButtonNavTraining data={data} />} alignment="center" headerCellRender={HeaderCell} />
         </DataGrid>

         <div className="tw-flex tw-justify-center">
            <button className="tw-py-2 tw-px-6 tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-8 tw-mb-6 tw-text-13px" onClick={handleAddTraining}>
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
         history.push(`/trainings/id/${trainingId}`)
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
         const URL = window.URL.createObjectURL(res.data)
         FilePreviewCtx.setFile({ open: true, src: URL })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Файлыг татаж чадсангүй.' })
      })
   }
   return module_file?.name
      ? <button
         className="tw-rounded-sm tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-px-2 tw-py-1 focus:tw-outline-none tw-truncate"
         style={{ width: 138 }}
         onClick={handleDownloadFile}
         title={module_file?.name}
      >
         {module_file?.name}
      </button>
      : null
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

const calculateCellValueTime = (rowData) => `${rowData?.start_time?.slice(0, 5)} - ${rowData?.end_time?.slice(0, 5)}`

const DropdownButton = ({ refObj, value, fn, buttonWidth }) => {
   const [open, setOpen] = useState(false)

   const buttonRef = useRef()
   const dropdownRef = useRef()

   const handleClickOutside = (e) => {
      if (!buttonRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target)) {
         setOpen(false)
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   })

   const handleSelect = (value) => {
      fn('status', value)
      setOpen(false)
   }

   return (
      <div className="tw-relative tw-inline-flex">
         <button className="tw-flex tw-items-center tw-pl-3 tw-pr-1 tw-rounded tw-border tw-border-gray-400 focus:tw-outline-none focus:tw-ring-1 tw-ring-blue-500" style={{ paddingTop: 5, paddingBottom: 5, width: buttonWidth ?? 'auto' }} onClick={() => setOpen(prev => !prev)} ref={buttonRef}>
            {refObj[value]}
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-flex-shrink-0 tw-ml-auto tw-text-gray-500" />
         </button>

         <Transition
            items={open}
            from={{ height: 0, opacity: 0 }}
            enter={{ height: 'auto', opacity: 1 }}
            leave={{ height: 0, opacity: 0 }}
            config={{ tension: 300, clamp: true }}>
            {item => item && (anims =>
               <animated.div className="tw-overflow-hidden tw-absolute tw-top-8 tw-left-0 tw-bg-white tw-z-10 tw-border tw-border-gray-400 tw-rounded tw-w-full tw-divide-y tw-divide-dashed" style={anims} ref={dropdownRef}>
                  {Object.keys(refObj).map(key =>
                     <div className="tw-cursor-pointer tw-px-2 tw-py-1.5 hover:tw-bg-gray-500 hover:tw-text-white tw-transition-colors" onClick={() => handleSelect(key)} key={key}>
                        {refObj[key]}
                     </div>
                  )}
               </animated.div>
            )}
         </Transition>
      </div>
   )
}

const refObjStatus = {
   all: 'Бүгд',
   active: 'Идэвхитэй',
   inactive: 'Идэвхигүй',
}
