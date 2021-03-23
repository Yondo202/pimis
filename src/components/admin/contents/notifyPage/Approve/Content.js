import React from 'react'
import styled from 'styled-components'
import axios from 'axiosbase';
import { Email, Item, Span, A, renderEmail, Box,Image} from 'react-html-email'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import {AlertStyle} from 'components/theme'

export default class Content extends React.Component {
    constructor() {
        super()
        this.state = { color: "orange", text: "dadadadadadadad", cond: false, Btn: "1" }
    }

    alertText = ( color, text, cond ) => {
        this.setState({ color:color, text:text, cond:cond  });
         setTimeout(()=>{ this.setState({ color:color, text:text, cond:false })},[4000]);
     }

    clickHandle = () =>{
        axios.post('send-pps-notice', {
            // html: Html,
            email: "yondooo61@gmail.com",
            emailBody:EmailHTML,
           }).then((res)=>{
                console.log(res.data.success, "my Response");
                this.setState({ Btn: "0"});
                this.alertText("green", "Амжилттай илгээлээ", true);
              }).catch((e)=>{
                this.alertText("orange", "Алдаа гарлаа", true);
                console.log(e, "err Response");  
          });
    };

    render() {
        return (
            <>
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


                <SendBtn onClick={this.clickHandle} style={{transform:`scale(${this.state.Btn})`,opacity:`${this.state.Btn}`}} className="btn btn-primary">Илгээх</SendBtn>
                <AlertStyle style={this.state.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${this.state.color}` } : { bottom: `50px`, opacity: `0` }} >
                    {this.state.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${this.state.color}` }} className="true" /> : <CgDanger style={{ color: `${this.state.color}` }} className="true" />}
                    <span>{this.state.text}</span>
                </AlertStyle>
            </>
        )
    }
}



const EmailHTML = renderEmail(
    <Email style={{border:"1px solid rgba(0,0,0,0.2)",padding:'30px 60px'}} title="EDP">
                        {/* <Image style={{width:"100%"}} src="http://www.edp.mn/Content/Images/mn-MN/head.jpg" /> */}
                            <Item style={{color:"#222222", padding:'20px 20px', backgroundColor:"white", height:"100%"}} align="end">
                                <Box style={{textAlign:"center",width:"100%", marginBottom:'30px',fontWeight:'500', fontSize:'13px'}} >Дараагийн шатанд тэнцсэн талаарх мэдэгдэл буюу үндсэн мэдүүлгийн бүрдүүлбэрийн урилга</Box>

                                <Item style={{display:"flex", textAlign:"start", width:"100%",padding:"3px 0px", fontSize:'13px'}}>
                                    <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Өргөдөл гаргагч аж ахуйн нэгжийн нэр: </Span>
                                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > /......................../ </Span>
                                </Item>

                                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Өргөдөл гаргагч албан тушаалтны нэр: </Span>
                                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > /......................../ </Span>
                                </Item>
                                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Албан тушаал: </Span>
                                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > /......................../ </Span>
                                </Item>

                                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Он сар өдөр: </Span>
                                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > /......................../ </Span>
                                </Item>
                                <Box style={{textAlign:"start",width:"100%", margin:'16px 0px', fontSize:'13px'}}>Эрхэм хүндэт /.............../ Танд,</Box>

                                <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Экспортыг дэмжих төслийн анхан шатны шалгаруулалтанд зориулж таны илгээсэн ………….. Дугаартай өргөдөл нь анхан шатны шалгаруулалтанд тэнцсэнд баяр хүргэж, дараагийн шатанд материалаа илгээхийг энэхүү захидлаар урьж байна. </Box>
                                <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Шаардлатай материалын жагсаалтыг хавсаргасан бөгөөд таныг энэхүү захидал илгээсэн өдрөөс эхлэн ажлын 10 хоногийн дотор буюу …. Оны ….. Сарын ….. Өдрийн 18 цагаас өмнө мэдээллээ ………...хаягаар илгээхийг хүсч байна. </Box>
                                <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Хэрэв дээр дурдсан хугацаанд материал ирээгүй тохиолдолд танай байгууллагыг энэхүү түншлэлийн хөтөлбөрт оролцох сонирхолгүй болсоноор тооцон таны өргөдлийн материал хаагдах болно.  Өргөдлийн материал хаагдсаны дараа та дахин оролцох хүсэлтэй бол шинээр процессыг эхэлж, дахин шалгаруулалтанд орох болно.</Box>
                            
                                <Box style={{textAlign:"start",width:"100%",marginTop:'5px',marginBottom:'22px', fontSize:'13px'}}>Шаардлагатай материалын жагсаалт:    /............................./</Box>

                                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Хүндэтгэсэн: </Span>
                                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > /......................../ </Span>
                                </Item>
                                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                                    <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Нэр, албан тушаал : </Span>
                                    <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > /......................../ </Span>
                                </Item>
                                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                                    <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Хаяг : </Span>
                                    <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > /......................../ </Span>
                                </Item>

                            </Item>
    </Email>
)


const SendBtn = styled.div`
@media print{
    display:none;
}
`



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

