import React from 'react'
import TrainingNavigatorUser from './training_user/TrainingNavigator'
import { Link, useHistory, useLocation } from 'react-router-dom'
import ClipboardListSVG from 'assets/svgComponents/clipboardListSVG'
import ClipboardCheckSVG from 'assets/svgComponents/clipboardCheckSVG'
import AnnotationSVG from 'assets/svgComponents/annotationSVG'
import { Transition, animated, Spring } from 'react-spring/renderprops'

export default function TrainingFrontPage({ user }) {
   const location = useLocation()
   const pathname = location.pathname
   const pathOfLast = pathname.slice(pathname.lastIndexOf('/') + 1)

   const history = useHistory()
   const navTrainingHome = () => history.push('/trainings')

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-flex tw-justify-center tw-items-stretch tw-h-full tw-bg-white" style={{ minHeight: user ? 'calc(100vh - 45px)' : '100vh' }}>
         <div className="tw-flex tw-max-w-5xl tw-w-full tw-px-2 tw-items-stretch">
            <div className="tw-w-60 tw-flex-shrink-0 tw-pl-2 tw-pr-6 tw-sticky tw-top-40 tw-hidden sm:tw-block" style={{ height: 'calc(100vh /7 * 5)' }}>
               <div className="tw-flex tw-flex-col tw-rounded-lg tw-shadow-md tw-p-1.5 tw-h-full tw-bg-white">
                  <SidebarItem label="Сургалтын бүртгэл" link="/trainings" pathnames={['trainings', 'registration']} pathOfLast={pathOfLast} SVG={ClipboardListSVG} />
                  <SidebarItem label="Захиалгат сургалтын хүсэлт" link="/trainings/request" pathnames={['request']} pathOfLast={pathOfLast} SVG={AnnotationSVG} />
                  <SidebarItem label="Сургалтын үнэлгээ" link="/trainings/feedback" pathnames={['feedback']} pathOfLast={pathOfLast} SVG={ClipboardCheckSVG} />
               </div>
            </div>

            <div className="tw-flex-grow tw-w-full">
               <div className="tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-items-center tw-overflow-hidden tw-p-2 tw-mt-2 sm:tw-mt-8 tw-bg-white tw-rounded-lg tw-shadow-md tw-cursor-pointer" onClick={navTrainingHome}>
                  <div className="tw-mt-2 tw-mb-1 sm:tw-my-0 tw-text-xl tw-flex tw-justify-center tw-flex-grow tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-blue-500 tw-to-green-500 tw-uppercase tw-font-bold tw-px-4 tw-whitespace-nowrap tw-tracking-wide">
                     Сургалтын хөтөлбөр
                  </div>
                  <img className="tw-h-12 tw-object-contain" src="/head.jpg" alt="logo-big" />
               </div>

               <div className="sm:tw-hidden tw-relative tw-flex tw-mt-4 tw-rounded-lg tw-shadow-md tw-py-2.5 tw-px-2">
                  <NavbarItem label="Сургалтын бүртгэл" link="/trainings" pathnames={['trainings', 'registration']} pathOfLast={pathOfLast} SVG={ClipboardListSVG} />
                  <NavbarItem label="Захиалгат сургалтын хүсэлт" link="/trainings/request" pathnames={['request']} pathOfLast={pathOfLast} SVG={AnnotationSVG} />
                  <NavbarItem label="Сургалтын үнэлгээ" link="/trainings/feedback" pathnames={['feedback']} pathOfLast={pathOfLast} SVG={ClipboardCheckSVG} />
               </div>

               <div className="tw-flex-grow tw-mt-6">
                  <TrainingNavigatorUser />
               </div>
            </div>
         </div>
      </div>
   )
}

const SidebarItem = ({ label, link, pathnames, pathOfLast, SVG }) => {
   const isActive = pathnames?.includes(pathOfLast)

   return (
      <div className={`tw-rounded tw-py-1.5 tw-m-0.5 tw-px-1.5 tw-font-medium ${isActive && 'tw-bg-blue-500 tw-text-white'} tw-transition-colors`}>
         <Link className="tw-flex tw-items-center tw-text-13px" style={{ color: 'currentcolor' }} to={link}>
            {SVG && <SVG className="tw-w-5 tw-h-5 tw-mr-2" />}
            {label}
         </Link>
      </div>
   )
}

const NavbarItem = ({ label, link, pathnames, pathOfLast, SVG }) => {
   const isActive = pathnames?.includes(pathOfLast)

   return (
      <Spring
         from={{ backgroundColor: 'rgba(59, 130, 246, 0)', color: 'white' }}
         to={{ backgroundColor: isActive ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0)', color: isActive ? 'white' : 'rgb(55, 65, 81)' }}
         config={{ clamp: true }}>
         {anims1 =>
            <animated.button className="focus:tw-outline-none tw-rounded-full tw-p-2 tw-mx-1 tw-overflow-hidden tw-font-medium" style={anims1}>
               <Link className="tw-flex tw-items-center" style={{ color: 'currentcolor' }} to={link}>
                  <SVG className="tw-w-5 tw-h-5 tw-ml-1 tw-mr-2 tw-flex-shrink-0" />
                  <Transition
                     items={isActive}
                     from={{ width: 0, paddingRight: 0, opacity: 0 }}
                     enter={{ width: 'auto', paddingRight: 8, opacity: 1 }}
                     leave={{ width: 0, paddingRight: 0, opacity: 0 }}
                     config={{ clamp: true }}>
                     {item => item && (anims =>
                        <animated.span className="tw-whitespace-nowrap tw-overflow-hidden tw-text-white" style={anims}>
                           {label}
                        </animated.span>
                     )}
                  </Transition>
               </Link>
            </animated.button>
         }
      </Spring>
   )
}
