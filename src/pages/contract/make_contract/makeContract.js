import React, { useEffect, useState, useRef } from 'react'
import SignaturePad from 'react-signature-canvas'
import ModalWindow from 'components/modal_window/modalWindow'
import PenAltSVG from 'assets/svgComponents/penAltSVG'
import PrintSVG from 'assets/svgComponents/printSVG'
import { useReactToPrint } from 'react-to-print'
import axios from 'axiosbase'

const contract = {
   1: {
      category: 'ТОДОРХОЙЛОЛТУУД',
      provisions: [
         {
            provision: 'Энэхүү Гэрээнд дурдагдсан дараах нэр томьёог дор дурдсан агуулгаар ойлгоно:'
         },
         {
            "order": "1.1",
            "provision": "“Санхүүгийн дэмжлэг” гэж Экспортыг дэмжих төслийн дэд бүрэлдэхүүн хэсэг 2.3-ын Түншлэлийн хөтөлбөрт хамрагдан, экспортын хөгжлийн  төлөвлөгөөнд тусгагдаж батлагдсан үйл ажиллагааны төсвийн 50 (тавин) хувийг санхүүжүүлэх зорилгоор Санхүүгийн дэмжлэг олгогчоос Гэрээний 2.8-д заасан нийт дүнг;",
            "subLevel": 0
         },
         {
            "order": "1.2",
            "provision": "“Санхүүгийн дэмжлэг хүртэгч” гэж Монгол Улсын хуулийн дагуу байгуулагдсан уул уурхайн бус салбарт үйл ажиллагаа эрхэлдэг, сонгон шалгаруулалтын багийн шийдвэрээр санхүүгийн дэмжлэг олгохоор баталсан аж ахуйн нэгжийг хэлнэ.",
            "subLevel": 0
         },
         {
            "order": "1.3",
            "provision": "“Үйл ажиллагааны төлөвлөгөө” гэж Экспортыг дэмжих төслийн дэд бүрэлдэхүүн хэсэг 2.3-ын хүрээнд хэрэгжүүлэхээр Санхүүгийн дэмжлэг хүртэгчийн боловсруулсан экспорттой холбоотой Гэрээний Хавсралт 1-д заасан  үйл ажиллагааг хэлнэ.",
            "subLevel": 0
         },
         {
            "order": "1.4",
            "provision": "“Ханган нийлүүлэгч” гэж Үйл ажиллагааны төлөвлөгөөнд тусгагдсан ажлын хүрээнд Санхүүгийн дэмжлэг хүртэгчтэй гэрээ хэлцэл байгуулан бүтээгдэхүүн, үйлчилгээ нийлүүлэгч хуулийн этгээдийг хэлнэ.",
            "subLevel": 0
         }
      ]
   },
   2: {
      category: 'ГЭРЭЭНИЙ ЕРӨНХИЙ АГУУЛГА БОЛОН НӨХЦӨЛҮҮД',
      provisions: [
         {
            "order": "2.1",
            "provision": "Дэлхийн банкны Худалдан авах ажиллагааны журмын 1.6-аас 1.10 дахь заалт болон Дэлхийн банкны Зөвлөх үйлчилгээний журмын 1.9-өөс 1.13 дахь заалтад заасан шаардлагыг хангаагүй аж ахуй нэгжтэй аливаа төрлийн гэрээ байгуулж санхүүжүүлэхгүй.",
            "subLevel": 0
         },
         {
            "order": "2.2",
            "provision": "Санхүүгийн дэмжлэг хүртэгч Үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэхдээ тендерт оролцогч, зөвлөх, гүйцэтгэгч, ханган нийлүүлэгч, туслан гүйцэтгэгч, үйлчилгээ үзүүлэгч, аливаа зуучлагчид болон тэдгээрийн ажилтан нар Дэлхийн банкнаас санхүүжигдэж байгаа худалдан авах ажиллагааны үйл явц, сонгон шалгаруулалт болон Гэрээний гүйцэтгэлд дээд зэргийн ёс зүйг сахих ба залилан, авилгаас ангид ажиллаж Дэлхийн банкны Авлигатай тэмцэх журмыг дагаж мөрдөхийг Дэлхийн банк шаардана. Энэ бодлогыг цаашид хэрэгжүүлэх хүрээнд Дэлхийн банкны хүсэлтээр Дэлхийн банкнаас томилсон аудиторууд болон Дэлхийн банкнаас томилогдсон этгээд нь Санхүүгийн дэмжлэг хүртэгч туслан-гүйцэтгэгч, дэд-зөвлөхүүдийн гүйцэтгэсэн ажил, үйлчилгээг газар дээр нь очиж шалгах, Санхүүгийн дэмжлэгтэй холбоотой гүйцэтгэлийн бүх данс, бүртгэл, болон Санхүүгийн дэмжлэгт өргөдөл гаргасан материалуудыг хянан шалгахыг Санхүүгийн дэмжлэг хүртэгч зөвшөөрнө.",
            "subLevel": 0
         },
         {
            "order": "2.3",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь санхүүгийн дэмжлэгээр бараа, ажил, зөвлөх, зөвлөхийн бус үйлчилгээг нээлттэй өрсөлдөөнтэйгөөр худалдан авах ба худалдан авах ажиллагаагаа Төрийн болон орон нутгийн өмчийн хөрөнгөөр бараа, ажил, үйлчилгээ худалдан авах тухай хуулийн Хоёр, Гурав, Дөрөвдүгээр бүлгийн заалтын дагуу зохион байгуулж, худалдан авах гэрээг мөн хуулийн Тавдугаар бүлгийн дагуу байгуулна. Үүнд тус хуулийн Хоёрдугаар бүлгийн 20 дугаар зүйл, 21.1, 21.4, 29.2, 29.4, 29.5, 29.6, 29.7 дугаар хэсгүүд, Гуравдугаар бүлгийн 33.2.1 дүгээр заалт, 33.3  дугаар хэсэг, Тавдугаар бүлгийн 43 дугаар зүйл хамаарахгүй болно.",
            "subLevel": 0
         },
         {
            "order": "2.3.1",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь Гэрээний Хавсралт 4-ийн дагуу худалдан авах ажиллагааны төлөвлөгөөг гаргана.",
            "subLevel": 1
         },
         {
            "order": "2.3.2",
            "provision": "Төрийн болон орон нутгийн өмчийн хөрөнгөөр бараа, ажил, үйлчилгээ худалдан авах тухай хуулийн 34 дүгээр зүйлд заасны дагуу шууд гэрээ байгуулах тохиолдолд санхүүгийн дэмжлэг олгогчийн Түншлэлийн хөтөлбөрийн багтай зөвшилцөнө.",
            "subLevel": 1
         },
         {
            "order": "2.3.3",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь өөрийн хамаарал бүхий этгээд , харьяа байгууллага, хувьцаа эзэмшигч нарт аливаа давуу тал олгох эсвэл гэрээ байгуулахыг хориглоно.",
            "subLevel": 1
         },
         {
            "order": "2.4",
            "provision": "Санхүүгийн дэмжлэг олгогч нь санхүүгийн дэмжлэг хүртэгчийн гуравдагч талтай байгуулсан гэрээ хэлцэл, тэдгээрийн хооронд үүссэн аливаа төрлийн маргаанд хариуцлага хүлээхгүй.",
            "subLevel": 0
         },
         {
            "order": "2.5",
            "provision": "Санхүүгийн дэмжлэг олгохоос өмнө Санхүүгийн дэмжлэг хүртэгч дампуурсан, татан буугдсан, эсхүл өөрчлөн байгуулагдсан тохиолдолд Гэрээ хүчин төгөлдөр бус болно.",
            "subLevel": 0
         },
         {
            "order": "2.6",
            "provision": "Зөвшөөрөгдсөн санхүүгийн дэмжлэгийн дээд хэмжээ нь Гэрээний 2.8 дахь хэсэгт заасан хэмжээнээс ихгүй байна. Гэрээний дагуу олгогдох Санхүүгийн дэмжлэг нь Гэрээний 6.1.1-д заасан Санхүүгийн дэмжлэг хүртэгчийн хэрэгжүүлэх зөвшөөрөгдсөн үйл ажиллагаа, түүний зардлыг санхүүжүүлэхэд зориулагдана. Гэрээнд заасан Үйл ажиллагааны төлөвлөгөө, тохиролцсон үр дүнгийн нотолгоо болон зөвшөөрсөн зардлууд нь Гэрээний салшгүй хэсэг байна.",
            "subLevel": 0
         },
         {
            "order": "2.7",
            "provision": "Санхүүгийн дэмжлэг хүртэгчийн Гэрээ байгуулахаас өмнө хийсэн аливаа төлбөрийг Гэрээнд тусгахгүй бөгөөд түүнийг нөхөн олгохгүй болно.",
            "subLevel": 0
         },
         {
            "order": "2.8",
            "provision": "Гэрээний дагуу Санхүүгийн дэмжлэг олгогч нэгж нь батлагдсан үйл ажиллагааны зардлын зөвшөөрсөн хэсэг болох дээд тал нь 50 хувь буюу ..................................... (............................... үгээр) /НӨАТ ороогүй/ төгрөгийг Санхүүгийн дэмжлэг хүртэгчид олгоно.",
            "subLevel": 0
         },
         {
            "order": "2.9",
            "provision": "Гэрээнд заасны дагуу санхүүгийн дэмжлэгийн төлбөрийн хүсэлт нь Хавсралт 2-т заасан тайлан, холбогдох нотлох баримтуудаар баталгаажсан нөхцөлд батлагдсан зардлын төлбөр хийгдэнэ.",
            "subLevel": 0
         },
         {
            "order": "2.10",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь Гэрээний хугацаанд хамгийн ихдээ 3 удаа төлбөр нэхэмжлэх ба нэг удаагийн нэхэмжлэлийн дүн 5 сая төгрөгөөс багагүй байна.",
            "subLevel": 0
         },
         {
            "order": "2.11",
            "provision": "Үйл ажиллагааны төлөвлөгөөг Гэрээний 6.1.1-д заасан хуваарийн дагуу хэрэгжүүлнэ. Энэхүү хуваарьт заасан дуусах хугацааг сунгах тохиолдолд хүсэлтийг Санхүүгийн дэмжлэг олгогчид бичгээр гарган зөвшөөрөл авна.",
            "subLevel": 0
         },
         {
            "order": "2.12",
            "provision": "Санхүүгийн дэмжлэг хүртэгчийн хувьд Гэрээнд гарын үсэг зурсан этгээд нь Үйл ажиллагааны төлөвлөгөөний санхүүгийн удирдлага болон Санхүүгийн дэмжлэг олгогчийн тавьж буй шаардлагыг хангах үүрэг хүлээнэ.",
            "subLevel": 0
         },
         {
            "order": "2.13",
            "provision": "Санхүүгийн дэмжлэг хүртэгч болон түүний ханган нийлүүлэгч нь Санхүүгийн дэмжлэг олгогчийн зүгээс Гэрээний хэрэгжилтэд  мониторинг хийх зорилгоор хийж буй судалгаанд хамрагдаж, хамтран ажиллана. Санхүүгийн дэмжлэг олгогч нь тухайн судалгаанд өгсөн бүх мэдээллийн нууцыг хадгалах бөгөөд түүнийг аливаа гуравдагч этгээдэд задруулахгүй. Санхүүгийн дэмжлэг олгогч нь Үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэх аль ч үед төслийн явцын талаарх мэдээллийг Санхүүгийн дэмжлэг хүртэгчээс авч болно.",
            "subLevel": 0
         }
      ]
   },
   3: {
      category: 'САНХҮҮГИЙН ДЭМЖЛЭГ ОЛГОГЧИЙН ЭРХ, ҮҮРЭГ, ХАРИУЦЛАГА',
      provisions: [
         {
            "order": "3.1",
            "provision": "Санхүүгийн дэмжлэг олгогч нь аливаа Санхүүгийн дэмжлэг хүссэн өргөдлийн бүхий л асуудлын нууцлалыг чанд хадгалах үүрэгтэй.",
            "subLevel": 0
         },
         {
            "order": "3.1.1",
            "provision": "Санхүүгийн дэмжлэг хүссэн өргөдөл буюу төслийн үйл ажиллагаа, эсхүл эдгээрээс үүдэлтэй аливаа мэдээллийг гуравдагч этгээдэд задруулахгүй. Санхүүгийн дэмжлэг олгогчийн ажилтнууд болон Санхүүгийн дэмжлэг хүртэгч нь Гэрээний явцад эсхүл тодорхойгүй хугацааны туршид Санхүүгийн дэмжлэг хүртэгчтэй холбоотой аливаа өмчийн буюу бизнесийн нууц мэдээллийг задруулахгүй байна.",
            "subLevel": 1
         },
         {
            "order": "3.1.2",
            "provision": "Төлөвлөгөөг хэрэгжүүлэхтэй холбоотой хэвлэмэл буюу бусад бүхий л материал нь Санхүүгийн дэмжлэг хүртэгчийн өмч байна. Талууд эдгээр баримт бичиг болон Гэрээний үр дүнгийн талаар баримт, бичгийн хуулбарыг хадгалан авч үлдэж болно.",
            "subLevel": 1
         },
         {
            "order": "3.1.3",
            "provision": "Санхүүгийн дэмжлэг олгогч нь Гэрээний үр дүнгийн баримт, бичгийг дэмжлэг авснаас хойш хамгийн багадаа 5 жилийн хугацаанд хадгалах эрхтэй.",
            "subLevel": 1
         },
         {
            "order": "3.1.4",
            "provision": "Санхүүгийн дэмжлэг олгогч нь Санхүүгийн дэмжлэг хүртэгчийн талаарх дараах мэдээллийн хувьд нууцлал хадгалах үүрэг хүлээхгүй.",
            "subLevel": 1
         },
         {
            "order": "3.1.4.1",
            "provision": "Энэхүү гэрээний үүргийг зөрчсөнөөс бусад байдлаар олон нийтэд ил болгосон мэдээлэл;",
            "subLevel": 2
         },
         {
            "order": "3.1.4.2",
            "provision": "Дэмжлэг хүртэгчийн гуравдагч талаас авсан хууль болон тухайн хуулийн этгээдтэй байгуулсан гэрээгээр хориглогдоогүй, нууцлалд үл хамаарах ил болгосон мэдээлэл;",
            "subLevel": 2
         },
         {
            "order": "3.1.4.3",
            "provision": "Дэмжлэг хүртэгчийн нууцлалд оруулахаас өмнө Дэмжлэг олгогч олж авсан мэдээлэл;",
            "subLevel": 2
         },
         {
            "order": "3.1.4.4",
            "provision": "Дэмжлэг олгогч нь дэмжлэг хүртэгчийн нууцлалтай мэдээллийг ашиглахгүйгээр бие даан олж авсан мэдээлэл.",
            "subLevel": 2
         },
         {
            "order": "3.2",
            "provision": "Санхүүгийн дэмжлэг олгогч нь Гэрээний хэрэгжилтийн үр дүн болон хийгдсэн төлбөрийн баримтыг аль ч үед шалгаж болно. Ханган нийлүүлэгчидтэй хийх (бичгээр эсхүл амаар) гэрээндээ Санхүүгийн дэмжлэг хүртэгч нь Гэрээтэй холбоотой бүхий л тайлан, баримт бичиг, бүртгэлд Санхүүгийн дэмжлэг олгогч буюу түүний төлөөлөгчид чөлөөтэй нэвтрэх боломжийг бүрдүүлэх талаар тусгаж өгнө.",
            "subLevel": 0
         },
         {
            "order": "3.3",
            "provision": "Санхүүгийн дэмжлэг олгогч нь батлагдсан төлөвлөгөө болон батлагдсан үйл ажиллагаатай холбоотойгоор хийгдэх санхүүгийн гүйлгээнд аудит хийх хараат бус аудиторыг Санхүүгийн дэмжлэгийг олгохоос өмнө томилох эрхтэй. Тухайн аудит нь Санхүүгийн дэмжлэг хүртэгч болон түүний ханган нийлүүлэгч байгууллагыг хамтад нь шалгана. Хэрэв залилан мэхлэх үйл ажиллагаа илэрвэл уг зөрчил гаргагчийн нэрийг олон нийтийн хэвлэл мэдээллийн хэрэгсэл (Санхүүгийн дэмжлэг олгогчийн талд ямар нэг хариуцлага хүлээхгүйгээр)-д нийтэлж болох бөгөөд ийм зөрчил гаргагчдад Санхүүгийн дэмжлэг олгогчоос цаашид ямар нэг туслалцаа үзүүлэх буюу хамтран ажиллахаас татгалзана.",
            "subLevel": 0
         },
         {
            "order": "3.4",
            "provision": "Шаардлагатай тохиолдолд дэмжлэг хүртэгчид урьдчилан мэдэгдсэний үндсэн дээр дэмжлэг хүртэгчийн үйл ажиллагаатай газар дээр нь очиж танилцана.",
            "subLevel": 0
         }
      ]
   },
   4: {
      category: 'САНХҮҮГИЙН ДЭМЖЛЭГ ХҮРТЭГЧИЙН ЭРХ, ҮҮРЭГ, ХАРИУЦЛАГА',
      provisions: [
         {
            "order": "4.1",
            "provision": "Санхүүгийн дэмжлэг авсан бүх үйл ажиллагаанаас гарах үр дүн нь дэмжлэг хүртэгчийн өмч байх бөгөөд ингэхдээ бизнесийн нууцлалыг бүрэн хадгалах болно.",
            "subLevel": 0
         },
         {
            "order": "4.2",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь дараах үүрэг хүлээнэ:",
            "subLevel": 0
         },
         {
            "order": "4.2.1",
            "provision": "Үйл ажиллагааны төлөвлөгөөний дагуу хийгдэх бүх үйл ажиллагааг хэрэгжүүлэхдээ ажлын чанар болон ур чадварыг харгалзан үзэж, зах зээлийн бодит үнээр гүйцэтгэнэ;",
            "subLevel": 1
         },
         {
            "order": "4.2.2",
            "provision": "Санхүүгийн дэмжлэгийг зөвхөн Үйл ажиллагааны төлөвлөгөөнд тусгагдан батлагдсан ажил үйлчилгээг санхүүжүүлэхэд зориулна;",
            "subLevel": 1
         },
         {
            "order": "4.2.3",
            "provision": "Бусдаар гүйцэтгүүлэх батлагдсан үйл ажиллагааг Санхүүгийн дэмжлэг хүртэгчтэй холбоо хамааралгүй нийлүүлэгч буюу зөвлөхүүд, өөрөөр хэлбэл түүнтэй бизнесийн буюу гэр бүлийн харилцаа холбоогүй этгээд явуулна. Хэрэв ийм харилцаа холбоо байгаа бол үүнийг энэхүү Гэрээнд гарын үсэг зурахаас өмнө Санхүүгийн дэмжлэг олгогчид бичгээр мэдэгдэнэ;",
            "subLevel": 1
         },
         {
            "order": "4.2.4",
            "provision": "Үйл ажиллагааны төлөвлөгөөнд тусгагдсан ажил үйлчилгээ нь Санхүүгийн дэмжлэг хүртэгчийн бизнесийн өрсөлдөх чадварыг дээшлүүлэх болон компанийн үйл ажиллагааг хэвийн түвшинд явуулахад шаардлагатай ажил үйлчилгээ байна;",
            "subLevel": 1
         },
         {
            "order": "4.2.5",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь Үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэхдээ Байгаль орчин нийгмийн хамгааллын холбогдох дүрэм, журам болон Санхүүгийн дэмжлэг олгогчийн зааврыг мөрдлөг болон ажиллана.  Санхүүгийн дэмжлэг хүртэгч нь  Хавсралт 5-д заасан шаардлагуудыг  дагаж мөрдөнө.",
            "subLevel": 1
         },
         {
            "order": "4.3",
            "provision": "Гэрээнд талууд гарын үсэг зурсны дараа Гэрээг цуцлах шийдвэрийг санхүүгийн дэмжлэг хүртэгч дангаар гаргах эрхтэй. Санхүүгийн дэмжлэг хүртэгч энэхүү Гэрээг цуцлах тохиолдолд Гэрээ цуцлагдсанаас хойш 6 сарын хугацаанд санхүүгийн дэмжлэгийн хүсэлт гаргах эрхгүй. Санхүүгийн дэмжлэг хүртэгч Гэрээг цуцалсан тохиолдолд Санхүүгийн дэмжлэг олгогчоос ямар нэгэн төлбөр олгохгүй. Гэрээ цуцлагдсан эсэхээс үл хамааран Гэрээний талууд бизнесийн нууц мэдээллийг хамгаалах үүрэг хадгалагдана.",
            "subLevel": 0
         },
         {
            "order": "4.4",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь өөрийн эцсийн өмчлөгчийг Гэрээний Хавсралт 3-ын дагуу үнэн зөвөөр мэдээлэх үүрэгтэй.",
            "subLevel": 0
         },
         {
            "order": "4.5",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь шаардлагатай тохиолдолд экспортын үйл ажиллагаатай холбоотой туршлага, мэдлэг, мэдээллээ Экспортыг дэмжих төсөлд хамрагдаж буй, хамрагдах хүсэлт гаргасан бусад аж ахуйн нэгжтэй нээлттэй, үнэ төлбөргүйгээр хуваалцаж, санхүүгийн дэмжлэг олгогчийн зүгээс зохион байгуулж буй албан ёсны сургалт, сурталчилгааны арга хэмжээнд оролцоно.",
            "subLevel": 0
         },
         {
            "order": "4.6",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь Гэрээний үр дүнгийн баримт, бичгийг дэмжлэг авснаас хойш хамгийн багадаа 5 жилийн хугацаанд хадгалахыг зөвшөөрч, улмаар холбогдох хууль, дүрэм, журмын дагуу хийгдэж буй хяналт шалгалтад зориулж эрх бүхий албан тушаалтны шаардсаны дагуу түүнийг гаргаж өгнө.",
            "subLevel": 0
         },
         {
            "order": "4.7",
            "provision": "Санхүүгийн дэмжлэг хүртэгч нь Санхүүгийн дэмжлэг олгогчийн зүгээс гаргах аливаа сурталчилгаа, мэдээллийн чанартай дараах мэдээллийг олон нийтэд мэдээлэхийг хүлээн зөвшөөрч байна. Үүнд: Хөтөлбөрт хамрагдагч хуулийн этгээдийн нэр, эцсийн өмчлөгч, үйл ажиллагааны чиглэл, Гэрээний дүн, төлөвлөсөн болон хийгдсэн үйл ажиллагааг оруулна.",
            "subLevel": 0
         }
      ]
   },
   5: {
      category: 'ТАЙЛАГНАХ ҮҮРЭГ, ХАРИУЦЛАГА',
      provisions: [
         {
            "order": "5.1",
            "provision": "Үйл ажиллагааны төлөвлөгөөний гүйцэтгэлийн хугацааны талд Санхүүгийн дэмжлэг хүртэгч нь Гэрээний Хавсралт 2-т заасан тайланг Санхүүгийн дэмжлэг олгогчид гаргаж өгөх бөгөөд уг тайланд хийж гүйцэтгэсэн ажлын хэмжээ болон цаашид хийх ажил үүргийг тодорхойлсон байна.",
            "subLevel": 0
         },
         {
            "order": "5.2",
            "provision": "Зорилтот үр дүнд бүрэн хүрсэн тохиолдолд санхүүгийн дэмжлэг хүртэгч нь үр дүнгийн талаар Гэрээний Хавсралт 2-т заасан тайланг Санхүүгийн дэмжлэг олгогчийн зохицуулагчид хүлээлгэн өгч дараах материалыг түүнд хавсаргана:",
            "subLevel": 0
         },
         {
            "order": "5.2.1",
            "provision": "Гэрээний хэрэгжилтийн төлөвлөгөөнд тусгасан ажил үйлчилгээний үр дүнгийн тайлан;",
            "subLevel": 1
         },
         {
            "order": "5.2.2",
            "provision": "Ханган нийлүүлэгчтэй холбоотой шаардлагатай баримт бичгүүд, аяллын зардал, зөвлөхийн үйлчилгээний нэхэмжлэх болон төлбөр хийсэн эх баримттай нь тулгаж баталгаажуулсан хуулбарууд;",
            "subLevel": 1
         },
         {
            "order": "5.3",
            "provision": "Жил бүрийн эцэст Санхүүгийн дэмжлэг хүртэгч нь Гэрээний хугацаанд хийсэн борлуулалтын талаарх нарийвчилсан мэдээлэл агуулсан тайланг Санхүүгийн дэмжлэг олгогчид гаргаж өгөх бөгөөд тухайн санхүүгийн жилд хийсэн экспортын хэмжээг бүтээгдэхүүний үнэ, тоо хэмжээгээр нь илтгэсэн Гаалийн ерөнхий газрын албан баримтын хамт ирүүлнэ.",
            "subLevel": 0
         }
      ]
   },
   6: {
      category: 'БУСАД',
      provisions: [
         {
            "order": "6.1",
            "provision": "Гэрээний хавсралт нь энэхүү Гэрээний салшгүй хэсэг болно.",
            "subLevel": 0
         },
         {
            "order": "6.1.1",
            "provision": "Хавсралт 1. Түншлэлийн гэрээний үйл ажиллагааны төлөвлөгөө;",
            "subLevel": 1
         },
         {
            "order": "6.1.2",
            "provision": "Хавсралт 2. Тайлан;",
            "subLevel": 1
         },
         {
            "order": "6.1.3",
            "provision": "Хавсралт 3. Эцсийн өмчлөгчийн мэдээлэл;",
            "subLevel": 1
         },
         {
            "order": "6.1.4",
            "provision": "Хавсралт 4. Худалдан авах ажиллагааны төлөвлөгөө;",
            "subLevel": 1
         },
         {
            "order": "6.1.5",
            "provision": "Хавсралт 5. Байгаль орчин, эрүүл мэнд, аюулгүй ажиллагааны шаардлагууд;",
            "subLevel": 1
         },
         {
            "order": "6.1.6",
            "provision": "Хавсралт 6. Авлига, залилан мэхлэх үйлдэл, тэдгээрт Дэлхийн банкнаас шалгалт аудит хийх Дэлхийн банкны бодлого;",
            "subLevel": 1
         },
         {
            "order": "6.2",
            "provision": "Гэрээ нь Талуудын эрх бүхий төлөөлөгчид гарын үсэг зурж, тамга, тэмдэг дарснаар хүчин төгөлдөр болж, Гэрээний үүрэг бүрэн биелэгдсэнээр  дуусгавар болно.",
            "subLevel": 0
         },
         {
            "order": "6.3",
            "provision": "Гэрээ, түүнд нэмэлт, өөрчлөлт оруулах тухай гэрээнүүд нь талууд, тэдгээрийн эрх залгамжлагч, үүрэг хүлээн авагч болон холбогдох эрх бүхий албан тушаалтны хувьд заавал биелэгдэх хүчинтэй байна.",
            "subLevel": 0
         },
         {
            "order": "6.4",
            "provision": "Гэрээний эх хувийг талууд, эрх бүхий байгууллагуудын тоогоор үйлдэж, тэдгээрт хадгалуулах бөгөөд хувиуд адил хүчинтэй байна.",
            "subLevel": 0
         },
         {
            "order": "6.5",
            "provision": "Гэрээнд оруулах нэмэлт, өөрчлөлтийг зөвхөн бичгээр үйлдэх бөгөөд эрх бүхий албан тушаалтан гарын үсэг зурж, тамга, тэмдэг дарж баталгаажсанаар хүчин төгөлдөр гэж тооцогдоно.",
            "subLevel": 0
         },
         {
            "order": "6.6",
            "provision": "Гэрээний хавсралт, нэмэлт, өөрчлөлт оруулсан гэрээнүүд нь Гэрээний салшгүй хэсэг байна.",
            "subLevel": 0
         },
         {
            "order": "6.7",
            "provision": "Гэрээгээр зохицуулаагүй бусад харилцаа, аливаа асуудлыг Монгол Улсын хууль тогтоомжийн дагуу зохицуулна.",
            "subLevel": 0
         },
         {
            "order": "6.8",
            "provision": "Энэхүү гэрээний заалтууд нь Монгол Улсын хүчин төгөлдөр хууль тогтоомжтой зөрчилдсөн тохиолдолд хуульд зааснаар зохицуулагдана. Гэрээний үүргийн биелэлтийн явцад гарах маргааныг талуудын шийдвэр гаргах түвшний эрх бүхий этгээдүүд харилцан зөвшилцөх замаар шийдвэрлэхийг эрмэлзэнэ. Хэрэв 60 хоногт багтаан харилцан зөвшилцөлд хүрч чадаагүй тохиолдолд маргааныг Монгол Улсын хууль тогтоомжийн дагуу Монголын үндэсний худалдаа, аж үйлдвэрийн танхимын дэргэдэх Монголын олон улсын арбитраар шийдвэрлүүлнэ.",
            "subLevel": 0
         },
         {
            "order": "6.9",
            "provision": "Гэрээтэй холбоотой бүх мэдээлэл, мэдэгдэл, албан бичгийг талууд доор заасан хаягаар хүргүүлнэ. Хаяг өөрчлөгдсөн тохиолдолд түүнийг нөгөө талдаа мэдээлээгүйгээс мэдэгдэл, албан бичиг хүрээгүйн хариуцлагыг тэдгээрийг хүргүүлсэн тал хариуцахгүй болно.",
            "subLevel": 0
         },
         {
            "order": "6.9.1",
            "provision": "Санхүүгийн дэмжлэг хүртэгчийн албан ёсны хаяг: .................................",
            "subLevel": 1
         },
         {
            "order": "6.9.2",
            "provision": "Санхүүгийн дэмжлэг олгогчийн албан ёсны хаяг: Монгол Улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 2 дугаар хороо, Гэрэгэ тауэр, 8 дугаар  давхар",
            "subLevel": 1
         }
      ]
   },
}

