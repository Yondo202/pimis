import CheckSVG from 'assets/svgComponents/checkSVG'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import MinusSVG from 'assets/svgComponents/minusSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import React, { useRef, useState } from 'react'
import { Transition, animated } from 'react-spring/renderprops'


export default function TreeSelectCompact(props) {
    const display = props.displayName
    const parents = props.data.filter(item => item.parentId === 0)
    const selectedName = props.data.filter(item => item.id === props.value)[0]?.[display]
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const buttonRef = useRef()
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
        props.handleChange(props.name, value, props.index, props.index1)
        setOpen(false)
    }

    // const containerHeight = Math.min(window.innerHeight - buttonRef.current?.getBoundingClientRect().bottom - 10, 360)

    return (
        <div className={`tw-relative ${props.classAppend}`}>
            <button className={`tw-flex tw-items-center focus:tw-outline-none tw-text-sm tw-rounded ${props.validate ? 'tw-bg-red-100 active:tw-bg-red-200' : 'tw-bg-indigo-50 active:tw-bg-indigo-100'} tw-px-1.5 tw-py-0.5 tw-ml-3 tw-transition-colors`} style={{ width: 193 }} onClick={() => setOpen(!open)} ref={buttonRef}>
                <div className="tw-mr-1 tw-relative tw-text-left tw-truncate tw-text-13px" title={selectedName}>
                    {selectedName || <span className="tw-text-gray-600">{props.placeholder}</span>}
                </div>
                <ChevronDownSVG className="tw-w-4 tw-h-4 tw-text-gray-600 tw-ml-auto tw-flex-shrink-0" />
            </button>

            <Transition
                items={open}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 240, opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={{ tension: 300, clamp: true }}>
                {item => item && (anims =>
                    <animated.div className="tw-overflow-y-auto tw-overflow-x-hidden tw-border tw-border-gray-500 tw-rounded tw-bg-white tw-fixed tw-z-10 tw-text-13px" style={{ width: props.selectWidth, top: buttonRef.current?.getBoundingClientRect().top + 26, left: buttonRef.current?.getBoundingClientRect().left, ...anims }}>
                        <div className="tw-flex tw-justify-end tw-sticky tw-top-0 tw-bg-white">
                            <div className={`tw-flex tw-items-center tw-border-b ${search ? 'tw-border-blue-700 tw-text-blue-700' : 'tw-border-gray-600 tw-text-gray-600'} tw-pb-0.5 tw-my-1.5 tw-mr-2 tw-transition-colors`}>
                                <SearchSVG className="tw-w-4 tw-h-4 tw-mr-1" />
                                <input className="focus:tw-outline-none tw-text-gray-700 tw-bg-transparent tw-text-13px" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                        </div>

                        {parents.map(parent =>
                            <Tree parent={parent} childs={props.data.filter(item => item.parentId === parent.id && item[display].toLowerCase().includes(search.toLowerCase()))} display={display} handleSelectId={handleSelectId} value={props.value} />
                        )}

                        <div className="tw-flex tw-justify-end tw-sticky tw-bottom-0">
                            <button className="tw-rounded-sm tw-bg-gray-600 active:tw-bg-gray-700 focus:tw-outline-none tw-text-white tw-py-0.5 tw-px-4 tw-mr-2 tw-mb-1 tw-transition-colors" onClick={() => setOpen(false)}>
                                Буцах
                            </button>
                        </div>
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
                <div className="tw-flex tw-items-center tw-px-1 tw-py-1.5 tw-cursor-pointer tw-border-b tw-border-t tw-border-dashed tw-text-13px" onClick={() => setOpen(!open)}>
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
                            <div className="tw-p-1 tw-pl-1.5 tw-cursor-pointer tw-flex tw-items-center tw-text-13px" onClick={() => handleSelectId(child.id)}>
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
