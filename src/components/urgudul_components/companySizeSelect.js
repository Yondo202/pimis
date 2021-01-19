import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import SelectorSVG from 'assets/svgComponents/selectorSVG'
import React, { useState, useEffect, useRef } from 'react'


const companySizes = [
    {
        id: 1,
        description: 'Micro',
        description_mon: 'Бичил',
    },
    {
        id: 2,
        description: 'Small',
        description_mon: 'Жижиг',
    },
    {
        id: 3,
        description: 'Medium',
        description_mon: 'Дунд',
    },
]

function CompanySizeSelect(props) {
    const [open, setOpen] = useState(false)

    const handleClickButton = () => {
        setOpen(!open)
    }

    const handleSelectDistrict = (id) => {
        props.setForm('company_size', id)
        setOpen(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const divRef = useRef()
    const buttonRef = useRef()

    const handleClickOutside = e => {
        if (open && !divRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    return (
        <div className={`tw-relative tw-pl-11 tw-pr-3 tw-pt-8 tw-pb-3 tw-flex tw-flex-col ${props.classAppend}`}>
            <label className={`tw-absolute tw-px-1 tw-bg-white tw-rounded-full tw-font-medium tw-whitespace-nowrap tw-top-2 tw-left-8 ${open ? 'tw-text-sm' : 'tw-text-xs tw-top-6 tw-left-12'} tw-transition-all tw-duration-300`}>
                Компаний хэмжээ
            </label>

            <SelectorSVG className={`tw-absolute tw-w-6 tw-h-6 tw-top-9 tw-left-3 ${open && 'tw-text-blue-500'} tw-transition-colors tw-duration-300`} />

            <button className={`tw-h-8.5 tw-flex tw-items-center tw-text-sm tw-border tw-rounded-md tw-pt-2 tw-pb-1 tw-px-2 focus:tw-outline-none ${open ? 'tw-border-blue-500' : 'tw-border-gray-400'} tw-transition-colors tw-duration-300`} onClick={handleClickButton} ref={buttonRef}>
                <span className="tw-h-5">
                    {companySizes.filter(obj => obj.id === props.value)[0]?.description_mon}
                </span>

                <ChevronDownSVG className={`tw-w-4 tw-h-4 tw-ml-auto ${open ? 'tw-text-blue-500' : 'tw-text-gray-500'} tw-transition-colors tw-duration-300`} />
            </button>

            <div className={`tw-text-sm tw-rounded-md tw-shadow-sm tw-border tw-border-gray-400 tw-divide-y tw-divide-dashed tw-overflow-y-auto ${open ? 'tw-visible tw-opacity-100 tw-h-24 tw-mt-2' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`} ref={divRef}>
                {
                    companySizes.map((item, i) =>
                        <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50' onMouseDown={() => handleSelectDistrict(item.id)} key={item.id}>
                            <span className="tw-font-medium tw-pr-2">{i + 1}.</span>
                            {item.description_mon}
                        </div>)
                }
            </div>
        </div>
    )
}

export default CompanySizeSelect
