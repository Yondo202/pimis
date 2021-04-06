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
        }
        if (width === undefined) handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [containerRef])

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
        const consultant = consultants.filter(consultant => consultant.id === id)[0]
        return consultant.first_name || 'not found'
    }

    const customizeTextBdsUser = (cellinfo) => {
        return getConsultantName(cellinfo.value)
    }

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
                    <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
                    <Paging defaultPageSize={20} />
                    <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />
                    <HeaderFilter visible={true} />
                    <FilterRow visible={true} />

                    {/* <Column caption="Үйлдэл" cellRender={data => <EditDropdown data={data} handleEditProject={handleEditProject} setPreviewModal={setPreviewModal} setEvaluatorsModal={setEvaluatorsModal} />} headerCellRender={HeaderCell} width={134} /> */}
                    <Column caption="Явцыг харах" cellRender={data => <ButtonNavProgress data={data} />} headerCellRender={HeaderCell} width={115} />
                    <Column dataField="companyname" caption="ААН нэр" headerCellRender={HeaderCell} />
                    <Column dataField="companyregister" caption="ААН регистерийн дугаар" headerCellRender={HeaderCell} />
                    <Column dataField="criteria" caption="Байгаль орчны шалгуур хангалт" headerCellRender={HeaderCell} customizeText={customizeTextCriteria} />
                    <Column dataField="esq" caption="БОҮ Асуумж" headerCellRender={HeaderCell} customizeText={customizeTextEsq} />
                    <Column dataField="esm" caption="Ангилал" headerCellRender={HeaderCell} />
                    <Column dataField="letterOfInterst" caption="Сонирхол илэрхийлэх албан тоот" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueLetterOI} />

                    <Column caption="Өргөдлийн маягт" headerCellRender={HeaderCellMultiHeader}>
                        <Column caption="Төслийг засах" cellRender={data => <ButtonEditProject data={data} />} headerCellRender={HeaderCell} width={90} />
                        <Column dataField="project.project_type_name" caption="Төслийн төрөл" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_name" caption="Төслийн нэр" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_number" caption="Төслийн дугаар" headerCellRender={HeaderCell} />
                        <Column dataField="project.confirmed" caption="Баталгаажсан эсэх" headerCellRender={HeaderCell} customizeText={customizeTextConfirmed} />
                        <Column dataField="project.project_start" caption="Эхлэх хугацаа" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_end" caption="Дуусах хугацаа" headerCellRender={HeaderCell} />
                        {/* <Column dataField="project.bds_userId" caption="БЗ Зөвлөх" headerCellRender={HeaderCell} customizeText={customizeTextBdsUser} /> */}
                    </Column>

                    <Column dataField="evidence" caption="Нотлох бичиг баримтууд" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueEvidence} />
                    <Column dataField="edpPlan" caption="Экспорт хөгжлийн төлөвлөгөө" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueEdpPlan} />
                    <Column dataField="firstEvalution.description" caption="Анхан шатны үнэлгээ" headerCellRender={HeaderCell} />
                    <Column dataField="evaluation5b" caption="Бүрдүүлбэрийн нотлох баримтууд" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueEvaluation5b} />
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

const ButtonEditProject = (data) => {
    const history = useHistory()
    const projectId = data.data.data.project?.id
    const UrgudulCtx = useContext(UrgudulContext)
    const AlertCtx = useContext(AlertContext)
    const buttonClick = () => {
        if (projectId) {
            axios.get(`projects/${projectId}`, {
                headers: { Authorization: getLoggedUserToken() }
            }).then(res => {
                console.log(res.data)
                UrgudulCtx.setData(res.data.data)
                history.push('/urgudul/1')
            }).catch(err => {
                console.log(err.response?.data)
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Өргөдлийн маягтын мэдээллийг уншиж чадсангүй.' })
            })
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсгээгүй байна.' })
        }
    }

    return <button className={`tw-bg-gray-700 tw-rounded-sm tw-py-1 tw-px-4 tw-text-white tw-whitespace-nowrap focus:tw-outline-none active:tw-bg-gray-800 tw-transition-colors hover:tw-shadow-md ${!projectId && 'tw-opacity-70'}`} onClick={buttonClick}>
        Засах
    </button>
}

const customizeTextCriteria = (cellInfo) => {
    switch (+cellInfo.value) {
        case 0:
            return 'Бөглөөгүй'
        case 1:
            return 'Тэнцээгүй'
        case 2:
            return 'Тэнцсэн'
        default:
            break
    }
}

const customizeTextEsq = (cellInfo) => {
    switch (+cellInfo.value) {
        case 0:
            return 'Бөглөөгүй'
        case 1:
            return 'Тэнцээгүй'
        case 2:
            return 'Тэнцсэн'
        case 3:
            return 'Тэнцсэн'
        default:
            break
    }
}

const calculateCellValueLetterOI = (rowdata) => {
    return rowdata.letterOfInterst ? 'Илгээсэн' : 'Илгээгээгүй'
}

const customizeTextConfirmed = (cellinfo) => {
    switch (cellinfo.value) {
        case 0:
            return 'Баталгаажаагүй'
        case 1:
            return 'Баталгаажсан'
        default:
            break
    }
}

const calculateCellValueEvidence = (rowdata) => {
    return rowdata.evidence ? 'Бүрдүүлсэн' : 'Бүрдүүлээгүй'
}

const calculateCellValueEdpPlan = (rowdata) => {
    return rowdata.edpPlan ? 'Төлөвлсөн' : 'Төлөвлөөгүй'
}

const calculateCellValueEvaluation5b = (rowdata) => {
    return rowdata.evaluation5b ? 'Баримттай' : 'Баримтгүй'
}