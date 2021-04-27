import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import DataGrid, { Column, Editing, FilterRow, HeaderFilter, Lookup, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
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

        axios.get('users', {
            headers: { Authorization: getLoggedUserToken() },
            params: { role: 'bh_zovloh' }
        }).then(res => {
            console.log(res.data)
            setConsultants(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }, [])

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

    const [previewModal, setPreviewModal] = useState({
        open: false,
        id: '',
    })

    const [evaluatorsModal, setEvaluatorsModal] = useState({
        open: false,
        project: {},
    })

    const [members, setMembers] = useState([])

    const [consultants, setConsultants] = useState([])

    const getConsultantName = (id) => {
        if (id) {
            const consultant = consultants.filter(consultant => consultant.id === id)[0]
            return consultant?.firstname
                ? `${consultant.lastname?.substr(0, 1).toUpperCase()}. ${consultant.firstname}`
                : null
        } else {
            return null
        }
    }

    const calculateCellValueBdsUser = (rowdata) => {
        return getConsultantName(rowdata.project?.bds_userId)
    }

    return (
        <div className="tw-text-sm tw-text-gray-700 tw-pb-10">
            <div className="tw-px-3 tw-pt-2 tw-pb-6 tw-shadow tw-bg-white tw-flex tw-flex-col tw-w-full tw-rounded tw-overflow-hidden" ref={containerRef}>
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

                    {/* <Column caption="Үйлдэл" cellRender={data => <EditDropdown data={data} handleEditProject={handleEditProject} setPreviewModal={setPreviewModal} setEvaluatorsModal={setEvaluatorsModal} />} headerCellRender={HeaderCell} width={134} /> */}
                    <Column caption="Явцыг харах" cellRender={data => <ButtonNavProgress data={data} />} headerCellRender={HeaderCell} alignment="left" width={113} />
                    <Column dataField="companyname" caption="ААН нэр" headerCellRender={HeaderCell} alignment="left" minWidth={120} />
                    <Column dataField="companyregister" caption="ААН регистерийн дугаар" headerCellRender={HeaderCell} alignment="left" />
                    <Column dataField="criteria" caption="Байгаль орчны шалгуур хангалт" headerCellRender={HeaderCell} customizeText={customizeTextCriteria} cellRender={cellRenderCriteria} alignment="left" width={110} />
                    <Column dataField="esq" caption="БОҮ Асуумж" headerCellRender={HeaderCell} customizeText={customizeTextEsq} cellRender={cellRenderEsq} alignment="left" width={102} />
                    <Column dataField="esm" caption="Ангилал" headerCellRender={HeaderCell} alignment="center" width={110} />
                    <Column dataField="letterOfInterst" caption="Сонирхол илэрхийлэх албан тоот" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueLetterOI} alignment="left" />

                    <Column caption="Өргөдлийн маягт" headerCellRender={HeaderCellMultiHeader}>
                        <Column dataField="project.status" caption="Төлөв" cellRender={data => <ButtonNavStatus data={data} />} headerCellRender={HeaderCell} calculateCellValue={calculateCellValueStatus} alignment="left" width={140} />
                        <Column dataField="project.project_number" caption="Төслийн дугаар" headerCellRender={HeaderCell} alignment="left" width={119} />
                        <Column dataField="project.project_type_name" caption="Төслийн төрөл" headerCellRender={HeaderCell} alignment="left" />
                        <Column dataField="project.project_name" caption="Төслийн нэр" headerCellRender={HeaderCell} alignment="left" minWidth={120} />
                        <Column dataField="project.confirmed" caption="Баталгаажсан эсэх" headerCellRender={HeaderCell} customizeText={customizeTextConfirmed} alignment="left" />
                        <Column dataField="project.project_start" dataType="date" caption="Эхлэх хугацаа" headerCellRender={HeaderCell} alignment="left" />
                        <Column dataField="project.project_end" dataType="date" caption="Дуусах хугацаа" headerCellRender={HeaderCell} alignment="left" />
                        <Column dataField="project.bds_userId" caption="БЗ Зөвлөх" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueBdsUser} minWidth={100} alignment="left" />
                    </Column>

                    <Column dataField="evidence" caption="Нотлох бичиг баримтууд" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueEvidence} alignment="left" />
                    <Column dataField="edpPlan" caption="Экспорт хөгжлийн төлөвлөгөө" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueEdpPlan} alignment="left" />
                    <Column dataField="firstEvalution" caption="Анхан шатны үнэлгээ" headerCellRender={HeaderCell} calculateCellValue={calculateCellValue5a} cellRender={cellRender5a} alignment="left" width={110} />
                    <Column dataField="evaluation5b" caption="Бүрдүүлбэрийн нотлох баримтууд" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueEvaluation5b} cellRender={cellRender5b} alignment="left" width={146} />
                    <Column dataField="lastEvalution" caption="Бизнес шинжээчийн үнэлгээ" headerCellRender={HeaderCell} calculateCellValue={calculateCellValue5c} cellRender={cellRender5c} alignment="left" width={131} />
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

