import CheckSVG from 'assets/svgComponents/checkSVG'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import MinusSVG from 'assets/svgComponents/minusSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import SelectorSVG from 'assets/svgComponents/selectorSVG'
import React, { useState } from 'react'
import { Transition, config } from 'react-spring/renderprops'


export default function TreeSelect(props) {
    const display = props.displayName
    const parents = props.data.filter(item => item.parentId === 0)
    const selectedName = props.data.filter(item => item.id === props.value)[0]?.[display]
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
        props.handleChange(props.name, value, props.index)
    }

    return (
        <div className="tw-w-full">
            <div className="tw-flex tw-items-center tw-relative tw-pt-8 tw-mr-5">
                <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-font-medium tw-whitespace-nowrap ${props.classLabel} ${open ? 'tw-text-sm tw-top-2 tw-left-7' : 'tw-text-xs tw-top-6 tw-left-11'} tw-transition-all tw-duration-300`}>
                    {props.label}
                </label>

                <SelectorSVG className="tw-w-5 tw-h-5 tw-ml-2 tw-mr-2 tw-flex-shrink-0" />
                <button className="tw-h-8.5 tw-flex tw-min-w-0 tw-items-center tw-border tw-border-gray-500 tw-rounded-md tw-px-2 tw-pt-2 tw-pb-1 focus:tw-outline-none" onClick={() => setOpen(!open)}>
                    <div className="tw-mr-2 tw-truncate tw-text-left" style={{ minWidth: 160 }}>
                        {selectedName}
                    </div>
                    <ChevronDownSVG className="tw-w-4 tw-h-4 tw-text-gray-600 tw-ml-auto tw-flex-shrink-0" />
                </button>
            </div>

            <Transition
                items={open}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 300, opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={config.stiff}>
                {item => item && (anims =>
                    <div className="tw-overflow-y-auto tw-overflow-x-hidden tw-my-2 tw-border tw-border-gray-500 tw-rounded tw-ml-8 tw-mr-5 tw-bg-white" style={anims}>
                        <div className="tw-flex tw-justify-end tw-sticky tw-top-0 tw-bg-white">
                            <div className={`tw-flex tw-items-center tw-border-b ${search ? 'tw-border-blue-500 tw-text-blue-500' : 'tw-border-gray-600 tw-text-gray-600'} tw-pb-0.5 tw-my-1.5 tw-mr-2 tw-transition-colors`}>
                                <SearchSVG className="tw-w-4 tw-h-4 tw-mr-1" />
                                <input className="focus:tw-outline-none tw-text-gray-700 tw-bg-transparent" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                        </div>

                        {parents.map(parent =>
                            <Tree parent={parent} childs={props.data.filter(item => item.parentId === parent.id && item[display].toLowerCase().includes(search.toLowerCase()))} display={display} handleSelectId={handleSelectId} value={props.value} />
                        )}
                    </div>
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
                <div className="tw-flex tw-items-center tw-px-1 tw-py-1.5 tw-cursor-pointer tw-border-b tw-border-t tw-border-dashed" onClick={() => setOpen(!open)}>
                    <div className="tw-border tw-border-blue-500 tw-rounded-sm tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-ml-1 tw-mr-2 tw-flex-shrink-0">
                        <Transition
                            items={!open}
                            from={{ opacity: 0 }}
                            enter={{ opacity: 1 }}
                            leave={{ display: 'none' }}
                            config={config.stiff}>
                            {item => item
                                ? anims => <PlusSVG className="tw-w-4 tw-h-4 tw-text-blue-500" style={anims} />
                                : anims => <MinusSVG className="tw-w-3 tw-h-3 tw-text-blue-500" style={anims} />
                            }
                        </Transition>
                    </div>

                    {parent[display]}
                    <span className="tw-text-blue-500 tw-font-medium tw-mx-2">
                        ({childs.length})
                    </span>
                </div>
            }

            <Transition
                items={open}
                from={{ height: 0, opacity: 0 }}
                enter={{ height: 'auto', opacity: 1 }}
                leave={{ height: 0, opacity: 0 }}
                config={config.stiff}>
                {item1 => item1 && (anims1 =>
                    <div className="tw-overflow-hidden tw-divide-y tw-divide-dashed tw-ml-4" style={anims1}>
                        {childs.map(child =>
                            <div className="tw-p-1 tw-pl-1.5 tw-cursor-pointer tw-flex tw-items-center" onClick={() => handleSelectId(child.id)}>
                                <div className="tw-border tw-border-blue-500 tw-rounded-sm tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-ml-1 tw-mr-2 tw-flex-shrink-0">
                                    <Transition
                                        items={child.id === value}
                                        from={{ opacity: 0 }}
                                        enter={{ opacity: 1 }}
                                        leave={{ opacity: 0 }}
                                        config={config.stiff}>
                                        {item => item && (anims =>
                                            <CheckSVG className="tw-w-4 tw-h-4 tw-text-blue-500" style={anims} />
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