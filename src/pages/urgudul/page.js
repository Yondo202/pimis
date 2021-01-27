import React, { useContext, useState } from 'react'
import { Switch, Route, useHistory, useParams, useLocation } from 'react-router-dom'
import UrgudulFront from './formFront'
import UrgudulApplicant from './urgudul_a/form_a_1'
import UrugudulClusters from './urgudul_a/form_a_21'
import UrugudulDirectors from './urgudul_a/form_a_22'
import UrgudulBreakdown from './urgudul_b/form_b'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import UrgudulActivities from './urgudul_b/form_b_6'
import UrgudulBenefits from './urgudul_b/form_b_7'
import UrgudulCalculations from './urgudul_b/form_b_8'
import UrgudulChecklist from './urgudul_e/form_e'
import UrgudulOverview from './urgudul_a/form_a_3_4'
import UrgudulNoticeCluster from './urgudul_d/form_d_1'
import UrgudulNoticeCompany from './urgudul_d/form_d_2'
import UrgudulContext from 'components/utilities/urgudulContext'
import { useTransition, animated } from 'react-spring'


function UrgudulNavigator() {
    const history = useHistory()
    const params = useParams()
    const page = + params.page

    let startPage = 1
    if (page > 5) startPage = 6

    const [slideLeft, setSlideLeft] = useState(false)

    const handleJump = (index) => {
        history.push(`/urgudul/${index}`)
        if (index < page) setSlideLeft(true)
    }

    const handlePrev = () => {
        page !== 1 && history.push(`/urgudul/${page - 1}`)
        setSlideLeft(true)
    }

    const handleNext = () => {
        page !== 10 && history.push(`/urgudul/${page + 1}`)
        setSlideLeft(false)
    }

    const UrgudulCtx = useContext(UrgudulContext)

    const isCluster = UrgudulCtx.data.project_type === 1

    const location = useLocation()

    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: slideLeft ? 'translateX(-100px)' : 'translateX(100px)' },
        enter: { opacity: 1, transform: 'translateX(0)' },
        leave: { display: 'none' },
        initial: { opacity: 1 },
    })

    return (
        <div className="tw-w-full tw-max-w-5xl tw-mx-auto tw-text-gray-700">
            <div className="tw-mt-8 tw-p-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-flex tw-justify-center tw-items-center">
                <button className={`tw-flex tw-items-center tw-mx-2 tw-p-1 tw-text-sm tw-rounded-md hover:tw-shadow-md focus:tw-outline-none active:tw-text-indigo-500 ${page === 1 && 'tw-invisible'}`} onClick={handlePrev}>
                    <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90" />
                    <span className="tw-mr-1">Prev</span>
                </button>

                {
                    [...Array(5)].map((item, i) =>
                        <button className={`tw-mx-2 tw-px-2 tw-rounded-md hover:tw-shadow-md focus:tw-outline-none active:tw-text-indigo-500 ${page === startPage + i && 'tw-bg-indigo-500 tw-text-white'} tw-transition-colors tw-duration-300`} key={i} onClick={() => handleJump(startPage + i)}>
                            {startPage + i}
                        </button>
                    )
                }

                <button className={`tw-flex tw-items-center tw-mx-2 tw-p-1 tw-text-sm tw-rounded-md hover:tw-shadow-md focus:tw-outline-none active:tw-text-indigo-500 ${page === 10 && 'tw-invisible'}`} onClick={handleNext}>
                    <span className="tw-ml-1">Next</span>
                    <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw--rotate-90" />
                </button>
            </div>

            {
                transitions.map(({ item, props, key }) =>
                    <animated.div key={key} style={props}>
                        <Switch location={item}>
                            <Route exact path="/urgudul/1">
                                <UrgudulFront />
                            </Route>

                            <Route path="/urgudul/2">
                                <UrgudulApplicant />
                            </Route>

                            <Route path="/urgudul/3">
                                {
                                    isCluster ? <UrugudulClusters /> : <UrugudulDirectors />
                                }
                            </Route>

                            <Route path="/urgudul/4">
                                <UrgudulOverview />
                            </Route>

                            <Route path="/urgudul/5">
                                <UrgudulBreakdown />
                            </Route>

                            <Route path="/urgudul/6">
                                <UrgudulActivities />
                            </Route>

                            <Route path="/urgudul/7">
                                <UrgudulBenefits />
                            </Route>

                            <Route path="/urgudul/8">
                                <UrgudulCalculations />
                            </Route>

                            <Route path="/urgudul/9">
                                {
                                    isCluster ? <UrgudulNoticeCluster /> : <UrgudulNoticeCompany />
                                }
                            </Route>

                            <Route path="/urgudul/10">
                                <UrgudulChecklist />
                            </Route>
                        </Switch>
                    </animated.div>
                )
            }
        </div >
    )
}

export default UrgudulNavigator
