import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { DataGrid, DateBox } from 'devextreme-react'
import './style.css'
import { Column, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { statusRef } from './meetingsList'
import useQuery from 'components/utilities/useQueryLocation'

export default function EvaluatorsMeetingEdit(props) {
    const [approvedProjects, setApprovedProjects] = useState([])
    const evaluators = props.evaluators

    const [selectedProjects, setSelectedProjects] = useState([])
    const [selectedEvaluators, setSelectedEvaluators] = useState([])

    const [meetingId, setMeetingId] = useState(useQuery().get('id'))

    useEffect(() => {
        axios.get('pps-infos/registered-companies', {
            headers: { Authorization: getLoggedUserToken() },
            params: { condition: 'approved' },
        }).then(res => {
            setApprovedProjects(res.data.data)
        }).catch(err => {
        })

        if (meetingId) {
            axios.get('evaluation-meetings', {
                headers: { Authorization: getLoggedUserToken() },
                params: { id: meetingId }
            }).then(res => {
                setDate(res.data.data?.[0]?.sdate)
                setSelectedEvaluators(res.data.data?.[0]?.members)
                setSelectedProjects(res.data.data?.[0]?.projects)
                setStatus(res.data.data?.[0]?.status)
            })
        }
    }, [])

    const [date, setDate] = useState()
    const [status, setStatus] = useState()

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
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өөрчлөлтийг хадгаллаа.' })
                    history.push('/meetings')
                }).catch(err => {
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
                    setMeetingId(res.data.data?.id)
                    AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Уулзалтыг нэмлээ.' })
                    history.push('/meetings')
                }).catch(err => {
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
                })
            }
        } else {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
        }
    }

    const calculateIsChecked = (id, selected) => selected.includes(id) ? 'Сонгосон' : 'Сонгоогүй'

    const history = useHistory()

    const handleDelete = () => {
        if (meetingId === null || meetingId === undefined) {
            AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Уулзалт сонгоогүй байна.' })
            return
        }

        axios.delete(`evaluation-meetings/${meetingId}`, {
            headers: { Authorization: getLoggedUserToken() }
        }).then(res => {
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Уулзалтыг устгалаа.' })
            history.push('/meetings')
        }).catch(err => {
            if (err.response.status === 490) {
                const msg = err.response.data.error?.message
                msg && AlertCtx.setAlert({ open: true, variant: 'normal', msg: msg })
            }
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Уулзалтыг устгаж чадсангүй.' })
        })
    }

    return (
        <div className="tw-text-sm tw-text-gray-700 tw-absolute tw-top-0 tw-pb-10 tw-w-full">
            <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px" onClick={() => history.push('/meetings')}>
                <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
                Буцах
            </button>

            <div className="tw-bg-white tw-rounded tw-shadow-md tw-p-2 tw-mt-6 tw-w-full tw-max-w-5xl">
                <div className="tw-text-lg tw-font-medium tw-text-center tw-p-2 tw-mt-6">
                    Үнэлгээний хорооны уулзалт
                </div>

                <div className="tw-flex tw-flex-wrap tw-justify-between tw-mt-5">
                    <div className="tw-inline-flex tw-flex-wrap tw-items-center tw-p-2 tw-mr-4">
                        <div className="tw-font-medium tw-pt-2 tw-pb-1 tw-leading-tight">
                            Уулзалтын цаг товлох:
                        </div>
                        <DateBox className="tw-ml-8" type="date" elementAttr={{ id: 'meeting-datebox' }} value={date} onValueChanged={handleSetDateTime} />
                    </div>

                    <div className="tw-inline-flex tw-flex-wrap tw-items-center tw-p-2 tw-mr-2">
                        <span className="tw-font-medium tw-pt-2 tw-pb-1 tw-leading-tight">
                            Төлөв:
                        </span>
                        <span className="tw-font-medium tw-pt-2 tw-pb-1 tw-leading-tight tw-ml-4" style={{ minWidth: 80 }}>
                            {statusRef[status]}
                        </span>
                    </div>
                </div>

                <div className="tw-px-2 tw-mt-6 tw-w-full">
                    <div className="tw-font-medium tw-text-15px">
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
                            <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />

                            <Column caption="Сонгох" cellRender={data => <CheckboxCell id={data.data?.id} selected={selectedEvaluators} handleChange={handleEvaluatorChange} />} headerCellRender={HeaderCell} calculateCellValue={data => calculateIsChecked(data.id, selectedEvaluators)} dataField="_" />
                            <Column dataField="lastname" caption="Овог" headerCellRender={HeaderCell} />
                            <Column dataField="firstname" caption="Нэр" headerCellRender={HeaderCell} />
                            <Column dataField="phone" caption="Утас" headerCellRender={HeaderCell} />
                            <Column dataField="email" caption="И-мэйл" headerCellRender={HeaderCell} />
                        </DataGrid>
                    </div>
                </div>

                <div className="tw-px-2 tw-mt-12 tw-w-full">
                    <div className="tw-font-medium tw-text-15px">
                        Тэнцсэн төслүүдээс сонгох
                    </div>
                    <div className="tw-max-w-5xl">
                        <DataGrid
                            dataSource={approvedProjects}
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
                            <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
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

                <div className="tw-flex tw-justify-center tw-relative">
                    {meetingId &&
                        <button className="tw-absolute tw-left-2 tw-rounded tw-bg-red-500 active:tw-bg-red-500 tw-transition-colors hover:tw-shadow-md tw-py-1.5 tw-px-8 tw-text-white tw-font-medium tw-mt-10 tw-mb-6 focus:tw-outline-none tw-text-13px" onClick={handleDelete}>
                            Устгах
                        </button>
                    }

                    <button className="tw-py-1.5 tw-px-8 tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-10 tw-mb-6 tw-text-13px" onClick={handleSubmit}>
                        Хадгалах
                    </button>
                </div>
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
