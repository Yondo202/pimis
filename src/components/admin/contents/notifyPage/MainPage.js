import React from 'react'
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import Approved from './Approve/Approved'
import NotApproved from './notApprove/NotApproved'
import AssistApprove from './assistApprove/AssistApprove';
import NotAssist from './notAssist/NotAssist';


function MainPage() {
  let { paramId } = useParams();
    return (
        <Components className="container">
              {paramId==="2"&&<Approved />} 
              {paramId==="3"&&<NotApproved />} 
              {paramId==="4"&&<AssistApprove /> } 
              {paramId==="5"&&<NotAssist /> } 
        </Components>
    )
}

export default MainPage

const Components = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding-bottom:40px;
    
`

const One = [
  { text: "Үнэлгээний явцад оролцогч талуудтай ямар нэгэн ашиг сонирхлын зөрчил үүсгэхгүй бөгөөд аливаа зөрчил үүсэж болзошгүй тохиолдолд нөхцөл байдлыг ил тодоор зарлаж үнэлгээний багаас огцрох болно. [Хэрэв танд Түншлэлийн дэмжлэг хүсэгч ААН, Кластер болон үнэлгээний хорооны бусад гишүүдтэй сонирхлын зөрчил байгаа бол үнэлгээний хорооноос өөрийн хүсэлтээр огцорно уу.] Түншлэлийн дэмжлэг хүсэгчтэй дараах ашиг сонирхлын зөрчил үүсэж байна " },
  { text: "Үнэлгээний явцад оролцогч талуудтай ямар нэгэн ашиг сонирхлын зөрчил үүсгэхгүй бөгөөд аливаа зөрчил үүсэж болзошгүй тохиолдолд нөхцөл байдлыг ил тодоор зарлаж үнэлгээний багаас огцрох болно. [Хэрэв танд Түншлэлийн дэмжлэг хүсэгч ААН, Кластер болон үнэлгээний хорооны бусад гишүүдтэй сонирхлын зөрчил байгаа бол үнэлгээний хорооноос өөрийн хүсэлтээр огцорно уу.] Түншлэлийн дэмжлэг хүсэгчтэй дараах ашиг сонирхлын зөрчил үүсэж байна " }
]


