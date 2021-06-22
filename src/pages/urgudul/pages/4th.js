import HelpPopup from 'components/help_popup/helpPopup'
import AlertContext from 'components/utilities/alertContext'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext } from 'react'
import { useState } from 'react'
import { containerClass, UrgudulHeader } from './1st'

export default function UrgudulPage4() {
   const [form, setForm] = useState(initialState)

   const handleInput = (key, value) => setForm(prev => (
      { ...prev, [key]: value }
   ))

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Төслийн задаргаа"
         />

         <div className="">
            <div className="">
               Төслийг хэрэгжүүлэх нийт хугацаа (сараар, дээд хугацаа 9 сар)
            </div>

            <div className="">
               Экспортын бүтээгдэхүүн, экспортын зорилтот орны зах зээлийн мэдээлэл
               <HelpPopup main="Ямар бүтээгдэхүүнийг аль орны зах зээлд гаргах талаар товч танилцуулна. Уг зах зээлийн талаарх судалгаа хийгдсэн эсэх, зах зээлийн мэдээлэл, өрсөлдөгчид, бэлтгэн нийлүүлэлтийн сүлжээний талаар судалгаа хийгдсэн бол энд дурдана уу." position="bottom" />
            </div>

            <div className="">
               Тодорхойлсон асуудлууд
               <HelpPopup main="Экспортын зорилтот орны зах зээлд өөрийн бүтээгдэхүүнээ борлуулахад ямар асуудлуудыг урьдчилж шийдвэрлэх шаардлагатай байгааг бичнэ үү." position="bottom" />
            </div>
         </div>
      </div>
   )
}

const initialState = {

}