// const ButtonEditProject = (data) => {
//     const history = useHistory()
//     const projectId = data.data.data.project?.id
//     const UrgudulCtx = useContext(UrgudulContext)
//     const AlertCtx = useContext(AlertContext)
//     const buttonClick = () => {
//         if (projectId) {
//             axios.get(`projects/${projectId}`, {
//                 headers: { Authorization: getLoggedUserToken() }
//             }).then(res => {
//                 console.log(res.data)
//                 UrgudulCtx.setData(res.data.data)
//                 history.push('/urgudul/1')
//             }).catch(err => {
//                 console.log(err.response?.data)
//                 AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Өргөдлийн маягтын мэдээллийг уншиж чадсангүй.' })
//             })
//         } else {
//             AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсгээгүй байна.' })
//         }
//     }

//     return <button className={`tw-bg-gray-700 tw-rounded-sm tw-py-1 tw-px-4 tw-text-white tw-whitespace-nowrap focus:tw-outline-none active:tw-bg-gray-800 tw-transition-colors hover:tw-shadow-md ${!projectId && 'tw-opacity-70'}`} onClick={buttonClick}>
//         Засах
//     </button>
// }

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

const calculateCellValueEvidence = (rowdata) => {
    return rowdata.evidence ? 'Бүрдүүлсэн' : null
}

const calculateCellValueEdpPlan = (rowdata) => {
    return rowdata.edpPlan ? 'Төлөвлсөн' : null
}

const evalutionTexts = {
    1: 'Тэнцээгүй',
    2: 'Тэнцсэн',
}

const evalutionClassNamse = {
    1: 'tw-bg-red-400',
    2: 'tw-bg-green-400',
}

const calculateCellValue5a = (rowdata) => {
    const evalution = +rowdata.firstEvalution.value
    return evalution === 0
        ? null
        : evalutionTexts[evalution]
}

const cellRender5a = (cellData) => {
    const evalution = +cellData.data.firstEvalution.value
    return evalution === 0
        ? null
        : <div className={`tw-py-1 tw-w-20 tw-text-center tw-text-white tw-rounded-sm ${evalutionClassNamse[evalution]}`}>
            {evalutionTexts[evalution]}
        </div>
}

const calculateCellValueEvaluation5b = (rowdata) => {
    const evalution = rowdata.evaluation5b
    return typeof (evalution) === 'boolean'
        ? (evalution ? 'Тэнцсэн' : 'Тэнцээгүй')
        : null
}

const cellRender5b = (cellData) => {
    const evalution = cellData.data.evaluation5b
    return typeof (evalution) === 'boolean'
        ? <div className={`tw-mx-auto tw-py-1 tw-w-20 tw-text-center tw-text-white tw-rounded-sm ${evalution ? 'tw-bg-green-400' : 'tw-bg-red-400'}`}>
            {evalution ? 'Тэнцсэн' : 'Тэнцээгүй'}
        </div>
        : null
}

const calculateCellValue5c = (rowdata) => {
    const evalution = +rowdata.lastEvalution.value
    return evalution === 0
        ? null
        : evalutionTexts[evalution]
}

const cellRender5c = (cellData) => {
    const evalution = +cellData.data.lastEvalution.value
    return evalution === 0
        ? null
        : <div className={`tw-mx-auto tw-py-1 tw-w-20 tw-text-center tw-text-white tw-rounded-sm ${evalutionClassNamse[evalution]}`}>
            {evalutionTexts[evalution]}
        </div>
}
