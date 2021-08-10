import React from 'react'
import styled from 'styled-components'
import axios from 'axiosbase';
import { withRouter } from "react-router-dom"
import { Email, Item, Span, renderEmail, Box,Image} from 'react-html-email'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import {AlertStyle,NextBtn} from 'components/theme';
import AuthToken from 'context/accessToken'
import Modal from 'react-awesome-modal';
import { AiFillCloseCircle } from "react-icons/ai"

const today = new Date();
const month = (today.getMonth()+1);const year = today.getFullYear();const day = today.getDate();

class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = { color: "orange", text: "dadadadadadadad", cond: false, Btn: "1", username : localStorage.getItem("username"),  visible: false, }
    }
    alertText = ( color, text, cond ) => {
        this.setState({ color:color, text:text, cond:cond  });
         setTimeout(()=>{ this.setState({ color:color, text:text, cond:false })}, 3000);
    }

    clickHandle = () =>{
        if(!this.props.Signature||!this.props.Signature?.signature){
            this.setState({ visible: true });
        }else{
            axios.post('send-pps-notice', {
                notice_type: "evaluation-results",
                projectId: this.props?.projectId,
                approved : true,
                // additionMaterial: this.state.rejectReason, 
                signatureData:this.props?.Signature.signature,
                emailBody:EmailHTML(this.props.approve, this.props?.edpInfo, this.state.username, this.props?.Signature),
               }, { headers: { Authorization:AuthToken() } }).then((res)=>{
                    console.log(res.data.success, "my Response");
                    setTimeout(()=> { this.props?.setNotifyShow(0); }, 3000);
                    this.setState({ Btn: "0"});
                    this.alertText("green", "Амжилттай илгээлээ", true);
                  }).catch((e)=>{
                    this.alertText("orange", "Алдаа гарлаа", true);
                    console.log(e, "err Response");
              });
        }
    };

    closeModal = () =>{  this.setState({  visible : false }) }
    signatureVerify = () =>{  this.props.history.push(`/users`) }

    render() {
        const app = this.props.approve;
        const edpInfo = this.props?.edpInfo
        return (
            <>
                <Modal visible={this.state.visible} width="620" height="280" effect="fadeInDown" onClickAway={this.closeModal} >
                    <ModalStyle className="modalPar">
                        <div className="TitlePar"> <div className="title"> <CgDanger />Төслийн зохицуулагчийн гарын үсэг байх шаардлагатай</div>   <div className="svgPar"><AiFillCloseCircle onClick={this.closeModal} /></div>  </div>
                        <div className="btnPar"> <NextBtn style={{padding:"5px 10px", width:"50%"}} onClick={this.signatureVerify}>Төслийн зохицуулагч эрх нэмэх</NextBtn> 
                        {/* <NextBtn onClick={this.closeModal} >Болих</NextBtn> */}
                        </div>
                    </ModalStyle>
                </Modal>
                <MainPar className="MainPar" >
                    <div className="title"> Түншлэлийн дэмжлэг олгох тухай мэдэгдэл </div>
                    <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч аж ахуйн нэгжийн нэр:</span> <span className="MemeberInfo">{app?.company?.company_name}</span></div>
                    <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч албан тушаалтны нэр: </span> <span className="MemeberInfo">{app?.company?.representative_name}</span></div>
                    <div className="nameTitle"><span className="smtitle">Албан тушаал: </span><span className="MemeberInfo">{app?.company?.representative_position}</span></div>
                    <div className="nameTitle"><span className="smtitle">Он сар өдөр: </span><span className="MemeberInfo">{app?.meetingDate}</span></div>
                    <div className="toname">Эрхэм <span className="name">{app?.company?.representative_name}</span> Танд,</div><br/>
                    <div className="contentPar">
                        <div className="items">Экспортыг дэмжих төсөлд таны илгээсэн {app?.project_number} Дугаартай өргөдөл нь шинжээчийн дүгнэлт болон  {year}оны  {month}сарын {day}өдрийн хуралдсан үнэлгээний хорооны шийдвэрээр шалгаруулалтанд амжилттай тэнцэж, түншлэлийн хөтөлбөрийн дэмжлэг авах болзлыг хангасанд баяр хүргэж байна. </div> <br />
                        <div className="items">Энэхүү захидлаар танд Түншлэлийн гэрээг илгээж буй бөгөөд гарын үсэг, тамга тэмдгээр баталгаажуулсан гэрээг та энэхүү
                         захидал илгээсэн өдрөөс ажлын 5 хоногийн дотор буюу 
                         <span style={{fontWeight:"500"}}>{app.final_date.slice(0,4)}оны  {app.final_date.slice(5,7)}сарын {app.final_date.slice(8,10)}өдрийн 18 цагаас өмнө</span>
                          хэвлэмэл байдлаар болон 
                         электрон хувилбараар давхар илгээхийг хүсч байна. </div> <br />
                        <div className="items">Хэрэв дээр дурдсан хугацаанд гэрээ ирээгүй тохиолдолд танай байгууллагыг энэхүү түншлэлийн дэмжлэг авахаас татгалзсанд тооцох тул хүндэтгэх шалтгаантай тохиолдолд албан бичиг эсвэл албан имэйлээр хүсэлтээ тайлбарлан илгээнэ үү. </div> <br />
                    </div>
                    <div className="toname">Хэрэв танд гэрээтэй холбоотой асуулт байвал  <span className="name">" {edpInfo?.email} "</span>хаягаар холбогдоно уу.</div><br />
                    <div className="nameTitle A2"><span className="smtitle">Хүндэтгэсэн, </span><span className="MemeberInfo"></span></div>
                    <div className="nameTitle A2" ><span className="smtitle">Ахлах БХШ : </span><span className="MemeberInfo">{this.state.username}</span></div>
                    <div className="nameTitle A2"><span className="smtitle">Хаяг: </span><span className="MemeberInfo">{edpInfo?.address}</span></div>
                    <div style={{marginTop:"10px"}} className="nameTitle A2"><span className="smtitle">Гарын үсэг : </span> <span className="SignaturePar"><img src={this.props?.Signature?.signature} alt="edpSignature" /></span><span className="smtitle">{`${this.props?.Signature?.lastname.slice(0,1).toUpperCase()}. ${this.props?.Signature?.firstname}`}</span> </div>
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

const EmailHTML = (props, edpInfo, username, signature) => renderEmail(
    <Email style={{border:"1px solid rgba(0,0,0,0.2)",padding:'30px 60px', paddingTop:"30px", width:"750px", backgroundColor:"rgba(220,220,220,0.2)"}} title="EDP">
            <Image style={{width:"100%"}} src="http://www.edp.mn/Content/Images/mn-MN/head.jpg" />
                <Item style={{color:"#222222", padding:'20px 20px', height:"100%"}} align="end">
                    <Box style={{textAlign:"center",width:"100%", marginBottom:'30px',fontWeight:'500', fontSize:'15px', backgroundColor:"rgba(220,220,220,0.2)"}} >Түншлэлийн дэмжлэг олгох тухай мэдэгдэл</Box>

                    <Item style={{display:"flex", textAlign:"start", width:"100%", padding:"5px 0px", fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"50%",fontWeight:'600', fontSize:'13px'}}>Өргөдөл гаргагч аж ахуйн нэгжийн нэр: </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} >{props?.company?.company_name}</Span>
                    </Item>

                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"50%",fontWeight:'600', fontSize:'13px'}}>Өргөдөл гаргагч албан тушаалтны нэр: </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} >{props?.company?.representative_name}</Span>
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"50%",fontWeight:'600', fontSize:'13px'}}>Албан тушаал: </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} >{props?.company?.representative_position}</Span>
                    </Item>

                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"50%",fontWeight:'600', fontSize:'13px'}}>Он сар өдөр: </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} >{props?.meetingDate}</Span>
                    </Item>
                    <Box style={{textAlign:"start",width:"100%", margin:'16px 0px', fontSize:'13px'}}>Эрхэм хүндэт {props?.company?.representative_name} Танд,</Box>


                    <Box style={{textAlign:"start",width:"100%", margin:'13px 0px', fontSize:'13px'}}>Экспортыг дэмжих төсөлд таны илгээсэн {props?.project_number} Дугаартай өргөдөл нь шинжээчийн дүгнэлт болон <Span style={{color:"#222222",fontWeight:"500", fontSize:'13px'}}>{year}оны  {month}сарын {day}өдрийн</Span>  хуралдсан үнэлгээний хорооны шийдвэрээр шалгаруулалтанд амжилттай тэнцэж, түншлэлийн хөтөлбөрийн дэмжлэг авах болзлыг хангасанд баяр хүргэж байна.  </Box>
                    <Box style={{textAlign:"start",width:"100%", margin:'13px 0px', fontSize:'13px'}}>Энэхүү захидлаар танд Түншлэлийн гэрээг илгээж буй бөгөөд гарын үсэг, тамга тэмдгээр баталгаажуулсан гэрээг та энэхүү захидал илгээсэн өдрөөс
                     <Span style={{color:"#222222",fontWeight:"500", fontSize:'13px'}}>ажлын 5 хоногийн дотор буюу {props?.final_date.slice(0,4)}оны  {props?.final_date.slice(5,7)}сарын {props?.final_date.slice(8,10)}өдрийн 18 цагаас өмнө</Span>
                      хэвлэмэл байдлаар болон электрон хувилбараар давхар илгээхийг хүсч байна.  </Box>
                    <Box style={{textAlign:"start",width:"100%", margin:'13px 0px', fontSize:'13px'}}>Хэрэв дээр дурдсан хугацаанд гэрээ ирээгүй тохиолдолд танай байгууллагыг энэхүү түншлэлийн дэмжлэг авахаас татгалзсанд тооцох тул хүндэтгэх шалтгаантай тохиолдолд албан бичиг эсвэл албан имэйлээр хүсэлтээ тайлбарлан илгээнэ үү. </Box>
                
                    <Box style={{textAlign:"start",width:"100%", marginTop:'5px',marginBottom:'22px', fontSize:'13px'}}>Хэрэв танд гэрээтэй холбоотой асуулт байвал " {edpInfo?.email} " хаягаар холбогдоно уу. </Box>

                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"30%",fontWeight:'500', fontSize:'13px'}}>Хүндэтгэсэн, </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} ></Span>
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"30%",fontWeight:'600', fontSize:'13px'}}>Ахлах БХШ : </Span>
                        <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > {username}</Span>
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"30%",fontWeight:'600', fontSize:'13px'}}>Хаяг : </Span>
                        <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > {edpInfo?.address}</Span>
                    </Item>
                    <Item style={{display:"flex",alignItems:"center", textAlign:"start",width:"100%",padding:"10px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"20%",fontWeight:"600", fontSize:'13px'}}>Гарын үсэг : </Span>
                        <Image style={{width:"150px", height:"75px", objectFit:"contain", marginRight:"20px"}} src="cid:signature" />
                        <Span style={{color:"#222222",width:"50%",fontWeight:"600", fontSize:'13px'}}>{`${signature.lastname.slice(0,1).toUpperCase()}. ${signature.firstname}`}</Span>
                    </Item>


                </Item>
    </Email>
)


const ModalStyle = styled.div`
    padding:20px 40px;
   .btnPar{
       display:flex;
       justify-content:space-between;
   }

    .TitlePar{
        display:flex;
        align-items:center;
        justify-content:space-between;
        
        padding-top:10px;
        padding-bottom:40px;
        .title{
            display:flex;
            font-weight:500;
            align-items:center;
            font-size:20px;
            svg{
                margin-right:15px;
                font-size:24px;
                color:orange;
            }
        }
        .svgPar{
            svg{
                cursor:pointer;
                font-size:22px;
                color:rgb(150,150,150);
            }
        }
    }
`

const SendBtn = styled.div`
    @media print{
        display:none;
    }
`

const MainPar = styled.div`
      margin-bottom:20px;
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
              width:50%;
          }
          .MemeberInfo{
              margin-left:30px;
              
          }
      }
      .A2{
          .smtitle{
             font-weight:500;
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