import React from 'react'
import TrainingNavigatorUser from './training_user/TrainingNavigator'
import { Link, useLocation } from 'react-router-dom'
import ClipboardListSVG from 'assets/svgComponents/clipboardListSVG'

export default function TrainingFrontPage() {
   const location = useLocation()
   console.log(location)

   return (
      <div className="tw-text-gray-700 tw-text-sm">
         <div className="tw-flex tw-justify-end" style={{ backgroundColor: '#003366' }}>
            <div className="tw-flex tw-flex-col tw-items-end tw-bg-white">
               <img className="tw-h-20 tw-rounded-md" src="/head.jpg" alt="logo-big" />
               <div className="tw-text-lg tw-text-right tw-text-white tw-w-full tw-px-4" style={{ backgroundColor: '#003366' }}>
                  Сургалтын хөтөлбөр
               </div>
            </div>
         </div>

         <div className="tw-flex tw-h-full">
            <div className="tw-flex tw-flex-col tw-w-60 tw-flex-shrink-0">
               <SidebarItem label="Зарлагдсан сургалтууд" link="/trainings" SVG={ClipboardListSVG} />

               <SidebarItem label="Захиалгат сургалтын хүсэлт" link="/trainings/request" SVG={ClipboardListSVG} />

               <SidebarItem label="Сургалтын үнэлгээ" link="/trainings/feedback" SVG={ClipboardListSVG} />
            </div>

            <div className="tw-flex-grow">
               <TrainingNavigatorUser />
            </div>
         </div>
      </div>
   )
}

const SidebarItem = ({ label, link, SVG }) => {
   const location = useLocation()
   const active = link === location.pathname

   return (
      <div className={`tw-rounded-md tw-py-1.5 tw-m-0.5 tw-px-1.5 ${active && 'tw-bg-blue-600 tw-text-white'} tw-transition-colors`}>
         <Link style={{ color: 'currentcolor' }} to={link}>
            <span className="tw-flex tw-items-center">
               {SVG && <SVG className="tw-w-5 tw-h-5 tw-mr-2" />}
               {label}
            </span>
         </Link>
      </div>
   )
}
