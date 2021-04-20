import { useQuery } from 'components/utilities/useQueryLocation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { DataGrid } from 'devextreme-react'
import { Column, HeaderFilter, Pager, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import { statusNames } from 'components/admin/contents/projects/ProjectHandle'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { animated, config, Transition } from 'react-spring/renderprops'
import AlertContext from 'components/utilities/alertContext'
import AnnotationSVG from 'assets/svgComponents/annotationSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'


export default function ProjectStatusHandle() {
    const projectId = useQuery().get('projectId')

    const [status, setStatus] = useState(initialState)

    useEffect(() => {
        axios.get(`projects/${projectId}/status`, {
            headers: { Authorization: getLoggedUserToken() }
        }).then(res => {
            console.log(res)
            setStatus(prev => ({ ...prev, ...res.data.data }))
        }).catch(err => {
            console.error(err.response)
        })
    }, [])

    const handleInput = (key, value) => setStatus(prev => ({
        ...prev, [key]: value,
    }))

    const AlertCtx = useContext(AlertContext)

    const handleSubmit = () => {
        axios.put(`projects/${projectId}/status`, { status: status.status, comment: status.comment }, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setStatus(prev => ({ ...prev, ...res.data.data }))
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Төслийн төлвийг өөрчиллөө.' })
        }).catch(err => {
            console.error(err.response)
            if (err.response.status === 490) {
                AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Төлөв өөрчлөх эрх таньд олгогдоогүй байна.' })
            } else {
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Төлөв өөрчилж чадсангүй.' })
            }
        })
    }

    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

    const handleStatusSelect = (status) => {
        setStatus(prev => ({ ...prev, status: status }))
        setStatusDropdownOpen(false)
    }

    const buttonRef = useRef()
    const dropdownRef = useRef()

    const handleClickOutside = (e) => {
        if (!dropdownRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
            setStatusDropdownOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const [histories, setHistories] = useState([])
    const [historiesOpen, setHistoriesOpen] = useState(false)

    const handleGetHistory = () => {
        axios.get(`projects/${projectId}/status-history`, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setHistories(res.data.data || [])
            setHistoriesOpen(true)
        }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Өөрчлөлтүүдийг татаж чадсангүй.' })
        })
    }

    return (
        <div className="tw-text-gray-700 tw-text-sm tw-pb-10">
            <div className="tw-p-2 tw-mt-4 tw-bg-white tw-rounded tw-shadow tw-max-w-4xl">
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
                    <InfoItem label="Аж ахуйн нэгжийн нэр" value={status.company_name} />

                    <InfoItem label="Төслийн дугаар" value={status.project_number} />

                    <InfoItem label="Төслийн нэр" value={status.project_name} />

                    <InfoItem label="Төслийн эхлэх хугацаа" value={status.project_start} />

                    <InfoItem label="Өргөдөл үүсгэсэн өдөр" value={status.createdAt?.slice(0, 10)} />

                    <div className="tw-flex tw-flex-col tw-items-start md:tw-col-span-2 tw-p-2 tw-ml-2 tw-relative">
                        <div className="tw-border-b tw-border-gray-500 tw-rounded-b tw-pl-1 tw-pr-2">
                            Төслийн төлвийг сонгох:
                        </div>

                        <button className="tw-mt-2 tw-rounded tw-py-1 tw-border tw-border-gray-500 focus:tw-outline-none tw-flex tw-items-center tw-px-2 tw-font-medium" style={{ minWidth: 160 }} onClick={() => setStatusDropdownOpen(prev => !prev)} ref={buttonRef}>
                            <span className="tw-mr-2">{statusNames[status.status]}</span>
                            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-ml-auto" />
                        </button>

                        <Transition
                            items={statusDropdownOpen}
                            from={{ height: 0, opacity: 0 }}
                            enter={{ height: 'auto', opacity: 1 }}
                            leave={{ height: 0, opacity: 0 }}
                            config={config.stiff}>
                            {item => item && (anims =>
                                <animated.div className="tw-absolute tw-z-10 tw-border tw-border-gray-500 tw-rounded tw-bg-white tw-divide-y tw-divide-dashed tw-overflow-hidden" style={{ top: 72, minWidth: 160, ...anims }} ref={dropdownRef}>
                                    {Object.keys(statusNames).map(status =>
                                        <div className="tw-cursor-pointer tw-py-2 tw-text-13px tw-font-medium tw-px-2 hover:tw-bg-indigo-100 tw-transition-colors" key={status} onClick={() => handleStatusSelect(status)}>
                                            {statusNames[status]}
                                        </div>
                                    )}
                                </animated.div>
                            )}
                        </Transition>
                    </div>

                    <div className="tw-flex tw-flex-col tw-items-start md:tw-col-span-2 tw-p-2 tw-ml-2">
                        <div className="tw-mt-2 tw-border-b tw-border-gray-500 tw-rounded-b tw-pl-1 tw-pr-2">
                            Тайлбар:
                        </div>

                        <textarea className="tw-mt-2 tw-w-full tw-max-w-3xl focus:tw-outline-none tw-border tw-border-gray-500 tw-rounded py-1 tw-px-2" rows="5" value={status.comment || ''} onChange={e => handleInput('comment', e.target.value)} style={{ minHeight: 46 }} />
                    </div>
                </div>

                <div className="tw-flex tw-justify-center">
                    <button className="tw-py-1.5 tw-px-8 tw-text-15px tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-8 tw-mb-4" onClick={handleSubmit}>
                        Хадгалах
                    </button>
                </div>
            </div>

            <div className="tw-p-2 tw-pb-4 tw-mb-20 tw-mt-8 tw-bg-white tw-rounded tw-shadow tw-max-w-4xl tw-flex tw-flex-col tw-items-start tw-overflow-x-auto tw-overflow-y-hidden">
                <button className="tw-m-2 tw-py-1.5 tw-px-4 tw-text-sm tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md" onClick={handleGetHistory}>
                    Өөрчлөлтүүдийг харах
                </button>

                <div className="tw-px-2">
                    <Transition
                        items={historiesOpen}
                        from={{ height: 0, opacity: 0, marginTop: 0 }}
                        enter={{ height: 'auto', opacity: 1, marginTop: 4 }}
                        leave={{ height: 0, opacity: 0, marginTop: 0 }}
                        config={config.stiff}>
                        {item => item && (anims => histories.length
                            ? <div className="tw-divide-y tw-divide-dashed tw-rounded tw-border tw-border-gray-500" style={anims}>
                                {histories.map(history =>
                                    <HistoryItem history={history} key={history.id} />
                                )}
                            </div>
                            : <div className="tw-p-4 tw-font-medium tw-italic tw-bg-gray-50 tw-rounded-b-md" style={anims}>
                                <span className="tw-opacity-90">Өөрчилсөн түүх байхгүй байна.</span>
                            </div>
                        )}
                    </Transition>
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

const initialState = {
    company_name: null,
    project_name: null,
    project_number: null,
    project_start: null,
    createdAt: null,
    status: null,
    comment: null,
}

const InfoItem = ({ label, value }) => (
    <div className="tw-flex tw-flex-col tw-items-start tw-p-2 tw-ml-2">
        <div className="tw-border-b tw-border-gray-500 tw-rounded-b tw-pl-1 tw-pr-2">
            {label}:
        </div>
        <div className={`tw-inline-flex tw-h-7 tw-items-center tw-font-medium tw-truncate tw-px-2 ${!value && 'tw-text-gray-500'}`}>
            {value}
        </div>
    </div>
)

const HistoryItem = ({ history }) => {
    const [commentOpen, setCommentOpen] = useState(false)
    const userName = history.user?.firstname
        ? `${history.user.lastname?.substr(0, 1).toUpperCase()}. ${history.user.firstname}`
        : null

    return (
        <div className="">
            <div className="tw-flex tw-flex-nowrap tw-py-1.5 tw-font-medium">
                <div className="tw-w-48 tw-px-1 tw-flex tw-items-center tw-ml-4">
                    {new Date(history.createdAt).toLocaleString()}
                </div>
                <div className="tw-w-40 tw-px-1 tw-flex tw-items-center">
                    {statusNames[history.description]}
                </div>
                <div className="tw-w-40 tw-px-1 tw-flex tw-items-center">
                    {userName}
                </div>
                <div className="tw-flex tw-items-center tw-px-1 tw-ml-4 tw-mr-4">
                    <span className="tw-mr-2">
                        Тайлбар
                    </span>

                    <ButtonTooltip tooltip="Тайлбар харах" classButton="tw-p-0.5" afterSVG={<AnnotationSVG className={`tw-w-5 tw-h-5 ${history.userComment ? 'tw-text-blue-500' : 'tw-bg-gray-500'} tw-transition-colors`} />} onClick={() => setCommentOpen(prev => !prev)} />
                </div>
            </div>

            <Transition
                items={commentOpen}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 'auto', opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={config.stiff}>
                {item => item && (anims =>
                    <div className="tw-flex tw-justify-end tw-overflow-hidden" style={anims}>
                        <div className="tw-border tw-border-gray-500 tw-rounded tw-mt-1 tw-mr-3 tw-mb-3 tw-py-1 tw-px-2" style={{ minHeight: 60, width: 447 }}>
                            {history.userComment}
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    )
}