const dateNow = new Date()
const currentYear = dateNow.getFullYear()
const currentMonth = dateNow.getMonth() + 1
const currentDate = dateNow.getDate()

const initialSignersEdp = [{
   name: 'Т.ЖАМБАЛЦЭРЭН',
   position: 'Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яамны Төрийн нарийн бичгийн дарга',
   signature: null,
   order: 1
}, {
   name: 'О.ОНОН',
   position: 'Экспортыг дэмжих төслийн Захирал',
   signature: null,
   order: 2
}, {
   name: 'Б.ДӨЛГӨӨН',
   position: 'Экспортыг дэмжих төслийн Зохицуулагч',
   signature: null,
   order: 3
}, {
   name: 'M.БАТТУЛГА',
   position: 'Экспортыг дэмжих төслийн Бизнес хөгжлийн ахлах мэргэжилтэн',
   signature: null,
   order: 4
}]

const initialSignersReceiving = [{
   name: null,
   position: null,
   signature: null,
   order: 1
}, {
   name: null,
   position: null,
   signature: null,
   order: 2
}]

const descriptions = [
   '/Удирдах албан тушаалтан байна./',
   '/Санхүү хариуцсан албан тушаалтан байна./'
]

export default function MakeContract() {
   const [info, setInfo] = useState({
      year: null,
      month: null,
      day: null,
      contract_number: null,
      hot_aimag: null,
      sum_duureg: null,
      horoo_bag: null,
      detailed_location: null,
      registration_number: null,
      register: null,
      company_name: null,
      bh_zuvluh: null,
      amount: null,
      amount_verbose: null,
      location: null,
   })

   const handleInput = (key, value) => setInfo(prev => ({ ...prev, [key]: value }))

   const [signersEdp, setSignersEpd] = useState(initialSignersEdp)
   const [signersReceiving, setSignersReceiving] = useState(initialSignersReceiving)

   useEffect(() => {
      setInfo(prev => ({
         ...prev,
         year: prev.year ?? currentYear,
         month: prev.month ?? currentMonth,
         day: prev.day ?? currentDate,
         company_name: localStorage.getItem('companyname')
      }))
   }, [])

   const componentRef = useRef()

   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
   })

   const handleSave = () => {
      axios.post()
   }

   return (
      <div className="tw-text-sm tw-text-gray-700 tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-pt-6 tw-pb-20">
         <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-2 tw-border-t tw-border-gray-100">
            <div className="tw-flex tw-justify-end">
               <button className="tw-mt-2 tw-mr-2 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-transition-shadow tw-font-light" onClick={handlePrint}>
                  <span className="tw-text-sm">Хэвлэх болон хадгалах</span>
                  <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
               </button>
            </div>

            <div className="" ref={componentRef}>
               <div className="tw-text-lg tw-font-medium tw-text-center tw-mt-6">
                  ТҮНШЛЭЛИЙН ГЭРЭЭ
               </div>

               <div className="tw-px-2 sm:tw-px-10 tw-mt-6 tw-pb-4">
                  <div className="tw-flex tw-flex-wrap tw-justify-between tw-px-2 sm:tw-px-4">
                     <span className="">
                        <Fill value={info.year} /> оны <Fill value={info.month} /> дугаар сарын <Fill value={info.day} />-ний өдөр
                     </span>
                     <span className="tw-mx-2">
                        Гэрээний №: <Fill value={info.contract_number} name="contract_number" setter={handleInput} editable />
                     </span>
                     <span className="">
                        Улаанбаатар хот
                     </span>
                  </div>

                  <div className="tw-mt-6 tw-leading-relaxed" style={{ wordSpacing: 2 }}>
                     <p className="" style={{ textIndent: 16 }}>
                        Энэхүү Түншлэлийн гэрээ (цаашид “Гэрээ” гэх)-г Монгол Улсын Засгийн газар болон Олон Улсын Хөгжлийн ассоциаци нарын хооронд 2016 оны 08 дугаар сарын 26-ны өдөр байгуулсан Санхүүжилтийн гэрээ, Монгол Улсын Иргэний хуулийн 15 дугаар бүлэг, Экспортыг дэмжих төслийн түншлэлийн хөтөлбөрийн сонгон шалгаруулалтын багийн .... оны .... дугаар сарын ....-ны өдрийн .... дугаар шийдвэрийг тус тус үндэслэн,
                     </p>
                     <p className="">
                        нэг талаас Монгол Улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 2 дугаар хороо, Гэрэгэ тауэр, 8 дугаар  давхарт байрлах Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яамны дэргэдэх Экспортыг дэмжих төслийг хэрэгжүүлэх нэгж (цаашид “Санхүүгийн дэмжлэг олгогч” гэх),
                     </p>
                     <p className="">
                        нөгөө талаас Монгол Улс, <Fill value={info.hot_aimag} name="hot_aimag" setter={handleInput} editable placeholder="хот/аймаг" />, <Fill value={info.sum_duureg} name="sum_duureg" setter={handleInput} editable placeholder="сум/дүүрэг" />, <Fill value={info.horoo_bag} name="horoo_bag" setter={handleInput} editable placeholder="баг/хороо" />, <Fill value={info.detailed_location} name="detailed_location" setter={handleInput} editable placeholder="дэлгэрэнгүй хаяг" /> хаягт байрлах улсын бүртгэлийн <Fill value={info.registration_number} name="registration_number" setter={handleInput} editable defaultLength={12} /> дугаартай, регистрийн <Fill value={info.register} name="register" setter={handleInput} editable defaultLength={12} /> дугаартай <Fill value={info.company_name} dotted /> (цаашид “Санхүүгийн дэмжлэг хүртэгч” гэх) нар (цаашид хамтад нь “Талууд” гэх) харилцан тохиролцож байгуулав.
                     </p>
                     <p className="" style={{ textIndent: 16 }}>
                        Энэхүү Гэрээний зорилго нь <Fill value={info.company_name} dotted />-ийн экспортын үйл ажиллагааг дэмжих зорилгоор энэхүү Гэрээнд заасан нөхцөл, зориулалтаар санхүүжилт олгох, үйл ажиллагааны хэрэгжилтэд хяналт тавих, уг санхүүжилттэй холбоотой бусад харилцаа, талуудын эрх, үүрэг хариуцлагыг тодорхойлон зохицуулахад оршино.
                     </p>
                  </div>
               </div>

               <div className="tw-px-2 sm:tw-px-8 tw-mt-8">
                  {Object.entries(contract).map(([key, value]) =>
                     <div className="">
                        <Header header={`${key} ДҮГЭЭР ЗҮЙЛ. ${value.category?.toUpperCase()}`} key={key} />

                        {value.provisions.map(provision =>
                           <Provision
                              order={provision.order}
                              provision={{
                                 '2.8': <span>
                                    Гэрээний дагуу Санхүүгийн дэмжлэг олгогч нэгж нь батлагдсан үйл ажиллагааны зардлын зөвшөөрсөн хэсэг болох дээд тал нь 50 хувь буюу <Fill value={info.amount} name="amount" setter={handleInput} defaultLength={12} editable dotted />₮ (<Fill value={info.amount_verbose} name="amount_verbose" setter={handleInput} defaultLength={24} editable dotted /> үгээр) /НӨАТ ороогүй/ төгрөгийг Санхүүгийн дэмжлэг хүртэгчид олгоно."
                                 </span>,
                                 '6.9.1': <span>
                                    Санхүүгийн дэмжлэг хүртэгчийн албан ёсны хаяг: <Fill value={info.location} name="location" setter={handleInput} defaultLength={48} editable dotted />
                                 </span>
                              }[provision.order] || provision.provision}
                              subLevel={provision.subLevel}
                              key={provision.order}
                           />
                        )}
                     </div>
                  )}
               </div>

               <div className="tw-text-base tw-text-center tw-mt-8 tw-font-medium">
                  ГЭРЭЭ БАЙГУУЛСАН:
               </div>

               <div className="tw-mt-6 tw-flex tw-flex-wrap tw-pb-12 tw-px-2 sm:tw-px-10">
                  <div className="sm:tw-w-1/2">
                     <div className="tw-p-2 tw-font-medium">
                        Санхүүгийн дэмжлэг олгогчийг төлөөлж:
                     </div>

                     {signersEdp.map(signer =>
                        <Sign
                           signer={signer}
                           setter={setSignersEpd}
                           key={signer.order}
                        />
                     )}
                  </div>

                  <div className="sm:tw-w-1/2">
                     <div className="tw-p-2 tw-font-medium">
                        Санхүүгийн дэмжлэг хүртэгчийг төлөөлж:
                     </div>

                     {signersReceiving.map(signer =>
                        <SignReceiving
                           signer={signer}
                           setter={setSignersReceiving}
                           description={descriptions[signer.order - 1]}
                           key={signer.order}
                        />
                     )}
                  </div>

                  <div className="">
                     <Fill value={info.bh_zuvluh} name="bh_zuvluh" setter={handleInput} editable defaultLength={30} />
                     <p className="">
                        Экспортыг дэмжих төслийн Бизнес хөгжлийн зөвлөх
                     </p>
                  </div>
               </div>
            </div>

            <div className="tw-flex tw-justify-center">
               <button className="tw-my-8 tw-bg-blue-800 tw-text-white tw-font-light tw-text-15px tw-rounded tw-py-2 tw-px-8 hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors" onClick={handleSave}>
                  Хадгалах
               </button>
            </div>
         </div>
      </div>
   )
}

