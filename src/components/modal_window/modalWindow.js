import React, { useEffect, useRef } from 'react'
import { animated, Transition } from 'react-spring/renderprops'

export default function ModalWindow({ modalOpen, setModalOpen, children, modalAppend }) {
   const modalRef = useRef()

   const handleClickOutside = (e) => {
      if (!modalRef.current?.contains(e.target)) {
         setModalOpen(false)
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   })

   return (
      <Transition
         items={modalOpen}
         from={{ opacity: 0 }}
         enter={{ opacity: 1 }}
         leave={{ opacity: 0 }}>
         {item => item && (anims =>
            <animated.div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-flex tw-justify-center tw-items-center" style={anims}>
               <Transition
                  items={modalOpen}
                  from={{ transform: 'translateY(-20px)' }}
                  enter={{ transform: 'translateY(0)' }}
                  leave={{ transform: 'translateY(20px)' }}>
                  {item1 => item1 && (anims1 =>
                     <animated.div style={anims1} className={`tw-bg-white tw-relative tw-rounded tw-shadow-md tw-p-2 tw-m-2 ${modalAppend}`} ref={modalRef}>
                        {children}
                     </animated.div>
                  )}
               </Transition>
            </animated.div>
         )}
      </Transition>
   )
}
