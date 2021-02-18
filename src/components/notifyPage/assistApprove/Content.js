import React from 'react'
import styled from 'styled-components'

export default class Content extends React.Component {
    render() {
        return (
            <MainPar className="MainPar" >
                <div className="title"> Түншлэлийн дэмжлэг олгох тухай мэдэгдэл</div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч аж ахуйн нэгжийн нэр:</span> <span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч албан тушаалтны нэр: </span> <span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Албан тушаал: </span><span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Он сар өдөр: </span><span className="MemeberInfo">/........................./</span></div>
                <div className="toname">Эрхэм <span className="name">………….....</span> Танд,</div><br/>
                <div className="contentPar">
                    <div className="items">Экспортыг дэмжих төсөлд таны илгээсэн ………….. Дугаартай өргөдөл нь шинжээчийн дүгнэлт болон …… оны  …. сарын ….. өдрийн хуралдсан үнэлгээний хорооны шийдвэрээр шалгаруулалтанд амжилттай тэнцэж, түншлэлийн хөтөлбөрийн дэмжлэг авах болзлыг хангасанд баяр хүргэж байна. </div> <br />
                    <div className="items">Энэхүү захидлаар танд Түншлэлийн гэрээг илгээж буй бөгөөд гарын үсэг, тамга тэмдгээр баталгаажуулсан гэрээг та энэхүү захидал илгээсэн өдрөөс ажлын 5 хоногийн дотор буюу …. Оны ….. Сарын ….. Өдрийн 18 цагаас өмнө хэвлэмэл байдлаар болон электрон хувилбараар давхар илгээхийг хүсч байна. </div> <br />
                    <div className="items">Хэрэв дээр дурдсан хугацаанд гэрээ ирээгүй тохиолдолд танай байгууллагыг энэхүү түншлэлийн дэмжлэг авахаас татгалзсанд тооцох тул хүндэтгэх шалтгаантай тохиолдолд албан бичиг эсвэл албан имэйлээр хүсэлтээ тайлбарлан илгээнэ үү. </div> <br />
                </div>
                <div className="toname">Хэрэв танд гэрээтэй холбоотой асуулт байвал  <span className="name">………….....</span>  хаягаар холбогдоно уу.</div><br />
                <div className="nameTitle A2"><span className="smtitle">Хүндэтгэсэн: </span><span className="MemeberInfo">/........................./</span></div>
                <div className="nameTitle A2" ><span className="smtitle">Нэр, албан тушаал: </span><span className="MemeberInfo">/........................./</span></div>
                <div className="nameTitle A2"><span className="smtitle">Хаяг: </span><span className="MemeberInfo">/........................./</span></div>
            </MainPar>
        )
    }
}



const MainPar = styled.div`
      margin-bottom:20px;
      background-color:white;
      max-width:700px;
      margin-top:20px;
      font-size:13px;
      padding:30px 70px;
      border:1px solid rgba(0,0,0,.3);
      .title{
          font-weight:500;
          margin-bottom:30px;
          text-align:center;
          padding: 15px 30px;
      }
      .nameTitle{
          display:flex;
          align-items:center;
          padding:3px 0px;
          .smtitle{
              width:50%;
          }
          .MemeberInfo{
              margin-left:30px;
          }
      }
      .A2{
          .smtitle{
              width:30%;
          }
      }
      .toname{
          margin:20px 0px;
          .name{
              font-weight:500;
              padding:0px 10px;
          }
      }
     
    @media only screen and (max-width:768px){
        padding: 15px 15px;
    }

    @page{
        size: 210mm 297mm;
    }
    @media print{
      margin-bottom:30px;
      background-color:white;
      margin-top:40px;
      font-size:17px;
      padding:30px 120px;
      border-style:none;
      max-width:1200px;
        .title{
            padding:0px 30px;
            margin-bottom:50px;
        }
    }
}
`