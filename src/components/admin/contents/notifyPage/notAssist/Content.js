import React from 'react'
import styled from 'styled-components'
import axios from 'axiosbase';
import { withRouter } from "react-router-dom"
import { Email, Item, Span, A, renderEmail, Box,Image} from 'react-html-email'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import {AlertStyle,NextBtn} from 'components/theme'
import AuthToken from 'context/accessToken'
import Modal from 'react-awesome-modal';
import { AiFillCloseCircle } from "react-icons/ai"

const today = new Date();
const month = (today.getMonth()+1);const year = today.getFullYear();const day = today.getDate();

class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = { color: "orange", text: "", cond: false, Btn: "1", username : localStorage.getItem("username"), visible: false,}
    }
    alertText = ( color, text, cond ) => {
        this.setState({ color:color, text:text, cond:cond  });
         setTimeout(()=>{ this.setState({ color:color, text:text, cond:false })},[4000]);
     }
    clickHandle = () =>{
        if(!this.props.Signature||!this.props.Signature?.signature){
            this.setState({ visible: true });
        }else{
            axios.post('send-pps-notice', {
                notice_type: "evaluation-results",
                projectId: this.props?.projectId,
                approved : false,
                signatureData:this.props?.Signature.signature,
                emailBody:EmailHTML(this.props.approve,this.props?.edpInfo, this.state.username, this.props?.Signature ),
            }, { headers: { Authorization: AuthToken() } })
            .then((res)=>{ console.log(res, "^ress");  this.setState({ Btn: "0"}); this.alertText("green", "Амжилттай илгээлээ", true); setTimeout(()=> { this.props?.setNotifyShow(0); }, 3000);
            }).catch((e)=>{console.log(e, "^err");   this.alertText("orange", "Алдаа гарлаа", true);  });
        }
    };

    closeModal = () =>{ this.setState({  visible : false }) }
    signatureVerify = () =>{  this.props.history.push(`/users`) }

    render() {
        const app = this.props?.approve
        const edpInfo = this.props?.edpInfo
        return (
            <>
            <Modal visible={this.state.visible} width="620" height="280" effect="fadeInDown" onClickAway={this.closeModal}   >
                <ModalStyle className="modalPar">
                    <div className="TitlePar"> <div className="title"> <CgDanger />Төслийн зохицуулагчийн гарын үсэг байх шаардлагатай</div>   <div className="svgPar"><AiFillCloseCircle onClick={this.closeModal} /></div>  </div>
                    <div className="btnPar"> <NextBtn style={{padding:"5px 10px", width:"50%"}} onClick={this.signatureVerify}>Төслийн зохицуулагч эрх нэмэх</NextBtn> 
                    {/* <NextBtn onClick={this.closeModal} >Болих</NextBtn> */}
                    </div>
                </ModalStyle>
            </Modal>
            <MainPar className="MainPar" >
                <div className="title">Түншлэлийн дэмжлэг олгохоос татгалзах тухай мэдэгдэл</div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч аж ахуйн нэгжийн нэр:</span> <span className="MemeberInfo"> {app?.company?.company_name} </span></div>
                <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч албан тушаалтны нэр: </span> <span className="MemeberInfo">{app?.company?.representative_name}</span></div>
                <div className="nameTitle"><span className="smtitle">Албан тушаал: </span><span className="MemeberInfo">{app?.company?.representative_position}</span></div>
                <div className="nameTitle"><span className="smtitle">Он сар өдөр: </span><span className="MemeberInfo">{app?.meetingDate}</span></div>
                <div className="toname">Эрхэм хүндэт <span className="name">{app?.company?.representative_name}</span> Танд,</div><br/>
                <div className="contentPar">
                    {/* <div className="items">Экспортыг дэмжих төсөлд материалаа илгээж, шалгаруулалтанд оролцсонд баярлалаа. Экспортыг нэмэгдүүлэх талаар танай байгууллагын илгээсэн материалтай {year} Оны {month} Сарын {day} Өдөр болсон сонгон шалгаруулалтын багийн хурлын шийдвэрээр энэ удаад танай төсөлд дэмжлэг олгохоос татгалзсаныг дуулгахад харамсалтай байна. </div> <br /> */}
                   
                    <div className="items">
                        Дэлхийн банкны санхүүжилтээр Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яамны дэргэд хэрэгжиж байгаа Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрийн Сонгон шалгаруулалтын багийн {app?.meetingDate.slice(0, 4)} оны {app?.meetingDate.slice(5, 7)} дугаар сарын {app?.meetingDate.slice(8, 10)}-ны өдрийн хурлын шийдвэрээр Танай компани Түншлэлийн хөтөлбөрийн 20{app?.project_number.slice(4,6)} оны {app?.project_number.slice(7,9)} дугаар цонхонд хамрагдаж, санхүүгийн дэмжлэг авахаар болсныг урьдчилан мэдэгдэхэд таатай байна.</div> <br />
                    
                    <div className="betweenItem">
                                <div  className="titless">Татгалзсан шалтгаан:</div><br/>
                                <div className="value">{app?.reason}</div>
                    </div><br />
                 
                    <div className="items">Бидэнд хандсанд баярлалаа. Хэрэв та дээрхи шалтгаануудыг засварлан, хүсэлт илгээхийг хүсвэл дараачийн удаа нээгдэх сонгон шалгаруулалтанд дахин оролцох боломжтой.</div> <br />
                </div><br />
                {/* <div className="toname">Хэрэв танд гэрээтэй холбоотой асуулт байвал  <span className="name">{edpInfo?.email}</span>  хаягаар холбогдоно уу.</div><br /> */}
                
                <div className="nameTitle A2"><span className="smtitle">Хүндэтгэсэн , </span><span className="MemeberInfo"></span></div>
                <div style={{marginTop:"10px"}} className="nameTitle A2"> <span className="SignaturePar"><img src={this.props?.Signature?.signature} alt="edpSignature" /></span><span className="smtitle"></span> </div>
                <div className="nameTitle A2" ><span className="smtitle">{`${this.props?.Signature?.lastname.slice(0,1).toUpperCase()}. ${this.props?.Signature?.firstname}`}</span><span className="MemeberInfo"></span></div>
                <div className="nameTitle A2" ><span className="smtitle">Зохицууулагч </span><span className="MemeberInfo"></span></div>
                <div className="nameTitle A2" ><span className="smtitle">Экспортыг дэмжих төсөл</span><span className="MemeberInfo"></span></div>

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

const EmailHTML = (app, signature) => renderEmail(
    <Email style={{border:"1px solid rgba(0,0,0,0.2)",padding:'30px 60px', paddingTop:"30px",  width:"750px", backgroundColor:"rgba(220,220,220,0.2)"}} title="EDP">
            <Image style={{width:"100%"}} src="https://pimis.edp.mn/head_logo.png" />
            <Item style={{color:"#222222", padding:'20px 20px', height:"100%"}} align="end">
                <Box style={{textAlign:"center",width:"100%", marginBottom:'30px',fontWeight:'500', fontSize:'15px', backgroundColor:"rgba(220,220,220,0.2)"}} >Түншлэлийн дэмжлэг олгохоос татгалзах тухай мэдэгдэл</Box>

                <Item style={{display:"flex", textAlign:"start", width:"100%",padding:"5px 0px", fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%",fontWeight:'600', fontSize:'13px'}}>Өргөдөл гаргагч аж ахуйн нэгжийн нэр: </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {app?.company?.company_name} </Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%",fontWeight:'600', fontSize:'13px'}}>Өргөдөл гаргагч албан тушаалтны нэр: </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {app?.company?.representative_name}</Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%",fontWeight:'600', fontSize:'13px'}}>Албан тушаал: </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {app?.company?.representative_position}/ </Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%",fontWeight:'600', fontSize:'13px'}}>Он сар өдөр: </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {app?.meetingDate} </Span>
                </Item>
                <Box style={{textAlign:"start",width:"100%", margin:'16px 0px', fontSize:'13px'}}>Эрхэм хүндэт {app?.company?.representative_name} Танд,</Box>


                {/* <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Экспортыг дэмжих төсөлд материалаа илгээж, шалгаруулалтанд оролцсонд баярлалаа. Экспортыг нэмэгдүүлэх талаар танай байгууллагын илгээсэн материалтай <Span style={{color:"#222222",fontWeight:"500", fontSize:'13px'}}>{year}оны {month}сарын {day}өдөр</Span> болсон сонгон шалгаруулалтын багийн хурлын шийдвэрээр энэ удаад танай төсөлд дэмжлэг олгохоос татгалзсаныг дуулгахад харамсалтай байна. </Box> */}
                <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>
                    Дэлхийн банкны санхүүжилтээр Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яамны дэргэд хэрэгжиж байгаа Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрийн Сонгон шалгаруулалтын багийн {app?.meetingDate.slice(0, 4)} оны {app?.meetingDate.slice(5, 7)} дугаар сарын {app?.meetingDate.slice(8, 10)}-ны өдрийн хурлын шийдвэрээр Танай компани Түншлэлийн хөтөлбөрийн 20{app?.project_number.slice(4,6)} оны {app?.project_number.slice(7,9)} дугаар цонхонд хамрагдаж, санхүүгийн дэмжлэг авахаар болсныг урьдчилан мэдэгдэхэд таатай байна.
                </Box>
                <Box style={{textAlign:"start",width:"100%", marginTop:'15px',marginBottom:'5px',  fontSize:'13px', fontWeight:"600"}}>Татгалзсан шалтгаан:</Box>
                <Box style={{textAlign:"start",width:"100%", marginBottom:'15px', fontSize:'13px'}}>{app?.reason}</Box>
                <Box style={{textAlign:"start",width:"100%", marginTop:'5px',marginBottom:'35px', fontSize:'13px'}}>Бидэнд хандсанд баярлалаа. Хэрэв та дээрхи шалтгаануудыг засварлан, хүсэлт илгээхийг хүсвэл дараачийн удаа нээгдэх сонгон шалгаруулалтанд дахин оролцох боломжтой.</Box>

                {/* <Box style={{textAlign:"start",width:"100%", marginTop:'5px',marginBottom:'22px', fontSize:'13px'}}>Хэрэв танд гэрээтэй холбоотой асуулт байвал {edpInfo?.email} хаягаар холбогдоно уу. </Box> */}

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Хүндэтгэсэн , </Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > </Span>
                </Item>

                <Item style={{display:"flex",alignItems:"center", textAlign:"start",width:"100%",padding:"12px 0px",  fontSize:'13px'}}>
                    <Image style={{width:"150px", height:"75px", objectFit:"contain", marginRight:"20px"}} src="cid:signature" />
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"80%", fontWeight:'600', fontSize:'13px'}}>{`${signature.lastname.slice(0,1).toUpperCase()}. ${signature.firstname}`}</Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > </Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"80%", fontSize:'13px'}}>Зохицууулагч</Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > </Span>
                </Item>

                <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222", width:"80%", fontSize:'13px'}}>Экспортыг дэмжих төсөл</Span>
                    <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > </Span>
                </Item>

                {/* <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%",fontWeight:'600', fontSize:'13px'}}>Ахлах БХШ : </Span>
                    <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > {username} </Span>
                </Item> */}
                {/* <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"5px 0px",  fontSize:'13px'}}>
                    <Span style={{color:"#222222",width:"50%",fontWeight:'600', fontSize:'13px'}}>Хаяг : </Span>
                    <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > {edpInfo?.address}</Span>
                </Item> */}
               

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
      background-color:white;
      max-width:700px;
      margin-top:20px;
      font-size:13px;
      padding:30px 70px;
      border:1px solid rgba(0,0,0,.3);
      .betweenItem{
          .value{
            font-weight:500;
          }
      }
      .title{
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
               margin-right:20px;
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
              width:50%;
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