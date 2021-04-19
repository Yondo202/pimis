import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router'
import { Transition, config } from 'react-spring/renderprops'
import UsersSVG from 'assets/svgComponents/usersSVG'
import ClipboardListSVG from 'assets/svgComponents/clipboardListSVG'
import TrashSVG from 'assets/svgComponents/trashSVG'
import PenSVG from 'assets/svgComponents/penSVG'
import './style.css'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'


export const statusWord = (int) => {
    switch (int) {
        case 0:
            return 'Хүлээгдэж буй'
        case 1:
            return 'Хуралдаж буй'
        case 2:
            return 'Хуралдсан'
        default:
            break
    }
}

export default function EvaluatorsMeetingsList(props) {
    const projects = props.projects
    const evaluators = props.evaluators

    const [meetings, setMeetings] = useState([])

    useEffect(() => {
        axios.get('evaluation-meetings', {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res.data)
            setMeetings(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }, [])

    const history = useHistory()

    const navigateMeeting = (id) => history.push(`/meetings/id?id=${id}`)

    const getProjects = (idArr) => projects.filter(project => idArr.includes(project.project?.id))

    const getEvalautors = (idArr) => evaluators.filter(evaluator => idArr.includes(evaluator.id))

    const [details, setDetails] = useState({
        open: false,
        id: null,
        key: null,
    })

    return (
        <div className="tw-text-sm tw-text-gray-700 tw-absolute tw-top-0 tw-w-full tw-pt-10 tw-pb-10">
            <div className="tw-bg-white tw-rounded tw-shadow tw-w-full tw-max-w-6xl tw-p-2">
                <div className="tw-text-lg tw-font-medium tw-p-2 tw-text-center tw-mt-6">
                    Үнэлгээний хорооны уулзалт
                </div>

                <div className="tw-mt-10 tw-overflow-x-auto tw-overflow-y-hidden tw-w-full">
                    <div className="tw-flex tw-flex-nowrap tw-h-10 tw-font-medium tw-rounded-t-md tw-bg-gray-600 tw-text-white tw-pt-1" style={{ width: 1024 }}>
                        <div className="tw-w-12 tw-flex tw-items-center tw-justify-center">
                            Д/д
                        </div>
                        <div className="tw-w-40 tw-flex tw-items-center tw-justify-center">
                            Төлөв
                                </div>
                        <div className="tw-w-40 tw-flex tw-items-center tw-justify-center">
                            Уулзалтын өдөр
                                </div>
                        <div className="tw-w-56 tw-flex tw-items-center tw-justify-center">
                            Харах
                        </div>
                        <div className="tw-w-56 tw-flex tw-items-center tw-justify-center tw-ml-auto">
                            Үйлдэл
                        </div>
                    </div>

                    <div className="tw-overflow-x-hidden tw-overflow-y-auto tw-pb-10" style={{ maxHeight: 800, width: 1024 }}>
                        {meetings.length > 0
                            ? meetings.map((meeting, i) =>
                                <div className="tw-bg-gray-50" key={meeting.id}>
                                    <div className="tw-flex tw-flex-nowrap tw-h-10 tw-border-b tw-border-dashed tw-border-gray-300 tw-rounded-b-md">
                                        <div className="tw-w-12 tw-flex tw-items-center tw-justify-center tw-font-medium">
                                            {i + 1}
                                        </div>
                                        <div className="tw-w-40 tw-flex tw-items-center tw-justify-center tw-font-medium">
                                            {statusWord(meeting.status)}
                                        </div>
                                        <div className="tw-w-40 tw-flex tw-items-center tw-justify-center tw-font-medium">
                                            {meeting.sdate}
                                        </div>
                                        <div className="tw-w-56 tw-flex tw-flex-nowrap tw-items-center tw-justify-center tw-text-13px">
                                            <button className="tw-flex tw-items-center tw-bg-gray-600 active:tw-bg-gray-700 tw-text-white tw-transition-colors tw-rounded tw-py-0.5 tw-px-2 focus:tw-outline-none" onClick={() => setDetails({ open: (details.id === meeting.id && details.type === 'members' ? !details.open : true), id: meeting.id, type: 'members' })}>
                                                <UsersSVG className="tw-w-4 tw-h-4 tw-mr-1.5" />
                                                {meeting.members?.length} гишүүн
                                            </button>
                                            <button className="tw-flex tw-items-center tw-bg-gray-600 active:tw-bg-gray-700 tw-text-white tw-transition-colors tw-rounded tw-py-0.5 tw-px-2 focus:tw-outline-none tw-ml-4" onClick={() => setDetails({ open: (details.id === meeting.id && details.type === 'projects' ? !details.open : true), id: meeting.id, type: 'projects' })}>
                                                <ClipboardListSVG className="tw-w-4 tw-h-4 tw-mr-1.5" />
                                                {meeting.projects?.length} төсөл
                                            </button>
                                        </div>
                                        <div className="tw-w-56 tw-flex tw-flex-nowrap tw-items-center tw-justify-center tw-ml-auto tw-text-13px">
                                            <ButtonTooltip tooltip="Өөрчлөлт оруулах" beforeSVG={<PenSVG className="tw-w-4 tw-h-4" />} classButton="tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-p-1" onClick={() => navigateMeeting(meeting.id)} />

                                            <ButtonTooltip tooltip="Устгах" beforeSVG={<TrashSVG className="tw-w-4 tw-h-4" />} classAppend="tw-ml-2" classButton="tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors tw-text-white tw-p-1" />
                                        </div>
                                    </div>

                                    <Transition
                                        items={details.open && details.id === meeting.id}
                                        from={{ height: 0 }}
                                        enter={{ height: 'auto' }}
                                        leave={{ height: 0 }}
                                        config={config.stiff}>
                                        {item => item && (anims =>
                                            <div className="tw-overflow-hidden tw-font-medium" style={{ ...anims, fontSize: '13px' }}>
                                                {{
                                                    'members':
                                                        <div className="tw-overflow-y-auto" style={{ maxHeight: 320 }}>
                                                            <div className="tw-sticky tw-top-0 tw-flex tw-flex-nowrap tw-h-8 tw-bg-gray-200 tw-rounded-sm" style={{ marginLeft: '380px' }}>
                                                                <div className="tw-w-10 tw-flex tw-items-center tw-px-1">
                                                                    Д/д
                                                                </div>
                                                                <div className="tw-w-32 tw-flex tw-items-center tw-px-1">
                                                                    Овог
                                                                </div>
                                                                <div className="tw-w-32 tw-flex tw-items-center tw-px-1">
                                                                    Нэр
                                                                </div>
                                                                <div className="tw-w-24 tw-flex tw-items-center tw-px-1">
                                                                    Утас
                                                                </div>
                                                                <div className="tw-w-48 tw-flex tw-items-center tw-px-1">
                                                                    И-мэйл
                                                                </div>
                                                            </div>

                                                            {getEvalautors(meeting.members).map((evaluator, j) =>
                                                                <div className="tw-flex tw-flex-nowrap tw-h-8 tw-border-b tw-border-dashed tw-border-gray-300" style={{ marginLeft: '380px' }} key={evaluator.id}>
                                                                    <div className="tw-w-10 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {j + 1}
                                                                    </div>
                                                                    <div className="tw-w-32 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {evaluator.lastname}
                                                                    </div>
                                                                    <div className="tw-w-32 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {evaluator.firstname}
                                                                    </div>
                                                                    <div className="tw-w-24 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {evaluator.phone}
                                                                    </div>
                                                                    <div className="tw-w-48 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {evaluator.email}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>,
                                                    'projects':
                                                        <div className="tw-overflow-y-auto" style={{ maxHeight: 320 }}>
                                                            <div className="tw-sticky tw-top-0 tw-flex tw-flex-nowrap tw-h-8 tw-bg-gray-200 tw-rounded-sm" style={{ marginLeft: '380px' }}>
                                                                <div className="tw-w-10 tw-flex tw-items-center tw-px-1">
                                                                    Д/д
                                                                </div>
                                                                <div className="tw-w-40 tw-flex tw-items-center tw-px-1">
                                                                    ААН нэр
                                                                </div>
                                                                <div className="tw-w-24 tw-flex tw-items-center tw-px-1">
                                                                    Регистр
                                                                </div>
                                                                <div className="tw-w-40 tw-flex tw-items-center tw-px-1">
                                                                    Төслийн нэр
                                                                </div>
                                                                <div className="tw-w-28 tw-flex tw-items-center tw-px-1">
                                                                    Төслийн төрөл
                                                                </div>
                                                            </div>

                                                            {getProjects(meeting.projects).map((project, j) =>
                                                                <div className="tw-flex tw-flex-nowrap tw-h-8 tw-border-b tw-border-dashed tw-border-gray-300" style={{ marginLeft: '380px' }} key={project.project.id}>
                                                                    <div className="tw-w-10 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {j + 1}
                                                                    </div>
                                                                    <div className="tw-w-40 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {project.companyname}
                                                                    </div>
                                                                    <div className="tw-w-24 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {project.companyregister}
                                                                    </div>
                                                                    <div className="tw-w-40 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {project.project.project_name}
                                                                    </div>
                                                                    <div className="tw-w-28 tw-flex tw-items-center tw-truncate tw-px-1">
                                                                        {project.project.project_type_name}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>,
                                                }[details.type]}
                                            </div>
                                        )}
                                    </Transition>
                                </div>
                            )
                            : <div className="tw-p-4 tw-font-medium tw-italic tw-bg-gray-50 tw-rounded-b-md">
                                <span className="tw-opacity-90">Товлосон уулзалт байхгүй байна.</span>
                            </div>
                        }
                    </div>
                </div>

                <div className="tw-flex tw-justify-center">
                    <button className="tw-py-1.5 tw-px-6 tw-text-15px tw-font-medium tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow tw-mt-8 tw-mb-8" onClick={() => history.push('/meetings/id')}>
                        Уулзалт нэмэх
                    </button>
                </div>
            </div>
        </div>
    )
}
