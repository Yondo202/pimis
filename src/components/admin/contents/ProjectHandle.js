import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import SearchSVG from 'assets/svgComponents/searchSVG'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import PenAltSVG from 'assets/svgComponents/penAltSVG'
import TrashSVG from 'assets/svgComponents/trashSVG'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-spring/renderprops'
import CloseSVG from 'assets/svgComponents/closeSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import UsersSVG from 'assets/svgComponents/usersSVG'


const translation = {
    id: 'ID',
    project_type: 'Төрөл',
    company_name: 'Аж ахуйн нэгжийн нэр',
    project_name: 'Төслийн нэр',
    project_start: 'Эхлэх хугацаа',
    project_end: 'Дуусах хугацаа',
    confirmed: 'Баталгаажсан эсэх',
}

export default function ProjectHandle() {
    const [projects, setProjects] = useState([])

    const [sort, setSort] = useState({
        by: 'id',
        asc: true
    })

    const sortBy = (by) => setSort({
        by: by,
        asc: by === sort.by ? !sort.asc : true
    })

    const compare = (a, b) => {
        const sortA = a[sort.by]
        const sorbB = b[sort.by]
        const caseA = isNaN(sortA) ? ('' + sortA).toLowerCase() : +sortA
        const caseB = isNaN(sorbB) ? ('' + sorbB).toLowerCase() : +sorbB
        if (caseA > caseB) {
            return sort.asc ? 1 : -1
        } else if (caseA < caseB) {
            return sort.asc ? -1 : 1
        } else if (sortA === null) {
            return sort.asc ? 1 : -1
        } else if (sorbB === null) {
            return sort.asc ? -1 : 1
        } else return 0
    }

    const [search, setSearch] = useState('')

    const [filterBy, setFilterBy] = useState('id')

    const filter = (obj) => {
        if (obj && filterBy) {
            const str = ('' + obj[filterBy]).toLowerCase()
            return str.includes(search.toLowerCase())
        } else {
            return true
        }
    }

    useEffect(() => {
        axios.get('projects', {
            headers: {
                'Authorization': getLoggedUserToken(),
            },
            params: {
                isAll: true,
            },
        }).then(res => {
            console.log(res.data)
            setProjects(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }, [])

    const [dropdown, setDropdown] = useState(false)
    const dropdownRef = useRef()
    const buttonRef = useRef()

    const handleClickOutside = (e) => {
        if (dropdown && !dropdownRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const handleSelect = (key) => {
        setFilterBy(key)
        setDropdown(false)
    }

    const TitleButton = (props) =>
        <button className="tw-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-md active:tw-bg-gray-100 focus:tw-outline-none" onClick={() => sortBy(props.name)}>
            <span className="tw-text-sm tw-font-medium">
                {translation[props.name]}
            </span>

            <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-flex-shrink-0 tw-ml-1 tw-transform ${sort.by === props.name && !sort.asc && 'tw-rotate-180'}`} />
        </button>

    const UrgudulCtx = useContext(UrgudulContext)
    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleEditProject = (id) => {
        axios.get(`projects/${id}`, {
            headers: {
                'Authorization': getLoggedUserToken(),
            }
        }).then(res => {
            console.log(res.data)
            UrgudulCtx.setData(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Маягтын мэдээллийг амжилттай уншлаа.' })
            history.push('/urgudul/1')
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Маягтын мэдээллийг уншиж чадсангүй.' })
        })
    }

    const handleCreateProject = () => {
        UrgudulCtx.setData({})
        history.push('/urgudul/1')
    }

    const [modalDelete, setModalDelete] = useState({
        open: false,
        id: '',
    })
    const showDelete = modalDelete.open

    const handleDeleteOpen = (id) => {
        setModalDelete({ open: true, id: id })
    }

    const handleDeleteClose = () => {
        setModalDelete({ ...modalDelete, open: false })
    }

    const handleDeleteProject = () => {
        axios.delete()
    }

    const [modalEvaluators, setModalEvaluators] = useState({
        open: false,
        id: '',
    })
    const showEvaluators = modalEvaluators.open

    const handleEvaluatorsOpen = (id) => {
        setModalEvaluators({ open: true, id: id })
    }

    const handleEvaluatorsClose = () => {
        setModalEvaluators({ ...modalEvaluators, open: false })
    }

    return (
        <div className="tw-text-gray-700">
            <div className="tw-p-2 tw-text-lg tw-font-medium">
                Дэмжлэг хүссэн өргөдлийн маягтууд
            </div>

            <div className="tw-flex tw-justify-between tw-items-center tw-mt-2">
                <div className="tw-inline-flex tw-items-center tw-flex-grow tw-max-w-md tw-p-1 tw-pl-2 tw-rounded-lg tw-shadow-md tw-bg-white">
                    <SearchSVG className="tw-w-4 tw-h-4 tw-flex-shrink-0" />

                    <input className="tw-bg-transparent tw-flex-grow tw-w-20 focus:tw-outline-none tw-py-0.5 tw-pl-1 tw-pr-2 tw-text-sm" type="text" value={search} onChange={e => setSearch(e.target.value)} />

                    <div className="tw-relative tw-border-l tw-border-gray-500 tw-pl-1">
                        <button className="tw-flex tw-items-center tw-px-1 tw-rounded-md focus:tw-outline-none active:tw-bg-gray-100" onClick={() => setDropdown(!dropdown)} ref={buttonRef}>
                            <span className="tw-text-sm tw-whitespace-nowrap tw-font-medium">
                                {translation[filterBy]}
                            </span>
                            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-ml-1 tw-flex-shrink-0" />
                        </button>

                        <div className={`tw-absolute tw-top-7 tw--right-4 tw-w-44 tw-grid tw-grid-cols-1 tw-z-10 tw-bg-white tw-rounded-md tw-shadow-md tw-divide-y tw-divide-dashed ${dropdown ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition`} ref={dropdownRef}>
                            {Object.keys(translation).map(key =>
                                <button className="tw-text-sm tw-font-medium tw-p-2 tw-pl-3 hover:tw-bg-blue-100 tw-whitespace-nowrap tw-text-left first:tw-rounded-t-md last:tw-rounded-b-md" key={key} onClick={() => handleSelect(key)}>
                                    {translation[key]}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <button className="tw-py-1 tw-pl-1 tw-pr-2 tw-bg-gray-500 tw-text-white active:tw-bg-gray-600 focus:tw-outline-none tw-transition-colors tw-text-sm tw-rounded-md tw-flex tw-items-center tw-truncate tw-flex-shrink" onClick={handleCreateProject}>
                    <PlusSVG className="tw-w-4 tw-h-4" />
                    Өргөдлийн маягт нэмэх
                </button>
            </div>

            <table className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-4 tw-text-sm">
                <thead>
                    <tr className="tw-border-b">
                        {Object.keys(translation).map(key =>
                            <th className="tw-sticky tw-top-0 tw-p-1" key={key}>
                                <TitleButton name={key} />
                            </th>
                        )}
                        <th className="tw-sticky tw-top-0 tw-py-1 tw-px-3">
                            <span className="tw-text-sm tw-font-medium">Үйлдэл</span>
                        </th>
                    </tr>
                </thead>

                <tbody className="tw-divide-y tw-divide-dashed">
                    {projects.sort(compare).filter(filter).map(project =>
                        <tr className="odd:tw-bg-gray-100" key={project.id}>
                            <td className="tw-p-2 tw-text-center">
                                {project.id}
                            </td>
                            <td className="tw-p-2">
                                {{
                                    1: 'Кластер',
                                    0: 'Сompany',
                                }[project.project_type] || ''}
                            </td>
                            <td className="tw-p-2">
                                {project.company_name}
                            </td>
                            <td className="tw-p-2">
                                {project.project_name}
                            </td>
                            <td className="tw-p-2">
                                {project.project_start}
                            </td>
                            <td className="tw-p-2">
                                {project.project_end}
                            </td>
                            <td className={`tw-p-2 tw-text-center ${project.confirmed === 1 ? 'tw-text-green-500' : 'tw-text-red-500'}`}>
                                {project.confirmed === 1 ? 'Тийм' : 'Үгүй'}
                            </td>
                            <td>
                                <div className="tw-p-1 tw-flex tw-justify-evenly tw-items-center">
                                    <ButtonTooltip tooltip="Засварлах" beforeSVG={<PenAltSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} onClick={() => handleEditProject(project.id)} classButton="tw-text-gray-600 active:tw-text-gray-500" />
                                    <ButtonTooltip tooltip="Үнэлгээний хорооны гишүүд" beforeSVG={<UsersSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} onClick={() => handleEvaluatorsOpen(project.id)} classButton="tw-text-gray-600 active:tw-text-gray-500" />
                                    <ButtonTooltip tooltip="Устгах" beforeSVG={<TrashSVG className="tw-w-5 tw-h-5 tw-transition-colors" />} onClick={() => handleDeleteOpen(project.id)} classButton="tw-text-gray-600 active:tw-text-gray-500" />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>

                <Transition items={showDelete}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}>
                    {showDelete => showDelete && (props =>
                        <div style={props} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8">
                            <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4 tw-m-2 tw-w-full tw-max-w-xl tw-flex tw-flex-wrap tw-justify-center tw-border-2 tw-border-red-600 tw-border-opacity-80">
                                <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2" onClick={handleDeleteClose}>
                                    <CloseSVG className="tw-w-6 tw-h-6" />
                                </button>
                                <div className="tw-w-full tw-text-center tw-px-2 tw-py-4 tw-text-base">
                                    <span className="tw-text-red-500 tw-text-lg tw-mr-2">
                                        ID:{modalDelete.id}
                                    </span>
                                    өргөдлийн маягтыг устгах уу?
                                </div>
                                <button className="tw-py-1 tw-px-4 tw-bg-gray-500 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-600 tw-transition-colors tw-mr-3" onClick={handleDeleteProject}>
                                    Тийм
                                </button>
                                <button className="tw-py-1 tw-px-4 tw-bg-gray-500 tw-text-white tw-rounded-md focus:tw-outline-none active:tw-bg-gray-600 tw-transition-colors" onClick={handleDeleteClose}>
                                    Үгүй
                                </button>
                            </div>
                        </div>
                    )}
                </Transition>

                <Transition items={showEvaluators}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}>
                    {showEvaluators => showEvaluators && (props =>
                        <div style={props} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8">
                            <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-p-4 tw-m-2 tw-w-full tw-max-w-xl">
                                <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2" onClick={handleEvaluatorsClose}>
                                    <CloseSVG className="tw-w-6 tw-h-6" />
                                </button>

                                <h1>Үнэлгээний хорооны гишүүд</h1>
                                {nemsenGishuud.map(evaluator =>
                                    <div className="tw-bg-gray-300 tw-rounded-md tw-inline-flex tw-items-center">
                                        {evaluator.name}
                                        <CloseSVG className="tw-w-4 tw-h-4" />
                                    </div>
                                )}
                                <input className="tw-w-full tw-border" />

                                {unelgeeniiHorooniiGishuud.map(evaluator =>
                                    <div className="odd:tw-bg-blue-100">
                                        {evaluator.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Transition>
            </table>
        </div>
    )
}

const nemsenGishuud = [
    { name: 'Bat' },
    { name: 'Bold' }
]

const unelgeeniiHorooniiGishuud = [
    { name: 'Bat' },
    { name: 'Bold' },
    { name: 'Zulaa' },
    { name: 'Naraa' },
    { name: 'Tsetsgee' },
    { name: 'Enkhee' },
    { name: 'Tuvshin' },
]