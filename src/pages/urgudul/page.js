import React, { useContext, useEffect, useState } from 'react'
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
import CloseSVG from 'assets/svgComponents/closeSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'


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

    const isCluster = UrgudulCtx.data?.project_type === 1

    const location = useLocation()

    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: slideLeft ? 'translateX(-100px)' : 'translateX(100px)' },
        enter: { opacity: 1, transform: 'translateX(0)' },
        leave: { display: 'none' },
        initial: { opacity: 1 },
    })

    const [modalOpen, setModalOpen] = useState(true)

    const [projects, setProjects] = useState([])

    const AlertCtx = useContext(AlertContext)

    useEffect(() => {
        if (modalOpen) {
            axios.get('projects', {
                headers: {
                    'Authorization': getLoggedUserToken()
                }
            }).then(res => {
                console.log(res.data)
                setProjects(res.data.data)
            }).catch(err => {
                console.log(err.response?.data)
            })
        }
    }, [modalOpen])

    const loadProject = (id) => {
        axios.get(`projects/${id}`, {
            headers: {
                'Authorization': getLoggedUserToken()
            }
        }).then(res => {
            console.log(res.data)
            UrgudulCtx.setData(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Маягтын мэдээллийг амжилттай уншлаа.' })
            setModalOpen(false)
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Маягтын мэдээллийг уншиж чадсангүй.' })
        })
    }

    const createProject = () => {
        setModalOpen(false)
        history.push('/urgudul/1')
    }

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
                                {/* {
                                    isCluster ? <UrugudulClusters /> : <UrugudulDirectors />
                                } */}
                                <UrugudulClusters />
                                <UrugudulDirectors />
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
                                {/* {
                                    isCluster ? <UrgudulNoticeCluster /> : <UrgudulNoticeCompany />
                                } */}
                                <UrgudulNoticeCluster />
                                <UrgudulNoticeCompany />
                            </Route>

                            <Route path="/urgudul/10">
                                <UrgudulChecklist />
                            </Route>
                        </Switch>
                    </animated.div>
                )
            }

            <div className={`tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-70 ${modalOpen ? 'tw-visible tw-opacity-100' : 'tw-invisible tw-opacity-0'} tw-transition-all tw-duration-300`}>
                <div className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-p-4 tw-m-8 tw-w-full tw-max-w-3xl tw-flex tw-flex-col tw-items-center">
                    <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-4 tw-right-4" onClick={() => setModalOpen(false)}>
                        <CloseSVG className="tw-w-8 tw-h-8" />
                    </button>
                    <div className="tw-text-center tw-mt-4 tw-mb-8 tw-mx-8 tw-font-semibold">
                        Хадгалагдсан маягт сонгох
                    </div>
                    <div className="tw-w-full tw-mb-8">
                        <span className="tw-font-semibold">Хадгалагдсан маягтууд:</span>
                        {
                            projects.map((item, i) =>
                                <button className="tw-border tw-ml-4 tw-py-1 tw-px-2 tw-rounded-md focus:tw-outline-none active:tw-shadow-lg" onClick={() => loadProject(item.id)}>
                                    {item.id}
                                </button>
                            )
                        }
                    </div>
                    <button className="tw-border tw-p-1 tw-pr-2 tw-rounded-md tw-bg-green-500 tw-text-white focus:tw-outline-none active:tw-bg-green-600 hover:tw-shadow-lg tw-flex tw-items-center" onClick={createProject}>
                        <PlusSVG className="tw-w-5 tw-h-5 tw-mr-1 tw-animate-pulse" />
                        <span className="">Шинээр маягт бөглөх</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UrgudulNavigator
