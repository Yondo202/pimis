import React,{useEffect, useState, useRef, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {BiPen} from 'react-icons/bi'
import { animateScroll as scroll } from "react-scroll";
import { fontFamily, textColor, ColorRgb, Color,fontSize, NextBtn } from '../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {AiOutlineSend} from 'react-icons/ai'
import HelperContext from '../../../context/HelperContext'
import axios from '../../../axiosbase'
import AccessToken from '../../../context/accessToken'

function TableOne(props) {
    const history = useHistory();
    const [ spnBtn, setSpnBtn ] = useState(false);
    const [opacity, setOpacity] = useState("0");
    const [opacity2, setOpacity2] = useState("0");
    const [procent, setProcent] = useState('0');
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [ initialData, setInitialData ] = useState([]);
    const [ Dname, setDname] = useState("");
    const [Ddate, setDdate] = useState("");
    const tablesContext = useContext(HelperContext);

    
    useEffect(()=>{
      const finalData = []
      dataOne.map((el,i)=>{
        if(props.initialData){
            props.initialData.map((elem,index)=>{ 
            if(i === index){el["id"] = elem.id; el["rvalue"] = elem.rvalue;  el["rownum"] = elem.rownum; }});
        } finalData.push(el);
     });
     setDname(props.initialName);setDdate(props.initialDate);setInitialData(finalData);
    },[props.initialData]);

   
    const radioChange = (event)=> {
      let finalData = []
       dataOne.map((el,i)=>{  props.initialData.map(elem=> elem); finalData.push(el); });
      finalData.map((el,i)=>{
        if(el.id.toString() === event.target.id){ el["rvalue"] = event.target.value}
      })
       setInitialData(finalData);
    }

    const changeHandle = (e) =>{ setDname(e.target.value); }
    const changeHandleDate = (e)=>{ setDdate(e.target.value);}

    const clickHandles = async (e) =>{
              let finalOne = {};  let finalEnd = {};  let rs2 = document.querySelectorAll(".inpTest3"); let arr2 = Array.from(rs2);  let finalOne2 = []; let cond = [];
              arr2.map(element=>{
                  if(element.checked === true){
                    let soloObject2 = {}; let rownum = element.name; let value = element.value;
                    soloObject2["id"] = element.id; soloObject2["rvalue"] = value;  soloObject2["rownum"] = rownum; finalOne2.push(soloObject2);

                    if(element.value === "true"){
                      soloObject2["rownum"] = rownum; soloObject2["rvalue"] = value; cond.push(soloObject2);
                    }
                  }
              });
              tablesContext.TableControl(finalOne2); let rs4 = document.querySelectorAll(".getUserInp1");  let arr4 = Array.from(rs4); let userInp = {};
              arr4.map(el=>{let field = el.name; let value = el.value; userInp[field] = value;  });

              finalOne["request"] = finalOne2;  finalOne["name"] = userInp.name; finalOne["date"] = userInp.date; finalEnd["PPS1"] = finalOne;
              let keys = Object.keys(finalOne2); const Procent = keys.length * 100 / 13; const FinalProcent = Math.round(Procent);

              let confirm = document.getElementById("GetcheckBtn").checked;

              if(keys.length < 12){
                setOpacity("1"); setProcent(FinalProcent);
              }else if(userInp.name === "" || userInp.date === ""){
                  setOpacity("0"); setFinalErrorText("Мэдүүлэг хэсгийг бүрэн гүйцэд бөгөлнө үү"); setOpacity2("1");
              }else if(confirm === false){
                setOpacity("0"); setFinalErrorText("Та үнэн зөв бөгөлсөн бол CHECK дарна уу"); setOpacity2("1");
              }else if(cond.length > 0){
                setOpacity("0"); setFinalErrorText("Та шалгуур хангалтанд тэнцэхгүй байна"); setOpacity2("1");
                tablesContext.alertText('orange', "Та шалгуур хангалтанд тэнцэхгүй байна", true );
                setTimeout(()=>{  history.push('/');  },4000);
              }else{
                setOpacity("0"); setOpacity2("0");setSpnBtn(true);
                if(props.initialData){
                  await axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization: props.token}}).then((res)=>{ 
                    setSpnBtn(false); scroll.scrollTo(0); tablesContext.StyleComp("-100%", "0%", "100%","200%","300%","400%"); tablesContext.alertText('green', "Амжилттай", true ); 
                     })
                    .catch((err)=>{setSpnBtn(false); tablesContext.alertText('orange', "Алдаа гарлаа", true );console.log(err, "err");});
                }else{
                  axios.post("pps-request", finalEnd, {headers: { Authorization:AccessToken()} })
                  .then((res)=>{ localStorage.setItem("tableId", res.data.data.id); tablesContext.TableIdControl(res.data.data.id); scroll.scrollTo(0); tablesContext.StyleComp("-100%", "0%", "100%","200%","300%","400%"); tablesContext.alertText('green', "Амжилттай", true ); setSpnBtn(false);
                  }).catch((err)=>{ setSpnBtn(false); setFinalErrorText("Алдаа гарлаа");  setOpacity2("1"); });
                }
              
            }
            console.log(finalEnd, "final end");
      }

    return (
        <Component1 className="container" >
          <div className="boxShadow">
                <div className="rowHeader">
                    <div className="boldTitle">ХАВСРАЛТ 2 А.</div>
                    <div className="italicTitle">ХҮСНЭГТ 1. ХОРИГЛОСОН ҮЙЛ АЖИЛЛАГААНЫ ЖАГСААЛТ</div>
                </div>
              <div className="formTwoParent ">
                <div className="headerPar">
                    <div className="row" >
                    <div className="head1 col-md-9 col-sm-5 col-5">Шалгуур</div>
                    <div className="head2 col-md-1 col-sm-3 col-3">Хамаарахгүй</div>
                    <div className="head2 col-md-1 col-sm-2 col-2">Тийм</div>
                    <div className="head2 col-md-1 col-sm-2 col-2">Үгүй</div>
                    </div>
                </div>
                {props.initialData?  initialData.map((el, i)=>{
                    return(
                      <div className="headerParchild" key={i}>
                          <div className="row" >
                          <div className="number col-md-1 col-sm-1 col-1">{`${i + 1}`}</div>
                          <div className="texts col-md-8 col-sm-4 col-4">{el.name}</div>
                          <div className="radios col-md-1 col-sm-3 col-3"><input onChange={radioChange} className={`getinput22 inpTest3`} id={el.id}  type="radio" name={i + 1} checked={el.rvalue === "unconcern" ? true: false} value="unconcern"/></div>
                          <div className="radios col-md-1 col-sm-2 col-2"><input onChange={radioChange} className={`getinput22 inpTest3`} id={el.id} type="radio" name={i + 1} checked={el.rvalue === "true" ? true: false}  value="true"/> </div>
                          <div className="radios col-md-1 col-sm-2 col-2"><input onChange={radioChange} className={`getinput22 inpTest3`} id={el.id} type="radio" name={i + 1} checked={el.rvalue === "false" ? true: false}  value="false"/></div>
                      </div>
                    </div>
                    )
                }): dataOne.map((el, i)=>{
                  return(
                    <div className="headerParchild" key={i}>
                        <div className="row" >
                        <div className="number col-md-1 col-sm-1 col-1">{`${i + 1}`}</div>
                        <div className="texts col-md-8 col-sm-4 col-4">{el.name}</div>
                        <div className="radios col-md-1 col-sm-3 col-3"><input className={`getinput22 inpTest3`} type="radio" name={i + 1} value="unconcern"/></div>
                        <div className="radios col-md-1 col-sm-2 col-2"><input className={`getinput22 inpTest3`} type="radio" name={i + 1} value="true"/></div>
                        <div className="radios col-md-1 col-sm-2 col-2"><input className={`getinput22 inpTest3`} type="radio" name={i + 1} value="false"/></div>
                    </div>
                  </div>
                  )
              }) }
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
                                            <input type="text" value={Dname} onChange={changeHandle} className="getUserInp1 LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" />
                                            <label for="name"  className=" form__label">Бүтэн нэрээ оруулна уу</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="NextChild">
                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <div className="form__group">
                                                <input type="date" value={Ddate} onChange={changeHandleDate} max='3000-12-31' placeholder="өдөр-сар-жил" va className="getUserInp1 LoginInpName form__field" placeholder="Регистерийн дугаар" name="date" required />
                                                <label for="password" className="form__label">Өдөр-Сар-Он </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inpChild next">
                                        <div className="labels"><span> Та үнэн зөв бөгөлсөн эсэхээ баталгаажуулна уу : </span></div>
                                            <div className="name"> <BiPen />
                                                <div className="form__group">
                                                    <input id="GetcheckBtn" className="checkBtn" type="checkbox" name="check" />
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                            <NextBtn onClick={clickHandles} style={spnBtn===false? { width:"40%" }:{ width:"10%" }} className="SubmitButton" type="button">{spnBtn===false?(<> Дараагийн хуудас <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></> ): <img src="/gif1.gif" alt="spin" />  }</NextBtn>
                        </div>
              </div>
             </div>
            </div>
        </Component1>
    )
}

