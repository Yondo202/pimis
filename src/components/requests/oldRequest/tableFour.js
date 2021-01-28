
import React,{useEffect, useState, useRef, useContext} from 'react';
import styled from 'styled-components'
import { Link, animateScroll as scroll } from "react-scroll";
import axios from'../../../axiosbase';
import { fontFamily, textColor, ColorRgb, Color,fontSize } from '../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {BiPen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from '../../../context/UserContext'
import HelperContext from '../../../context/HelperContext'
import {RiMailSendLine} from 'react-icons/ri'

function TableFour(props) {
      const [opacity, setOpacity] = useState("0");
      const [opacity2, setOpacity2] = useState("0");
      const [ initialData, setInitialData ] = useState([]);
      const [ finalText, setFinalText] = useState('');
      const [ finalTextScale, setFinalTextScale] = useState('0');
      const [procent, setProcent] = useState('0');
      const [ finalMsg, setFinalMsg ] = useState("0");
      const [FinalErrorText, setFinalErrorText] = useState("");
      const [ Dname, setDname] = useState(props.initialName);
      const [Ddate, setDdate] = useState(props.initialDate);

      const StyleContext = useContext(UserContext);
      const helperContext = useContext(HelperContext);
      console.log(helperContext.tableId, " $ table Id 4 $ ");
      console.log(props.initialData, " my initial kk");

      useEffect(() => {
          const finalData = []
          tableData.map((el,i)=>{
            props.initialData.map(elem=>{ 
              if(i + 1 === elem.rownum){ el["id"] = elem.id; el["rowvalue"] = elem.rowvalue.toString(); el["rownum"] = elem.rownum }
            });
            finalData.push(el);
          });
          setInitialData(finalData);
      },[]);
      console.log(initialData, "444 ************");

      const radioChange = (event)=> {
        let finalData = []
        tableData.map((el,i)=>{  props.initialData.map(elem=> elem); finalData.push(el); });

        finalData.map((el,i)=>{
          if(el.id.toString() === event.target.id){ el["rowvalue"] = event.target.value}
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
                  if(props.initialData[0]){
                    soloObject2["id"] = parseInt(element.id);
                  }
                  soloObject2["rownum"] = field
                  soloObject2["rowvalue"] = value
                  // soloObject2[`pps${field}`] = value;
                  finalOne2.push(soloObject2);
                }
            });
            let rs4 = document.querySelectorAll(".getUserInp");
            let arr4 = Array.from(rs4);
            let userInp = {};

            arr4.map(element=>{
                let field = element.name;
                let value = element.value;
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

            console.log(finalEnd , "pps4 final end");
            // console.log(JSON.stringify(finalEnd));

            console.log(finalOne2[3].rowvalue, "dadad");

            if(finalOne2.length < 15){
              setOpacity("1");
              setProcent(FinalProcent);
              // scroll.scrollTo(0);
              setFinalTextScale("0");
              setFinalMsg("0");
            }else if(userInp.name === "" || userInp.date === ""){
              setFinalErrorText("Хүсэлт гаргагчийн мэдүүлэг хэсэгийг бөгөлнө үү");
              setOpacity("0");
              setOpacity2("1");
              setFinalTextScale("0");
              setFinalMsg("0");
            }else if(finalOne2[2].rowvalue  === finalOne2[3].rowvalue){
              setFinalText("3 болон 4 дүгээр асуулт ижил биш байх ёстой");
              setFinalTextScale("1");
              setOpacity2("0");
              setFinalMsg("0");
           }else if(confirm === false){
              setFinalTextScale("0");
              setOpacity2("1");
              setFinalErrorText("Та үнэн зөв бөгөлсөн бол CHECK дарна уу");
           }else if(finalOne2[0].rowvalue === "true" && finalOne2[1].rowvalue === "true"  && finalOne2[4].rowvalue === "true" && 
                    finalOne2[6].rowvalue === "true" && finalOne2[7].rowvalue === "true" && finalOne2[8].rowvalue === "true" && finalOne2[9].rowvalue === "true" && finalOne2[10].rowvalue === "true" &&
                    finalOne2[12].rowvalue === "true" && finalOne2[13].rowvalue === "true" && finalOne2[14].rowvalue === "true" ){
                    finalEnd.PPS4["esm"] = "A"
                    setFinalText("(A) Та шалгуур хангахгүй байна");
                    setFinalTextScale("1");
                    setOpacity2("0");
                    setFinalMsg("0");
                    console.log(finalEnd, "myfinal End (A)");
                    // axios.put(`pps-request/${helperContext.tableId}`, finalEnd).then((res)=>{ console.log(res, "$$(A) res 4 $$")}).catch((err)=>{ console.log(err, "err");});
                    axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:`bearer ${props.token}`}}).then((res)=>{ console.log(res, "$$(A) res 4 $$")}).catch((err)=>{ console.log(err, "err");});
            }else if(finalOne2[0].rowvalue === "false" && finalOne2[1].rowvalue === "false" && finalOne2[2].rowvalue === "true" && finalOne2[3].rowvalue === "false"  && finalOne2[4].rowvalue === "false" && 
                    finalOne2[6].rowvalue === "false" && finalOne2[7].rowvalue === "false" && finalOne2[8].rowvalue === "false" && finalOne2[9].rowvalue === "false" && finalOne2[10].rowvalue === "false" &&
                    finalOne2[12].rowvalue === "false" && finalOne2[13].rowvalue === "false" && finalOne2[14].rowvalue === "false" ){
                      // Тэнцсэн гэхдээ 5,6 руу үргэлжилэхгүй 
                    setFinalText("(C) Та шалгуур хангаж байна.");
                    setFinalTextScale("1");
                    setOpacity2("0");
                    setFinalMsg("0");
                    finalEnd.PPS4["esm"] = "C"
                    console.log(finalEnd, "myfinal End (C)");
                    axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:`bearer ${props.token}`}}).then((res)=>{ console.log(res, "$$(A) res 4 $$")}).catch((err)=>{ console.log(err, "err");});
            }else if(finalOne2[0].rowvalue === "false" && finalOne2[1].rowvalue === "false" && finalOne2[2].rowvalue === "false" && finalOne2[3].rowvalue === "true"  && finalOne2[4].rowvalue === "false" && 
                    finalOne2[6].rowvalue === "false" && finalOne2[7].rowvalue === "false" && finalOne2[8].rowvalue === "false" && finalOne2[9].rowvalue === "false" && finalOne2[10].rowvalue === "false" &&
                    finalOne2[12].rowvalue === "false" && finalOne2[13].rowvalue === "false" && finalOne2[14].rowvalue === "false" ){
                      // Цааш 5,6 руу үргэлжилнэ
                    setFinalText("(B) Та шалгуур хангаж байна.");
                    setFinalTextScale("1");
                    setOpacity2("0");
                    finalEnd.PPS4["esm"] = "B"
                    console.log(finalEnd, "myfinal End (B)");
                    axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:`bearer ${props.token}`}}).then((res)=>{ console.log(res, "$$(B) res 4 $$")}).catch((err)=>{ console.log(err, "err");});
                    StyleContext.StyleComp("-400%", "-300%", "-200%", "-100%", "0%","100%");
                    scroll.scrollTo(0);
                    // setFinalMsg("1");
            }else{
                   // Тэнцээгүй биш гэхдээ асууна
                   setFinalMsg("0");
                    setFinalTextScale("1");
                    setFinalText("Та шалгуур хангаж байна...");
                    setOpacity2("0");
                    alert("gg");
                    finalEnd.PPS4["esm"] = "F"
                    console.log(finalEnd, "other F");
                    axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:`bearer ${props.token}`}}).then((res)=>{ console.log(res, "$$(F) res 4 $$")}).catch((err)=>{ console.log(err, "err");});
                    // StyleContext.StyleComp("-400%", "-300%", "-200%", "-100%", "0%","100%");
                  }
        }

        
        const nextHandleBtn = () => {
            // scroll.scrollTo(0);
            // StyleContext.StyleComp("-400%", "-300%", "-200%", "-100%", "0%","100%");
        }
