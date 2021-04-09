import { useQuery } from 'components/utilities/useQueryLocation'
import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { DataGrid } from 'devextreme-react'
import { Column, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'


export default function ProjectStatusHandle() {
    const projectId = useQuery().get('projectId')

    const [status, setStatus] = useState({})

    useEffect(() => {
        axios.get(`projects/${projectId}/status`, {
            headers: { Authorization: getLoggedUserToken() }
        }).then(res => {
            console.log(res)
            setStatus(res.data.data)
        }).catch(err => {
            console.error(err.response)
        })
    }, [])

    return (
        <div className="tw-text-gray-700 tw-text-sm tw-px-3 tw-pt-2 tw-pb-6 tw-mt-4 tw-shadow-inner tw-bg-white tw-rounded-md">
            <div className="tw-p-2 tw-mt-6 tw-text-lg tw-font-medium tw-text-center">
                Төслийн төлвийг тохируулах
            </div>

            {/* <DataGrid
                elementAttr={{ id: 'company-statuses-data-grid' }}
                dataSource={data}
                showBorders={true}
                wordWrapEnabled={true}
                rowAlternationEnabled={true}
                columnAutoWidth={true}
                columnWidth="auto"
                showRowLines={true}
                showColumnLines={true}
                loadPanel={{ enabled: true, height: 300, text: 'Уншиж байна' }}
            >
                <SearchPanel visible={true} width={240} placeholder="Хайх..." />
                <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
                <Paging defaultPageSize={20} />
                <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 40]} showInfo={false} showNavigationButtons={true} />
                <HeaderFilter visible={true} />

                <Column dataField="companyname" caption="ААН нэр" headerCellRender={HeaderCell} alignment="left" />
                <Column dataField="companyregister" caption="ААН регистерийн дугаар" headerCellRender={HeaderCell} alignment="left" />
                <Column dataField="project.project_number" caption="Төслийн дугаар" headerCellRender={HeaderCell} alignment="left" />
                <Column dataField="project.project_type_name" caption="Төслийн төрөл" headerCellRender={HeaderCell} alignment="left" />
                <Column dataField="project.project_name" caption="Төслийн нэр" headerCellRender={HeaderCell} alignment="left" />
                <Column dataField="project.status" caption="Төлөв" headerCellRender={HeaderCell} alignment="left" />
                <Column dataField="project.confirmed" caption="Баталгаажсан эсэх" headerCellRender={HeaderCell} customizeText={customizeTextConfirmed} alignment="left" />
                <Column dataField="project.project_start" caption="Эхлэх хугацаа" headerCellRender={HeaderCell} alignment="left" />
                <Column dataField="project.project_end" caption="Дуусах хугацаа" headerCellRender={HeaderCell} alignment="left" />
            </DataGrid> */}

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-max-w-5xl tw-mt-6">
                <div className="tw-flex tw-flex-col tw-p-2">
                    <div className="">Аж ахуйн нэгжийн нэр</div>
                    <div className="">{status.company_name}</div>
                </div>

                <div className="tw-flex tw-flex-col tw-p-2">
                    <div className="">Төслийн дугаар</div>
                    <div className="">{status.project_number}</div>
                </div>

                <div className="tw-flex tw-flex-col tw-p-2">
                    <div className="">Төслийн нэр</div>
                    <div className="">{status.project_name}</div>
                </div>

                <div className="tw-flex tw-flex-col md:tw-col-span-2 tw-p-2">
                    <div className="">Төслийн төлвийг сонгох</div>
                    <select className="tw-w-40 tw-border">
                        <option value="AAAA" />
                        <option value="BBBB" />
                    </select>
                </div>

                <div className="tw-flex tw-flex-col md:tw-col-span-2 tw-p-2">
                    <div className="">Тайлбар</div>
                    <textarea className="tw-w-full tw-max-w-3xl focus:tw-outline-none tw-border" rows="5" />
                </div>
            </div>
        </div>
    )
}

// const HeaderCell = (data) => (
//     <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-13px">
//         {data.column.caption}
//     </div>
// )

// const customizeTextConfirmed = (cellinfo) => {
//     switch (cellinfo.value) {
//         case 0:
//             return 'Баталгаажаагүй'
//         case 1:
//             return 'Баталгаажсан'
//         default:
//             break
//     }
// }