import React, { useState } from 'react'
import { Fill, Signature } from './makeContract'

export default function OwnershipAttach() {
   const [info, setInfo] = useState({
      company_name: null,
      representative: null,
      position: null,
      date: null
   })

   const handleInput = (key, value) => setInfo(prev => ({ ...prev, [key]: value }))

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6">
               Хавсралт 3. Эцсийн өмчлөгчийн мэдээлэл
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4">
               ЗААВАР:

               Энэхүү эцсийн өмчлөлийн талаархи мэдээллийг ("Маягт") Санхүүгийн дэмжлэг хүртэгч байгууллагууд бөглөнө. Санхүүгийн дэмжлэг хүртэгч гишүүн байгууллага тус бүр тусдаа маягт бөглөж ирүүлнэ. Энэхүү маягтанд ирүүлэх эцсийн өмчлөгчийн тухай мэдээлэл нь маягтыг бөглөж ирүүлсэн өдрийн байдлаар хүчинтэй байна.

               Энэхүү маягтад заасан эцсийн өмчлөгч гэж Санхүүгийн дэмжлэг хүртэгч гишүүн байгууллагыг эцсийн байдлаар өмчилж, удирдаж байгаа дараахь нөхцлүүдийн аль нэгийг нь эсвэл заримыг нь хангаж байгаа хувь хүнийг хэлнэ:
               -	Хувьцааны 25 ба түүнээс дээш хувийг шууд болон шууд бус хэлбэрээр эзэмшиж буй;
               -	Саналын эрхтэй хувьцааны 25 ба түүнээс дээш хувийг шууд ба шууд бус хэлбэрээр эзэмшиж буй;
               -	Дэмжлэг хүртэгч гишүүдийн Удирдах зөвлөл буюу түүнтэй адилтгах удирдах байгууллагуудын олонхийг шууд болон шууд бусаар томилох эрхтэй.
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4">
               Хэнд: Экспортыг дэмжих төсөлд
               2021 оны .... дугаар сарын ....-ний өдөр байгуулсан Гэрээний дагуу эцсийн өмчлөгчийн талаар нэмэлт мэдээлэл өгөх үүргийн дагуу
               (i) бид дараах эцсийн өмчлөгчийн мэдээллийг өгч байна.
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4">
               <div className="">
                  [овог, нэр, иргэний харьяалал, оршин суугаа улс]
               </div>

               <div className="">
                  Хувьцааны 25 ба түүнээс дээш хувийг шууд болон шууд бус хэлбэрээр эзэмшиж байгаа.
                  <div className="">
                     <input type="checkbox" /> Тийм
                  </div>
                  <div className="">
                     <input type="checkbox" /> Үгүй
                  </div>
               </div>

               <div className="">
                  Саналын эрхтэй хувьцааны 25% ба түүнээс дээш хувийг шууд ба шууд бус хэлбэрээр эзэмшиж байгаа.
                  <div className="">
                     <input type="checkbox" /> Тийм
                  </div>
                  <div className="">
                     <input type="checkbox" /> Үгүй
                  </div>
               </div>

               <div className="">
                  Санхүүгийн дэмжлэг хүртэгч гишүүдийн Удирдах зөвлөл буюу түүнтэй адилтгах удирдах байгууллагуудын олонхыг шууд болон шууд бусаар томилох эрхтэй.
                  <div className="">
                     <input type="checkbox" /> Тийм
                  </div>
                  <div className="">
                     <input type="checkbox" /> Үгүй
                  </div>
               </div>
            </div>

            <div className="tw-mt-6 tw-mx-2 sm:tw-mx-4">
               <div className="">
                  <div className="">
                     ЭСХҮЛ
                  </div>
                  (ii) Дараах нөхцөлүүдийн аль нэгийг эсхүл заримыг нь хангасан эцсийн өмчлөгч байхгүй болохыг мэдэгдэж байна:
                  ●	хувьцааны 25 ба түүнээс дээш хувийг шууд болон шууд бус хэлбэрээр эзэмшиж байгаа
                  ●	саналын эрхтэй хувьцааны 25 ба түүнээс дээш хувийг шууд ба шууд бус хэлбэрээр эзэмшиж байгаа
                  ●	Санхүүгийн дэмжлэг хүртэгч гишүүдийн Удирдах зөвлөл буюу түүнтэй адилтгах удирдах байгууллагуудын олонхыг шууд болон шууд бусаар томилох эрхтэй
               </div>

               <div className="tw-mt-2">
                  <div className="">
                     ЭСХҮЛ
                  </div>
                  (iii) Бид дараах нөхцөлүүдийн аль нэгийг нь эсхүл заримыг нь хангаж байгаа эцсийн өмчлөгчийг тодорхойлох боломжгүй гэдгээ мэдэгдэж байна. [Хэрэв энэ сонголтыг сонгосон бол Санхүүгийн дэмжлэг хүртэгч гишүүн яагаад тодорхойлж чадахгүй байгаа талаар тайлбар өгөх шаардлагатай]
                  ●	хувьцааны 25 ба түүнээс дээш хувийг шууд болон шууд бус хэлбэрээр эзэмшиж байгаа
                  ●	саналын эрхтэй хувьцааны 25% ба түүнээс дээш хувийг шууд ба шууд бус хэлбэрээр эзэмшиж байгаа
                  ●	Санхүүгийн дэмжлэг хүртэгч гишүүдийн Удирдах зөвлөл буюу түүнтэй адилтгах удирдах байгууллагуудын олонхыг шууд болон шууд бусаар томилох эрхтэй
               </div>
            </div>

            <div className="tw-mt-6 tw-pb-10 tw-mx-2 sm:tw-mx-4">
               <div className="">
                  Компанийн нэр: <Fill value={info.company_name} name="company_name" setter={handleInput} editable defaultLength={16} dotted />
               </div>
               <div className="">
                  Компанийг төлөөлж гарын үсэг зурах эрх бүхий хүний нэр: <Fill value={info.representative} name="representative" setter={handleInput} editable defaultLength={16} dotted />
               </div>
               <div className="">
                  Албан тушаал: <Fill value={info.position} name="position" setter={handleInput} editable defaultLength={16} dotted />
               </div>
               {/* <Signature /> */}
               <div className="">
                  Гарын үсэг зурсан огноо: <input className="focus:tw-outline-none tw-w-36" type="date" value={info.date} onChange={e => handleInput('date', e.target.value)} />
               </div>
            </div>
         </div>
      </div>
   )
}
