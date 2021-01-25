import React, { useState, useEffect } from 'react'
import SearchSVG from 'assets/svgComponents/searchSVG'
import axios from 'axiosbase'
import PenSVG from 'assets/svgComponents/penSVG'

function SearchSelect(props) {
    const [fetch, setFetch] = useState([])

    useEffect(() => {
        if (props.data && props.data.length) {
            setFetch(props.data)
            props.value && setSearch(props.data.filter(obj => obj.id === props.value)[0][props.description])
        } else {
            axios.get(props.api)
                .then(res => {
                    console.log(res.data)
                    const data = props.keys.reduce((a, v) => a[v], res.data)
                    setFetch(data)
                    props.value && setSearch(data.filter(obj => obj.id === props.value)[0][props.description])
                }).catch(err => {
                    console.log(err.response?.data)
                })
        }
    }, [props.data])

    const filter = (obj, searchState) => {
        if (obj) {
            const str = ('' + obj[props.description_mon]).toLowerCase()
            return str.includes(searchState.toLowerCase())
        }
    }

    const compare = (a, b) => {
        if (a[props.description_mon] > b[props.description_mon]) {
            return 1
        } else if (a[props.description_mon] < b[props.description_mon]) {
            return -1
        } else return 0
    }

    const [focused, setFocused] = useState(false)
    const [search, setSearch] = useState('')

    const handleFocus = () => {
        setSearch('')
        setFocused(true)
        // setChanged(true)
    }

    const handleSetForm = (value) => {
        props.setForm(props.name, value, props.id)
    }

    const handleBlur = () => {
        if (fetch.map(obj => obj[props.description_mon]).includes(search)) {
            handleSetForm(fetch.filter(obj => obj[props.description_mon] === search)[0].id)
        } else {
            handleSetForm('')
            setSearch('')
        }
        setFocused(false)
    }

    const handleSelect = (id, desc) => {
        handleSetForm(id)
        setSearch(desc)
    }

    return (
        <div className={`tw-relative tw-pl-11 tw-pr-3 tw-pt-8 tw-pb-3 tw-flex tw-flex-col ${props.classAppend}`}>
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-font-medium tw-whitespace-nowrap tw-top-2 tw-left-8 ${focused ? 'tw-text-sm' : 'tw-text-xs tw-top-6 tw-left-12'} tw-transition-all tw-duration-300`}>
                {props.label}
            </label>

            <PenSVG className={`tw-absolute tw-w-6 tw-h-6 tw-top-9 tw-left-3 tw-flex-shrink-0 ${focused && 'tw-text-blue-500'} tw-transition-colors tw-duration-300`} />

            <div className={`tw-h-8.5 tw-flex tw-items-center tw-text-sm tw-border tw-border-gray-400 tw-rounded-md tw-pt-2 tw-pb-1 tw-pl-2 tw-pr-1 focus-within:tw-border-blue-500 tw-transition-colors tw-duration-300 tw-placeholder-gray-400 ${props.classInput}`}>
                <input className="tw-mr-1 tw-outline-none tw-flex-grow" type="text" value={search} onChange={e => setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />

                <SearchSVG className={`tw-w-4 tw-h-4 tw-transform tw--translate-y-0.5 tw-flex-shrink-0 ${focused ? 'tw-text-blue-500' : 'tw-text-gray-600'} tw-transition-colors tw-duration-300`} />
            </div>

            <div className={`tw-text-sm tw-rounded-md tw-shadow-sm tw-border tw-border-gray-400 tw-divide-y tw-divide-dashed tw-overflow-y-auto ${focused ? 'tw-visible tw-opacity-100 tw-h-48 tw-mt-2' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`}>
                {
                    fetch.filter(obj => filter(obj, search)).length ?
                        fetch.filter(obj => filter(obj, search)).sort(compare).map((item, i) =>
                            <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50' onMouseDown={() => handleSelect(item.id, item[props.description_mon])} key={item.id}>
                                <span className="tw-font-medium tw-pr-2">{i + 1}.</span>
                                {item[props.description_mon]}
                            </div>)
                        :
                        <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">Хайлт олдсонгүй.</p>
                }
            </div>
        </div>
    )
}

export default SearchSelect
