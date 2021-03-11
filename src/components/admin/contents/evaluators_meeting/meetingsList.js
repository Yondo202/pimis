import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { useHistory } from 'react-router'
import { Transition } from 'react-spring/renderprops'
import UsersSVG from 'assets/svgComponents/usersSVG'
import ClipboardListSVG from 'assets/svgComponents/clipboardListSVG'
import TrashSVG from 'assets/svgComponents/trashSVG'
import PenSVG from 'assets/svgComponents/penSVG'
import './style.css'


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

    const getProjects = (idArr) => projects.filter(project => idArr.includes(project.project.id))

    const getEvalautors = (idArr) => evaluators.filter(evaluator => idArr.includes(evaluator.id))

    const [details, setDetails] = useState({
        open: false,
        id: null,
        key: null,
    })

    return (
        <div className="tw-text-sm tw-text-gray-700">
            <div className="tw-text-lg tw-font-medium tw-text-center tw-p-2 tw-mt-10">
                Үнэлгээний хорооны уулзалт
            </div>

            <div className="tw-max-w-5xl tw-flex tw-flex-nowrap tw-h-10 tw-mt-6 tw-font-medium tw-rounded-t-md tw-bg-gray-200">
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
                <div className="tw-w-56 tw-flex tw-items-center tw-justify-center">
                    Үйлдэл
                </div>
            </div>

            {meetings.map((meeting, i) =>
                <div className="tw-max-w-5xl" key={meeting.id}>
                    <div className="tw-flex tw-flex-nowrap tw-h-10 tw-border-b tw-border-dashed tw-border-gray-300 tw-rounded-b-md tw-bg-gray-100">
                        <div className="tw-w-12 tw-flex tw-items-center tw-justify-center tw-font-medium">
                            {i + 1}
                        </div>
                        <div className="tw-w-40 tw-flex tw-items-center tw-justify-center tw-font-medium">
                            {meeting.status}
                        </div>
                        <div className="tw-w-40 tw-flex tw-items-center tw-justify-center tw-font-medium">
                            {meeting.sdate}
                        </div>
                        <div className="tw-w-56 tw-flex tw-flex-nowrap tw-items-center tw-justify-center" style={{ fontSize: '13px' }}>
                            <button className="tw-flex tw-items-center tw-bg-gray-600 active:tw-bg-gray-700 tw-text-white tw-transition-colors tw-rounded-md tw-py-0.5 tw-px-2 focus:tw-outline-none" onClick={() => setDetails({ open: details.type === 'members' ? !details.open : true, id: meeting.id, type: 'members' })}>
                                <UsersSVG className="tw-w-4 tw-h-4 tw-mr-1.5" />
                                {meeting.members?.length} гишүүн
                            </button>
                            <button className="tw-flex tw-items-center tw-bg-gray-600 active:tw-bg-gray-700 tw-text-white tw-transition-colors tw-rounded-md tw-py-0.5 tw-px-2 focus:tw-outline-none tw-ml-4" onClick={() => setDetails({ open: details.type === 'projects' ? !details.open : true, id: meeting.id, type: 'projects' })}>
                                <ClipboardListSVG className="tw-w-4 tw-h-4 tw-mr-1.5" />
                                {meeting.projects?.length} төсөл
                            </button>
                        </div>
                        <div className="tw-w-56 tw-flex tw-flex-nowrap tw-items-center tw-justify-center" style={{ fontSize: '13px' }}>
                            <button className="tw-flex tw-items-center tw-bg-gray-600 active:tw-bg-gray-700 tw-text-white tw-transition-colors tw-rounded-md tw-py-0.5 tw-px-2 focus:tw-outline-none" onClick={() => navigateMeeting(meeting.id)}>
                                <PenSVG className="tw-w-4 tw-h-4 tw-mr-1.5" />
                                Өөрчлөх
                            </button>
                            <button className="tw-flex tw-items-center tw-bg-gray-600 active:tw-bg-gray-700 tw-text-white tw-transition-colors tw-rounded-md tw-py-0.5 tw-px-2 focus:tw-outline-none tw-ml-4" onClick={() => { }}>
                                <TrashSVG className="tw-w-4 tw-h-4 tw-mr-1.5" />
                                Устгах
                            </button>
                        </div>
                    </div>

                    <Transition
                        items={details.open && details.id === meeting.id}
                        from={{ height: 0 }}
                        enter={{ height: 'auto' }}
                        leave={{ height: 0 }}>
                        {item => item && (anims =>
                            <div className="tw-overflow-hidden tw-font-medium" style={{ ...anims, fontSize: '13px' }}>
                                {{
                                    'members':
                                        <>
                                            <div className="tw-flex tw-flex-nowrap tw-h-8 tw-bg-gray-200 tw-rounded-sm" style={{ marginLeft: '340px' }}>
                                                <div className="tw-w-10 tw-flex tw-items-center tw-justify-center">
                                                    Д/д
                                                </div>
                                                <div className="tw-w-28 tw-flex tw-items-center tw-justify-center">
                                                    Овог
                                                </div>
                                                <div className="tw-w-28 tw-flex tw-items-center tw-justify-center">
                                                    Нэр
                                                </div>
                                                <div className="tw-w-20 tw-flex tw-items-center tw-justify-center">
                                                    Утас
                                                </div>
                                                <div className="tw-w-32 tw-flex tw-items-center tw-justify-center">
                                                    И-мэйл
                                                </div>
                                            </div>

                                            {getEvalautors(meeting.members).map((evaluator, j) =>
                                                <div className="tw-flex tw-flex-nowrap tw-h-8 tw-border-b tw-border-dashed tw-border-gray-300" style={{ marginLeft: '340px' }} key={evaluator.id}>
                                                    <div className="tw-w-10 tw-flex tw-items-center tw-justify-center">
                                                        {j + 1}
                                                    </div>
                                                    <div className="tw-w-28 tw-flex tw-items-center tw-justify-center">
                                                        {evaluator.lastname}
                                                    </div>
                                                    <div className="tw-w-28 tw-flex tw-items-center tw-justify-center">
                                                        {evaluator.firstname}
                                                    </div>
                                                    <div className="tw-w-20 tw-flex tw-items-center tw-justify-center">
                                                        {evaluator.phone}
                                                    </div>
                                                    <div className="tw-w-40 tw-flex tw-items-center tw-justify-center">
                                                        {evaluator.email}
                                                    </div>
                                                </div>
                                            )}
                                        </>,
                                    'projects':
                                        <>
                                            <div className="tw-flex tw-flex-nowrap tw-h-8 tw-bg-gray-200 tw-rounded-sm" style={{ marginLeft: '340px' }}>
                                                <div className="tw-w-10 tw-flex tw-items-center tw-justify-center">
                                                    Д/д
                                                </div>
                                                <div className="tw-w-32 tw-flex tw-items-center tw-justify-center">
                                                    ААН нэр
                                                </div>
                                                <div className="tw-w-24 tw-flex tw-items-center tw-justify-center">
                                                    Регистр
                                                </div>
                                                <div className="tw-w-32 tw-flex tw-items-center tw-justify-center">
                                                    Төслийн нэр
                                                </div>
                                                <div className="tw-w-28 tw-flex tw-items-center tw-justify-center">
                                                    Төслийн төрөл
                                                </div>
                                            </div>

                                            {getProjects(meeting.projects).map((project, j) =>
                                                <div className="tw-flex tw-flex-nowrap tw-h-8 tw-border-b tw-border-dashed tw-border-gray-300" style={{ marginLeft: '340px' }} key={project.project.id}>
                                                    <div className="tw-w-10 tw-flex tw-items-center tw-justify-center">
                                                        {j + 1}
                                                    </div>
                                                    <div className="tw-w-32 tw-flex tw-items-center tw-justify-center">
                                                        {project.companyname}
                                                    </div>
                                                    <div className="tw-w-24 tw-flex tw-items-center tw-justify-center">
                                                        {project.companyregister}
                                                    </div>
                                                    <div className="tw-w-32 tw-flex tw-items-center tw-justify-center">
                                                        {project.project.project_name}
                                                    </div>
                                                    <div className="tw-w-28 tw-flex tw-items-center tw-justify-center">
                                                        {project.project.project_type_name}
                                                    </div>
                                                </div>
                                            )}
                                        </>,
                                }[details.type]}
                            </div>
                        )}
                    </Transition>
                </div>
            )}

            <div className="tw-flex tw-justify-end lg:tw-justify-center">
                <button className="tw-py-1 tw-px-4 tw-bg-gray-600 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-mt-4 lg:tw-mt-8 tw-mb-4 tw-mx-4" onClick={() => history.push('/meetings/id')}>
                    Уулзалт нэмэх
                </button>
            </div>
        </div>
    )
}