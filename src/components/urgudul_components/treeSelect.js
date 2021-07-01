import CheckSVG from 'assets/svgComponents/checkSVG'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import MinusSVG from 'assets/svgComponents/minusSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import React, { useState } from 'react'
import { Transition, animated } from 'react-spring/renderprops'


export default function TreeSelect({ displayName, data, value, setter, name, index, label, classLabel, invalid, }) {
    const display = displayName
    const parents = data.filter(item => item.parentId === 0)
    const selectedName = data.filter(item => item.id === value)[0]?.[display]
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    // const buttonRef = useRef()
    // const dropdownRef = useRef()
    // const handleClickOutside = (e) => {
    //     if (!buttonRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target)) {
    //         setOpen(false)
    //     }
    // }
    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside)
    //     return () => document.removeEventListener('mousedown', handleClickOutside)
    // })
    const handleSelectId = (value) => {
        setter(name, value, index)
        setOpen(false)
    }

    return (
        <div className="tw-w-full tw-text-sm tw-text-gray-700">
            <div className="tw-flex tw-items-center tw-relative tw-pt-8 tw-ml-3 tw-mr-3">
                <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-whitespace-nowrap ${classLabel} ${open ? 'tw-text-sm tw-top-2 tw--left-1' : 'tw-text-xs tw-top-6 tw-left-3'} tw-transition-all tw-duration-300`}>
                    {label}
                </label>

                <button className={`tw-h-8.5 tw-flex tw-min-w-0 tw-items-center tw-border tw-rounded tw-px-2 tw-pt-2 tw-pb-1 focus:tw-outline-none ${invalid ? 'tw-text-red-500 tw-border-red-500 active:tw-border-red-600 active:tw-text-red-600' : (open ? 'tw-border-blue-700 tw-shadow' : 'tw-border-gray-400')} tw-transition-colors tw-duration-700`} onClick={() => setOpen(!open)} title={selectedName}>
                    <div className="tw-mr-2 tw-truncate tw-text-left tw-text-gray-700 tw-text-13px" style={{ minWidth: 160 }}>
                        {selectedName ?? 'Сонгох'}
                    </div>
                    <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-ml-auto tw-flex-shrink-0 ${open ? 'tw-text-blue-700' : 'tw-text-gray-600'} tw-transition-colors`} />
                </button>
            </div>

            <Transition
                items={open}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 300, opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={{ tension: 300, clamp: true }}>
                {item => item && (anims =>
                    <animated.div className="tw-overflow-y-auto tw-overflow-x-hidden tw-my-2 tw-border tw-border-gray-500 tw-rounded tw-ml-3 tw-mr-3 tw-bg-white tw-shadow-sm" style={anims}>
                        <div className="tw-flex tw-justify-end tw-sticky tw-top-0 tw-bg-white">
                            <div className={`tw-flex tw-items-center tw-border-b ${search ? 'tw-border-blue-700 tw-text-blue-700' : 'tw-border-gray-600 tw-text-gray-600'} tw-pb-0.5 tw-my-1.5 tw-mr-2 tw-transition-colors`}>
                                <SearchSVG className="tw-w-4 tw-h-4 tw-mr-1" />
                                <input className="tw-text-13px focus:tw-outline-none tw-text-gray-700 tw-bg-transparent" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                        </div>

                        {parents.map(parent =>
                            <Tree parent={parent} childs={data.filter(item => item.parentId === parent.id && item[display].toLowerCase().includes(search.toLowerCase()))} display={display} handleSelectId={handleSelectId} value={value} key={parent.id} />
                        )}
                    </animated.div>
                )}
            </Transition>
        </div>
    )
}

const Tree = ({ parent, childs, display, handleSelectId, value }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="">
            {childs.length > 0 &&
                <div className="tw-text-13px tw-flex tw-items-center tw-px-1 tw-py-1.5 tw-cursor-pointer tw-border-b tw-border-t tw-border-dashed" onClick={() => setOpen(!open)}>
                    <div className="tw-border tw-border-blue-700 tw-rounded-sm tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-ml-1 tw-mr-2 tw-flex-shrink-0">
                        <Transition
                            items={!open}
                            from={{ opacity: 0 }}
                            enter={{ opacity: 1 }}
                            leave={{ display: 'none' }}>
                            {item => item
                                ? anims => <PlusSVG className="tw-w-4 tw-h-4 tw-text-blue-700" style={anims} />
                                : anims => <MinusSVG className="tw-w-3 tw-h-3 tw-text-blue-700" style={anims} />
                            }
                        </Transition>
                    </div>
                    {parent[display]}
                    <span className="tw-text-blue-700 tw-font-medium tw-mx-2">
                        ({childs.length})
                    </span>
                </div>
            }

            <Transition
                items={open}
                from={{ height: 0 }}
                enter={{ height: 'auto' }}
                leave={{ height: 0 }}
                config={{ tension: 300, clamp: true }}>
                {item1 => item1 && (anims1 =>
                    <div className="tw-overflow-y-hidden tw-divide-y tw-divide-dashed tw-ml-4" style={anims1}>
                        {childs.map(child =>
                            <div className="tw-p-1 tw-pl-1.5 tw-cursor-pointer tw-flex tw-items-center" onClick={() => handleSelectId(child.id)} key={child.id}>
                                <div className="tw-border tw-border-blue-700 tw-rounded-sm tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-ml-1 tw-mr-2 tw-flex-shrink-0">
                                    <Transition
                                        items={child.id === value}
                                        from={{ opacity: 0 }}
                                        enter={{ opacity: 1 }}
                                        leave={{ opacity: 0 }}>
                                        {item => item && (anims =>
                                            <CheckSVG className="tw-w-4 tw-h-4 tw-text-blue-700" style={anims} />
                                        )}
                                    </Transition>
                                </div>
                                {child[display]}
                            </div>
                        )}
                    </div>
                )}
            </Transition>
        </div>
    )
}
