import React from 'react'
import UrgudulFront from './formFront'
import UrgudulApplicant from './urgudul_a/form_a_1'
import UrugudulClusters from './urgudul_a/form_a_21'
import UrugudulDirectors from './urgudul_a/form_a_22'
import UrgudulBreakdown from './urgudul_b/form_b'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { Switch, Route, useHistory, useParams } from 'react-router-dom'
import UrgudulActivities from './urgudul_b/form_b_6'
import UrgudulBenefits from './urgudul_b/form_b_7'
import UrgudulCalculations from './urgudul_b/form_b_8'
import UrgudulNotice from './urgudul_d/form_d_1'
import UrgudulChecklist from './urgudul_e/form'
import UrgudulOverview from './urgudul_a/form_a_3_4'
import UrgudulBudget from './urgudul_c/form_c'


function UrgudulNavigator() {
    const history = useHistory()
    const params = useParams()
    const page = + params.page

    const handleJump = (index) => {
        history.push(`/urgudul/${index + 1}`)
    }

    const handlePrev = () => {
        page !== 1 && history.push(`/urgudul/${page - 1}`)
    }

    const handleNext = () => {
        page !== 5 && history.push(`/urgudul/${page + 1}`)
    }

    return (
        <div className="tw-w-full tw-max-w-5xl tw-mx-auto tw-text-gray-700">
            <div className="tw-mt-8 tw-p-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-flex tw-justify-center tw-items-center">
                <button className="tw-flex tw-items-center tw-mx-2 tw-p-1 tw-text-sm tw-rounded-md hover:tw-shadow-md focus:tw-outline-none active:tw-text-indigo-500" onClick={handlePrev}>
                    <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90" />
                    <span className="tw-mr-1">Prev</span>
                </button>

                {
                    [...Array(5)].map((item, i) =>
                        <button className={`tw-mx-2 tw-px-2 tw-rounded-md hover:tw-shadow-md focus:tw-outline-none active:tw-text-indigo-500 ${(page - 1) === i && 'tw-bg-indigo-500 tw-text-white'} tw-transition-colors tw-duration-300`} key={i} onClick={() => handleJump(i)}>
                            {i + 1}
                        </button>
                    )
                }

                <button className="tw-flex tw-items-center tw-mx-2 tw-p-1 tw-text-sm tw-rounded-md hover:tw-shadow-md focus:tw-outline-none active:tw-text-indigo-500" onClick={handleNext}>
                    <span className="tw-ml-1">Next</span>
                    <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw--rotate-90" />
                </button>
            </div>

            <Switch>
                <Route exact path="/urgudul/1">
                    <UrgudulFront />
                </Route>

                <Route path="/urgudul/2">
                    <UrgudulApplicant />

                    {
                        '' ? <UrugudulClusters /> : <UrugudulDirectors />
                    }

                    <UrgudulOverview />
                </Route>

                <Route path="/urgudul/3">
                    <UrgudulBreakdown />

                    <UrgudulActivities />

                    <UrgudulBenefits />

                    <UrgudulCalculations />
                </Route>

                <Route path="/urgudul/4">
                    <UrgudulNotice />
                </Route>

                <Route path="/urgudul/5" >
                    <UrgudulChecklist />
                </Route>
            </Switch>
        </div >
    )
}

export default UrgudulNavigator
