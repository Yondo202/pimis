import React, { useState } from 'react'
import TrainingNavigatorUser from './training_user/TrainingNavigator'
import { Link, useLocation } from 'react-router-dom'
import ClipboardListSVG from 'assets/svgComponents/clipboardListSVG'
import ClipboardCheckSVG from 'assets/svgComponents/clipboardCheckSVG'
import AnnotationSVG from 'assets/svgComponents/annotationSVG'
import { Transition, animated } from 'react-spring/renderprops'

export default function TrainingFrontPage({ user }) {
   const [navbarOpen, setNavbarOpen] = useState(false)

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-flex tw-justify-center tw-items-stretch tw-h-full tw-bg-white" style={{ minHeight: user ? 'calc(100vh - 45px)' : '100vh' }}>
         <div className="tw-flex tw-max-w-5xl tw-w-full tw-px-2 tw-items-stretch">
            <div className="tw-w-60 tw-flex-shrink-0 tw-pl-2 tw-pr-6 tw-sticky tw-top-40 tw-hidden sm:tw-block" style={{ height: 'calc(100vh /7 * 5)' }}>
               <div className="tw-flex tw-flex-col tw-rounded-lg tw-shadow-md tw-p-1.5 tw-h-full tw-bg-white">
                  <SidebarItem label="Сургалтын бүртгэл" link="/trainings" pathnames={['trainings', 'registration']} SVG={ClipboardListSVG} />
                  <SidebarItem label="Захиалгат сургалтын хүсэлт" link="/trainings/request" pathnames={['request']} SVG={AnnotationSVG} />
                  <SidebarItem label="Сургалтын үнэлгээ" link="/trainings/2/feedback" pathnames={['feedback']} SVG={ClipboardCheckSVG} />
               </div>
            </div>

            <div className="tw-flex-grow tw-w-full">
               <div className="tw-flex tw-items-center tw-overflow-hidden tw-p-2 tw-mt-2 sm:tw-mt-8 tw-bg-white tw-rounded-lg tw-shadow-md">
                  <div className="tw-text-xl tw-flex tw-justify-center tw-flex-grow tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-blue-500 tw-to-green-500 tw-uppercase tw-font-bold tw-px-4 tw-whitespace-nowrap tw-tracking-wide">
                     Сургалтын хөтөлбөр
                  </div>
                  <img className="tw-h-12 tw-object-contain" src="/head.jpg" alt="logo-big" />
               </div>

               <div className="sm:tw-hidden tw-relative">
                  <button className="tw-rounded-lg tw-w-full tw-py-2 tw-mt-4" onClick={() => setNavbarOpen(prev => !prev)}>
                     AAAAAAA
                  </button>

                  <Transition
                     items={navbarOpen}
                     from={{ height: 0 }}
                     enter={{ height: 'auto' }}
                     leave={{ height: 0 }}>
                     {item => item && (anims =>
                        <animated.div className="tw-overflow-hidden" style={anims}>
                           <NavbarItem label="Сургалтын бүртгэл" />
                           <NavbarItem label="Захиалгат сургалтын хүсэлт" />
                           <NavbarItem label="Сургалтын үнэлгээ" />
                        </animated.div>
                     )}
                  </Transition>
               </div>

               <div className="tw-flex-grow tw-mt-6">
                  <TrainingNavigatorUser />
               </div>
            </div>
         </div>
      </div>
   )
}

const SidebarItem = ({ label, link, pathnames, SVG }) => {
   const location = useLocation()
   const pathname = location.pathname
   const isActive = pathnames?.includes(pathname.slice(pathname.lastIndexOf('/') + 1))

   return (
      <div className={`tw-rounded tw-py-1.5 tw-m-0.5 tw-px-1.5 tw-font-medium ${isActive && 'tw-bg-blue-500 tw-text-white'} tw-transition-colors`}>
         <Link style={{ color: 'currentcolor' }} to={link}>
            <span className="tw-flex tw-items-center tw-text-13px">
               {SVG && <SVG className="tw-w-5 tw-h-5 tw-mr-2" />}
               {label}
            </span>
         </Link>
      </div>
   )
}

const NavbarItem = ({ label, link, SVG }) => {
   return (
      <div className="tw-flex tw-items-center tw-cursor-pointer tw-justify-end">
         {SVG && <SVG className="tw-w-5 tw-h-5 tw-mr-2" />}
         {label}
      </div>
   )
}