function Header({ header }) {
   return (
      <div className="tw-text-base tw-font-medium tw-text-center tw-mt-6 tw-mb-2">
         {header}
      </div>
   )
}

function Provision({ order, provision, subLevel }) {
   return (
      <div className="tw-flex tw-p-2" style={{ marginLeft: (+subLevel || 0) * 24 }}>
         {order &&
            <div className="tw-mr-4">
               {order}
            </div>
         }
         <div className="">
            {provision}
         </div>
      </div>
   )
}

function Fill({ value, name, setter, editable, defaultLength, dotted, placeholder }) {
   return editable
      ? <span className="tw-relative tw-inline-block">
         <span className="tw-invisible tw-leading-snug tw-mx-0.5 tw-font-medium">
            {value || (placeholder ?? '_'.repeat(defaultLength ?? 10))}
         </span>

         <input className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-rounded-none tw-border-b-2 tw-border-gray-700 tw-border-dotted focus:tw-outline-none tw-box-border tw-leading-snug tw-text-sm tw-placeholder-red-400 tw-mx-0.5 tw-font-medium" value={value ?? ''} onChange={e => setter(name, e.target.value)} placeholder={placeholder} />
      </span>
      : <span className={`tw-leading-snug tw-mx-0.5 tw-font-medium ${dotted && 'tw-border-b-2 tw-border-gray-700 tw-border-dotted tw-box-border'}`}>
         {value}
      </span>
}