export default TableOne

const dataOne = [
  {  name: "Цэрэг армийн ямар нэг зэвсэг" },
  {
      name: "Зэрлэг амьтан, ургамлын ховордсон төрөл зүйлийг олон улсын хэмжээнд худалдаалах тухай конвенц (CITES)-ийн хүрээнд хориглодог ан амьтан, ургамлын худалдаа"
  },
  {
      name: "Байгаль, хүрээлэн буй орчинд генийн өөрчлөлтөд орсон организмуудыг гаргах"
  },
  {
      name: "Хориглосон пестицид, хербицидийн үйлдвэрлэл, нийлүүлэлт, худалдаа"
  },
  {
      name: "Далай тэнгист тороор загас барих"
  },
  {
      name: "Цацраг идэвхт бүтээгдэхүүнүүд"
  },
  {
      name: "Аюултай хог хаягдлын хадгалалт, боловсруулалт, зайлуулалт"
  },
  {
      name: "Хлорфторт нүүрстөрөгчид, галлон болон Монреалийн протоколын хүрээнд зохицуулагддаг бусад бодисууд агуулсан тоног төхөөрөмж, хэрэгслийн үйлдвэрлэл"
  },
  {
      name: "Олон хлорт бефенилиудын үзүүлэх нөлөө 0.005 %-аас хэтэрсэн агууламж бүхий цахилгаан хэрэгсэл, тоног төхөөрөмжийн үйлдвэрлэл"
  },
  {
      name: "Шөрмөсөн чулуу агуулсан бүтээгдэхүүний үйлдвэрлэл"
  },
  {
      name: "Цөмийн реакторууд, тэдгээрийн хэсгүүд"
  },
  {
      name: "Тамхи (үйлдвэрлэлийн бус ба үйлдвэрлэлийн); Тамхины хатаасан навч боловсруулах машин"
  },
]


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
                            // display:none;
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

                
            }
            .headerPar{
              background-color: rgba(0, 51, 102,0.9);
              color:white;
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              font-size:14px;
              font-weight:500;
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
              .number{
                font-weight:500;
                text-align:center;
                border-right:1px solid rgba(0,0,0,0.4);
                padding-top: 10px;
                padding-bottom: 10px;
              }
              .texts{
                font-weight:500;
                text-align:start;
                padding-top: 8px;
                padding-bottom: 8px;
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


