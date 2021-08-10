import React, { useEffect, useRef, useState } from 'react'
import DataGrid, { Column, FilterRow, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router-dom'
import './dataGrid.css'
import { loadMessages } from 'devextreme/localization'
import { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'

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

    const AlertCtx = useContext(AlertContext)

    useEffect(() => {
        axios.get('pps-infos/registered-companies', {
            headers: { 'Authorization': getLoggedUserToken() }
        }).then(res => {
            setData(res.data.data)
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Байгууллагын жагсаалтыг татаж чадсангүй.' })
        })

        axios.get('users', {
            headers: { Authorization: getLoggedUserToken() },
            params: { role: 'bh_zovloh' }
        }).then(res => {
            setConsultants(res.data.data)
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
    }, [])

    const [consultants, setConsultants] = useState([])

    const calculateCellValueBdsUser = (rowdata) => {
        return getConsultantName(rowdata.project?.bds_userId, consultants)
    }

    return (
        <div className="tw-text-sm tw-text-gray-700 tw-pb-10 tw-w-full tw-overflow-hidden">
            <div className="tw-px-3 tw-pt-2 tw-pb-6 tw-shadow-md tw-bg-white tw-flex tw-flex-col tw-rounded tw-overflow-hidden tw-w-full" ref={containerRef}>
                <div className="tw-p-2 tw-mt-6 tw-text-lg tw-font-medium tw-text-center">
                    Бүртгүүлсэн байгууллагууд
                </div>

                <DataGrid
                    elementAttr={{ id: 'registered-companies-data-grid' }}
                    dataSource={data}
                    showBorders={true}
                    wordWrapEnabled={true}
                    rowAlternationEnabled={true}
                    columnAutoWidth={true}
                    width={width && width - 25}
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

                    <Column caption="Явцыг харах" cellRender={data => <ButtonNavProgress data={data} />} headerCellRender={HeaderCell} alignment="left" width={115} />
                    <Column dataField="companyname" caption="ААН нэр" headerCellRender={HeaderCell} alignment="left" minWidth={120} />
                    <Column dataField="companyregister" caption="ААН регистерийн дугаар" headerCellRender={HeaderCell} alignment="left" />
                    <Column dataField="criteria" caption="Байгаль орчны шалгуур хангалт" headerCellRender={HeaderCell} customizeText={customizeTextCriteria} cellRender={cellRenderCriteria} alignment="left" minwidth={100} />
                    <Column dataField="esq" caption="БОҮ Асуумж" headerCellRender={HeaderCell} customizeText={customizeTextEsq} cellRender={cellRenderEsq} alignment="left" minWidth={100} />
                    <Column dataField="esm" caption="Ангилал" headerCellRender={HeaderCell} alignment="center" minWidth={100} />
                    <Column dataField="letterOfInterst" caption="Сонирхол илэрхийлэх албан тоот" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueLetterOI} alignment="left" />

                    <Column caption="Өргөдлийн маягт" headerCellRender={HeaderCellMultiHeader}>
                        <Column dataField="project.status" caption="Төлөв" cellRender={data => <ButtonNavStatus data={data} />} headerCellRender={HeaderCell} calculateCellValue={calculateCellValueStatus} alignment="left" width={140} />
                        <Column dataField="project.project_number" caption="Төслийн дугаар" headerCellRender={HeaderCell} alignment="left" minWidth={120} />
                        <Column dataField="project.project_type_name" caption="Төслийн төрөл" headerCellRender={HeaderCell} alignment="left" />
                        <Column dataField="project.project_name" caption="Төслийн нэр" headerCellRender={HeaderCell} alignment="left" minWidth={120} />
                        <Column dataField="project.project_duration" caption="Төслийг хэрэгжүүлэх хугацаа" headerCellRender={HeaderCell} customizeText={customizeTextDuration} alignment="left" />
                        <Column dataField="project.confirmed" caption="Баталгаажсан эсэх" headerCellRender={HeaderCell} customizeText={customizeTextConfirmed} alignment="left" />
                        <Column dataField="project.bds_userId" caption="БХ Зөвлөх" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueBdsUser} minWidth={100} alignment="left" />
                    </Column>

                    <Column dataField="evidence" caption="Нотлох бичиг баримтууд I шат" headerCellRender={HeaderCell} calculateCellValue={rowdata => calculateCellValueEvidence(rowdata, 'evidence')} alignment="left" />
                    <Column dataField="edpPlan" caption="Экспорт хөгжлийн төлөвлөгөө" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueEdpPlan} alignment="left" />
                    <Column dataField="evidence" caption="Нотлох бичиг баримтууд II шат" headerCellRender={HeaderCell} calculateCellValue={rowdata => calculateCellValueEvidence(rowdata, 'evidence')} alignment="left" />
                    <Column dataField="firstEvalution.description" caption="Анхан шатны үнэлгээ" headerCellRender={HeaderCell}
                        cellRender={cellData => <CellRenderEvalution cellData={cellData} field="firstEvalution" />}
                        alignment="left" minWidth={110}
                    />
                    <Column dataField="evaluation5b.description" caption="Бичиг баримт бүрдүүлэлт" headerCellRender={HeaderCell}
                        cellRender={cellData => <CellRenderEvalution cellData={cellData} field="evaluation5b" />}
                        alignment="left" minWidth={110}
                    />
                    <Column dataField="evaluation5c.description" caption="Шинжилгээний тайлан" headerCellRender={HeaderCell}
                        cellRender={cellData => <CellRenderEvalution cellData={cellData} field="evaluation5c" />}
                        alignment="left" minWidth={110}
                    />
                    <Column dataField="lastEvalution.description" caption="Бизнес шинжээчийн үнэлгээ" headerCellRender={HeaderCell}
                        cellRender={cellData => <CellRenderEvalution cellData={cellData} field="lastEvalution" />}
                        alignment="left" minWidth={110}
                    />
                </DataGrid>
            </div>
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

const ButtonNavProgress = (data) => {
    const history = useHistory()
    const buttonClick = () => {
        const userId = data.data.data.userId
        const projectId = data.data.data.project?.id

        userId && history.push({
            pathname: '/progress',
            search: projectId ? `?userId=${userId}&projectId=${projectId}` : `?userId=${userId}`
        })
    }
    return <button className="tw-bg-gray-700 tw-rounded-sm tw-py-1 tw-px-2 tw-text-white tw-whitespace-nowrap focus:tw-outline-none active:tw-bg-gray-800 tw-transition-colors hover:tw-shadow-md" onClick={buttonClick}>
        Явцыг харах
    </button>
}

export const statusNames = {
    editable: 'Засвар нээлттэй',
    locked: 'Засвар хаалттай',
    approved: 'Дэмжигдсэн',
    disapproved: 'Дэмжигдээгүй',
    cancelled: 'Цуцлагдсан',
}

const calculateCellValueStatus = (rowdata) => {
    return statusNames[rowdata.project?.status]
}

const ButtonNavStatus = (data) => {
    const projectId = data.data.data.project?.id
    const status = data.data.data.project?.status
    const history = useHistory()
    const buttonClick = () => {
        history.push({
            pathname: '/project-status',
            search: `?projectId=${projectId}`
        })
    }
    return status
        ? <button className="tw-bg-gray-700 tw-rounded-sm tw-py-1 tw-px-2 tw-text-white tw-whitespace-nowrap focus:tw-outline-none active:tw-bg-gray-800 tw-transition-colors hover:tw-shadow-md" style={{ width: 118 }} onClick={buttonClick}>
            {statusNames[status] || ''}
        </button>
        : null
}

const criteriaTexts = {
    1: 'Тэнцээгүй',
    2: 'Тэнцсэн',
}

const customizeTextCriteria = (cellinfo) => criteriaTexts[+cellinfo.value]

const cellRenderCriteria = (cellData) => {
    const criteria = +cellData.data.criteria
    const classNames = {
        1: 'tw-bg-red-400',
        2: 'tw-bg-green-400',
    }
    return criteria === 0
        ? null
        : <div className={`tw-py-1 tw-w-20 tw-text-center tw-text-white tw-rounded-sm ${classNames[criteria]}`}>
            {criteriaTexts[criteria]}
        </div>
}

const esqTexts = {
    1: 'Тэнцээгүй',
    2: 'Тэнцсэн',
    3: 'Тэнцсэн',
}

const customizeTextEsq = (cellInfo) => esqTexts[+cellInfo.value]

const cellRenderEsq = (cellData) => {
    const esq = +cellData.data.esq
    const classNames = {
        1: 'tw-bg-red-400',
        2: 'tw-bg-green-400',
        3: 'tw-bg-green-400',
    }
    return esq === 0
        ? null
        : <div className={`tw-py-1 tw-w-20 tw-text-center tw-text-white tw-rounded-sm ${classNames[esq]}`}>
            {esqTexts[esq]}
        </div>
}

const calculateCellValueLetterOI = (rowdata) => {
    return rowdata.letterOfInterst ? 'Илгээсэн' : null
}

const customizeTextConfirmed = (cellinfo) => {
    return cellinfo.value ? 'Баталгаажсан' : null
}

const calculateCellValueEvidence = (rowdata, field) => {
    return rowdata[field] ? 'Бүрдүүлсэн' : null
}

const calculateCellValueEdpPlan = (rowdata) => {
    return rowdata.edpPlan ? 'Төлөвлсөн' : null
}

const evalutionClassNames = {
    1: 'tw-bg-red-400',
    2: 'tw-bg-green-400',
}

const CellRenderEvalution = ({ cellData, field }) => {
    const evalution = +cellData.data[field]?.value
    return evalution === 0
        ? null
        : <div className={`tw-py-1 tw-w-20 tw-text-center tw-text-white tw-rounded-sm ${evalutionClassNames[evalution]}`}>
            {cellData.data[field]?.description}
        </div>
}

const customizeTextDuration = (cellinfo) => cellinfo.value ? `${cellinfo.value} сар` : ''

export const getConsultantName = (id, data) => {
    if (id) {
        const consultant = data.filter(consultant => consultant.id === id)[0]
        return consultant?.firstname
            ? `${consultant.lastname?.substr(0, 1).toUpperCase()}. ${consultant.firstname}`
            : null
    } else {
        return null
    }
}
