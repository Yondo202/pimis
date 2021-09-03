import React, { useContext, useEffect, useRef, useState } from 'react'
import { Switch, Route, useHistory, useParams, useLocation } from 'react-router-dom'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import UrgudulContext from 'components/utilities/urgudulContext'
import { useTransition, animated } from 'react-spring'
import CloseSVG from 'assets/svgComponents/closeSVG'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import DocAddSVG from 'assets/svgComponents/docAddSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import { Transition } from 'react-spring/renderprops'
import { statusNames } from 'components/admin/contents/projects/ProjectHandle'
import UrgudulPage1 from './pages/page1'
import UrgudulPage2 from './pages/page2'
import UrgudulPage3 from './pages/page3'
import UrgudulPage4 from './pages/page4'
import UrgudulPage5 from './pages/page5'
import UrgudulPage6 from './pages/page6'
import UrgudulPage7Cluster from './pages/page7_cluster'
import UrgudulPage7Company from './pages/page7_company'
import UrgudulPage8 from './pages/page8'
import UrgudulPreview from './preview/Preview'
import UrgudulPage5New from './pages/page5_new'

export default function UrgudulNavigator() {
    const history = useHistory()
    const params = useParams()
    const page = +params.page

    const handleJump = (index) => {
        history.push(`/urgudul/${index}`)
    }

    const handlePrev = () => {
        page !== 1 && history.push(`/urgudul/${page - 1}`)
    }

    const handleNext = () => {
        page !== maxPage && history.push(`/urgudul/${page + 1}`)
    }

    const UrgudulCtx = useContext(UrgudulContext)
    const AlertCtx = useContext(AlertContext)

    const isCluster = UrgudulCtx.data.project_type === 1

    const location = useLocation()

    const transitionsPages = useTransition(location, location => location.pathname, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { display: 'none' },
        config: { clamp: true },
    })

    const [modalOpen, setModalOpen] = useState(true)

    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (modalOpen) {
            axios.get('projects', {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                setProjects(res.data.data)
            })
        }
    }, [modalOpen])

    const loadProject = (id) => {
        axios.get(`projects/${id}`, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            const project = res.data.data
            if (project.status === 'editable') {
                UrgudulCtx.setData(res.data.data)
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийн маягтыг нээлээ.' })
                setModalOpen(false)
            } else {
                history.push(`/urgudul-preview/${project.id}`)
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийн маягтыг нээлээ.' })
            }
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Өргөдлийн маягтыг нээж чадсангүй.' })
        })
    }

    const createProject = () => {
        UrgudulCtx.setData({})
        setModalOpen(false)
        history.push('/urgudul/1')
    }

    const transitionsModal = useTransition(modalOpen, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const transitionsModalContent = useTransition(modalOpen, null, {
        from: { transform: 'translate3d(0, -20px, 0)' },
        enter: { transform: 'translate3d(0, 0, 0)' },
        leave: { transform: 'translate3d(0, 20px, 0)' },
    })

    const [previewModalOpen, setPreviewModalOpen] = useState(false)

    const previewContainerRef = useRef()

    const handleClickOutside = (e) => {
        if (previewContainerRef && !previewContainerRef.current?.contains(e.target)) {
            setPreviewModalOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <div className="tw-relative tw-w-full tw-text-gray-700 tw-text-13px">
            <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-flex tw-justify-start tw-py-2 tw-my-4">
                <button className="tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-font-light tw-py-1 tw-pl-3 tw-pr-5 tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors" onClick={() => setPreviewModalOpen(true)}>
                    <SearchSVG className="tw-w-4 tw-h-4" />
                    <span className="tw-text-sm tw-ml-2">Урьдчилж харах</span>
                </button>
            </div>

            <div className="tw-py-2 tw-px-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-flex tw-justify-center tw-items-center">
                <button className="tw-flex tw-items-center tw-mx-2 tw-p-1 tw-text-sm tw-rounded-md hover:tw-shadow-md focus:tw-outline-none active:tw-text-indigo-500 tw-transition-colors tw-transition-shadow" onClick={handlePrev}>
                    <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90" />
                </button>

                {{
                    'start': <PaginationStart page={page} handleJump={handleJump} />,
                    'middle': <PaginationMiddle page={page} handleJump={handleJump} />,
                    'end': <PaginationEnd page={page} handleJump={handleJump} />,
                }[showPaginationVariant(page)]}

                <button className="tw-flex tw-items-center tw-mx-2 tw-p-1 tw-text-sm tw-rounded-md hover:tw-shadow-md focus:tw-outline-none active:tw-text-indigo-500 tw-transition-colors tw-transition-shadow" onClick={handleNext}>
                    <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw--rotate-90" />
                </button>
            </div>

            {transitionsPages.map(({ item, props, key }) =>
                <animated.div key={key} className="tw-pb-10" style={props}>
                    <Switch location={item}>
                        <Route path="/urgudul/1">
                            <UrgudulPage1 projects={projects} />
                        </Route>

                        <Route path="/urgudul/2">
                            <UrgudulPage2 />
                        </Route>

                        <Route path="/urgudul/3">
                            <UrgudulPage3 projects={projects} />
                        </Route>

                        <Route path="/urgudul/4">
                            <UrgudulPage4 projects={projects} />
                        </Route>

                        <Route path="/urgudul/5">
                            <UrgudulPage5 />
                            <UrgudulPage5New />
                        </Route>

                        <Route path="/urgudul/6">
                            <UrgudulPage6 projects={projects} />
                        </Route>

                        <Route path="/urgudul/7">
                            {isCluster
                                ? <UrgudulPage7Cluster projects={projects} />
                                : <UrgudulPage7Company projects={projects} />
                            }
                        </Route>

                        <Route path="/urgudul/8">
                            <UrgudulPage8 />
                        </Route>
                    </Switch>
                </animated.div>
            )}

            {transitionsModal.map(({ item, key, props }) =>
                item &&
                <animated.div key={key} style={props} className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10">
                    {
                        transitionsModalContent.map(({ item, key, props }) =>
                            item &&
                            <animated.div key={key} style={props} className="tw-bg-white tw-relative tw-rounded-md tw-shadow-lg tw-p-4 tw-m-8 tw-w-full tw-max-w-3xl tw-flex tw-flex-col tw-items-center">
                                <button className="tw-border focus:tw-outline-none tw-text-red-500 active:tw-text-red-700 tw-border-red-500 tw-rounded-md tw-absolute tw-top-2 tw-right-2 tw-transition-colors" onClick={() => setModalOpen(false)}>
                                    <CloseSVG className="tw-w-6 tw-h-6" />
                                </button>

                                <div className="tw-flex tw-flex-wrap tw-justify-start">
                                    {
                                        projects.map((item, i) =>
                                            <button className="tw-w-32 tw-h-40 tw-rounded-md tw-shadow-md tw-border tw-m-3 tw-transform-gpu hover:tw-scale-110 tw-transition-all tw-duration-300 focus:tw-outline-none tw-inline-flex tw-flex-col" key={item.id} onClick={() => loadProject(item.id)}>
                                                <div className={`tw-relative tw-w-32 tw-h-24 tw-rounded-t-md tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-white ${item.project_type === 1 ? 'tw-bg-green-400' : (item.project_type === 0 ? 'tw-bg-blue-400' : 'tw-bg-gray-400')}`}>
                                                    <span className="tw-text-13px">{item.project_number}</span>
                                                    <span className="tw-text-13px tw-mt-1">{statusNames[item.status]}</span>
                                                    <span className="tw-text-xs tw-mt-1">{new Date(item.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="tw-pl-2 tw-mt-1 tw-truncate tw-text-xs tw-w-full tw-text-left">
                                                    {
                                                        {
                                                            1: 'Кластер',
                                                            0: 'Аж ахуй нэгж',
                                                        }[item.project_type] || '--/--'
                                                    }
                                                </div>
                                                <div className="tw-pl-2 tw-mt-0.5 tw-truncate tw-text-xs tw-w-full tw-text-left">
                                                    {item.company_name}
                                                </div>
                                                <div className="tw-pl-2 tw-mt-0.5 tw-truncate tw-text-xs tw-w-full tw-text-left">
                                                    {item.project_name}
                                                </div>
                                            </button>
                                        )
                                    }

                                    <button className="tw-w-32 tw-h-40 tw-rounded-md tw-shadow-md tw-border tw-m-3 tw-transform-gpu hover:tw-scale-110 tw-transition-all tw-duration-300 focus:tw-outline-none tw-inline-flex tw-flex-col" onClick={createProject}>
                                        <div className="tw-w-32 tw-h-24 tw-bg-gray-400 tw-rounded-t-md tw-flex tw-justify-center tw-items-center">
                                            <DocAddSVG className="tw-w-10 tw-h-10 tw-text-white" />
                                        </div>
                                        <div className="tw-px-2 tw-w-full tw-text-center tw-mt-2 tw-text-xs tw-font-medium">
                                            Шинээр маягт бөглөх
                                        </div>
                                    </button>
                                </div>
                            </animated.div>
                        )
                    }
                </animated.div>
            )}

            <Transition
                items={previewModalOpen}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {item => item && (anims1 =>
                    <animated.div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-bg-gray-700 tw-bg-opacity-80 tw-z-10" style={anims1}>
                        <Transition
                            items={previewModalOpen}
                            from={{ width: 0 }}
                            enter={{ width: 'auto' }}
                            leave={{ width: 0 }}>
                            {item => item && (anims =>
                                <animated.div className="tw-fixed tw-top-0 tw-left-0 tw-h-screen tw-overflow-y-auto tw-overflow-x-hidden tw-bg-white tw-px-2 tw-pt-6 tw-max-w-full" style={anims} ref={previewContainerRef}>
                                    <button className="tw-text-red-500 active:tw-text-red-600 tw-rounded tw-border tw-border-red-500 active:tw-border-red-600 tw-absolute tw-top-1.5 tw-right-1.5 focus:tw-outline-none" onClick={() => setPreviewModalOpen(false)}>
                                        <CloseSVG className="tw-w-6 tw-h-6 tw-transition-colors" />
                                    </button>

                                    <UrgudulPreview project={UrgudulCtx.data} />
                                </animated.div>
                            )}
                        </Transition>
                    </animated.div>
                )}
            </Transition>
        </div>
    )
}

const PageButton = ({ page, currentPage, handleJump }) => (
    <button
        className={`tw-mx-2 tw-px-2 tw-py-0.5 tw-rounded-md hover:tw-shadow-md focus:tw-outline-none tw-text-sm active:tw-text-indigo-500 ${page === currentPage && 'tw-bg-indigo-500 tw-text-white'} tw-transition-colors tw-transition-shadow`}
        onClick={handleJump}
    >
        {page}
    </button>
)

const PaginationStart = ({ page, handleJump }) => (
    <>
        <PageButton page={1} currentPage={page} handleJump={() => handleJump(1)} />
        <PageButton page={2} currentPage={page} handleJump={() => handleJump(2)} />
        <PageButton page={3} currentPage={page} handleJump={() => handleJump(3)} />
        {page === 3 && <PageButton page={4} currentPage={page} handleJump={() => handleJump(4)} />}
        <span className={page !== 3 && 'tw-mx-3'}>...</span>
        <PageButton page={maxPage} currentPage={page} handleJump={() => handleJump(maxPage)} />
    </>
)

const PaginationMiddle = ({ page, handleJump }) => (
    <>
        <PageButton page={1} currentPage={page} handleJump={() => handleJump(1)} />
        <span className="">...</span>
        <PageButton page={page - 1} currentPage={page} handleJump={() => handleJump(page - 1)} />
        <PageButton page={page} currentPage={page} handleJump={() => handleJump(page)} />
        <PageButton page={page + 1} currentPage={page} handleJump={() => handleJump(page + 1)} />
        <span className="">...</span>
        <PageButton page={maxPage} currentPage={page} handleJump={() => handleJump(maxPage)} />
    </>
)

const PaginationEnd = ({ page, handleJump }) => (
    <>
        <PageButton page={1} currentPage={page} handleJump={() => handleJump(1)} />
        <span className={page !== maxPage - 2 && 'tw-mx-3'}>...</span>
        {page === maxPage - 2 && <PageButton page={maxPage - 3} currentPage={page} handleJump={() => handleJump(maxPage - 3)} />}
        <PageButton page={maxPage - 2} currentPage={page} handleJump={() => handleJump(maxPage - 2)} />
        <PageButton page={maxPage - 1} currentPage={page} handleJump={() => handleJump(maxPage - 1)} />
        <PageButton page={maxPage} currentPage={page} handleJump={() => handleJump(maxPage)} />
    </>
)

const maxPage = 8

function showPaginationVariant(page) {
    if (page <= 3) return 'start'
    else if (page >= maxPage - 2) return 'end'
    else return 'middle'
}
