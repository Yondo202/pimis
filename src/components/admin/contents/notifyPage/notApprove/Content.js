import React from 'react'
import styled from 'styled-components'
import axios from 'axiosbase';
import { withRouter} from "react-router-dom";
import { Email, Item, Span, renderEmail, Box,Image} from 'react-html-email'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import {AlertStyle, InputStyle} from 'components/theme'
import AuthToken from 'context/accessToken'
// import Modal from 'react-awesome-modal';
// import { AiFillCloseCircle } from "react-icons/ai"

// const today = new Date();
// const month = (today.getMonth()+1);
// const year = today.getFullYear();
// const day = today.getDate();

class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        color: "orange", text: "", cond: false, Btn: "1",
        rejectReason: "",
        visible: false,
        username : null || localStorage.getItem("username"),
        signature : null || localStorage.getItem("signature"),
     }
    }

    alertText = ( color, text, cond ) => {
        this.setState({ color:color, text:text, cond:cond  });
         setTimeout(()=>{ this.setState({ color:color, text:text, cond:false })},4000);
    }

    clickHandle = () =>{
        let inp = document.getElementById("getInp");
        if(this.state.rejectReason===""){
            inp.classList += " red"
            this.setState({ Btn: "1"}); this.alertText("orange", "Татгалзсан шалтгааныг бичнэ үү...", true);
        }else{
            inp.classList -= " red"
            axios.post('send-pps-notice', {
                notice_type: "first-evalution",
                projectId: this.props?.projectId,
                approved : false,
                additionMaterial: this.state.rejectReason,
                // signatureData:this.state.signature,
                signatureData:null,
                emailBody:EmailHTML( this.props?.data, this.props?.edpInfo, this.state.username, this.state.rejectReason, this.props?.userData ),
            }, { headers: { Authorization: AuthToken() } })
            .then((res)=>{ this.setState({ Btn: "0"}); this.alertText("green", "Амжилттай илгээлээ", true);
                setTimeout(()=>{
                    this.props.history.goBack();
                }, 3000);
            }).catch((e)=>{console.log(e, "^err"); this.alertText("orange", "Алдаа гарлаа", true);  });
        }
    };

    changHanlder = (event) =>{
        this.setState({ rejectReason: event.target.value })
    }
    // closeModal = () =>{  this.setState({  visible : false }) }
    // signatureVerify = () =>{  this.props.history.push(`/signature`) }

    render() {
        const data = this.props?.data;
        const edpInfo = this.props?.edpInfo;
        const userData = this.props?.userData;

        return (
            <>
            {/* <Modal visible={this.state.visible} width="620" height="280" effect="fadeInDown" onClickAway={this.closeModal}   >
                <ModalStyle className="modalPar">
                    <div className="TitlePar"> <div className="title"> <CgDanger /> Гарын үсэг баталгаажаагүй байна</div>   <div className="svgPar"><AiFillCloseCircle onClick={this.closeModal} /></div>  </div>
                    <div className="btnPar"> <NextBtn onClick={this.signatureVerify}>Баталгаажуулах</NextBtn> <NextBtn onClick={this.closeModal} >Болих</NextBtn>
                    </div>
                </ModalStyle>
            </Modal> */}
            <MainPar className="MainPar" >
                <div className="title">Урьдчилсан мэдүүлэгт тэнцээгүй тухай мэдэгдэл</div>

                <div className="contentPar">
                    <div className="items">Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрийн 20{data?.project?.project_number?.slice(4,6)} оны {data?.project?.project_number?.slice(7,9)} дугаар цонхонд өргөдлөө ирүүлсэнд баярлалаа. Танай байгууллагын ирүүлсэн материалтай бид танилцаж, доорх шалтгаанаар дараагийн шатанд шалгараагүйг мэдэгдэж байна.</div> <br />
                    <div className="betweenItem">
                            <div className="titless">Татгалзсан шалтгаан:</div><br/>
                            <InputStyle><textarea onChange={this.changHanlder} id="getInp" placeholder="Татгалзсан шалтгааныг бичнэ үү..." /> <div className="line"/></InputStyle>
                    </div><br />

                    <div className="items">Хэрэв танай байгууллага Түншлэлийн хөтөлбөрийн шалгуур үзүүлэлтийг хангасан тохиолдолд дараагийн сонгон шалгаруулалтад хүсэлт илгээх боломжтой.</div> <br />
                </div>
                
                <div className="nameTitle A2"><span className="smtitle">Хүндэтгэсэн, </span><span className="MemeberInfo"></span></div>
                <div className="nameTitle A2" ><span className="smtitle">{userData.firstname}</span><span className="MemeberInfo"></span></div>
                <div className="nameTitle A2" ><span className="smtitle">Бизнес хөгжлийн зөвлөх: </span></div>
                <div className="nameTitle A2"><span className="smtitle">Холбоо барих: {userData?.phone}</span><span className="MemeberInfo"></span></div>

                {/* <div style={{marginTop:"10px"}} className="nameTitle A2">
                    <span className="smtitle">Гарын үсэг : </span> 
                    <span className="SignaturePar"><img src={this.state.signature} alt="edpSignature" /></span>
                </div> */}
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

export default withRouter(Content);

const EmailHTML = ( data, edpInfo, username, rejectReason, userData ) => renderEmail(
    <Email style={{border:"1px solid rgba(0,0,0,0.2)",padding:'30px 70px', paddingTop:"15px",  width:"830px", backgroundColor:"rgba(220,220,220,0.2)"}} title="EDP">
        <Image style={{width:"100%"}} src="https://pimis.edp.mn/head_logo.png" />
            <Item style={{color:"#222222", padding:'20px 20px', height:"100%"}} align="end">
                <Box style={{textAlign:"center",width:"100%", marginBottom:'30px',marginTop:'18px',fontWeight:'500', fontSize:'16px', backgroundColor:"rgba(220,220,220,0.2)"}} >Урьдчилсан мэдүүлэгт тэнцээгүй тухай мэдэгдэл</Box>
                <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрийн 20{data?.project?.project_number?.slice(4,6)} оны {data?.project?.project_number?.slice(7,9)} дугаар цонхонд өргөдлөө ирүүлсэнд баярлалаа. Танай байгууллагын ирүүлсэн материалтай бид танилцаж, доорх шалтгаанаар дараагийн шатанд шалгараагүйг мэдэгдэж байна. </Box>
                <Box style={{textAlign:"start",width:"100%", marginTop:'15px',marginBottom:'5px',  fontSize:'13px', fontWeight:"500"}}>Татгалзсан шалтгаан:</Box>
                <Box style={{textAlign:"start",width:"100%", marginBottom:'15px', fontSize:'13px',}}>{rejectReason}</Box>
                <Box style={{textAlign:"start",width:"100%", marginTop:'5px',marginBottom:'25px', fontSize:'13px'}}>Хэрэв та дээрх шалтгаануудыг засварлан, хүсэлт илгээхийг хүсвэл дараачийн удаа нээгдэх сонгон шалгаруулалтанд дахин оролцох боломжтой.</Box>
            
                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"6px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Хүндэтгэсэн, </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > </Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"6px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%",fontWeight:"600", fontSize:'13px'}}>{userData.firstname} </Span>
                    <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} ></Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"6px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Бизнес хөгжлийн зөвлөх</Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"6px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Холбоо барих: {userData?.phone}</Span>
                    <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} ></Span>
                </Item>
            </Item>
        </Email>
)

