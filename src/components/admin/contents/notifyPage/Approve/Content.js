import React from 'react'
import styled from 'styled-components'
import axios from 'axiosbase';
import { Email, Item, Span, A, renderEmail, Box,Image} from 'react-html-email'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import { RiAddCircleFill } from 'react-icons/ri';
import {AlertStyle, InputStyle} from 'components/theme'
import AuthToken from 'context/accessToken'


const today = new Date();
const month = (today.getMonth()+1);
const year = today.getFullYear();
const day = today.getDate();
const addDays=(dateObj, numDays)=>{ dateObj.setDate(dateObj.getDate() + numDays);  return dateObj;}
const nextWeek = addDays(today , 10); const day2 = nextWeek.getDate();const month2 = (nextWeek.getMonth()+1); const year2 = nextWeek.getFullYear();

export default class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        color: "orange",  text: "dd", cond: false,   Btn: "1", 
         rejectReason: "",
         myData : DataList,
         addInp : [],
         username : localStorage.getItem("username"),
        }
        console.log(`props.projectId`, props.projectId)
    }

    alertText = ( color, text, cond ) => {
        this.setState({ color:color, text:text, cond:cond  });
         setTimeout(()=>{ this.setState({ color:color, text:text, cond:false })},[4000]);
    }

    clickHandle = () =>{
        axios.post('send-pps-notice', {
            notice_type: "first-evalution",
            projectId: this.props?.projectId,
            additionMaterial: this.state.rejectReason,
            emailBody:EmailHTML(this.state.myData, this.props?.data, this.props?.edpInfo, this.state.username, this.state.rejectReason ),
            approved : true
           }, { headers: { Authorization: AuthToken() } }).then((res)=>{
                console.log(res.data.success, "my Response");
                this.setState({ Btn: "0"}); this.alertText("green", "Амжилттай илгээлээ", true); setTimeout(()=>{this.props.history.push(`5a/${this.props?.projectId}`)},3000);
              }).catch((e)=>{
                this.alertText("orange", "Алдаа гарлаа", true);
                console.log(e, "err Response");
        });
    };
    changeHandle = (event) =>{ this.setState({  rejectReason: event.target.value }) }

    addBtn = (el) =>{
        if(this.state.addInp.length===0){
            let initial = { ids: 0 + el  }
            let arr = this.state.addInp.concat([initial])
            this.setState({
                addInp: arr
            })
        }
    }

    

    render() {
        const data = this.props?.data
        const edpInfo = this.props?.edpInfo
        console.log(`this.state.addInp`, this.state.addInp.length)
        return (
            <>
                <MainPar className="MainPar" >
                    <div className="title"> Дараагийн шатанд тэнцсэн талаарх мэдэгдэл буюу үндсэн мэдүүлгийн бүрдүүлбэрийн урилга</div>
                    <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч аж ахуйн нэгжийн нэр:</span> <span className="MemeberInfo">{data?.companyname}</span></div>
                    <div className="nameTitle"><span className="smtitle">Өргөдөл гаргагч албан тушаалтны нэр: </span> <span className="MemeberInfo">{data?.project?.company?.representative_name}</span></div>
                    <div className="nameTitle"><span className="smtitle">Албан тушаал: </span><span className="MemeberInfo">{data?.project?.company?.representative_position}</span></div>
                    <div className="nameTitle"><span className="smtitle">Он сар өдөр: </span><span className="MemeberInfo">{`${day} / ${month} / ${year}`}</span></div>
                    <div className="toname">Эрхэм <span className="name"> {data?.project?.company?.representative_name} </span> Танд,</div><br />
                    <div className="contentPar">
                        <div className="items">Экспортыг дэмжих төслийн анхан шатны шалгаруулалтанд зориулж таны илгээсэн {data?.project_number} Дугаартай өргөдөл нь анхан шатны шалгаруулалтанд тэнцсэнд баяр хүргэж, дараагийн шатанд материалаа илгээхийг энэхүү захидлаар урьж байна</div> <br />
                        <div className="items">Шаардлатай материалын жагсаалтыг хавсаргасан бөгөөд таныг энэхүү захидал илгээсэн өдрөөс эхлэн ажлын 10 хоногийн дотор буюу {year2}оны  {month2}сарын {day2}өдрийн 18 цагаас өмнө мэдээллээ " {edpInfo.email} "  хаягаар илгээхийг хүсч байна. </div> <br />
                        <div className="items">Хэрэв дээр дурдсан хугацаанд материал ирээгүй тохиолдолд танай байгууллагыг энэхүү түншлэлийн хөтөлбөрт оролцох сонирхолгүй болсоноор тооцон таны өргөдлийн материал хаагдах болно.  Өргөдлийн материал хаагдсаны дараа та дахин оролцох хүсэлтэй бол шинээр процессыг эхэлж, дахин шалгаруулалтанд орох болно.</div> <br />
                    </div>
                    <div className="nameTitle"><span className="smtitle A22">Шаардлагатай материалын жагсаалт: </span>
                    </div><br />
                        <div className="listItems">
                            {this.state.myData.map((el)=>{
                                return( <div className="items">• {el.title}</div> )
                            })}
                        </div>
                        {this.state.addInp.map(el=> <InputStyle  className="btnStyle"><input onChange={this.changeHandle} name={`title`} className="getInp" name="addition" placeholder="Нэмэлтээр оруулах..." /><div className="line"></div> </InputStyle> )}   
                        
                        {this.state.addInp.length===0?<div onClick={()=>this.addBtn(1)} className="addBtn"><RiAddCircleFill /> <span>Бусад нэмэлт шаардлагатай баримт бичиг</span></div>:null} <br /><br />

                    <div className="nameTitle A2"><span className="smtitle">Хүндэтгэсэн, </span></div>
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



const EmailHTML = (stateData, data, edpInfo, userName, rejectReason) => renderEmail(
    <Email style={{border:"1px solid rgba(0,0,0,0.2)",padding:'30px 70px', paddingTop:"15px",  width:"850px"}} title="EDP">
            <Image style={{width:"100%"}} src="http://www.edp.mn/Content/Images/mn-MN/head.jpg" />
                <Item style={{color:"#222222", padding:'20px 20px', backgroundColor:"white", height:"100%"}} align="end">
                    <Box style={{textAlign:"center",width:"100%", marginBottom:'30px',fontWeight:'500', fontSize:'14px'}} >Дараагийн шатанд тэнцсэн талаарх мэдэгдэл буюу үндсэн мэдүүлгийн бүрдүүлбэрийн урилга</Box>

                    <Item style={{display:"flex", textAlign:"start", width:"100%",padding:"3px 0px", fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Өргөдөл гаргагч аж ахуйн нэгжийн нэр: </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {data?.companyname} </Span>
                    </Item>

                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Өргөдөл гаргагч албан тушаалтны нэр: </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {data?.project?.company?.representative_name}</Span>
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Албан тушаал: </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} >{data?.project?.company?.representative_position}</Span>
                    </Item>

                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Он сар өдөр: </Span>
                        <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} >{`${day} / ${month} / ${year}`}</Span>
                    </Item>
                    <Box style={{textAlign:"start",width:"100%", margin:'16px 0px', fontSize:'13px'}}>Эрхэм хүндэт {data?.project?.company?.representative_name} Танд,</Box>

                    <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Экспортыг дэмжих төслийн анхан шатны шалгаруулалтанд зориулж таны илгээсэн {data?.project_number} Дугаартай өргөдөл нь анхан шатны шалгаруулалтанд тэнцсэнд баяр хүргэж, дараагийн шатанд материалаа илгээхийг энэхүү захидлаар урьж байна. </Box>
                    <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Шаардлатай материалын жагсаалтыг хавсаргасан бөгөөд таныг энэхүү захидал илгээсэн өдрөөс эхлэн <Span style={{fontWeight:"600", fontSize:'13px'}}>ажлын 10 хоногийн дотор буюу {year2}оны  {month2}сарын {day2}өдрийн 18 цагаас өмнө</Span>   мэдээллээ " {edpInfo?.email} " хаягаар илгээхийг хүсч байна. </Box>
                    <Box style={{textAlign:"start",width:"100%", margin:'15px 0px', fontSize:'13px'}}>Хэрэв дээр дурдсан хугацаанд материал ирээгүй тохиолдолд танай байгууллагыг энэхүү түншлэлийн хөтөлбөрт оролцох сонирхолгүй болсоноор тооцон таны өргөдлийн материал хаагдах болно.  Өргөдлийн материал хаагдсаны дараа та дахин оролцох хүсэлтэй бол шинээр процессыг эхэлж, дахин шалгаруулалтанд орох болно.</Box>
                
                    <Box style={{textAlign:"start",width:"100%",marginTop:'5px',marginBottom:'10px', fontSize:'13px', fontWeight:"500"}}>Шаардлагатай материалын жагсаалт:</Box>

                    <Box style={{width:"100%",marginBottom:'32px', marginLeft:"30px", fontSize:'13px'}}>
                             {stateData.map((el)=> <Item style={{color:"#222222", width:"100%", fontSize:'13px', padding:"3px 0px"}}>• {el.title}</Item>)}
                             {rejectReason!==""?<Item style={{color:"#222222", width:"100%", fontSize:'13px', padding:"3px 0px"}}>• {rejectReason}</Item>: null}  
                    </Box>

                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222", width:"50%", fontSize:'13px'}}>Хүндэтгэсэн , </Span>
                        {/* <Span style={{color:"#222222", marginLeft:30, fontSize:'13px'}} > {userName}</Span> */}
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Ахлах БХШ : </Span>
                        <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} > {userName} </Span>
                    </Item>
                    <Item style={{display:"flex", textAlign:"start",width:"100%",padding:"3px 0px",  fontSize:'13px'}}>
                        <Span style={{color:"#222222",width:"50%", fontSize:'13px'}}>Хаяг : </Span>
                        <Span style={{color:"#222222",marginLeft:30, fontSize:'13px'}} >{edpInfo?.address}</Span>
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
      max-width:850px;
      margin-top:20px;
      font-size:13px;
      padding:30px 60px;
      border:1px solid rgba(0,0,0,.3);
      .title{
          font-weight:500;
          margin-bottom:30px;
          text-align:center;
          padding: 15px 30px;
      }
      .btnStyle{
          margin:15px 30px;
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
          padding:3px 0px;
          .smtitle{
              width:50%;
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
              padding:5px 0px;
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

const DataList = [
    { title : "Экспорт хөгжлийн төлөвлөгөө" },
    { title : "Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, Байгаль орчны удирдлагын төлөвлөгөө" },
    { title : "Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээний хуулбар" },
    { title : "Өмнөх 2 жилийн санхүүгийн тайлан /энэ оны санхүүгийн тайлангийн хамт/" },
    { title : "Холбогдох дүүргийн татварын албанаас 12 сараас дээш хугацааны татварын өргүйг нотолсон тодорхойлолт, баримт" },
    { title : "Холбогдох нийгмийн даатгалын газраас  12 сараас дээш хугацааны өргүйг нотолсон тодорхойлолт, баримт, нийгмийн даатгал төлдөг ажилчдын тооны мэдээлэл" },
    { title : "Монголбанкны зээлийн мэдээллийн сангаас муу ангиллын зээлгүйг нотолсон тодорхойлолт, баримт" },
    { title : "Хуулийн этгээдийн эцсийн өмчлөгчдийг тодорхойлох баримт" },
    { title : "Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар (Дор хаяж 3 албан тушаалтны мэдээлэл)" },
    { title : "Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо" },
    { title : "Санхүүжилтийг бүрэн хийх боломжтойг нотолсон баримт бичиг, банкны хуулга гм" },
    // { title : "Бусад шаардлагатай баримт бичиг" },
   
 ]

