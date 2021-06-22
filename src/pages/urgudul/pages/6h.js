import React from 'react'
import { useState } from 'react'
import { animated, Transition } from 'react-spring/renderprops'
import { containerClass, UrgudulHeader } from './1st'

export default function UrgudulPage6() {
   const [activities, setActivities] = useState([])

   const handleInput = (key, value, index) => setActivities(prev => {
      const next = [...prev]
      next[index][key] = value
      return next
   })

   return (
      <div className={containerClass}>
         <UrgudulHeader label="Төлөвлөсөн үйл ажиллагаа, төсөв" />\

         <div className="">
            <div className="">
               Үйл ажиллагаа
            </div>

            <Transition
               items={true}
               from={{}}
               enter={{}}
               leave={{}}
            >
               {item => item && (anims =>
                  <animated.div className="" style={anims}>
                     <div className="">
                        Тайлбар
                     </div>

                     <div className="">
                        Үйл ажиллагааны төсөв
                     </div>

                     <div className="">
                        ЭДТ-с хүсэж буй санхүүжилт
                     </div>
                  </animated.div>
               )}
            </Transition>
         </div>
      </div>
   )
}

const initialActivity = [
   {

   },
]

const activities = [
   'Экспорт хөгжлийн төлөвлөгөө',
   'Зах зээлийн судалгаа',
   'Вебсайт, брэндбүүк, сав баглаа боодол, каталог хөгжүүлэлт',
   'Сурталчилгааны эх бэлтгэл, видео сурталчилгаа, дуут сурталчилгаа бүтээх',
   'Сурталчилгаа цацах',
   'Үзэсгэлэн худалдаа',
   'ERP систем',
   'Чанарын удирдлага',
   'Бүтээгдэхүүн хөгжүүлэлт, шинэ загвар',
]
