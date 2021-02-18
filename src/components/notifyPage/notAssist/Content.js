import React from 'react'
import styled from 'styled-components'

export default class Content extends React.Component {
    render() {
        return (
            <MainPar className="MainPar" >
                <div className="title">Түншлэлийн дэмжлэг олгохоос татгалзах тухай мэдэгдэл</div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч аж ахуйн нэгжийн нэр:</span> <span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч албан тушаалтны нэр: </span> <span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Албан тушаал: </span><span className="MemeberInfo">/......................../</span></div>
                <div className="nameTitle"><span className="smtitle">Он сар өдөр: </span><span className="MemeberInfo">/........................./</span></div>
                <div className="toname">Эрхэм <span className="name">………….....</span> Танд,</div><br/>
                <div className="contentPar">
                    <div className="items">Экспортыг дэмжих төсөлд материалаа илгээж, шалгаруулалтанд оролцсонд баярлалаа. Экспортыг нэмэгдүүлэх талаар танай байгууллагын илгээсэн материалтай ………. Оны …………. Сарын ………….. Өдөр болсон үнэлгээний хорооны шийдвэрээр энэ удаад танай төсөлд дэмжлэг олгохоос татгалзсаныг дуулгахад харамсалтай байна. </div> <br />
                    
                    <div className="betweenItem">
                                <div className="titless">Татгалзсан шалтгаан:</div><br/>
                                <div>/............................................................................/</div>
                    </div><br />
                 
                    <div className="items">Бидэнд хандсанд баярлалаа. Хэрэв та дээрхи шалтгаануудыг засварлан, хүсэлт илгээхийг хүсвэл дараачийн удаа нээгдэх сонгон шалгаруулалтанд дахин оролцох боломжтой.</div> <br />
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