//   console.log(trimmedDataURL, "signature url");
// console.log(initialData, " 444 my initial finalll")
    return (
        <Component1 className="container" >
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
                <form>
                    {props.initialData[0] ? (initialData.map((el, i)=>{
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
                </form>
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
                                        <div className="form__group">
                                            <input type="input" onChange={changeHandle} value={Dname} className="getUserInp LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" required />
                                            <label for="name" className=" form__label">Бүтэн нэрээ оруулна уу</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="NextChild">

                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <div className="form__group">
                                                <input max='3000-12-31' type="date" onChange={changeHandleDate} value={Ddate} placeholder="өдөр-сар-жил" className="getUserInp LoginInpName form__field" placeholder="Регистерийн дугаар" name="date" required />
                                                <label for="password" className="form__label">Өдөр-Сар-Он </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inpChild next">
                                        <div className="labels"><span> Та үнэн зөв бөгөлсөн эсэхээ баталгаажуулна уу : </span></div>
                                            <div className="name"> <BiPen />
                                                <div className="form__group">
                                                    {/* <div className="SignBtn" onClick={openModal} > Зурах </div> */}
                                                    <input id="GetcheckBtn4" className="checkBtn" type="checkbox" name="check" />
                                                </div>
                                            </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                            <button onClick={clickHandles} className="SubmitButton" type="button">Илгээх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></button>
                    </div>
                  <div className="resPar" style={{transform:`scale(${finalTextScale})`}} ><RiMailSendLine /> <h6 className="finalText">{finalText}</h6> </div>
                  <div style={{transform:`scale(${finalMsg})`}} className="Medegdel"><span className="text">Байгаль орчин, нийгмийн менежментийн төлөвлөгөө (БОНМТ) гаргахыг шаардаж болно.</span> <button onClick={nextHandleBtn} className="btnn">Шаардах</button> </div>
                </div>
             </div>
            </div>
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
                        display:flex;
                        flex-direction:row;
                        align-items:flex-end;
                        justify-content:flex-end;
                        width:100%;
                        svg{
                          color:rgba(${ColorRgb},0.7);
                          font-size:28px;
                          margin-right:15px;
                          margin-bottom:5px;
                        }
                        .form__group{
                         position:relative;
                         padding: 15px 0 0;
                         margin-top: 0px;
                         width: 100%;
                            .form__field{
                                font-family: inherit;
                                width: 100%;
                                border: 0;
                                border-radius:6px;
                                border-bottom: 1px solid rgba(${ColorRgb},0.4);
                                border-right: 1px solid rgba(${ColorRgb},0.4);
                                border-left: 1px solid rgba(${ColorRgb},0.4);
                                border-top: 1px solid rgba(${ColorRgb},0.4);
                                outline: 0;
                                font-size: 1rem;
                                color: black;
                                padding: 7px 0;
                                padding-left:10px;
                                font-size: 0.9rem;
                                background: transparent;
                                transition: border-color 0.2s;
                                transition:all 0.3s ease;
                                position: relative;
                                z-index: 1;
                                &::placeholder {
                                  color: transparent;
                                }
                                &:placeholder-shown ~ .form__label {
                                  font-size: 0.9rem;
                                  cursor: text;
                                  top: 24px;
                                }
                            }
                           
                            .form__label {
                                position: absolute;
                                top: 0;
                                display: block;
                                transition: 0.2s;
                                font-size: 0rem;
                                color: gray;
                                z-index: 0;
                                padding:0px 10px;
                                // background-color:black;
                              }
                              
                              .form__field{
                                  &:focus {
                                    ~ .form__label {
                                      position: absolute;
                                      top: 0;
                                      display: block;
                                      transition: 0.3s;
                                      font-size: 0.8rem;
                                      color: #11998e;
                                      font-weight:400;    
                                    }
                                    // border-bottom: 1px solid gray;
                                    border-right:none;
                                    border-left:none;
                                    border-top:none;
                                    padding-bottom: 7px;
                                    font-weight: 400;
                                    border-width: 1px;
                                    border-image: linear-gradient(to right, #11998e, #38ef7d);
                                    border-image-slice: 1;
                                  }
                              }
                              /* reset input */
                              .form__field{
                                &:required,&:invalid { box-shadow:none; }
                              }
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
    
            .buttonPar{
              margin:10px 0px;
              display:flex;
              flex-direction:row;
              align-items:center;
              justify-content:space-between;
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

                .SubmitButton{
                    margin:10px 0px;
                    margin-bottom:10px;
                    border-style:none;
                    border-radius:6px;
                    cursor:pointer;
                    padding:5px 0px;
                    color:white;
                    background-color:${Color};
                    font-size:18px;
                    text-align:center;
                    transition:all 0.3s ease;
                    display:flex;
                    align-items:center;
                    justify-content:space-around;
                    border:1px solid rgba(63, 81, 181,0.5);
                    width:50%;
                    border-radius:6px;
                    .hide{
                      transition:all 0.3s ease;
                      transform:scale(0);
                      font-size:22px;
                    }
                    .hide1{
                      transition:all 0.7s ease;
                      transform:scale(0);
                      font-size:26px;
                    }
                    &:hover{
                      box-shadow:1px 1px 15px -2px black;
                      .hide{
                        transition:all 0.3s ease;
                        transform:scale(1);
                      }
                      .hide1{
                        transition:all 0.7s ease;
                        transform:scale(1);
                      }
                    }
                    .flexchild{
                      display:flex;
                      align-items:center;
                      justify-content:space-around;
                    }
                }
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
                    width:100%;
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


