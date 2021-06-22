import AlertContext from 'components/utilities/alertContext'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import { containerClass, UrgudulHeader } from './1st'
import axios from 'axiosbase'
import SearchSelect from 'components/urgudul_components/searchSelect'
import FormInline from 'components/urgudul_components/formInline'
import HelpPopup from 'components/help_popup/helpPopup'
import FormRichText from 'components/urgudul_components/formRichText'
import ButtonTooltip from 'components/button_tooltip/buttonTooltip'
import MinusCircleSVG from 'assets/svgComponents/minusCircleSVG'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'

const initialOfficials = [
   {
      fullname: null,
      position: null,
      phone: null,
      email: null,
      project_role: null,
   },
]

export default function UrgudulPage3() {
   const [officials, setOfficials] = useState(initialOfficials)

   const handleInput = (key, value, index) => setOfficials(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   const handleInputFormatted = (key, values, index) => setOfficials(prev => {
      const next = [...prev]
      next[index][key] = values.formattedValue
      return next
   })

   const handleRemove = (index) => setOfficials(prev => prev.filter((_, i) => i !== index))

   const handleAdd = () => setOfficials(prev => [...prev, {
      fullname: null,
      position: null,
      phone: null,
      email: null,
      project_role: null,
   }])

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)

   const isCluster = true

   const [occupations, setOccupations] = useState([])

   useEffect(() => {
      axios.get('occupations').then(res => {
         setOccupations(res.data.data)
      })
   }, [])

   return (<>
      <div className={containerClass}>
         <UrgudulHeader
            label="Түлхүүр албан тушаалтнуудын жагсаалт"
         />

         {officials.map((official, i) =>
            <div className="tw-flex odd:tw-bg-gray-50 tw-px-3" key={i}>
               <div className="tw-flex-grow">
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start">
                     <FormInline label="Албан тушаалтны овог нэр" value={official.fullname || ''} name="fullname" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />

                     <SearchSelect label="Албан тушаал" data={occupations} value={official.position} name="position" id={i} displayName="description_mon" setForm={handleInput} classAppend="tw-w-full tw-max-w-sm" classInput="tw-w-full" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} />

                     <FormInline label="Гар утас" type="numberFormat" formats={{ format: '(+976) #### ####' }} value={official.phone || ''} name="phone" index={i} setter={handleInputFormatted} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-40" />

                     <FormInline label="Имэйл хаяг" type="email" value={official.email || ''} name="email" index={i} setter={handleInput} classAppend="tw-w-full tw-max-w-md" classLabel={i % 2 === 1 && 'tw-bg-gray-50'} classInput="tw-w-full" />
                  </div>

                  <FormRichText
                     label="Төслийг хэрэгжүүлэхэд гүйцэтгэх үүрэг"
                     HelpPopup={<HelpPopup classAppend="tw-ml-2" main="Тухайлбал ажлын цар хүрээ, ач холбогдол тодорхойлох, төсөв боловсруулах, төслийг хэрэгжүүлэхэд дэмжлэг үзүүлэх гм." position="top-left" />}
                     modules="small"
                     value={official.project_role || ''}
                     name="project_role"
                     index={i}
                     setter={handleInput}
                     classAppend="tw-pl-3 tw-pt-1"
                  />
               </div>

               <div className="tw-flex tw-items-center">
                  <ButtonTooltip tooltip="Хасах" beforeSVG={<MinusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={() => handleRemove(i)} classButton="tw-text-red-500 active:tw-text-red-600" />
               </div>
            </div>
         )}

         <div className="tw-flex tw-justify-end">
            <ButtonTooltip tooltip="Шинээр нэмэх" beforeSVG={<PlusCircleSVG className="tw-w-8 tw-h-8 tw-transition-colors tw-duration-300" />} onClick={handleAdd} classAppend="tw-mr-2" classButton={`tw-text-green-500 active:tw-text-green-600`} />
         </div>
      </div>

      <ClusterMembers isCluster={isCluster} />
   </>
   )
}

const initialMembers = [
   {

   },
]

function ClusterMembers({ isCluster }) {
   const [members, setMembers] = useState(initialMembers)

   const handleInput = (key, value) => setMembers(prev => (
      { ...prev, [key]: value }
   ))

   return (
      <Transition
         items={isCluster}
         from={{ transform: 'scale(0)' }}
         enter={{ transform: 'scale(1)' }}
         leave={{ transform: 'scale(0)' }}
      >
         {item => item && (anims =>
            <animated.div className={containerClass} style={anims}>
               <UrgudulHeader
                  label="Кластерын гишүүн байгууллагууд"
               />

               <div className="">
                  <div className="">
                     Аж ахуйн нэгжийн нэр
                  </div>

                  <div className="">
                     Регистрийн дугаар
                  </div>

                  <div className="">
                     Голлох борлуулалт хийдэг үйл ажиллагааны чиглэл
                  </div>

                  <div className="">
                     Аж ахуйн нэгжийн борлуулалт /төгрөгөөр/ Сонгосон он
                  </div>

                  <div className="">
                     <div className="">
                        Гүйцэтгэх захирлын нэр
                     </div>

                     <div className="">
                        Утасны дугаар
                     </div>

                     <div className="">
                        Имэйл хаяг
                     </div>
                  </div>
               </div>

               <div className="">
                  Кластерын гишүүдийн нийт борлуулалт /төгрөгөөр/ /тэргүүлэх ААН-г оролцуулаад/
               </div>
            </animated.div>
         )}
      </Transition>
   )
}
