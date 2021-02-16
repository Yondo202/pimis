import React, { useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import SearchSVG from 'assets/svgComponents/searchSVG'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'


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
            <span className="tw-text-sm">
                {translation[props.name]}
            </span>

            <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-flex-shrink-0 tw-ml-1 tw-transform ${sort.by === props.name && !sort.asc && 'tw-rotate-180'}`} />
        </button>

    return (
        <div className="tw-text-gray-700">
            <div className="tw-p-2 tw-text-lg tw-font-medium">
                Дэмжлэг хүссэн өргөдлийн маягтууд
            </div>

            <div className="tw-flex tw-mt-2">
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
            </div>

            <table className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-4 tw-text-sm">
                <thead>
                    <tr className="tw-border-b">
                        {Object.keys(translation).map(key =>
                            <th className="tw-sticky tw-top-0 tw-p-1" key={key}>
                                <TitleButton name={key} />
                            </th>
                        )}
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
                            <td className="tw-p-2 tw-text-center">
                                {project.confirmed === 1 ? 'Тийм' : 'Үгүй'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}