function Sign({ signer, setter }) {
   return (
      <div className="tw-p-2 tw-h-44">
         <p className="">
            {signer.name}
         </p>
         <p className="tw-mt-1">
            {signer.position}
         </p>
         <Signature signer={signer} setter={setter} />
      </div>
   )
}

function SignReceiving({ signer, description, setter }) {
   const handleInput = (key, value) => {
      setter(prev => {
         const next = [...prev]
         next[signer.order - 1][key] = value
         return next
      })
   }

   return (
      <div className="tw-p-2 tw-h-44">
         <div className="">
            <span className="tw-mr-2">
               Нэр:
            </span>
            <Fill value={signer.name} name="name" setter={handleInput} editable defaultLength={30} dotted />
         </div>
         <div className="mt-1">
            <span className="tw-mr-2">
               Албан тушаал:
            </span>
            <Fill value={signer.position} name="position" setter={handleInput} editable defaultLength={30} dotted />
         </div>
         <p className="tw-font-light">
            {description}
         </p>
         <Signature signer={signer} setter={setter} />
      </div>
   )
}

function Signature({ signer, setter }) {
   const [sigModalOpen, setSigModalOpen] = useState(false)
   const [hovered, setHovered] = useState(false)

   const sigCanvasRef = useRef()

   const handleDrawSignature = () => {
      setter(prev => {
         const next = [...prev]
         next[signer.order - 1].signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png')
         return next
      })
   }

   const handleClearSignature = () => {
      sigCanvasRef.current.clear()
      setter(prev => {
         const next = [...prev]
         next[signer.order - 1].signature = null
         return next
      })
   }

   return (
      <div className="tw-flex tw-flex-wrap tw-mt-2">
         <div className="tw-mr-4">
            Гарын үсэг:
         </div>
         <div className="tw-relative">
            {signer.signature
               ? <img src={signer.signature} alt="Гарын үсэг" className={`${classSignature} tw-object-scale-down`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setSigModalOpen(true)} />
               : <div className={classSignature} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setSigModalOpen(true)} />
            }
            <PenAltSVG className={`tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw-w-7 tw-h-7 tw-text-gray-600 tw-transform-gpu ${hovered ? 'tw--translate-y-1/2 tw-opacity-100' : 'tw--translate-y-3/4 tw-opacity-0'} tw-transition-all tw-duration-300 tw-cursor-pointer`} onMouseEnter={() => setHovered(true)} onClick={() => setSigModalOpen(true)} />
         </div>

         <ModalWindow modalOpen={sigModalOpen} setModalOpen={setSigModalOpen}>
            <div className="tw-p-2 tw-flex tw-flex-col">
               <div className="tw-text-sm tw-mb-2">
                  Гарын үсэг зурах:
               </div>

               <SignaturePad canvasProps={{ className: 'tw-rounded tw-border tw-border-gray-400', width: 624, height: 192 }} ref={sigCanvasRef} onEnd={handleDrawSignature} />

               <div className="tw-flex tw-justify-center tw-mt-4">
                  <button className="tw-rounded tw-text-white tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-w-32 tw-py-1 focus:tw-outline-none tw-font-light" onClick={handleClearSignature}>
                     Арилгах
                  </button>
                  <button className="tw-rounded tw-text-white tw-bg-blue-800 active:tw-bg-blue-700 tw-transition-colors tw-w-32 tw-py-1 tw-ml-3 focus:tw-outline-none tw-font-light" onClick={() => setSigModalOpen(false)}>
                     Болсон
                  </button>
               </div>
            </div>
         </ModalWindow>
      </div>
   )
}

const classSignature = 'tw-w-52 tw-h-16 tw-border tw-rounded tw-border-gray-400 tw-cursor-pointer'
