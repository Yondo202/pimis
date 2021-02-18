import React from 'react'
import styled from 'styled-components'

export default class Content extends React.Component {
    render() {
        return (
            <MainPar className="MainPar" >
                <div className="title"> Дараагийн шатанд тэнцсэн талаарх мэдэгдэл буюу үндсэн мэдүүлгийн бүрдүүлбэрийн урилга</div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч аж ахуйн нэгжийн нэр:</span> <span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч албан тушаалтны нэр: </span> <span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Албан тушаал: </span><span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Он сар өдөр: </span><span className="MemeberInfo">/........................./</span></div>
                <div className="toname">Эрхэм <span className="name">………….....</span> Танд,</div><br />
                <div className="contentPar">
                    <div className="items">Экспортыг дэмжих төслийн анхан шатны шалгаруулалтанд зориулж таны илгээсэн ………….. Дугаартай өргөдөл нь анхан шатны шалгаруулалтанд тэнцсэнд баяр хүргэж, дараагийн шатанд материалаа илгээхийг энэхүү захидлаар урьж байна</div> <br />
                    <div className="items">Шаардлатай материалын жагсаалтыг хавсаргасан бөгөөд таныг энэхүү захидал илгээсэн өдрөөс эхлэн ажлын 10 хоногийн дотор буюу …. Оны ….. Сарын ….. Өдрийн 18 цагаас өмнө мэдээллээ ………...хаягаар илгээхийг хүсч байна. </div> <br />
                    <div className="items">Хэрэв дээр дурдсан хугацаанд материал ирээгүй тохиолдолд танай байгууллагыг энэхүү түншлэлийн хөтөлбөрт оролцох сонирхолгүй болсоноор тооцон таны өргөдлийн материал хаагдах болно.  Өргөдлийн материал хаагдсаны дараа та дахин оролцох хүсэлтэй бол шинээр процессыг эхэлж, дахин шалгаруулалтанд орох болно.</div> <br />
                </div>
                <div className="nameTitle"><span className="smtitle">Шаардлагатай материалын жагсаалт: </span><span className="MemeberInfo">/................................/</span></div><br />
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