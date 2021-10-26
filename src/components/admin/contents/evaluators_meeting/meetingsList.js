import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router'
import './style.css'
import { DataGrid, TabPanel } from 'devextreme-react'
import { Column, HeaderFilter, MasterDetail, Pager, Paging, Scrolling } from 'devextreme-react/data-grid'
import { Item } from 'devextreme-react/tab-panel'
import { Link } from 'react-router-dom'
import AlertContext from 'components/utilities/alertContext'

export const statusRef = {
    0: 'Хүлээгдэж буй',
    1: 'Хуралдсан'
}

export default function EvaluatorsMeetingsList({ projects, evaluators }) {
    const AlertCtx = useContext(AlertContext)

    const [meetings, setMeetings] = useState([])

    useEffect(() => {
        axios.get('evaluation-meetings', {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            setMeetings(res.data.data)
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, уулзалтуудыг татаж чадсангүй.' })
        })
    }, [])

    return (
        <div className="tw-text-sm tw-text-gray-700 tw-absolute tw-top-0 tw-w-full tw-pb-10">
            <div className="tw-bg-white tw-rounded tw-shadow-md tw-w-full tw-p-2 tw-max-w-5xl">
                <div className="tw-text-lg tw-font-medium tw-p-2 tw-text-center tw-mt-6 tw-mb-6">
                    Сонгон шалгаруулалтын багийн хурлууд
                </div>

                <DataGrid
                    id="evaluators-meeting-datagrid"
                    dataSource={meetings}
                    showBorders={true}
                    wordWrapEnabled={true}
                    rowAlternationEnabled={true}
                    columnAutoWidth={true}
                    showRowLines={true}
                    showColumnLines={true}
                    loadPanel={{ enabled: true, height: 300, text: 'Уншиж байна' }}
                    noDataText="Мэдээлэл байхгүй байна."
                >
                    <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
                    <Paging defaultPageSize={40} />
                    <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />
                    <HeaderFilter visible={true} />

                    <Column caption="Д/д" headerCellRender={HeaderCell} cellRender={cellRenderOrder} />
                    <Column dataField="status" caption="Төлөв" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueStatus} />
                    <Column dataField="sdate" caption="Уулзалтын өдөр" headerCellRender={HeaderCell} />
                    <Column caption="Бүрэлдэхүүн" headerCellRender={HeaderCell} calculateCellValue={calculateCellValueDetail} />
                    <Column caption="Уулзалтыг засах" cellRender={data => <ButtonNavEdit data={data} />} alignment="center" headerCellRender={HeaderCell} />

                    <MasterDetail enabled={true} render={data => <MasterDetails data={data} projects={projects} evaluators={evaluators} />} />
                </DataGrid>

                <div className="tw-flex tw-justify-center">
                    <Link to="/meetings/id">
                        <button className="tw-py-1.5 tw-px-6 tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-8 tw-mb-6 tw-text-13px">
                            Уулзалт нэмэх
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const HeaderCell = (data) => (
    <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-13px">
        {data.column.caption}
    </div>
)

const cellRenderOrder = (data) => {
    return `${data.rowIndex + 1}.`
}

const calculateCellValueStatus = (rowdata) => {
    return statusRef[rowdata.status]
}

const calculateCellValueDetail = (rowdata) => {
    return `${rowdata.projects.length} төсөл, ${rowdata.members.length} гишүүн`
}

const ButtonNavEdit = ({ data }) => {
    const meetingId = data.data?.id
    const history = useHistory()
    const handleClick = () => {
        if (meetingId !== null && meetingId !== undefined) {
            history.push(`/meetings/id?id=${meetingId}`)
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

const MasterDetails = ({ data, projects, evaluators }) => {
    const projectIds = data.data?.projects
    const evaluatorIds = data.data?.members
    const meetingProjects = projects.filter(project => projectIds.includes(project.project?.id))
    const meetingEvaluators = evaluators.filter(evaluator => evaluatorIds.includes(evaluator.id))

    return (
        <TabPanel>
            <Item title="Тэнцсэн төслүүд" render={() => <ProjectsList projects={meetingProjects} />} />
            <Item title="Үнэлгээний хорооны гишүүд" render={() => <EvaluatorsList evaluators={meetingEvaluators} />} />
        </TabPanel>
    )
}

const ProjectsList = ({ projects }) => (
    <DataGrid
        id="master-detail-projects-datagrid"
        dataSource={projects}
        showBorders={true}
        wordWrapEnabled={true}
        columnAutoWidth={true}
        showRowLines={true}
        showColumnLines={true}
        noDataText="Мэдээлэл байхгүй байна."
    >
        <Paging defaultPageSize={20} />

        <Column caption="Д/д" cellRender={cellRenderOrder} headerCellRender={HeaderCell} />
        <Column dataField="companyname" caption="Байгууллага" headerCellRender={HeaderCell} />
        <Column dataField="project.project_type_name" caption="Төслийн төрөл" headerCellRender={HeaderCell} />
        <Column dataField="companyregister" caption="Регистр" headerCellRender={HeaderCell} />
        <Column dataField="project.project_name" caption="Төслийн нэр" headerCellRender={HeaderCell} />
    </DataGrid>
)

const EvaluatorsList = ({ evaluators }) => (
    <DataGrid
        id="master-detail-evaluators-datagrid"
        dataSource={evaluators}
        showBorders={true}
        wordWrapEnabled={true}
        columnAutoWidth={true}
        showRowLines={true}
        showColumnLines={true}
        noDataText="Мэдээлэл байхгүй байна."
    >
        <Paging defaultPageSize={20} />

        <Column caption="Д/д" cellRender={cellRenderOrder} headerCellRender={HeaderCell} />
        <Column dataField="lastname" caption="Овог" headerCellRender={HeaderCell} />
        <Column dataField="firstname" caption="Нэр" headerCellRender={HeaderCell} />
        <Column dataField="phone" caption="Утас" headerCellRender={HeaderCell} />
        <Column dataField="email" caption="Имэйл" headerCellRender={HeaderCell} />
    </DataGrid>
)
