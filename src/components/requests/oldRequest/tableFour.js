import React,{useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { animateScroll as scroll } from "react-scroll";
import axios from'../../../axiosbase';
import {BsArrowRightShort} from 'react-icons/bs'
import { fontFamily, textColor, ColorRgb, fontSize, PrevBtn, InputStyle, NextBtn2  } from '../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {AiOutlineSend} from 'react-icons/ai'
import HelperContext from '../../../context/HelperContext'
import AccessToken from '../../../context/accessToken'

const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function TableFour(props) {
      const history = useHistory();
      const [ spnBtn, setSpnBtn ] = useState(false);
      const [opacity, setOpacity] = useState("0");
      const [opacity2, setOpacity2] = useState("0");
      const [ initialData, setInitialData ] = useState([]);
      const [procent, setProcent] = useState('0');
      const [FinalErrorText, setFinalErrorText] = useState("");
      const [ Dname, setDname] = useState(null);
      const [Ddate, setDdate] = useState(null);

      const helperContext = useContext(HelperContext);

      useEffect(() => {
          const finalData = []
        if(props.initialData){
          tableData.map((el,i)=>{
              props.initialData.map(elem=>{ 
                if(i + 1 === elem.rownum){ el["id"] = elem.id; el["rowvalue"] = elem.rowvalue.toString(); el["rownum"] = elem.rownum }
              });
              setDname(props.initialName);setDdate(props.initialDate);
             finalData.push(el);
          });
          setInitialData(finalData);
        }
      },[props.initialData]);

      const radioChange = (event)=> {
        let finalData = []
        tableData.map((el,i)=>{ 
            if(props.initialData){
              props.initialData.map(elem=> elem);
            }
           finalData.push(el); });

        finalData.map((el,i)=>{
          if(el.id ===parseInt(event.target.id)){ el["rowvalue"] = event.target.value}
        })
        
         setInitialData(finalData);
      }

      const changeHandle = (e) =>{
        setDname(e.target.value);
      }
      const changeHandleDate = (e)=>{
        setDdate(e.target.value);
      }

      const clickHandles = (e) =>{
        e.preventDefault();
            let finalOne = {};
            let finalEnd = {};
            let rs2 = document.querySelectorAll(".inpTest34");
            let arr2 = Array.from(rs2);
            let finalOne2 = [];
            arr2.map(element=>{
                if(element.checked === true){
                  let soloObject2 = {}
                  let field = element.name;
                  let value = element.value;
                  if(Dname){
                    soloObject2["id"] = parseInt(element.id);
                  }
                  soloObject2["rownum"] = field
                  soloObject2["rowvalue"] = value
                  finalOne2.push(soloObject2);
                }
            });
            let rs4 = document.querySelectorAll(".getUserInp");
            let arr4 = Array.from(rs4);
            let userInp = {};

            arr4.map(el=>{
                let field = el.name;
                let value = el.value;
                if(value===""){ el.classList += " red"; }else{  el.classList =- " red";  el.classList += " getUserInp"; };
                userInp[field] = value;
            });

            finalOne["request"] = finalOne2;
            finalOne["name"] = userInp.name;
            finalOne["date"] = userInp.date;
            finalOne["esm"] = "";
            finalEnd["PPS4"] = finalOne;

            let confirm = document.getElementById("GetcheckBtn4").checked;
            let keys = Object.keys(finalOne2);
            const Procent = keys.length * 100 / 15;
            const FinalProcent = Math.round(Procent);

            // console.log(`userInp`, finalOne2[2].rowvalue);

            if(finalOne2.length < 15){
              setOpacity("1");
              setProcent(FinalProcent);
              setTimeout(() => {
                setOpacity("0");
              }, 3000)
            }else if(finalOne2[2].rowvalue  === finalOne2[3].rowvalue){
              // setFinalErrorText
              setFinalErrorText("3 болон 4 дүгээр асуулт ижил биш байх ёстой");
              setOpacity2("1");
              setTimeout(() => {
                setOpacity2("0");
              }, 3000);
           }else if(userInp.name === "" || userInp.date === ""){
              setFinalErrorText("Хүсэлт гаргагчийн мэдүүлэг хэсэгийг бөгөлнө үү");
              setOpacity2("1");

              setTimeout(() => {
                setOpacity2("0");
              }, 3000);

            }else if(confirm === false){
              setOpacity2("1");
              setFinalErrorText("Та үнэн зөв бөгөлсөн бол CHECK дарна уу");
           }else if(finalOne2[0].rowvalue === "true" && finalOne2[1].rowvalue === "true"  && finalOne2[4].rowvalue === "true" && 
                    finalOne2[6].rowvalue === "true" && finalOne2[7].rowvalue === "true" && finalOne2[8].rowvalue === "true" && finalOne2[9].rowvalue === "true" && finalOne2[10].rowvalue === "true" &&
                    finalOne2[12].rowvalue === "true" && finalOne2[13].rowvalue === "true" && finalOne2[14].rowvalue === "true" ){
                    finalEnd.PPS4["esm"] = "A"
                    // ("(A) Та шалгуур хангахгүй байна");
                    setOpacity2("0");
                    setSpnBtn(true);
                    if(Dname){
                      axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:props.token}}).then((res)=>{ setSpnBtn(false); setTimeout(()=>{ history.push("/"); },2000);}).catch((err)=>{setSpnBtn(false); console.log(err, "err");});
                    }else{
                      axios.put(`pps-request/${helperContext.tableId}`, finalEnd, {headers:{ Authorization:AccessToken()}}).then((res)=>{ setSpnBtn(false);
                        helperContext.alertText('orange', "Та шалгуур хангахгүй байна!", true); setTimeout(()=>{ history.push("/"); },4000);
                        }).catch((err)=>{setSpnBtn(false); helperContext.alertText('orange', "Алдаа гарлаа...", true); console.log(err, "err");});
                    }
            }else if(finalOne2[0].rowvalue === "false" && finalOne2[1].rowvalue === "false" && finalOne2[2].rowvalue === "true" && finalOne2[3].rowvalue === "false"  && finalOne2[4].rowvalue === "false" && 
                    finalOne2[6].rowvalue === "false" && finalOne2[7].rowvalue === "false" && finalOne2[8].rowvalue === "false" && finalOne2[9].rowvalue === "false" && finalOne2[10].rowvalue === "false" &&
                    finalOne2[12].rowvalue === "false" && finalOne2[13].rowvalue === "false" && finalOne2[14].rowvalue === "false" ){
                      // Тэнцсэн гэхдээ 5,6 руу үргэлжилэхгүй 
                    // ("(C) Та шалгуур хангаж байна.");
                    setOpacity2("0");
                    setSpnBtn(true);
                    finalEnd.PPS4["esm"] = "C"
                    if(Dname){
                      axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:props.token}}).then((res)=>{setSpnBtn(false); helperContext.alertText('green', "Та шалгуур хангаж байна!", true); setTimeout(()=>{ history.push("/"); },2000);}).catch((err)=>{setSpnBtn(false); console.log(err, "err");});
                    }else{
                      axios.put(`pps-request/${helperContext.tableId}`, finalEnd, {headers:{ Authorization:AccessToken()}}).then((res)=>{setSpnBtn(false);
                        helperContext.alertText('green', "Та шалгуур хангаж байна!", true); setTimeout(()=>{ history.push("/"); },4000);
                        }).catch((err)=>{setSpnBtn(false);helperContext.alertText('orange', "Алдаа гарлаа", true);});
                    }
            }else if(finalOne2[0].rowvalue === "false" && finalOne2[1].rowvalue === "false" && finalOne2[2].rowvalue === "false" && finalOne2[3].rowvalue === "true"  && finalOne2[4].rowvalue === "false" &&
                    finalOne2[6].rowvalue === "false" && finalOne2[7].rowvalue === "false" && finalOne2[8].rowvalue === "false" && finalOne2[9].rowvalue === "false" && finalOne2[10].rowvalue === "false" &&
                    finalOne2[12].rowvalue === "false" && finalOne2[13].rowvalue === "false" && finalOne2[14].rowvalue === "false" ){
                      // Цааш 5,6 руу үргэлжилнэ
                    // ("(B) Та шалгуур хангаж байна.");
                    setOpacity2("0");
                    setSpnBtn(true);
                    finalEnd.PPS4["esm"] = "B"
                    setOpacity("0");
                    if(Dname){
                      axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:props.token}})
                      .then((res)=>{ helperContext.alertText('green', "Та шалгуур хангаж байна!", true); setSpnBtn(false);helperContext.StyleComp("-400%", "-300%", "-200%", "-100%", "0%","100%");scroll.scrollTo(0); helperContext.reqMountFunc(1); })
                      .catch((err)=>{ setSpnBtn(false); console.log(err, "err"); })
                    }else{
                         axios.put(`pps-request/${helperContext.tableId}`, finalEnd, {headers:{ Authorization:AccessToken()}}).then((res)=>{setSpnBtn(false);
                         helperContext.alertText('green', "Та шалгуур хангаж байна!", true); setTimeout(()=>{scroll.scrollTo(0); helperContext.StyleComp("-400%", "-300%", "-200%", "-100%", "0%","100%") },3000); helperContext.reqMountFunc(1); })
                        .catch(err=>{setSpnBtn(false); helperContext.alertText('orange', "Алдаа гарлаа", true);});
                    }

            }else{
                   // Тэнцээгүй биш гэхдээ асууна
                  //  ("Та шалгуур хангаж байна...");
                    setOpacity2("0");
                    finalEnd.PPS4["esm"] = "F";
                    setSpnBtn(true);
                    if(Dname){
                      axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:props.token}}).then((res)=>{setSpnBtn(false); setTimeout(()=>{
                      helperContext.alertText('green', 'Та шалгуур хангаж байна..', true); history.push("/"); },4000) }).catch((err)=>{ helperContext.alertText('orange', 'Алдаа гарлаа', true);});
                    }else{
                      axios.put(`pps-request/${helperContext.tableId}`, finalEnd, {headers:{ Authorization:AccessToken()}}).then((res)=>{ setSpnBtn(false);
                      helperContext.alertText('green', "Та шалгуур хангаж байна!", true); setTimeout(()=>{ history.push("/"); },4000); })
                      .catch((err)=>{setSpnBtn(false); helperContext.alertText('orange', "Алдаа гарлаа", true);});
                    }
            }
        }

    return (
        <Component1 className="container" >
          <form onSubmit={clickHandles}>
            <div className="boxShadow">
              <div className="rowHeader">
                <div className="boldTitle">ХАВСРАЛТ 2Г.</div>
                <div className="italicTitle">ХҮСНЭГТ 4. БАЙГАЛЬ ОРЧИН, НИЙГМИЙН ЕРӨНХИЙ ҮНЭЛГЭЭНИЙ МАЯГТ</div>
              </div>
            <div className="formTwoParent ">

                <div className="headerPar">
                    <div  className="row" >
                      <div className="head1 col-md-5 col-sm-5 col-5">Шалгуур</div>
                      <div className="head2 col-md-2 col-sm-2 col-2"><div style={{borderBottom:"1px solid rgba(0,0,0,0.5)",paddingBottom:"10px"}} >Хариулт</div>
                          <div className="row">
                              <div style={{borderRight:"1px solid rgba(0,0,0,0.5)"}} className="col-md-6 col-md-6 col-md-6"><div className="margin">Тийм</div></div>
                              <div className="col-md-6 col-md-6 col-md-6"><div className="margin">Үгүй</div> </div>
                          </div>
                      </div>
                      <div className="head2 col-md-2 col-sm-2 col-2">Асуулт Хариулт “Тийм” бол ДБ-ны холбогдох бодлого</div>
                      <div className="head2 col-md-3 col-sm-3 col-3"> <div style={{padding:"2px 15px"}}>“Тийм” бол шаардлагатай баримт бичгүүд </div> </div>
                    </div>
                </div>
                  {props.initialName? (initialData.map((el, i)=>{
                          return(
                          <div className="headerParchild" key={i}>
                              <div className="row" >
                              {/* <div className="number col-md-1 col-sm-1 col-1">{`${i + 1}`}</div> */}
                              <div className="texts col-md-5 col-sm-5 col-5"><div className="FirstPar"><div className="countPar">{i + 1}</div><div className="mainText">{el.name}</div> </div></div>
                              <div className="radios col-md-1 col-sm-1 col-1"> <input className={`inpTest34`} type="radio" name={i + 1} id={el.id} onChange={radioChange} checked={el.rowvalue === "true" ? true: false} value={true}/></div>
                              <div className="radios col-md-1 col-sm-1 col-1"><input className={`inpTest34`} type="radio" name={i + 1} id={el.id} onChange={radioChange} checked={el.rowvalue === "false" ? true: false} value={false}/></div>

                              <div className="radios col-md-2 col-sm-2 col-2">{el.nameTwo}</div>
                              <div className="radios col-md-3 col-sm-3 col-3"><div style={{padding:"6px 15px"}}>{el.nameThree}</div></div>
                              </div>
                          </div>
                          )
                      })):(tableData.map((el, i)=>{
                        return(
                        <div className="headerParchild" key={i}>
                            <div className="row" >
                            {/* <div className="number col-md-1 col-sm-1 col-1">{`${i + 1}`}</div> */}
                            <div className="texts col-md-5 col-sm-5 col-5"><div className="FirstPar"><div className="countPar">{i + 1}</div><div className="mainText">{el.name}</div> </div></div>
                            <div className="radios col-md-1 col-sm-1 col-1"> <input className={`inpTest34`} type="radio" name={i + 1} value={true}/></div>
                            <div className="radios col-md-1 col-sm-1 col-1"><input className={`inpTest34`} type="radio" name={i + 1} value={false}/></div>
                            <div className="radios col-md-2 col-sm-2 col-2">{el.nameTwo}</div>
                            <div className="radios col-md-3 col-sm-3 col-3"><div style={{padding:"6px 15px"}}>{el.nameThree}</div></div>
                            </div>
                        </div>
                        )
                  }))}
              <div className="FinalBtn">
                  <div style={{opacity:`${opacity}`}} className="errtext">Таны асуулга {procent}% байна..</div>
                  <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div>
              </div>

               <div className="UserRequestPar">
                        <div className="Title">Хүсэлт гаргагчийн мэдүүлэг :</div>
                        <div className="description">Би/Бид энэхүү маягтад өгсөн мэдээлэл нь үнэн зөв гэдгийг баталж байгаа бөгөөд худал, буруу мэдээлэл өгсөн нь санхүүгийн дэмжлэгийн шийдвэрт нөлөөлнө эсвэл санхүүгийн дэмжлэгийн шийдвэр, гэрээг цуцлах үндэслэл болно гэдгийг хүлээн зөвшөөрч байна. </div>
                        <div className="formOneParent">
                            <div className="inputPar">
                                <div className="inpChild">
                                    <div className="labels"><span>Мэдүүлэг бөглөгчийн нэр :</span> </div>
                                    <div className="name"> <FiUserCheck />
                                          <InputStyle className="newInp">
                                                {props.initialName? <input type="input" onChange={changeHandle} value={Dname} className="getUserInp LoginInpName form__field" placeholder="Бүтэн нэрээ оруулна уу..." name="name" />
                                                                    :<input type="input" className="getUserInp LoginInpName form__field" placeholder="Бүтэн нэрээ оруулна уу..." name="name" /> }
                                                <div className="line"></div>
                                          </InputStyle>
                                    </div>
                                </div>

                                <div className="NextChild">

                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <InputStyle className="newInp">
                                                  {props.initialName?<input max={Currentdate} type="date" onChange={changeHandleDate} value={Ddate} placeholder="өдөр-сар-жил" className="getUserInp LoginInpName form__field" placeholder="Өдөр-Сар-Он " name="date" />
                                                                     :<input max={Currentdate} type="date" placeholder="өдөр-сар-жил" className="getUserInp LoginInpName form__field" placeholder="Өдөр-Сар-Он " name="date" /> }
                                                  <div className="line"></div>
                                            </InputStyle>
                                        </div>
                                    </div>


                                    <div className="inpChild next">
                                        <div className="labels"><span> Та үнэн зөв бөгөлсөн эсэхээ баталгаажуулна уу : </span></div>
                                            <div className="name"> <BsArrowRightShort />
                                                <InputStyle className="newInp">
                                                    <input id="GetcheckBtn4" checked={props.initialName?true:null} className="checkBtn" type="checkbox" name="check" />
                                                </InputStyle>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                        <div className="buttonPar">
                            {props.initialName? (<PrevBtn id="myInput" onClick={()=> {helperContext.reqMountFunc(1); scroll.scrollTo(0); helperContext.StyleComp("-200%", "-100%", "0%", "100%", "200%","300%");}} className="SubmitButton" type="button"><div className="flexchild"><AiOutlineSend/></div>Өмнөх хуудас</PrevBtn>) : null } 
                           
                            {/* <NextBtn id="myInput" onClick={clickHandles} style={spnBtn===false? { width:"40%" }:{ width:"10%" }}  className="SubmitButton" type="button">{spnBtn===false?(
                            <>Илгээх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" />
                             <AiOutlineSend className="hide1" /></div></>):<img src="/gif1.gif" alt="spin" />} </NextBtn> */}

                            <NextBtn2>
                                <button  style={spnBtn===false? { width:"100%" }:{ width:"40%" }} className="SubmitButton" type="submit">{spnBtn===false?(<> Илгээх <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></> ): <img src="/gif1.gif" alt="spin" />  }
                                </button>
                            </NextBtn2>
                       </div>

                  {/* <div className="resPar" style={{transform:`scale(${finalTextScale})`}} ><RiMailSendLine /> <h6 className="finalText">{finalText}</h6> </div> */}
                </div>
             </div>
            </div>
            </form>
        </Component1>
    )
}

