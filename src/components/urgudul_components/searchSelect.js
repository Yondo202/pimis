import React, { useState, useEffect, useRef } from 'react'
import SearchSVG from 'assets/svgComponents/searchSVG'
import axios from 'axiosbase'

function SearchSelect({ data, api, keys, label, value, displayName, name, index, setter, classAppend, classLabel, invalid, classInput }) {
    const [fetch, setFetch] = useState([])

    useEffect(() => {
        if (data) {
            setFetch(data)
            value && setSearch(data.filter(obj => obj.id === value)[0]?.[displayName] || '')
        } else {
            api &&
                axios.get(api)
                    .then(res => {
                        const data = keys.reduce((a, v) => a[v], res.data)
                        setFetch(data)
                        value && setSearch(data.filter(obj => obj.id === value)[0]?.[displayName] || '')
                    })
        }
    }, [data])

    useEffect(() => {
        const newSearch = fetch.filter(obj => obj.id === value)[0]?.[displayName] || ''
        search !== newSearch && setSearch(newSearch)
    }, [value, fetch])

    const filter = (obj, searchStr) => {
        if (obj) {
            const str = ('' + obj[displayName]).toLowerCase()
            return str.includes(searchStr.toLowerCase())
        }
    }

    const compare = (a, b) => {
        if (a[displayName] > b[displayName]) {
            return 1
        } else if (a[displayName] < b[displayName]) {
            return -1
        } else return 0
    }

    const [focused, setFocused] = useState(false)
    const [search, setSearch] = useState('')

    const handleFocus = () => {
        setSearch('')
        setFocused(true)
    }

    const handleSetForm = (value) => {
        setter(name, value, index)
    }

    const handleBlur = () => {
        if (fetch.map(obj => obj[displayName]).includes(search)) {
            handleSetForm(fetch.filter(obj => obj[displayName] === search)[0].id)
        } else {
            setSearch(fetch.filter(obj => obj.id === value)[0]?.[displayName] || '')
        }
        setFocused(false)
    }

    const handleSelect = (id, desc) => {
        handleSetForm(id)
        setSearch(desc)
    }

    const inputRef = useRef()

    return (
        <div className={`tw-relative tw-pl-3 tw-pr-3 tw-pt-8 tw-pb-3 tw-flex tw-flex-col ${classAppend}`}>
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-whitespace-nowrap ${classLabel} ${focused ? 'tw-text-sm tw-top-2 tw-left-2' : 'tw-text-xs tw-top-6 tw-left-6'} tw-transition-all tw-duration-300`}>
                {label}
            </label>

            <div className={`tw-h-8.5 tw-flex tw-items-center tw-text-sm tw-border ${invalid ? 'tw-border-red-500' : (focused ? 'tw-border-blue-700 tw-shadow' : 'tw-border-gray-400')} tw-rounded tw-pt-2 tw-pb-1 tw-pl-2 tw-pr-1 tw-transition-colors tw-duration-700 tw-placeholder-gray-400 ${classInput}`}>
                <input className="tw-mr-1 tw-bg-transparent tw-outline-none tw-flex-grow tw-text-13px" type="text" value={search} onChange={e => setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} ref={inputRef} />

                <SearchSVG className={`tw-w-4 tw-h-4 tw-transform tw--translate-y-0.5 tw--translate-x-0.5 tw-flex-shrink-0 ${focused ? 'tw-text-blue-700' : 'tw-text-gray-600'} tw-transition-colors`} onClick={() => inputRef.current?.focus()} />
            </div>

            <div className={`tw-text-sm tw-rounded tw-shadow-sm tw-border tw-border-gray-400 tw-divide-y tw-divide-dashed tw-overflow-y-auto ${focused ? 'tw-visible tw-opacity-100 tw-h-48 tw-mt-2' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`}>
                {fetch.filter(obj => filter(obj, search)).length ?
                    fetch.filter(obj => filter(obj, search)).sort(compare).map((item, i) =>
                        <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-600 hover:tw-text-gray-50 tw-text-13px tw-transition-colors' onMouseDown={() => handleSelect(item.id, item[displayName])} key={item.id}>
                            <span className="tw-pr-2">{i + 1}.</span>
                            {item[displayName]}
                        </div>)
                    :
                    <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">?????????? ??????????????????.</p>
                }
            </div>
        </div>
    )
}

export default SearchSelect
