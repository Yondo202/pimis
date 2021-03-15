import React, { useContext, useEffect, useRef, useState } from 'react'
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import EditDropdown from './editDropdown'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import './dataGrid.css'
import PreviewModal from './previewModal'
import { loadMessages } from 'devextreme/localization'
import EvaluatorsModal from './evaluatorsModal'


loadMessages({
    "en": {
        "dxDataGrid-filterRowOperationContains": "Агуулсан",
        "dxDataGrid-filterRowOperationNotContains": "Агуулаагүй",
        "dxDataGrid-filterRowOperationStartsWith": "Эхэлсэн",
        "dxDataGrid-filterRowOperationEndsWith": "Төгссөн",
        "dxDataGrid-filterRowOperationEquals": "Тэнцүү",
        "dxDataGrid-filterRowOperationNotEquals": "Тэнцэхгүй",
        "dxDataGrid-filterRowResetOperationText": "Хайх",
        "dxDataGrid-trueText": "Тийм",
        "dxDataGrid-falseText": "Үгүй",
        "dxList-selectAll": "Бүгдийг сонгох",
        "dxDataGrid-headerFilterOK": "Хэрэгжүүлэх",
        "dxDataGrid-headerFilterCancel": "Болих",
        "dxDiagram-dialogButtonOK": "Хэрэгжүүлэх",
        "dxDiagram-dialogButtonCancel": "Болих",
        "dxDataGrid-headerFilterEmptyValue": "(Хоосон)",
        "dxDataGrid-filterRowShowAllText": "(Бүгд)",
        "dxCalendar-todayButtonText": "Өнөөдөр",
    }
})

export default function ProjectHandle() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('pps-infos/registered-companies', {
            headers: { 'Authorization': getLoggedUserToken() }
        }).then(res => {
            console.log(res.data)
            setData(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })

        axios.get('users', {
            headers: { Authorization: getLoggedUserToken() },
            params: { role: 'member' }
        }).then(res => {
            console.log(res.data)
            setMembers(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }, [])

    const containerRef = useRef()

    const [width, setWidth] = useState()

    useEffect(() => {
        const handleResize = () => {
            setWidth(containerRef.current?.clientWidth)
        }
        if (width === undefined) handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [containerRef])

    const UrgudulCtx = useContext(UrgudulContext)
    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleEditProject = (id) => {
        axios.get(`projects/${id}`, {
            headers: { 'Authorization': getLoggedUserToken() }
        }).then(res => {
            console.log(res.data)
            UrgudulCtx.setData(res.data.data)
            history.push('/urgudul/1')
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Маягтын мэдээллийг уншиж чадсангүй.' })
        })
    }

    const [previewModal, setPreviewModal] = useState({
        open: false,
        id: '',
    })

    const [evaluatorsModal, setEvaluatorsModal] = useState({
        open: false,
        project: {},
    })

    const [members, setMembers] = useState([])

    return (
        <div className="tw-text-sm tw-text-gray-700">
            <div className="tw-p-2 tw-mt-2 tw-text-lg tw-font-medium tw-text-center">
                Дэмжлэг хүссэн өргөдлийн маягтууд
            </div>

            <div className="tw-px-3 tw-pt-2 tw-pb-6 tw-mt-4 tw-shadow-inner tw-bg-white tw-flex tw-w-full tw-rounded-md" ref={containerRef}>
                <DataGrid
                    elementAttr={{ id: 'registered-companies-data-grid' }}
                    dataSource={data}
                    showBorders={true}
                    wordWrapEnabled={true}
                    rowAlternationEnabled={true}
                    columnAutoWidth={true}
                    width={width && `${width - 25}px`}
                    showRowLines={true}
                    showColumnLines={true}
                    loadPanel={{ enabled: true, height: 300, text: 'Уншиж байна' }}
                >
                    <SearchPanel visible={true} width={240} placeholder="Хайх..." />
                    <Scrolling mode="virtual" columnRenderingMode="virtual" showScrollbar="always" />
                    <Paging defaultPageSize={20} />
                    <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />
                    <HeaderFilter visible={true} />
                    <FilterRow visible={true} />

                    <Column caption="Үйлдэл" cellRender={data => <EditDropdown data={data} handleEditProject={handleEditProject} setPreviewModal={setPreviewModal} setEvaluatorsModal={setEvaluatorsModal} />} headerCellRender={HeaderCell} width={134} />
                    <Column dataField="companyname" caption="ААН нэр" headerCellRender={HeaderCell} />
                    <Column dataField="companyregister" caption="ААН регистерийн дугаар" headerCellRender={HeaderCell} />
                    <Column dataField="criteria" caption="Байгаль орчны шалгуур хангалт" headerCellRender={HeaderCell} />
                    <Column dataField="esq" caption="Байгаль орчны үнэлгээ" headerCellRender={HeaderCell} />
                    <Column dataField="esm" caption="Байгаль орчны үнэлгээ" headerCellRender={HeaderCell} />
                    <Column dataField="letterOfInterst" caption="Сонирхол илэрхийлэх албан тоот" headerCellRender={HeaderCell} />

                    <Column caption="Өргөдлийн маягт" headerCellRender={HeaderCellMultiHeader}>
                        <Column dataField="project.project_type_name" caption="Төслийн төрөл" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_name" caption="Төслийн нэр" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_number" caption="Төслийн дугаар" headerCellRender={HeaderCell} />
                        <Column dataField="project.confirmed" caption="Баталгаажсан эсэх" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_start" caption="Эхлэх хугацаа" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_end" caption="Дуусах хугацаа" headerCellRender={HeaderCell} />
                    </Column>

                    <Column dataField="evidence" caption="Нотлох бичиг баримтууд" headerCellRender={HeaderCell} />
                    <Column dataField="edpPlan" caption="Экспорт хөгжлийн төлөвлөгөө" headerCellRender={HeaderCell} />
                    <Column dataField="firstEvalution.description" caption="Анхан шатны үнэлгээ" headerCellRender={HeaderCell} />
                    <Column dataField="lastEvalution.description" caption="Бизнес шинжээчийн үнэлгээ" headerCellRender={HeaderCell} />
                </DataGrid>
            </div>

            <PreviewModal previewModal={previewModal} setPreviewModal={setPreviewModal} />

            <EvaluatorsModal evaluatorsModal={evaluatorsModal} setEvaluatorsModal={setEvaluatorsModal} members={members} />
        </div>
    )
}

const HeaderCell = (data) => (
    <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-13px">
        {data.column.caption}
    </div>
)

const HeaderCellMultiHeader = (data) => (
    <div className="tw-font-medium tw-text-gray-70 tw-pl-4 tw-text-13px">
        {data.column.caption}
    </div>
)