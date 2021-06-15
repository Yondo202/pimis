import React, {useState, useContext, useEffect} from 'react'
import TableThreeDetails from './deitals/tableThreeDetails'
import { animateScroll as scroll } from "react-scroll";
import styled from 'styled-components'
import { fontFamily, textColor, ColorRgb,fontSize,PrevBtn,InputStyle, NextBtn2 } from '../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {BsArrowRightShort} from 'react-icons/bs'
import {AiOutlineSend} from 'react-icons/ai'
import HelperContext from '../../../context/HelperContext'
import axios from '../../../axiosbase'
import AccessToken from '../../../context/accessToken'

const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function TableThree(props) {
    const helperContext = useContext(HelperContext);
    const [ spnBtn, setSpnBtn ] = useState(false);
    const [opacity2, setOpacity2] = useState("0");
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [Dname, setDname ] = useState(null);
    const [Ddate, setDdate] = useState(null);
    
    useEffect(()=>{
        if(props.initialName){
            setDname(props.initialName);
            setDdate(props.initialDate);
        }
    },[props.initialName]);

    const changeNameHandle = (event) =>{
        setDname(event.target.value);
    }
    const changeDateHandle = (event) =>{
        setDdate(event.target.value);
    }

    const clickHandles = (e) => {
        e.preventDefault();
        let finalOne = {};
        let finalEnd = {};
        let rs2 = document.querySelectorAll(".GetItemAdd33");
        let arr2 = Array.from(rs2);
        let finalOne2 = [];

        // const tableCondition = [];
        arr2.map((el,i)=>{
            const Lala = {}
            let rs2 = document.querySelectorAll(`.PPPS${i + 1}`);
            let arr23 = Array.from(rs2);
            arr23.map((el,i)=>{
                    let field = el.name;
                    let value = el.value;
                    if(props.initialName){
                        Lala["id"] = el.id;
                    }
                    Lala[field] = value;
            });
            finalOne2.push(Lala);
        });
        let confirmNull = document.getElementById("GetcheckBtnn3").checked;

        let rs4 = document.querySelectorAll(".getUserInp3");
        let arr4 = Array.from(rs4);
        let userInp = {};

        arr4.map(el=>{let field = el.name; let value = el.value; if(value===""){ el.classList += " red"; }else{  el.classList =- " red";  el.classList += " getUserInp3"; };  userInp[field] = value; });
        let confirm = document.getElementById("GetcheckBtn3").checked;

        if(confirmNull===false){
            if(finalOne2[0].pdate !== ""){
                finalOne["request"] = finalOne2;
                finalOne["na3"] = 2;
            }else{
                finalOne["na3"] = 1;
                finalOne["request"] = [];
            }
        }else{
            finalOne["na3"] = 1;
            finalOne["request"] = [];
        }
        
        finalOne["name"] = userInp.name; finalOne["date"] = userInp.date; finalEnd["PPS3"] = finalOne;

        console.log(finalEnd, "final");

        if(userInp.name === "" || userInp.date === ""){
            setOpacity2("1");
            setFinalErrorText("Хүсэлт гаргагчийн мэдүүлэг хэсэгийг бөгөлнө үү");
        }else if(confirm === false){
            setOpacity2("1");
            setFinalErrorText("Та үнэн зөв бөгөлсөн бол CHECK дарна уу");
        }else{
            setOpacity2("0");
            setSpnBtn(true);
            if(props.initialName){
                axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization: props.token}}).then((res)=>{
                    helperContext.alertText('green', "Амжилттай ", true); setSpnBtn(false);
                    helperContext.StyleComp("-300%", "-200%", "-100%", "0%", "100%","200%"); scroll.scrollTo(0); helperContext.reqMountFunc(3);
                  }).catch((err)=>{console.log(err.response.data.error.message); console.log(err, "err"); setSpnBtn(false); helperContext.alertText('orange', "Алдаа гарлаа", true);  });
            }else{
                axios.put(`pps-request/${helperContext.tableId}`, finalEnd, {headers:{ Authorization:AccessToken()}} ).then((res)=>{
                    setSpnBtn(false); helperContext.alertText('green', "Амжилттай хадаглалаа", true); helperContext.StyleComp("-300%", "-200%", "-100%", "0%", "100%","200%");scroll.scrollTo(0);helperContext.reqMountFunc(1);
                  }).catch((err)=>{ console.log(err.response.data.error.message); setSpnBtn(false); helperContext.alertText('orange', "Алдаа гарлаа", true);  });
            }
            
        }
    }

    return (
        <Component3 className="container">
            <form onSubmit={clickHandles}>
            {props.initialName? <TableThreeDetails na3={props.na3} initialData={props.initialData} />: <TableThreeDetails na3={props.na3} initialData={null} />} 
            <div className="UserRequestPar">
                        <div className="Title">Хүсэлт гаргагчийн мэдүүлэг :</div>
                        <div className="description">Би/Бид энэхүү маягтад өгсөн мэдээлэл нь үнэн зөв гэдгийг баталж байгаа бөгөөд худал, буруу мэдээлэл өгсөн нь санхүүгийн дэмжлэгийн шийдвэрт нөлөөлнө эсвэл санхүүгийн дэмжлэгийн шийдвэр, гэрээг цуцлах үндэслэл болно гэдгийг хүлээн зөвшөөрч байна. </div>
                        <div className="formOneParent">
                            <div className="inputPar">
                                <div className="inpChild">
                                    <div className="labels"><span>Мэдүүлэг бөглөгчийн нэр :</span> </div>
                                    <div className="name"> <FiUserCheck />
                                        <InputStyle className="newInp">
                                            {Dname? <input type="input" onChange={changeNameHandle} value={Dname} className="getUserInp3 LoginInpName form__field" placeholder="нэр..." name="name" />
                                            :<input type="input" className="getUserInp3 LoginInpName form__field" placeholder="нэр..." name="name" />  }
                                            <div className="line"></div>
                                        </InputStyle>
                                    </div>
                                </div>
                                
                                <div className="NextChild">
                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <InputStyle className="newInp">
                                                {Dname ?  <input type="date" onChange={changeDateHandle} value={Ddate} max={Currentdate} placeholder="өдөр-сар-жил" className="getUserInp3 LoginInpName form__field" name="date" />
                                                        : <input type="date" max={Currentdate} placeholder="өдөр-сар-жил" className="getUserInp3 LoginInpName form__field" name="date" /> }
                                                <div className="line"></div>
                                            </InputStyle>
                                        </div>
                                    </div>

                                    
                                    <div className="inpChild next">
                                        <div className="labels"><span> Та үнэн зөв бөгөлсөн эсэхээ баталгаажуулна уу : </span></div>
                                            <div className="name"> <BsArrowRightShort />
                                                <InputStyle className="newInp">
                                                    <input id="GetcheckBtn3"  checked={Dname !== null?true:null} className="checkBtn" type="checkbox" name="check" />
                                                </InputStyle>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                        <div className="buttonPar">
                           {props.initialName? (<PrevBtn id="myInput" onClick={()=> {helperContext.reqMountFunc(1); scroll.scrollTo(0); helperContext.StyleComp("-100%", "0%", "100%", "200%", "300%","400%"); }} className="SubmitButton" type="button"><div className="flexchild"><AiOutlineSend/></div>Өмнөх хуудас</PrevBtn>) : null } 
                            {/* <NextBtn onClick={clickHandles} style={spnBtn===false? { width:"40%" }:{ width:"10%" }} className="SubmitButton" type="button">{spnBtn===false?(<> Дараагийн хуудас <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></> ): <img src="/gif1.gif" alt="spin" />  }</NextBtn> */}
                            <NextBtn2>
                                <button  style={spnBtn===false? { width:"100%" }:{ width:"40%" }} className="SubmitButton" type="submit">{spnBtn===false?(<> Дараагийн хуудас <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></> ): <img src="/gif1.gif" alt="spin" />  }
                                </button>
                            </NextBtn2>
                        </div>
            </div>
            </form>
        </Component3>
    )
}

export default TableThree


const Component3 = styled.div`
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};
    margin-bottom:600px;
    font-size:${fontSize} !important;
  


    .UserRequestPar{
        box-shadow:1px 1px 10px -5px;
        border-radius:6px;
        background-color:white;
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
    }
    @media only screen and (max-width:786px){
        .UserRequestPar{
            .buttonPar{
                flex-direction:column;
                .SubmitButton {
                    width:100% !important;
                }
            }
            .inputPar{
                .NextChild{
                    flex-direction: column !important;
                    .next{
                        width:100%;
                    }
                }
            }
        }
    }

`
