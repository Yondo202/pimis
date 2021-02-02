import React, { useEffect, useRef, useState } from 'react'
import ArrowSVG from 'assets/svgComponents/arrowSVG'
import PenSVG from 'assets/svgComponents/penSVG'
import TrashSVG from 'assets/svgComponents/trashSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import CloseSVG from 'assets/svgComponents/closeSVG'


const initialState = {
    id: '',
    bdescription: '',
    bcode: '',
    ismining: '',
    bdescription_mon: ''
}

const translation = {
    id: 'ID',
    bdescription_mon: 'Салбар',
    bcode: 'Код',
    ismining: 'Уул уурхай эсэх',
    bdescription: 'Business Sector'
}

function BusinessSectorEditor() {
    const [businessSectors, setBusinessSectors] = useState([])

    const [sort, setSort] = useState({
        by: 'id',
        asc: true
    })

    const sortBy = (by) => setSort({
        by: by,
        asc: by === sort.by ? !sort.asc : true
    })

    const compare = (a, b) => {
        if (a[sort.by] > b[sort.by]) {
            return sort.asc ? 1 : -1
        } else if (a[sort.by] < b[sort.by]) {
            return sort.asc ? -1 : 1
        } else if (a[sort.by] === null) {
            return sort.asc ? 1 : -1
        } else if (b[sort.by] === null) {
            return sort.asc ? -1 : 1
        } else return 0
    }

    const filter = (obj) => {
        if (obj && filterBy) {
            const str = ('' + obj[filterBy]).toLowerCase()
            return str.includes(search.toLowerCase())
        } else {
            return true
        }
    }

    const [search, setSearch] = useState('')

    const [filterBy, setFilterBy] = useState('id')

    const [modal, setModal] = useState({
        open: false,
        id: '',
    })

    const [temp, setTemp] = useState(initialState)

    const openEdit = (id) => {
        setModal({
            open: true,
            id: id
        })
        setTemp({
            id: id,
            bdescription: businessSectors.filter(obj => obj.id === id)[0].bdescription,
            bcode: businessSectors.filter(obj => obj.id === id)[0].bcode,
            ismining: businessSectors.filter(obj => obj.id === id)[0].ismining,
            bdescription_mon: businessSectors.filter(obj => obj.id === id)[0].bdescription_mon
        })
    }

    const openCreate = () => {
        setModal({
            open: true,
            id: ''
        })
        setTemp(initialState)
    }

    const handleInput = e => {
        setTemp({ ...temp, [e.target.name]: e.target.value })
    }

    const handleNumberInput = e => {
        setTemp({ ...temp, [e.target.name]: isNaN(parseInt(e.target.value)) ? null : 0 })
    }

    const [confirm, setConfirm] = useState({
        open: false,
        id: '',
    })

    const openConfirm = (id) => setConfirm({
        open: true,
        id: id
    })

    useEffect(() => {
        fetch('http://192.168.88.78:3000/api/business-sector')
            .then(res => res.json())
            .then(data => setBusinessSectors(data.data))
    }, [])

    const handleCreate = (id) => {
        // fetch()
    }

    const handleDelete = (id) => {
        // fetch()
    }

    const handleUpdate = (id) => {
        // fetch()
    }

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

    return (
        <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-text-gray-700 tw-h-screen tw-overflow-hidden tw-flex tw-flex-col tw-px-6">
            <div className="tw-mt-10 tw-mb-6">
                <div className="tw-inline-flex tw-w-full sm:tw-w-auto tw-min-w-min tw-items-center tw-rounded-full tw-px-3 tw-py-2 tw-bg-gray-100 tw-shadow-md">
                    <SearchSVG className="tw-w-5 tw-h-5 tw-text-blue-500 tw-flex-shrink-0" />
                    <input className="tw-flex-grow sm:tw-w-96 tw-bg-white tw-text-sm tw-outline-none tw-py-1 tw-px-2 tw-ml-2 focus:tw-border-blue-600 tw-transition tw-duration-300" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="">
                        <button className="tw-whitespace-nowrap tw-text-sm tw-font-semibold tw-py-1 tw-pl-2 tw-ml-2 focus:tw-outline-none tw-flex tw-justify-between tw-items-center tw-rounded-md active:tw-bg-gray-200" ref={buttonRef} onClick={() => setDropdown(!dropdown)}>
                            {translation[filterBy]}
                            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-text-blue-600 tw-ml-1 tw-mr-2 tw-animate-pulse" />
                        </button>
                        <div className={`tw-absolute tw-transform tw-translate-y-2 tw-z-10 tw-bg-white tw-rounded-md tw-shadow-md tw-divide-y tw-divide-dashed ${dropdown ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`} ref={dropdownRef}>
                            {
                                businessSectors[0] && Object.keys(translation).map(key => <div className="tw-text-sm tw-font-semibold tw-py-2 tw-pl-2 tw-pr-8 hover:tw-bg-blue-100" onClick={() => { setFilterBy(key); setDropdown(false) }} key={key}>{translation[key]}</div>)
                            }
                        </div>
                    </div>
                </div>
            </div>

            <table className="tw-block tw-relative tw-border-collapse tw-h-3/4 tw-rounded-md tw-shadow-lg tw-border tw-border-gray-200 tw-border-opacity-40 tw-overflow-y-auto">
                <thead className="">
                    <tr className="tw-h-16">
                        <th className="tw-px-4 tw-sticky tw-top-0 tw-bg-gray-100"></th>
                        <th className="tw-sticky tw-top-0 tw-bg-gray-100">
                            <button className="tw-flex tw-items-center tw-text-sm tw-font-bold tw-uppercase tw-text-gray-500 tw-rounded-md focus:tw-outline-none active:tw-bg-gray-200 tw-py-2 tw-px-2" onClick={() => sortBy('id')}>
                                <span className={`${sort.by === 'id' && 'tw-text-blue-500'} tw-transition tw-duration-300`}>ID</span>
                                <ArrowSVG className={`tw-w-4 tw-h-4 tw-transform ${sort.by === 'id' ? (sort.asc ? 'tw-rotate-90 tw-text-blue-600' : 'tw--rotate-90 tw-text-blue-600') : 'tw-rotate-90 tw-animate-pulse'}`} />
                            </button>
                        </th>
                        <th className="tw-px-4 tw-sticky tw-top-0 tw-bg-gray-100">
                            <button className="tw-flex tw-items-center tw-text-sm tw-font-bold tw-uppercase tw-text-gray-500 tw-rounded-md focus:tw-outline-none active:tw-bg-gray-200 tw-py-2 tw-px-2" onClick={() => sortBy('bdescription_mon')}>
                                <span className={`${sort.by === 'bdescription_mon' && 'tw-text-blue-500'} tw-transition tw-duration-300`}>Салбар</span>
                                <ArrowSVG className={`tw-w-4 tw-h-4 tw-transform ${sort.by === 'bdescription_mon' ? (sort.asc ? 'tw-rotate-90 tw-text-blue-600' : 'tw--rotate-90 tw-text-blue-600') : 'tw-rotate-90 tw-animate-pulse'}`} />
                            </button>
                        </th>
                        <th className="tw-px-4 tw-sticky tw-top-0 tw-bg-gray-100">
                            <button className="tw-flex tw-items-center tw-text-sm tw-font-bold tw-uppercase tw-text-gray-500 tw-rounded-md focus:tw-outline-none active:tw-bg-gray-200 tw-py-2 tw-px-2" onClick={() => sortBy('bcode')}>
                                <span className={`${sort.by === 'bcode' && 'tw-text-blue-500'} tw-transition tw-duration-300`}>Код</span>
                                <ArrowSVG className={`tw-w-4 tw-h-4 tw-transform ${sort.by === 'bcode' ? (sort.asc ? 'tw-rotate-90 tw-text-blue-600' : 'tw--rotate-90 tw-text-blue-600') : 'tw-rotate-90 tw-animate-pulse'}`} />
                            </button>
                        </th>
                        <th className="tw-px-4 tw-sticky tw-top-0 tw-bg-gray-100">
                            <button className="tw-flex tw-items-center tw-text-sm tw-font-bold tw-uppercase tw-text-gray-500 tw-rounded-md focus:tw-outline-none active:tw-bg-gray-200 tw-py-2 tw-px-2" onClick={() => sortBy('ismining')}>
                                <span className={`${sort.by === 'ismining' && 'tw-text-blue-500'} tw-leading-tight tw-transition tw-duration-300`}>Уул уурхай эсэх</span>
                                <ArrowSVG className={`tw-w-4 tw-h-4 tw-flex-shrink-0 tw-transform ${sort.by === 'ismining' ? (sort.asc ? 'tw-rotate-90 tw-text-blue-600' : 'tw--rotate-90 tw-text-blue-600') : 'tw-rotate-90 tw-animate-pulse'}`} />
                            </button>
                        </th>
                        <th className="tw-px-4 tw-sticky tw-top-0 tw-bg-gray-100">
                            <button className="tw-flex tw-items-center tw-text-sm tw-font-bold tw-uppercase tw-text-gray-500 tw-rounded-md focus:tw-outline-none active:tw-bg-gray-200 tw-py-2 tw-px-2" onClick={() => sortBy('bdescription')}>
                                <span className={`${sort.by === 'bdescription' && 'tw-text-blue-500'} tw-transition tw-duration-300`}>Business Sector</span>
                                <ArrowSVG className={`tw-w-4 tw-h-4 tw-transform ${sort.by === 'bdescription' ? (sort.asc ? 'tw-rotate-90 tw-text-blue-600' : 'tw--rotate-90 tw-text-blue-600') : 'tw-rotate-90 tw-animate-pulse'}`} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className="tw-divide-y tw-divide-dashed">
                    {
                        businessSectors.sort(compare).filter(filter).map(item => (
                            <tr className="tw-bg-white tw-text-sm tw-h-20" key={item.id}>
                                <td className="">
                                    <div className="tw-flex tw-items-center tw-w-20 tw-pl-2">
                                        <button className="tw-p-1 focus:tw-outline-none tw-rounded-md active:tw-bg-gray-200" title="Засварлах">
                                            <PenSVG className="tw-w-5 tw-h-5 tw-text-blue-500 hover:tw-text-blue-700" onClick={() => openEdit(item.id)} />
                                        </button>
                                        <button className="tw-p-1 focus:tw-outline-none tw-rounded-md active:tw-bg-gray-200" title="Устгах">
                                            <TrashSVG className="tw-w-5 tw-h-5 tw-text-red-500 hover:tw-text-red-700" onClick={() => openConfirm(item.id)} />
                                        </button>
                                    </div>
                                </td>
                                <td className="tw-text-center">{item.id}</td>
                                <td className="">{item.bdescription_mon}</td>
                                <td className="tw-text-center">{item.bcode}</td>
                                <td className="tw-text-center">{item.ismining === 0 ? 'Тийм' : 'Үгүй'}</td>
                                <td className="">{item.bdescription}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <button className="tw-bg-green-500 focus:tw-outline-none tw-px-4 tw-py-2 tw-mt-8 tw-font-bold tw-text-white tw-rounded-full tw-self-center tw-flex tw-items-center hover:tw-shadow-lg active:tw-bg-green-600" onClick={openCreate}>
                <PlusSVG className="tw-w-6 tw-h-6 tw-text-white tw-mr-1 tw-animate-pulse" />
                Шинээр нэмэх
            </button>

            <div className={`tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-70 ${modal.open ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`}>
                <div className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-p-4 tw-m-2 tw-w-full tw-max-w-3xl">
                    <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-4 tw-right-4" onClick={() => setModal({ ...modal, open: false })}>
                        <CloseSVG className="tw-w-8 tw-h-8" />
                    </button>
                    <div className="tw-mt-8 tw-mb-2 tw-flex tw-flex-col">
                        <h3 className="tw-text-xl tw-font-bold tw-text-center tw-mb-2">{modal.id ? 'Засварлах' : 'Шинээр нэмэх'}</h3>
                        {temp.id && <label className="tw-font-semibold tw-pl-4 tw-text-blue-600">ID: {temp.id}</label>}
                    </div>
                    <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-mb-4">
                        <label className="tw-w-full sm:tw-w-40 tw-min-w-min tw-pl-2 sm:tw-text-center tw-font-semibold">Салбар:</label>
                        <input className="tw-w-full sm:tw-flex-grow tw-min-w-min tw-max-w-lg tw-text-sm tw-bg-transparent tw-rounded-md tw-py-2 tw-px-2 tw-border tw-border-gray-300 tw-outline-none focus:tw-border-blue-600 tw-transition tw-duration-300" type="text" value={temp.bdescription_mon} name="bdescription_mon" onChange={handleInput} />
                    </div>
                    <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-mb-4">
                        <label className="tw-w-full sm:tw-w-40 tw-min-w-min tw-pl-2 sm:tw-text-center tw-font-semibold">Код:</label>
                        <input className="tw-w-full sm:tw-flex-grow tw-min-w-min tw-max-w-lg tw-text-sm tw-bg-transparent tw-rounded-md tw-py-2 tw-px-2 tw-border tw-border-gray-300 tw-outline-none focus:tw-border-blue-600 tw-transition tw-duration-300" type="text" value={temp.bcode} name="bcode" onChange={handleInput} />
                    </div>
                    <div className="tw-flex tw-flex-row tw-items-center tw-mb-4 tw-font-semibold">
                        <label className="tw-w-40 tw-min-w-min tw-pl-2 sm:tw-text-center">Уул уурхай эсэх:</label>
                        <input className="tw-ml-8 tw-w-4 tw-h-4 tw-mr-1" type="radio" name="ismining" checked={temp.ismining === 0} value={0} onChange={handleNumberInput} />Тийм
                        <input className="tw-ml-8 tw-w-4 tw-h-4 tw-mr-1" type="radio" name="ismining" checked={temp.ismining === null} value={undefined} onChange={handleNumberInput} />Үгүй
                    </div>
                    <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-mb-4">
                        <label className="tw-w-full sm:tw-w-40 tw-min-w-min tw-pl-2 sm:tw-text-center tw-font-semibold">Салбар англиар:</label>
                        <input className="tw-w-full sm:tw-flex-grow tw-min-w-min tw-max-w-lg tw-text-sm tw-bg-transparent tw-rounded-md tw-py-2 tw-px-2 tw-border tw-border-gray-300 tw-outline-none focus:tw-border-blue-600 tw-transition tw-duration-300" type="text" value={temp.bdescription} name="bdescription" onChange={handleInput} />
                    </div>
                    <button className="tw-py-2 tw-px-8 focus:tw-outline-none hover:tw-shadow-lg active:tw-bg-green-600 tw-bg-green-500 tw-rounded-lg tw-float-right tw-mt-4 tw-font-semibold tw-text-white" onClick={modal.id ? handleUpdate : handleCreate}>Хадгалах</button>
                </div>
            </div>

            <div className={`tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-70 ${confirm.open ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`}>
                <div className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-p-4 tw-m-2 tw-w-full tw-max-w-xl tw-flex tw-flex-col tw-border-2 tw-border-red-600 tw-border-opacity-80">
                    <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-4 tw-right-4" onClick={() => setConfirm({ ...confirm, open: false })}>
                        <CloseSVG className="tw-w-8 tw-h-8" />
                    </button>
                    <h3 className="tw-text-xl tw-font-bold tw-mb-4 tw-text-center">Устгах</h3>
                    <label className="tw-font-semibold tw-mb-2 tw-pl-4 tw-text-red-500">ID: {confirm.id}</label>
                    <p className="tw-mb-6 tw-font-semibold">
                        <span className="tw-mr-1 tw-text-red-500">"{businessSectors.filter(obj => obj.id === confirm.id)[0] && businessSectors.filter(obj => obj.id === confirm.id)[0].bdescription_mon}"</span>
                        гэсэн салбарыг устгах уу?
                    </p>
                    <div className="tw-flex tw-justify-end">
                        <button className="tw-py-2 tw-px-8 tw-bg-green-500 active:tw-bg-green-600 tw-text-white tw-font-semibold tw-rounded-lg tw-mr-2 focus:tw-outline-none hover:tw-shadow-lg" onClick={() => setConfirm({ ...confirm, open: false })}>Болих</button>
                        <button className="tw-py-2 tw-px-8 tw-bg-red-500 active:tw-bg-red-600 tw-text-white tw-font-semibold tw-rounded-lg focus:tw-outline-none hover:tw-shadow-lg" onClick={handleDelete}>Устгах</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessSectorEditor
