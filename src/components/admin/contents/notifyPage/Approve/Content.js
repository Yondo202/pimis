import React from 'react'
import styled from 'styled-components'
import axios from 'axiosbase';
import { withRouter } from "react-router-dom";
import { Email, Item, Span, renderEmail, Box,Image} from 'react-html-email'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import { RiAddCircleFill } from 'react-icons/ri';
import { HiMinusCircle } from 'react-icons/hi';
import {AlertStyle, InputStyle} from 'components/theme'
import AuthToken from 'context/accessToken'
// import Modal from 'react-awesome-modal';
// import { AiFillCloseCircle } from "react-icons/ai"


const DataList = [
    "Экспорт хөгжлийн төлөвлөгөө (маягтыг www.edp.mn -ээс татаж авна уу)" ,
    "Төлөвлөсөн үйл ажиллагаануудыг гүйцэтгэх байгууллагуудаас авсан үнийн санал, түүний харьцуулалт;",
    "Худалдан авах ажиллагааны төлөвлөгөө (маягтыг www.edp.mn -ээс татаж авна уу);",
    "Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо;",
    "Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, Байгаль орчны удирдлагын төлөвлөгөө (шаардлагатай тохиолдолд);",
]

 class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        color: "orange",  text: "dd", cond: false,   Btn: "1", 
         rejectReason: "",
         myData : DataList,
         visible: false,
         addInp : [],
         username : null || localStorage.getItem("username"),
         signature : null || localStorage.getItem("signature"),
        }
    }

    alertText = ( color, text, cond ) => {
        this.setState({ color:color, text:text, cond:cond  });
         setTimeout(()=>{ this.setState({ color:color, text:text, cond:false })},[4000]);
    }

    DeleteHandle = (el) =>{
        this.setState({
            myData: this.state.myData.filter(item => item !==el)
        })
    }

    clickHandle = () => {
        // if(!this.state.signature){
            // this.alertText("orange", "Та гарын үсэгээ баталгаажуулна уу?", true);
            // this.setState({ visible: true });
        // }else{
            axios.post('send-pps-notice', {
                notice_type: "first-evalution",
                projectId: this.props?.projectId,
                additionMaterial: this.state.rejectReason,
                // signatureData:this.state.signature,
                signatureData:null,
                emailBody:EmailHTML(this.state.myData, this.props?.data, this.props?.edpInfo, this.state.username, this.state.rejectReason ),
                approved : true
               }, { headers: { Authorization: AuthToken() } }).then((res)=>{
                    console.log(res.data.success, "my Response");
                    this.setState({ Btn: "0"}); this.alertText("green", "Амжилттай илгээлээ", true); setTimeout(()=>{this.props.history.goBack()},3000);
                  }).catch(e=>{
                    this.alertText("orange", "Алдаа гарлаа", true);
            });
        // }
    };
    
    changeHandle = (event) =>{
         this.setState({  rejectReason: event.target.value })
    }

    addBtn = (el) =>{
        if(this.state.addInp.length===0){
            let initial = { ids: 0 + el  }
            let arr = this.state.addInp.concat([initial])
            this.setState({
                addInp: arr
            })
        }
    }

    closeModal = () =>{  this.setState({  visible : false }) }
    signatureVerify = () =>{  this.props.history.push(`/signature`) }

    render() {
        const data = this.props?.data;
        const edpInfo = this.props?.edpInfo;

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
                    <div className="title"> Үндсэн мэдүүлэгт урих тухай мэдэгдэл</div>

                    <div className="contentPar">
                        <div className="items">Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрийн {data.project?.project_number.slice(4,6)} оны {data.project?.project_number.slice(7,9)} дугаар цонхонд ирүүлсэн танай
                        {data.project?.project_number} дугаартай өргөдөл нь анхан шатны шалгаруулалтад тэнцсэнд баяр хүргэж, дараагийн шатанд материалаа илгээхийг энэхүү захидлаар урьж байна. Та дараагийн шатны материалаа 
                         <span style={{fontWeight:"500"}}> {data.project?.final_date.slice(0,4)}оны  {data.project?.final_date.slice(5,7)}сарын {data.project?.final_date.slice(8,10)}өдрийн 18 цагаас өмнө </span> <a href={`mailto:${edpInfo?.email}`}>{edpInfo.email}</a> хаягаар ирүүлнэ үү. 
                        </div> <br />
                        <div className="items">Хэрэв дээрх хугацаанд материалаа ирүүлээгүй тохиолдолд танай байгууллагыг Түншлэлийн хөтөлбөрт оролцохоос татгалзсан гэж үзэх бөгөөд ирүүлсэн өргөдлийг хүчингүйд тооцно.</div> <br />
                    </div>

                    <div className="nameTitle"><span className="smtitle A22">Дараагийн шатанд ирүүлэх материалын жагсаалт: </span>
                    </div><br />
                        <div className="listItems">
                            {this.state.myData.map((el)=>{
                                return( <div className="items"><div><HiMinusCircle onClick={()=>this.DeleteHandle(el)} /></div><span>{el}</span> </div> )
                            })}
                        </div>
                        {this.state.addInp.map(el=> <InputStyle  className="btnStyle"><textarea onChange={this.changeHandle} name={`title`} className="getInp" name="addition" placeholder="Нэмэлтээр оруулах..." /><div className="line"></div> </InputStyle> )}   
                        
                        {this.state.addInp.length===0?<div onClick={()=>this.addBtn(1)} className="addBtn"><RiAddCircleFill /> <span>Бусад нэмэлт шаардлагатай баримт бичиг</span></div>:null} <br /><br />

                    <div className="nameTitle A2"><span className="smtitle">Хүндэтгэсэн, </span></div>
                    <div className="nameTitle A2" ><span className="smtitle">Нэр: </span><span className="MemeberInfo">{this.state.username}</span></div>
                    <div className="nameTitle A2" ><span className="smtitle">Бизнес хөгжлийн зөвлөх </span></div>
                    <div className="nameTitle A2"><span className="smtitle">Холбоо барих: </span><span className="MemeberInfo">{edpInfo?.phone}</span></div>

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

const EmailHTML = (stateData, data, edpInfo, userName, rejectReason) => renderEmail(
    <Email style={{border:"1px solid rgba(0,0,0,0.2)",padding:'30px 70px', paddingTop:"15px",  width:"830px", backgroundColor:"rgba(220,220,220,0.2)"}} title="EDP">
            <Image style={{width:"100%"}} src="http://www.edp.mn/Content/Images/mn-MN/head.jpg" />
                <Item style={{color:"#222222", padding:'20px 20px', height:"100%"}} align="end">
                    <Box style={{textAlign:"center",width:"100%", marginBottom:'30px',marginTop:'18px',fontWeight:'500', fontSize:'16px', backgroundColor:"rgba(220,220,220,0.2)"}} >Үндсэн мэдүүлэгт урих тухай мэдэгдэл</Box>

                    <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрийн {data.project?.project_number.slice(4,6)} оны {data.project?.project_number.slice(7,9)} дугаар цонхонд ирүүлсэн танай
                        <Span style={{fontWeight:"600", fontSize:'13px'}}> {data.project?.project_number} </Span> дугаартай өргөдөл нь анхан шатны шалгаруулалтад тэнцсэнд баяр хүргэж, дараагийн шатанд материалаа илгээхийг энэхүү захидлаар урьж байна. Та дараагийн шатны материалаа 
                        <Span style={{fontWeight:"600", fontSize:'13px'}}> ажлын 10 хоногийн дотор буюу {data.project?.final_date.slice(0,4)}оны  {data.project?.final_date.slice(5,7)}сарын {data.project?.final_date.slice(8,10)}өдрийн 18 цагаас өмнө </Span> 
                        {edpInfo?.email} хаягаар ирүүлнэ үү.
                    </Box>
                    <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Хэрэв дээрх хугацаанд материалаа ирүүлээгүй тохиолдолд танай байгууллагыг Түншлэлийн хөтөлбөрт оролцохоос татгалзсан гэж үзэх бөгөөд ирүүлсэн өргөдлийг хүчингүйд тооцно.</Box>
                
                    <Box style={{textAlign:"start", width:"100%",marginTop:'5px',marginBottom:'10px', fontSize:'13px', fontWeight:"500"}}>Дараагийн шатанд ирүүлэх материалын жагсаалт:</Box>

                    <Box style={{width:"100%",marginBottom:'32px', marginLeft:"30px", fontSize:'13px'}}>
                             {stateData.map((el)=> <Item style={{textAlign:"start", color:"#222222", width:"100%", fontSize:'13px', padding:"3px 0px"}}>• {el}</Item>)}
                             {rejectReason!==""?<Item style={{textAlign:"start", color:"#222222", width:"100%", fontSize:'13px', padding:"3px 0px"}}>• {rejectReason}</Item>: null}  
                    </Box>

                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"6px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Хүндэтгэсэн , </Span>
                        {/* <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {userName}</Span> */}
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"6px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"50%",fontWeight:"600", fontSize:'13px'}}>Нэр : </Span>
                        <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > {userName} </Span>
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"6px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Бизнес хөгжлийн зөвлөх </Span>
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"6px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"50%",fontWeight:"600", fontSize:'13px'}}>Холбоо барих: </Span>
                        <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} >{edpInfo?.phone}</Span>
                    </Item>
                    
                </Item>
    </Email>
)

