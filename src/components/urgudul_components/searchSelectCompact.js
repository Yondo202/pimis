import React, { useState, useEffect, useRef } from 'react'
import SearchSVG from 'assets/svgComponents/searchSVG'
import axios from 'axiosbase'
import { animated, Transition } from 'react-spring/renderprops'


function SearchSelectCompact({ data, api, keys, label, value, setter, displayName, name, index, index1, classAppend, classDiv, classInput, placeholder, selectWidth }) {
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

    const filter = (obj, searchState) => {
        if (obj) {
            const str = ('' + obj[displayName]).toLowerCase()
            return str.includes(searchState.toLowerCase())
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
        setter(name, value, index, index1)
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

    const inputRef = useRef(null)
    const searchBarRef = useRef(null)

    // const containerHeight = Math.min(window.innerHeight - searchBarRef.current?.getBoundingClientRect().bottom - 10, 360)

    return (
        <div className={`tw-relative ${classAppend}`}>
            <div className={`tw-flex tw-items-center tw-text-sm ${classDiv || `tw-border tw-border-gray-400`} tw-rounded tw-py-0.5 tw-px-1.5 tw-transition-colors`} ref={searchBarRef}>
                <input className={`tw-text-13px tw-flex-grow tw-mr-1 tw-py-0.5 tw-bg-transparent tw-outline-none tw-placeholder-gray-500 ${classInput || 'tw-flex-grow'}`} type="text" value={search} onChange={e => setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} placeholder={placeholder} ref={inputRef} />

                <SearchSVG className="tw-w-4 tw-h-4 tw-flex-shrink-0 tw-text-gray-600 tw-cursor-pointer" onClick={() => inputRef.current?.focus()} />
            </div>

            <Transition
                items={focused}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 240, opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={{ tension: 300, clamp: true }}>
                {item => item && (anims =>
                    <animated.div className="tw-fixed tw-bg-white tw-z-10 tw-text-13px tw-rounded tw-shadow-sm tw-border tw-border-gray-500 tw-divide-y tw-divide-dashed tw-overflow-y-auto" style={{ width: selectWidth ?? '100%', top: searchBarRef.current?.getBoundingClientRect().top + 26, left: searchBarRef.current?.getBoundingClientRect().left, ...anims }}>
                        {fetch.filter(obj => filter(obj, search)).length ?
                            fetch.filter(obj => filter(obj, search)).sort(compare).map((item, i) =>
                                <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-white tw-cursor-pointer' onMouseDown={() => handleSelect(item.id, item[displayName])} key={item.id}>
                                    <span className="tw-pr-2">{i + 1}.</span>
                                    {item[displayName]}
                                </div>)
                            :
                            <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">?????????? ??????????????????.</p>
                        }
                    </animated.div>
                )}
            </Transition>
        </div>
    )
}

export default SearchSelectCompact