export default TableFour


const Component1 = styled.div`
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};
      .boxShadow{
        box-shadow:1px 1px 18px -5px;
        border-radius:6px;
        .rowHeader{
          text-align:center;
          padding: 24px 26px;
          border-bottom:1px solid rgba(63, 81, 181,0.5);
          background-color:white;
          .boldTitle{
            font-weight:bold;
            font-size:16px;
          }
          .italicTitle{
            font-style: italic;
            color:blue;
            font-size:15px;
          }
        }
        .formTwoParent{
            border-radius:0px 0px 6px 6px;
            background-color:white;
            padding-bottom:16px;
            margin-bottom:100px;
            font-size:${fontSize};
            .UserRequestPar{
                margin-top:10px;
                padding:15px 40px;
                .Medegdel{
                  display:flex;
                  align-items:center;
                  justify-content:space-between;
                  padding:15px 10px;
                  background-color:rgba(0,200,0,0.4);
                  color:black;
                  font-size:16px;
                  .text{

                  }
                  .btnn{
                    transition:all 0.3s ease;
                    box-shadow:1px 1px 10px -2px;
                    cursor:pointer;
                    border-style:none;
                    padding:3px 30px;
                    font-weight:500;
                    border-radius:3px;
                    &:hover{
                      background-color:rgba(255,255,255,0.6);
                    }
                  }
                }
                .Title{
                    font-size:16px;  
                    font-weight:500;
                    margin-bottom:10px;
                }
                .description{
                  
                    margin-bottom:20px;
                }

                .inputPar{
                   border-top:1px solid rgba(${ColorRgb},0.5);
                   border-radius:8px;
                   display:flex;
                   flex-direction:column;
                   align-items:flex;
                   justify-content:center;
                   padding-top:15px;
                   .NextChild{
                       display:flex;
                       flex-direction:row;
                       align-items:center;
                       justify-content:space-between;
                       .next{
                           width:40%;
                           .checkBtn{
                            cursor:pointer;
                            width:25px;
                            height:25px;
                          }
                       }
                   }
                   .inpChild{
                       margin:12px 0px;
                       display:flex;
                       flex-direction:column;
                       .labels{
                           display:flex;
                           flex-direction:row;
                           justify-content:space-between;
                           font-size:14px;
                           span{
                               color:rgba(${textColor},.9);
                               font-weight:500;
                           }
                          
                       }
                       .name{
                        padding:12px 0px;
                        display:flex;
                        flex-direction:row;
                        align-items:center;
                        justify-content:flex-end;
                        width:100%;
                        svg{
                          color:rgba(${ColorRgb},0.7);
                          font-size:24px;
                          margin-right:15px;
                        }
                        .newInp{
                          font-size:14px;
                          width:100%;
                        }
                        .form__group{
                          position:relative;
                          padding: 8px 0 0;
                          margin-top: 0px;
                          width: 100%;
                        }
                      }
                   }
                }
            }
            .FinalBtn{
                margin:10px 10px;
              display:flex;
              flex-direction:row;
              align-items:center;
              justify-content:space-around;
              .errtext{
                transition:all 0.4s ease;
                text-align:center;
                background-color: #f6c343;
                border-radius:5px;
                font-size:15px !important;
                font-weight:400;
                color:black !important;
                line-height:34px;
                padding:0px 20px;
              }
            }
            .resPar{
              text-align:center;
              padding:10px 20px;
              border-radius:8px;
              background:white;
              margin-top:20px;
              margin-bottom:0px;
              display:flex;
              flex-direction:row;
              align-items:center;
              justify-content:start;
              color:#036;
              transition:all 0.4s ease;
              // background-color:#EBEB00;
              background-color:wheat;
              box-shadow:1px 1px 16px -5px;
              width:100%;
              svg{
                width:10%;
                font-size:24px !important;
              }
              .finalText{
                transition:all 0.4s ease;
                margin-bottom:0px;
              }
            }
            .errtext{
              transition:all 0.4s ease;
              text-align:center;
              background-color: #f6c343;
              border-radius:5px;
              font-size:15px !important;
              font-weight:400;
              color:black !important;
              line-height:34px;
              padding:0px 20px;
            }
    
            .buttonPar{
              margin:10px 0px;
              display:flex;
              flex-direction:row;
              align-items:center;
              justify-content:space-between;
                
            }
            .headerPar{
              background-color: rgba(0, 51, 102,0.9);
              color:white;
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              font-size:14px;
              font-weight:500;
             .margin{
               padding-top:6px;
               padding-bottom:6px;
               
             }
              .head1{
                padding-top: 10px;
                padding-bottom: 16px;
              }
              .head2{
                padding-bottom: 18px;
                border-left:1px solid rgba(0,0,0,0.4);
                padding:0px 0px;
                padding-top: 10px;
              }
            }
            .headerParchild{
              background-color: rgba(63, 81, 181,0.1);
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              .FirstPar{
                  display:flex;
                  align-items:center;
                  height: 100%; 
                  .countPar{
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    height: 100%; 
                    min-height: 100%; 
                    line-height: 100%;
                    width:8%;
                    border-right:1px solid rgba(0,0,0,0.4);
                  }
                  .mainText{
                    width:92%;
                    padding-left:10px;
                  }
              }
              .number{
                font-weight:500;
                text-align:center;
                border-right:1px solid rgba(0,0,0,0.4);
                padding-top: 10px;
                padding-bottom: 10px;
              }
              .texts{
                text-align:start;
                padding-top: 8px;
                padding-bottom: 8px;
                font-weight:500;
              }
              .radios{
                display:flex;
                align-items:center;
                justify-content:center;
                border-left:1px solid rgba(0,0,0,0.4);
                padding:0px 0px;
                input{
                  cursor:pointer;
                  height:24px;
                  width:24px;
                  transition:all 0.4s ease;
                  border-radius:50% !important;
                  opacity: 0.8;
                  ::-webkit-datetime-edit { 
                    font-size: 1.4rem;
                    
                   }
                   &:after{
                    content: "";
                    background: white;
                    display: block;
                    border-radius:50%;
                    position: absolute;
                    // transition: transform 1s ease;
                    transition: all 0.8s ease;
                    opacity: 0;
                    left:0%;
                    top:0%;
                    -webkit-transform: scale(2);
                    transform: scale(2);
                    height:24px;
                    width:24px !important;
                  }
                  &:active:after{
                    opacity: 1;
                    transition: 0s;
                    -webkit-transform: scale(0);
                    transform: scale(0);
                  }
                
                  &:checked{
                    opacity: 1;
                    -webkit-transform: scale(1.25);
                    transform: scale(1.25);
                    // box-shadow: 1px 1px 5px -2px;
                    border-radius:50% !important;
                  }
                }
              }
            }
    
        }
      }

  @media only screen and (max-width:768px){
    .boxShadow{
        .formTwoParent{
            font-size:13px;
            .buttonPar{
                flex-direction: column;
                .errtext {
                    font-size:15px;
                    width:100%;
                }
                .SubmitButton{
                    width:100% !important;
                }
            }
            .headerPar{
                font-size:14px;
            }
            .headerParchild{
                font-size:13px;
            }
            .UserRequestPar{
                padding: 15px 15px;
                .inputPar{
                  .modalPar{
                    .BtnPar{
                      width:100%;
                      justify-content: center;
                      button{
                        margin-right:18px;
                      }
                    }
                  }
                    .NextChild{
                        flex-direction: column;
                        .next{ width:100%;}
                    }
                    .SingatureImg{
                        width:100%;
                    }
                }
            }
        }
        }
    }
`

