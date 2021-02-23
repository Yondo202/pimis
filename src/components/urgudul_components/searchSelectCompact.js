import React, { useState, useEffect } from 'react'
import SearchSVG from 'assets/svgComponents/searchSVG'
import axios from 'axiosbase'


function SearchSelectCompact(props) {
    const [fetch, setFetch] = useState([])

    useEffect(() => {
        if (props.data) {
            setFetch(props.data)
            props.value && setSearch(props.data.filter(obj => obj.id === props.value)[0]?.[props.displayName] || '')
        } else {
            props.api &&
                axios.get(props.api)
                    .then(res => {
                        console.log(res.data)
                        const data = props.keys.reduce((a, v) => a[v], res.data)
                        setFetch(data)
                        props.value && setSearch(data.filter(obj => obj.id === props.value)[0]?.[props.displayName] || '')
                    }).catch(err => {
                        console.log(err.response?.data)
                    })
        }
    }, [props.data])

    useEffect(() => {
        props.value && search === '' && setSearch(fetch.filter(obj => obj.id === props.value)[0]?.[props.displayName] || '')
    }, [props.value, fetch])

    const filter = (obj, searchState) => {
        if (obj) {
            const str = ('' + obj[props.displayName]).toLowerCase()
            return str.includes(searchState.toLowerCase())
        }
    }

    const compare = (a, b) => {
        if (a[props.displayName] > b[props.displayName]) {
            return 1
        } else if (a[props.displayName] < b[props.displayName]) {
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
        props.setForm(props.name, value, props.id, props.id2)
    }

    const handleBlur = () => {
        if (fetch.map(obj => obj[props.displayName]).includes(search)) {
            handleSetForm(fetch.filter(obj => obj[props.displayName] === search)[0].id)
        } else {
            setSearch(fetch.filter(obj => obj.id === props.value)[0]?.[props.displayName] || '')
        }
        setFocused(false)
    }

    const handleSelect = (id, desc) => {
        handleSetForm(id)
        setSearch(desc)
    }

    return (
        <div className={`tw-relative ${props.classAppend}`}>
            <div className={`tw-flex tw-items-center tw-text-sm ${props.classDiv || `tw-border tw-border-gray-400`} tw-rounded-md tw-px-1 focus-within:tw-border-blue-500 tw-transition-colors tw-duration-300 tw-placeholder-gray-400`}>
                <input className={`tw-mr-1 tw-bg-transparent tw-outline-none tw-placeholder-gray-500 ${props.classInput || 'tw-flex-grow'}`} type="text" value={search} onChange={e => setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} placeholder={props.placeholder} />

                <SearchSVG className={`tw-w-4 tw-h-4 tw-flex-shrink-0 ${focused ? 'tw-text-blue-600' : 'tw-text-gray-700'} tw-transition-colors tw-duration-300`} />
            </div>

            <div className={`tw-absolute tw-transform tw-translate-y-1 ${!props.selectWidth && 'tw-w-full'} tw-h-60 tw-bg-white tw-z-10 tw-text-sm tw-rounded-md tw-shadow-sm tw-border tw-border-gray-400 tw-divide-y tw-divide-dashed tw-overflow-y-auto ${focused ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`} style={{ width: props.selectWidth }}>
                {
                    fetch.filter(obj => filter(obj, search)).length ?
                        fetch.filter(obj => filter(obj, search)).sort(compare).map((item, i) =>
                            <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50' onMouseDown={() => handleSelect(item.id, item[props.displayName])} key={item.id}>
                                <span className="tw-font-medium tw-pr-2">{i + 1}.</span>
                                {item[props.displayName]}
                            </div>)
                        :
                        <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">Хайлт олдсонгүй.</p>
                }
            </div>
        </div>
    )
}

export default SearchSelectCompact
