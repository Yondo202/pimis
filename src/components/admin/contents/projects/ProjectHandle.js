import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import SearchSVG from 'assets/svgComponents/searchSVG'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import PlusSVG from 'assets/svgComponents/plusSVG'
import EditDropdown from './editDropdown'
import FilterDropDown from './filterDropdown'
import HeaderButton from './headerButton'
import DeleteModal from './deleteModal'
import EvaluatorsModal from './evaluatorsModal'


export const translation = {
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

    const handleDeleteModalOpen = (id) => {
        setModalDelete({ open: true, id: id })
    }

    const [modalEvaluators, setModalEvaluators] = useState({
        open: false,
        id: '',
    })

    const handleEvaluatorsModalOpen = (id) => {
        setModalEvaluators({ open: true, id: id })
    }

    const editDropdownItems = [
        { label: 'Засах', function: handleEditProject },
        { label: 'Үнэлгээний хорооны гишүүд томилох', function: handleEvaluatorsModalOpen },
        { label: 'Устгах', function: handleDeleteModalOpen },
    ]

    return (
        <div className="tw-text-gray-700">
            <div className="tw-p-2 tw-text-lg tw-font-medium">
                Дэмжлэг хүссэн өргөдлийн маягтууд
            </div>

            <div className="tw-flex tw-justify-between tw-items-center tw-mt-2">
                <div className="tw-inline-flex tw-items-center tw-flex-grow tw-max-w-md tw-p-1 tw-pl-2 tw-rounded-lg tw-shadow-md tw-bg-white">
                    <SearchSVG className="tw-w-4 tw-h-4 tw-flex-shrink-0" />

                    <input className="tw-bg-transparent tw-flex-grow tw-w-20 focus:tw-outline-none tw-py-0.5 tw-pl-1 tw-pr-2 tw-text-sm" type="text" value={search} onChange={e => setSearch(e.target.value)} />

                    <FilterDropDown filterBy={filterBy} setFilterBy={setFilterBy} />
                </div>

                <button className="tw-py-1 tw-pl-1 tw-pr-2 tw-bg-gray-500 tw-text-white active:tw-bg-gray-600 focus:tw-outline-none tw-transition-colors tw-text-sm tw-rounded-md tw-flex tw-items-center tw-truncate tw-flex-shrink" onClick={handleCreateProject}>
                    <PlusSVG className="tw-w-4 tw-h-4" />
                    Өргөдлийн маягт нэмэх
                </button>
            </div>

            <table className="tw-relative tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-4 tw-text-sm">
                <thead>
                    <tr className="tw-border-b">
                        {Object.keys(translation).map(key =>
                            <th className="tw-sticky tw-top-0 tw-p-1" key={key}>
                                <HeaderButton name={key} sortBy={sortBy} sort={sort} />
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
                                    0: 'ААН',
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
                                <EditDropdown id={project.id} items={editDropdownItems} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteModal modalDelete={modalDelete} setModalDelete={setModalDelete} />

            <EvaluatorsModal modalEvaluators={modalEvaluators} setModalEvaluators={setModalEvaluators} />
        </div>
    )
}