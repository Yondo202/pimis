import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, HeaderFilter, MasterDetail, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import { useHistory } from 'react-router'
import { HeaderCell } from 'pages/training/training_admin/trainingsList'
import './style.css'

export default function LaboratoriesList({ setModalOpen, setter, refetchToggle }) {
   const AlertCtx = useContext(AlertContext)

   const [laboratories, setLaboratories] = useState([])

   const [labGrouped, setLabGrouped] = useState([])

   useEffect(() => {
      axios.get('laboratories', {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         const labs = res.data.data
         setLaboratories(labs)

         const labGrouped = []
         labs.reduce((acc, cv) => {
            const labId = cv.labId
            if (!acc[labId]) {
               acc[labId] = {
                  labId: labId,
                  lab_name: cv.lab_name,
                  cert_given: 0
               }
               labGrouped.push(acc[labId])
            }
            acc[labId].cert_given += cv.cert_given
            return acc
         }, {})
         setLabGrouped(labGrouped)
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Лабораторуудыг татаж чадсангүй.' })
      })
   }, [refetchToggle])

   const history = useHistory()
   const navAddLab = () => history.push('/laboratories/id')

   const dataGridRef = useRef()

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-rounded tw-shadow-md tw-bg-white tw-w-full tw-p-2 tw-max-w-5xl">
         <div className="tw-text-lg tw-font-medium tw-p-2 tw-text-center tw-mt-4 tw-mb-6">
            Лабораторууд
         </div>

         <DataGrid
            id="laboratories-datagrid"
            dataSource={labGrouped}
            showBorders={true}
            wordWrapEnabled={true}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
            showColumnLines={true}
            loadPanel={{ enabled: true, height: 300, text: 'Уншиж байна' }}
            noDataText="Мэдээлэл байхгүй байна."
            ref={dataGridRef}
         >
            <SearchPanel visible={true} width={240} placeholder="Хайх..." />
            <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
            <Paging defaultPageSize={20} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />
            <HeaderFilter visible={true} />
            <FilterRow visible={true} />

            <Column caption="Д/д" headerCellRender={HeaderCell} cellRender={cellRenderOrder} alignment="left" />
            <Column dataField="lab_name" caption="Лабораторын нэр" headerCellRender={HeaderCell} alignment="left" />
            <Column dataField="cert_given" caption="Чанарын баталгаажуулалт өгсөн тоо" headerCellRender={HeaderCell} alignment="left" />
            <Column caption="Чанарын баталгаажуулалт өгсөн тоог нэмэх" cellRender={data => <ButtonOpenModal data={data} setModalOpen={setModalOpen} setter={setter} dataGridRef={dataGridRef} />} headerCellRender={HeaderCell} alignment="center" />
            <Column caption="Лабораторын мэдээлэл засах" cellRender={data => <ButtonNavLab data={data} />} alignment="center" headerCellRender={HeaderCell} />

            <MasterDetail enabled={true} render={data => <MasterDetailYears labId={data.data.labId} laboratories={laboratories} />} />
         </DataGrid>

         <div className="tw-flex tw-justify-center">
            <button className="tw-py-1.5 tw-px-6 tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-12 tw-mb-6 tw-text-13px" onClick={navAddLab}>
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
   const labId = data.data?.labId
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

const ButtonOpenModal = ({ data, setModalOpen, setter, dataGridRef }) => {
   const handleClick = () => {
      dataGridRef.current?.instance?.collapseAll(-1)
      setModalOpen(true)
      setter(prev => ({
         labId: data.data?.labId,
         lab_name: data.data?.lab_name,
         year: null,
         count: null
      }))
   }

   return (
      <button
         className="tw-rounded-sm tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-px-2 tw-py-1 focus:tw-outline-none"
         onClick={handleClick}
         title="Чанарын баталгаажуулалт өгсөн тоог нэмэх">
         Нэмэх
      </button>
   )
}

function MasterDetailYears({ labId, laboratories }) {
   const [source] = useState(laboratories.filter(lab => lab.labId === labId).sort((a, b) => a.year_given > b.year_given))

   return (
      <DataGrid
         id="master-details-laboratory-years"
         dataSource={source}
         showBorders={true}
         wordWrapEnabled={true}
         columnAutoWidth={true}
         showRowLines={true}
         showColumnLines={true}
         width={320}
      >
         <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
         <Paging defaultPageSize={20} />
         <HeaderFilter visible={true} />

         <Column dataField="year_given" caption="Жил" headerCellRender={HeaderCell} alignment="left" />
         <Column dataField="cert_given" caption="Тоо" headerCellRender={HeaderCell} alignment="left" />
      </DataGrid>
   )
}
