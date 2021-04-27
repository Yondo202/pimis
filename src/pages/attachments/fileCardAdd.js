import PlusSVG from 'assets/svgComponents/plusSVG'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import React from 'react'

export default function FileCardAdd(props) {
   return (
      <div className={`tw-inline-flex tw-items-center tw-rounded-lg tw-cursor-pointer ${props.classAppend}`} onClick={props.onClick} style={props.style}>
         <svg className="tw-h-20" viewBox="0 0 285 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.725098 20.775C0.725098 9.78453 9.63483 0.875 20.6251 0.875H194.75L284.3 90.425V329.225C284.3 340.215 275.39 349.125 264.4 349.125H20.6251C9.63483 349.125 0.725098 340.215 0.725098 329.225V20.775Z" fill="url(#paint0_linear)" />
            <path fillRule="evenodd" clipRule="evenodd" d="M194.75 0.875V70.525C194.75 81.5153 203.66 90.425 214.65 90.425H284.3L194.75 0.875Z" fill="url(#paint1_linear)" />
            <defs>
               <linearGradient id="paint0_linear" x1="0.725098" y1="0.875" x2="0.725098" y2="349.125" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFDFB8" />
                  <stop offset="1" stopColor="#FFCA8A" />
               </linearGradient>
               <linearGradient id="paint1_linear" x1="194.75" y1="0.875" x2="194.75" y2="90.425" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFCC8F" />
                  <stop offset="1" stopColor="#FFBB69" />
               </linearGradient>
            </defs>
         </svg>

         <ButtonTooltip tooltip="Файл нэмж оруулах" beforeSVG={<PlusSVG className="tw-w-10 tw-h-10" />} classAppend="tw-right-13 tw-w-0" classButton="tw-text-white hover:tw-shadow-none" />
      </div>
   )
}