const tableData = [
  { name: "Дэд төслөөс байгаль орчин, нийгэмд эмзэг , олон янзын ба урьд өмнө байгаагүй ноцтой  сөрөг нөлөө үзүүлэхээр байгаа эсэх? Товч тодорхойлолт өгнө үү",
     nameTwo:"ҮАБ 4.01 Байгаль орчны үнэлгээ “A” ангилал",
    nameThree:"Байгаль орчин, нийгмийн  нөлөөллийн үнэлгээ  (БОННҮ)"},

  { name: "Нөлөөлөл үйл ажиллагаа явуулж буй газар эсвэл байгууламжийн гадна тусахаар байгаа эсэх, байгаль орчинд үзүүлэх сөрөг нөлөө нь нөхөн сэргээгдэхгүй байх эсэх? Товч тодорхойлолт өгнө үү:",
     nameTwo:"ҮАБ 4.01 Байгаль орчны үнэлгээ “A” ангилал",
    nameThree:"БОННҮ "},

  { name: "Төлөвлөж байгаа төсөл нь байгаль орчинд багахан эсвэл ямар ч сөрөг нөлөө үзүүлэхгүй байх эсэх? Товч үндэслэл тайлбар өгнө үү:",
     nameTwo:"OP 4.01 Байгаль орчны үнэлгээ “C” ангилал  ",
    nameThree:"Ерөнхий үнэлгээнээс өөр үйл ажиллагаа шаардлагагүй  "},

  { name: "Дэд төслийн байгаль орчин, нийгмийн нөлөөлөл бага байх, зөвхөн үйл ажиллагаа хэрэгжиж байгаа газарт тусах; эсвэл тухайн нөлөөлөл нь бага ч эргэн нөхөн сэргээгдэхгүй байх эсэх? Товч үндэслэл тайлбар өгнө үү:	",
     nameTwo:"OP 4.01 Байгаль орчны үнэлгээ “B” ангилал  ",
    nameThree:"БОННҮ эсвэл  Байгаль орчин, нийгмийн менежментийн төлөвлөгөө (БОНМТ) "},

  { name: "Төсөл нь соёлын биет нөөцөд сөрөг нөлөө үзүүлэх эсэх? Товч үндэслэл тайлбар өгнө үү:",
     nameTwo:"OP 4.11  Соёлын биет нөөц  ",
    nameThree:"БОННҮ-д авч үзсэн байх (Соёлын биет нөөцийн   менежментийн төлөвлөгөөг    оруулсан БОННҮ    ба/эсвэл төслийн явцад илрүүлсэн  биет олдворуудтай холбоотой журам)"},

  { name: "Төслийн үйл ажиллагаа гол чухал бус байгалийн амьдрах орчныг өөрчлөх эсвэл доройтуулах эсэх? Товч үндэслэл тайлбар өгнө үү: ",
     nameTwo:"OP 4.04 Байгалийн амьдрах орчин ",
    nameThree:"БОННҮ-д авч үзсэн байх  "},

  { name: "Төслийн үйл ажиллагаа нь гол чухал байгалийн амьдрах орчныг өөрчлөх эсвэл доройтуулах эсэх?  ",
     nameTwo:"OP 4.04 Байгалийн амьдрах орчин ",
    nameThree:"Авч үзэх боломжгүй "},

  { name: "Дэд төсөл нь шинээр далан барих эсвэл баригдсан ба барихаар төлөвлөж буй даланг ашиглах эсэх?   ",
     nameTwo:"OP 4.37 Далангийн аюулгүй байдал  ",
    nameThree:"Далангийн аюулгүй байдлыг хангах төлөвлөгөө "},

  { name: "Төсөл нь ямар нэг пестицид худалдаа хийх эсэх (төслөөр шууд эсвэл зээл олгох, хамтран санхүүжүүлэх замаар шууд бус хэлбэрээр эсвэл төрийн хамтрагч байгууллагын санхүүжилтээр дамжуулан), эсвэл пестицидийн худалдаа хийх төлөвлөгөөгүй ч хөнөөлт шавжийн менежментэд хор нөлөө үзүүлж болох эсэх?  ",
    nameTwo:"OP4.09 Хөнөөлт шавьжны менежмент ",
    nameThree:"БОННҮ-д авч үзсэн байх (Хөнөөлт шавьжны менежментийн төлөвлөгөө) "},

  { name: "Дэд төсөл нь албадан газар чөлөөлүүлэх, өмч хөрөнгийг алдагдуулах эсвэл орлого, амьжиргааны эх үүсвэрийг алдагдуулахад хүргэх эсэх? Товч үндэслэл тайлбар өгнө үү: ",
    nameTwo:"OP 4.12 Албадан нүүлгэн шилжүүлэлт ",
    nameThree:"Нүүлгэн шилжүүлэлт  (НШ)- ийн хураангуй төлөвлөгөө/ НШ-ийн төлөвлөгөө (Журмын талаарх  дэлгэрэнгүйг  Хавсралт C-ээс харна уу). "},

  { name: "Дэд төсөл хэрэгжих газарт цөөнхийн бүлэг амьдардаг ба төслийн үйл ажиллагаа тэдэнд сөрөг эсвэл эерэг нөлөө үзүүлэх эсэх? Товч үндэслэл тайлбар өгнө үү:  ",
    nameTwo:"ҮАБ 4.10 Уугуул иргэд  ",
    nameThree:"Нутгийн цөөнхи бүлэгт чиглэсэн  хөгжлийн төлөвлөгөө /Уугуул иргэдэд чиглэсэн төлөвлөгөө (Журмын талаарх дэлгэрэнгүйг Хавсралт B-ээс харна уу).  "},

  { name: "Төсөл нь ойтой холбоотой үйл ажиллагаа явуулснаар ойн эрүүл мэнд, чанарт нөлөөлөх эсвэл нутгийн иргэдийн эрх, сайн сайхан, бие даасан байдалд нөлөөлөх эсэх; эсвэл байгалийн ба таримал ойн менежмент, хамгаалал, ашиглалтыг өөрчлөхийг зорьж байгаа эсэх? Товч үндэслэл тайлбар өгнө үү: ",
    nameTwo:"ҮАБ4.36 Ойн аж ахуй ",
    nameThree:"БОННҮ-д авч үзсэн байх  "},

  { name: "Төсөл нь байгалийн гол чухал ой ба бусад амьдрах орчныг өөрчлөн хувиргах ба доройтуулах нөлөө үзүүлэх эсэх?   ",
    nameTwo:"OP4.36   Ойн аж ахуй ",
    nameThree:"Авч үзэх боломжгүй "},

  { name: "Дэд төсөл, түүнтэй холбоотой асуудал ба үйл ажиллагаанд хоёр ба түүнээс дээш тооны улс орнуудын хооронд ямар нэг газар нутгийн маргаан байгаа эсэх?  ",
    nameTwo:"ҮАБ 7.60 Маргаантай газруудад хэрэгжих төслүүд ",
    nameThree:"Тухайн улс орны төр засгийн газартай тохиролцох  "},

  { name: "Дэд төсөл, түүнтэй холбоотой асуудал ба үйл ажиллагаа, тэдгээрийн нарийвчилсан дизайн, инженерийн судалгаа нь олон улсын усан зам ашиглах, бохирдол үүсгэх, эсвэл тухайн замд байрлах эсэх?  ",
    nameTwo:"ҮАБ7.50 Олон улсын усан замын төслүүд  ",
    nameThree:"Мэдэгдэх, зарлах (эсвэл тухайн нөхцөлд авч үзэх зүйл) "},
];


