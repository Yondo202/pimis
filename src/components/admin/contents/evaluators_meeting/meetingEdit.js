import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { DataGrid, DateBox } from 'devextreme-react'
import './style.css'
import { Column, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import AlertContext from 'components/utilities/alertContext'
import { useHistory, useLocation } from 'react-router'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function EvaluatorsMeetingEdit(props) {
    const projects = props.projects
    const evaluators = props.evaluators

    const [selectedProjects, setSelectedProjects] = useState([])
    const [selectedEvaluators, setSelectedEvaluators] = useState([])

    const [meetingId, setMeetingId] = useState(useQuery().get('id'))

    useEffect(() => {
        if (meetingId) {
            axios.get('evaluation-meetings', {
                headers: { Authorization: getLoggedUserToken() },
                params: { id: meetingId }
            }).then(res => {
                console.log(res.data)
                setDate(res.data.data?.[0]?.sdate)
                setSelectedEvaluators(res.data.data?.[0]?.members)
                setSelectedProjects(res.data.data?.[0]?.projects)
            }).catch(err => {
                console.log(err.response?.data)
            })
        }
    }, [])

    const [date, setDate] = useState(null)

    const handleSetDateTime = (e) => setDate(e.value)

    const handleEvaluatorChange = (id) => {
        if (selectedEvaluators.includes(id)) {
            setSelectedEvaluators(selectedEvaluators.filter(item => item !== id))
        } else {
            setSelectedEvaluators([...selectedEvaluators, id])
        }
    }

    const handleProjectChange = (id) => {
        if (selectedProjects.includes(id)) {
            setSelectedProjects(selectedProjects.filter(item => item !== id))
        } else {
            setSelectedProjects([...selectedProjects, id])
        }
    }

    const AlertCtx = useContext(AlertContext)

    const handleSubmit = () => {
        const validation = date && selectedEvaluators.length > 0 && selectedProjects.length > 0

        if (validation) {
            if (meetingId) {
                axios.put(`evaluation-meetings/${meetingId}`, {
                    sdate: date,
                    members: selectedEvaluators,
                    projects: selectedProjects,
                    status: 0,
                }, {
                    headers: { Authorization: getLoggedUserToken() },
                }).then(res => {
                    console.log(res.data)
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өөрчлөлтийг хадгаллаа.' })
                }).catch(err => {
                    console.log(err.response?.data)
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                })
            } else {
                axios.post('evaluation-meetings', {
                    sdate: date,
                    members: selectedEvaluators,
                    projects: selectedProjects,
                    status: 0,
                }, {
                    headers: { Authorization: getLoggedUserToken() },
                }).then(res => {
                    console.log(res.data)
                    setMeetingId(res.data.data?.id)
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Уулзалтыг нэмлээ.' })
                }).catch(err => {
                    console.log(err.response?.data)
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                })
            }
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Аль нэг талбарын мэдээлэл дутуу байна.' })
        }
    }

    const calculateIsChecked = (id, selected) => selected.includes(id) ? 'Сонгосон' : 'Сонгоогүй'

    const history = useHistory()

    return (
        <div className="tw-text-sm tw-text-gray-700 tw-absolute tw-top-0">
            <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded-md tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase" style={{ fontSize: '13px' }} onClick={() => history.push('/meetings')}>
                <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
                Буцах
            </button>

            <div className="tw-text-lg tw-font-medium tw-p-2 tw-ml-4 tw-mt-10">
                Үнэлгээний хорооны уулзалт
            </div>

            <div className="tw-inline-flex tw-flex-wrap tw-items-center tw-mt-5 tw-p-2">
                <div className="tw-font-medium tw-pt-2 tw-pb-1 tw-leading-tight">
                    Уулзалтын цаг товлох:
                </div>
                <DateBox className="tw-ml-8" type="date" elementAttr={{ id: 'meeting-datebox' }} value={date} onValueChanged={handleSetDateTime} />
            </div>

            <div className="tw-p-3 tw-pb-6 tw-bg-white tw-rounded-md tw-shadow-inner mt-1">
                <div className="tw-font-medium">
                    Үнэлгээний хорооны гишүүд сонгох
                </div>
                <div className="tw-max-w-5xl">
                    <DataGrid
                        dataSource={evaluators}
                        showBorders={true}
                        wordWrapEnabled={true}
                        rowAlternationEnabled={true}
                        columnAutoWidth={true}
                        showRowLines={true}
                        showColumnLines={true}
                        loadPanel={{ enabled: true, height: 300, text: 'Уншиж байна' }}
                    >
                        <SearchPanel visible={true} width={240} placeholder="Хайх..." />
                        <HeaderFilter visible={true} />
                        <Scrolling mode="virtual" columnRenderingMode="virtual" showScrollbar="always" />

                        <Column caption="Сонгох" cellRender={data => <CheckboxCell id={data.data?.id} selected={selectedEvaluators} handleChange={handleEvaluatorChange} />} headerCellRender={HeaderCell} calculateCellValue={data => calculateIsChecked(data.id, selectedEvaluators)} dataField="_" />
                        <Column dataField="lastname" caption="Овог" headerCellRender={HeaderCell} />
                        <Column dataField="firstname" caption="Нэр" headerCellRender={HeaderCell} />
                        <Column dataField="phone" caption="Утас" headerCellRender={HeaderCell} />
                        <Column dataField="email" caption="И-мэйл" headerCellRender={HeaderCell} />
                    </DataGrid>
                </div>
            </div>

            <div className="tw-mt-10 tw-p-3 tw-pb-6 tw-bg-white tw-rounded-md tw-shadow-inner">
                <div className="tw-font-medium">
                    Тэнцсэн төслүүдээс сонгох
                </div>
                <div className="tw-max-w-5xl">
                    <DataGrid
                        dataSource={projects}
                        showBorders={true}
                        wordWrapEnabled={true}
                        rowAlternationEnabled={true}
                        columnAutoWidth={true}
                        showRowLines={true}
                        showColumnLines={true}
                        loadPanel={{ enabled: true, height: 300, text: 'Уншиж байна' }}
                    >
                        <SearchPanel visible={true} width={240} placeholder="Хайх..." />
                        <HeaderFilter visible={true} />
                        <Scrolling mode="virtual" columnRenderingMode="virtual" showScrollbar="always" />
                        <Paging defaultPageSize={20} />
                        <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />

                        <Column caption="Сонгох" cellRender={data => <CheckboxCell id={data.data?.project?.id} selected={selectedProjects} handleChange={handleProjectChange} />} headerCellRender={HeaderCell} calculateCellValue={data => calculateIsChecked(data.project.id, selectedProjects)} dataField="_" />
                        <Column dataField="companyname" caption="ААН нэр" headerCellRender={HeaderCell} />
                        <Column dataField="companyregister" caption="Регистр" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_type_name" caption="Төслийн төрөл" headerCellRender={HeaderCell} />
                        <Column dataField="project.project_name" caption="Төслийн нэр" headerCellRender={HeaderCell} />
                    </DataGrid>
                </div>
            </div>

            <div className="tw-flex tw-justify-end lg:tw-justify-center">
                <button className="tw-py-1 tw-px-4 tw-bg-gray-600 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-4 lg:tw-mt-8 tw-mb-4 tw-mx-4" onClick={handleSubmit}>
                    Хадгалах
                </button>
            </div>
        </div>
    )
}

const HeaderCell = (data) => (
    <div className="tw-text-center tw-font-medium tw-text-sm tw-text-gray-700 tw-leading-tight">
        {data.column.caption}
    </div>
)

const CheckboxCell = (props) => {
    return <div className="tw-flex tw-justify-center">
        <input className="tw-w-4 tw-h-4" type="checkbox" checked={props.selected.includes(props.id)} onChange={() => props.handleChange(props.id)} />
    </div>
}