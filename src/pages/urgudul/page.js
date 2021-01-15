import React, { useState } from 'react'
import UrgudulFront from './formFront'
import UrgudulApplicant from './urgudul_a/form_a_1'
import UrugudulClusters from './urgudul_a/form_a_21'
import UrugudulDirectors from './urgudul_a/form_a_22'
import UrgudulBreakdown from './urgudul_b/form_b'


function UrgudulNavigator() {
    const [nav, setNav] = useState(0)

    return (
        <div className="tw-flex tw-flex-col tw-justify-center tw-py-8">
            <div className="tw-inline-flex tw-flex-nowrap tw-items-center tw-mx-auto tw-py-6">
                {
                    [...Array(5)].map((item, i) =>
                        <div className="tw-flex tw-flex-nowrap tw-items-center">
                            <div className={`tw-h-0.5 tw-bg-blue-500 ${i === 0 ? 'tw-w-6 tw-rounded-l-full' : 'tw-w-4'}`} />

                            <button className={`tw-w-8 tw-h-8 tw-font-medium tw-border tw-border-blue-500 tw-rounded-full focus:tw-outline-none ${nav === i && 'tw-bg-blue-500 tw-text-white'} tw-transition-colors tw-duration-300`} onClick={() => setNav(i)}>
                                {i}
                            </button>

                            <div className={`tw-h-0.5 tw-bg-blue-500 ${i === 4 ? 'tw-w-6 tw-rounded-r-full' : 'tw-w-4'}`} />
                        </div>
                    )
                }
            </div>

            {
                {
                    0: <UrgudulFront />,
                    1: <div className="">
                        <UrgudulApplicant />
                        {
                            'cluster' ? <UrugudulClusters /> : <UrugudulDirectors />
                        }
                    </div>,
                    2: <div className="">
                        <UrgudulBreakdown />
                    </div>,
                }[nav]
            }
        </div>
    )
}

export default UrgudulNavigator