// const ModalStyle = styled.div`
//     padding:20px 40px;
//    .btnPar{
//        display:flex;
//        justify-content:space-between;
//    }

//     .TitlePar{
//         display:flex;
//         align-items:center;
//         justify-content:space-between;
        
//         padding-top:10px;
//         padding-bottom:40px;
//         .title{
//             display:flex;
//             font-weight:500;
//             align-items:center;
//             font-size:20px;
//             svg{
//                 margin-right:15px;
//                 font-size:24px;
//                 color:orange;
//             }
//         }
//         .svgPar{
//             svg{
//                 cursor:pointer;
//                 font-size:22px;
//                 color:rgb(150,150,150);
//             }
//         }
//     }
// `

const MainPar = styled.div`
      margin-bottom:20px;
      background-color:white;
      max-width:850px;
      margin-top:20px;
      font-size:13px;
      padding:30px 70px;
      border:1px solid rgba(0,0,0,.3);
      .title{
          font-size:15px;
          font-weight:500;
          margin-bottom:30px;
          text-align:center;
          padding: 15px 30px;
        }
      .nameTitle{
          display:flex;
          align-items:center;
          padding:5px 0px;
          .SignaturePar{
            img{
               width:150px;
               height:75px;
               object-fit:contain;
               margin-right:15px;
            }
          }
          .smtitle{
              font-weight:500;
              width:45%;
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