{/* <Item style={{display:"flex",alignItems:"center", textAlign:"start",width:"100%",padding:"10px 0px",  fontSize:'13px'}}>
    <Span style={{color:"#222222",width:"20%",fontWeight:"600", fontSize:'13px'}}>Гарын үсэг : </Span>
    <Image style={{width:"150px", height:"75px", objectFit:"contain", marginRight:"20px"}} src="cid:signature" />
</Item> */}


const SendBtn = styled.div`
    @media print{
        display:none;
    }
`

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
        color:#000;
        margin-bottom:20px;
        background-color:white;
        max-width:850px;
        margin-top:20px;
        font-size:13px;
        padding:30px 60px;
        border:1px solid rgba(0,0,0,.3);
        .title{
            font-size:15px;
            font-weight:500;
            margin-bottom:30px;
            text-align:center;
            padding: 15px 30px;
        }
        .btnStyle{
            margin:15px 30px;
            textarea{
                height:100px;
            }
        }
        .addBtn{
            margin-top:16px;
            display:flex;
            align-items:center;
            margin-left:30px;
            svg{
                cursor:pointer;
                margin-right: 15px;
                font-size: 20px;
                color: green;
                &:hover{
                    font-size: 20px;
                    color:lightgreen;
                }
            }
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
                width:40%;
            }
            .A22{
                font-weight:500;
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
        .listItems{
            margin-left:30px;
            .items{
                display:flex;
                padding:5px 0px;
                svg{
                    transition:all 0.3s ease;
                    cursor:pointer;
                    margin-right: 15px;
                    font-size: 18px;
                    color: red;
                    &:hover{
                        transform:rotate(180deg);
                        font-size: 18px;
                        color: #FF5733;
                    }
                }
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



