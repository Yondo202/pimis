import React, { useState, useEffect, useRef } from 'react'
import SearchSVG from 'assets/svgComponents/searchSVG'
import axios from 'axiosbase'
import { config, Transition } from 'react-spring/renderprops'


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
        const newSearch = fetch.filter(obj => obj.id === props.value)[0]?.[props.displayName] || ''
        search !== newSearch && setSearch(newSearch)
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

    const inputRef = useRef(null)

    const searchBarRef = useRef(null)

    return (
        <div className={`tw-relative ${props.classAppend}`}>
            <div className={`tw-flex tw-items-center tw-text-sm ${props.classDiv || `tw-border tw-border-gray-400`} tw-rounded tw-py-0.5 tw-px-1.5 tw-transition-colors`} ref={searchBarRef}>
                <input className={`tw-flex-grow tw-mr-1 tw-bg-transparent tw-outline-none tw-placeholder-gray-500 ${props.classInput || 'tw-flex-grow'}`} type="text" value={search} onChange={e => setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} placeholder={props.placeholder} ref={inputRef} />

                <SearchSVG className="tw-w-4 tw-h-4 tw-flex-shrink-0 tw-text-gray-600 tw-cursor-pointer" onClick={() => inputRef.current?.focus()} />
            </div>

            <Transition
                items={focused}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
                config={config.stiff}>
                {item => item && (anims =>
                    <div className={`tw-fixed ${!props.selectWidth && 'tw-w-full'} tw-bg-white tw-z-10 tw-text-13px tw-rounded tw-shadow-sm tw-border tw-border-gray-500 tw-divide-y tw-divide-dashed tw-overflow-y-auto`} style={{ height: props.selectHeight || 426, width: props.selectWidth, top: searchBarRef.current?.getBoundingClientRect().top + 26, left: searchBarRef.current?.getBoundingClientRect().left, ...anims }}>
                        {
                            fetch.filter(obj => filter(obj, search)).length ?
                                fetch.filter(obj => filter(obj, search)).sort(compare).map((item, i) =>
                                    <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-white tw-cursor-pointer' onMouseDown={() => handleSelect(item.id, item[props.displayName])} key={item.id}>
                                        <span className="tw-font-medium tw-pr-2">{i + 1}.</span>
                                        {item[props.displayName]}
                                    </div>)
                                :
                                <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">Хайлт олдсонгүй.</p>
                        }
                    </div>
                )}
            </Transition>
        </div>
    )
}

export default SearchSelectCompact
