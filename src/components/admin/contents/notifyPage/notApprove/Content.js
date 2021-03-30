import React from 'react'
import styled from 'styled-components'
import axios from 'axiosbase';
import { Email, Item, Span, A, renderEmail, Box,Image} from 'react-html-email'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import {AlertStyle, InputStyle} from 'components/theme'
import AuthToken from 'context/accessToken'

const today = new Date();
const month = (today.getMonth()+1);
const year = today.getFullYear();
const day = today.getDate();

export default class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        color: "orange", text: "", cond: false, Btn: "1",
        rejectReason: "", username : localStorage.getItem("username"), }
    }
    alertText = ( color, text, cond ) => {
        this.setState({ color:color, text:text, cond:cond  });
         setTimeout(()=>{ this.setState({ color:color, text:text, cond:false })},[4000]);
     }
    clickHandle = () =>{
        let inp = document.getElementById("getInp");
        if(this.state.rejectReason===""){
            inp.classList += " red"
            this.setState({ Btn: "1"}); this.alertText("orange", "Татгалзсан шалтгааныг бичнэ үү...", true);
            return
        }
        inp.classList -= " red"
        axios.post('send-pps-notice', { 
            // email: "yondooo61@gmail.com", 
            notice_type: "first-evalution",
            projectId: this.props?.projectId,
            approved : false,
            additionMaterial: this.state.rejectReason,
            emailBody:EmailHTML( this.props?.data, this.props?.edpInfo, this.state.username, this.state.rejectReason ),
        }, { headers: { Authorization: AuthToken() } })
        .then((res)=>{ this.setState({ Btn: "0"}); this.alertText("green", "Амжилттай илгээлээ", true);
            setTimeout(()=>{ this.props.setShowNotify(prev=>!prev)}, 3000);
        }).catch((e)=>{console.log(e, "^err"); this.alertText("orange", "Алдаа гарлаа", true);  });
    };

    changHanlder = (event) =>{
        this.setState({
            rejectReason: event.target.value
        })
    }
    render() {
        const data = this.props?.data
        const edpInfo = this.props?.edpInfo
        return (
            <>
            <MainPar className="MainPar" >
                <div className="title">Урьдчилсан мэдүүлэгт тэнцээгүй тухай мэдэгдэл</div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч аж ахуйн нэгжийн нэр:</span> <span className="MemeberInfo">{data?.companyname}</span></div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч албан тушаалтны нэр: </span> <span className="MemeberInfo">{data?.project?.company?.representative_name}</span></div>
                <div className="nameTitle"><span className="smtitle">Албан тушаал: </span><span className="MemeberInfo">{data?.project?.company?.representative_position}</span></div>
                <div className="nameTitle"><span className="smtitle">Он сар өдөр: </span><span className="MemeberInfo">{`${day} / ${month} / ${year}`}</span></div>
                <div className="toname">Эрхэм <span className="name"> {data?.project?.company?.representative_name} </span> Танд,</div><br />
                <div className="contentPar">
                    <div className="items">Экспортыг дэмжих төслийн анхан шатны шалгаруулалтанд материалаа илгээсэнд баярлалаа. Экспортыг нэмэгдүүлэх талаар танай байгууллагын илгээсэн материалтай бид нягт нарийвчилж танилцсан бөгөөд энэхүү захидлаар таны илгээсэн материал доорхи шалтгаанаар дараагийн шатанд шалгараагүйг дуулгахад харамсалтай байна.</div> <br />
                    <div className="betweenItem">
                                <div className="titless">Татгалзсан шалтгаан:</div><br/>
                                <InputStyle><textarea onChange={this.changHanlder} id="getInp" placeholder="Татгалзсан шалтгааныг бичнэ үү..." /> <div className="line"/></InputStyle>
                    </div><br />

                    <div className="items">Хэрэв та дээрх шалтгаануудыг засварлан, хүсэлт илгээхийг хүсвэл дараачийн удаа нээгдэх сонгон шалгаруулалтанд дахин оролцох боломжтой.</div> <br />
                </div>
                <div className="nameTitle A2"><span className="smtitle">Хүндэтгэсэн, </span><span className="MemeberInfo"></span></div>
                <div className="nameTitle A2" ><span className="smtitle">Ахлах БХШ : </span><span className="MemeberInfo">{this.state.username}</span></div>
                <div className="nameTitle A2"><span className="smtitle">Хаяг: </span><span className="MemeberInfo">{edpInfo?.address}</span></div>
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



const EmailHTML = ( data, edpInfo, username, rejectReason ) => renderEmail(
    <Email style={{border:"1px solid rgba(0,0,0,0.2)",padding:'30px 70px', paddingTop:"15px",  width:"800px"}} title="EDP">
        <Image style={{width:"100%"}} src="http://www.edp.mn/Content/Images/mn-MN/head.jpg" />
            <Item style={{color:"#222222", padding:'20px 20px', backgroundColor:"white", height:"100%"}} align="end">
                <Box style={{textAlign:"center",width:"100%", marginBottom:'30px',fontWeight:'500', fontSize:'14px'}} >Урьдчилсан мэдүүлэгт тэнцээгүй тухай мэдэгдэл</Box>

                <Item style={{display:"flex", textAlign:"start", width:"100%",padding:"3px 0px", fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Өргөдөл гаргагч аж ахуйн нэгжийн нэр: </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {data?.companyname} </Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Өргөдөл гаргагч албан тушаалтны нэр: </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {data?.project?.company?.representative_name} </Span>
                </Item>
                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Албан тушаал: </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {data?.project?.company?.representative_position} </Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Он сар өдөр: </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {`${day} / ${month} / ${year}`}</Span>
                </Item>
                <Box style={{textAlign:"start",width:"100%", margin:'16px 0px', fontSize:'13px'}}>Эрхэм хүндэт {data?.project?.company?.representative_name} Танд,</Box>


                <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Экспортыг дэмжих төслийн анхан шатны шалгаруулалтанд материалаа илгээсэнд баярлалаа. Экспортыг нэмэгдүүлэх талаар танай байгууллагын илгээсэн материалтай бид нягт нарийвчилж танилцсан бөгөөд энэхүү захидлаар таны илгээсэн материал доорхи шалтгаанаар дараагийн шатанд шалгараагүйг дуулгахад харамсалтай байна. </Box>
                <Box style={{textAlign:"start",width:"100%", marginTop:'15px',marginBottom:'5px',  fontSize:'13px', fontWeight:"500"}}>Татгалзсан шалтгаан:</Box>
                <Box style={{textAlign:"start",width:"100%", marginBottom:'15px', fontSize:'13px',}}>{rejectReason}</Box>
                <Box style={{textAlign:"start",width:"100%", marginTop:'5px',marginBottom:'25px', fontSize:'13px'}}>Хэрэв та дээрх шалтгаануудыг засварлан, хүсэлт илгээхийг хүсвэл дараачийн удаа нээгдэх сонгон шалгаруулалтанд дахин оролцох боломжтой.</Box>
            


                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Хүндэтгэсэн, </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > </Span>
                </Item>
                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Ахлах БХШ : </Span>
                    <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > {username}</Span>
                </Item>
                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Хаяг : </Span>
                    <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > {edpInfo?.address}</Span>
                </Item>

            </Item>
        </Email>
)


const MainPar = styled.div`
      margin-bottom:20px;
      background-color:white;
      max-width:850px;
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

const SendBtn = styled.div`
    @media print{
        display:none;
    }
`
