import React, {useState, useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import TableSixDetails from './deitals/tableSixDetail'
import TableSixDetails2 from './deitals/tableSixDetail2'
import { Link, animateScroll as scroll } from "react-scroll";
import styled from 'styled-components'
import { fontFamily, textColor, ColorRgb, Color,fontSize,NextBtn } from '../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {BiPen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import HelperContext from '../../../context/HelperContext'
import AccessToken from '../../../context/accessToken'
import axios from '../../../axiosbase'

const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function TableSix(props) {
    const history = useHistory();
    const [ spnBtn, setSpnBtn ] = useState(false);
    const helperContext = useContext(HelperContext);
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

    const clickHandles = () => {
        let finalOne = {};
        let finalEnd = {};
        let rs2 = document.querySelectorAll(".GetItemAdd66");
        let arr2 = Array.from(rs2);
        let finalOne2 = [];

        let tableCondition1 = [];
        arr2.map((el,i)=>{
            const Lala = {}
            let rs2 = document.querySelectorAll(`.PAS${i + 1}`);
            let arr23 = Array.from(rs2);
            
            arr23.map((el,i)=>{
                if(el.value !== ""){
                    let field = el.name;
                    let value = el.value;
                    if(props.initialName){
                        Lala["id"] = el.id;
                    }
                    Lala[field] = value;
                }else{
                    let field = el.name;
                    if(props.initialName){
                        Lala["id"] = el.id;
                    }
                    Lala[field] = null;
                }
            });
              finalOne2.push(Lala);
              tableCondition1.push(Lala);
        });
        let keys1 = Object.keys(tableCondition1[0]);


        let rs22 = document.querySelectorAll(".GetItemAdd666");
        let arr22 = Array.from(rs22);
        let finalOne22 = [];
        let tableCondition2 = [];
        arr22.map((el,i)=>{
            const Lala = {}
            let rs2 = document.querySelectorAll(`.APSA${i + 1}`);
            let arr23 = Array.from(rs2);
            arr23.map((el,i)=>{
                if(el.value !== ""){
                    let field = el.name;
                    let value = el.value;
                    if(props.initialName){
                        Lala["id"] = el.id;
                    }
                    Lala[field] = value;
                }else{
                    let field = el.name;
                    if(props.initialName){
                        Lala["id"] = el.id;
                    }
                    Lala[field] = null;
                }
            });
            finalOne22.push(Lala);
            tableCondition2.push(Lala);
        });

        let keys2 = Object.keys(tableCondition2[0]);
        let rs4 = document.querySelectorAll(".getUserInp2");
        let arr4 = Array.from(rs4);
        let userInp = {};

        let confirm = document.getElementById("GetcheckBtn55").checked;

        arr4.map(element=>{
            let field = element.name;
            let value = element.value;
            userInp[field] = value;
        });

        finalOne["requestOne"] = finalOne2;
        finalOne["requestTwo"] = finalOne22;
        finalOne["name"] = userInp.name;
        finalOne["date"] = userInp.date;
        // finalOne["signature"] = trimmedDataURL;
        finalEnd["PPS6"] = finalOne;

        if(keys1.length < 8 || keys2.length < 8){
            setFinalErrorText("?????????????? ???????????????? ???????????? ?????????????? ????");
            setOpacity2("1");
        }else if(userInp.name === "" || userInp.date === ""){
            setFinalErrorText("???????????? ???????????????????? ???????????????? ???????????????? ?????????????? ????");
            setOpacity2("1");
        }else if(confirm === false){
            setFinalErrorText("???? ???????? ?????? ???????????????? ?????? CHECK ?????????? ????");
            setOpacity2("1");
        }else{
            setSpnBtn(true);
            setOpacity2("0");
            if(props.initialName){
                axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization: props.token}}).then((res)=>{ 
                    helperContext.alertText('green', '?????????????????? ????????????????????????', true); history.push("/"); setSpnBtn(false);
                }).catch((err)=>{console.log(err, " ress"); helperContext.alertText('orange', '?????????? ????????????', true); setSpnBtn(false);});
            }else{
                axios.put(`pps-request/${helperContext.tableId}`, finalEnd, {headers:{ Authorization:AccessToken()}}).then((res)=>{
                    helperContext.alertText('green', '?????????????????? ????????????????????????', true); history.push("/"); setSpnBtn(false);
                }).catch((err)=>{ helperContext.alertText('orange', '?????????? ????????????', true);setSpnBtn(false);});
            }
            
        }
    }

    return (
        <Component3 className="container">
            {props.initialName? <> <TableSixDetails initialData={props.initialData.requestOne} />
                        <TableSixDetails2 initialData={props.initialData.requestTwo} /></> : 
            <> <TableSixDetails initialData={null} />
               <TableSixDetails2 initialData={null} /></>
            }
            
            <div className="UserRequestPar">
                        <div className="Title">???????????? ???????????????????? ???????????????? :</div>
                        <div className="description">????/?????? ???????????? ?????????????? ?????????? ???????????????? ???? ???????? ?????? ?????????????? ???????????? ???????????? ???????????? ??????????, ?????????? ???????????????? ?????????? ???? ???????????????????? ???????????????????? ???????????????? ???????????????? ?????????? ???????????????????? ???????????????????? ??????????????, ???????????? ???????????? ???????????????? ?????????? ?????????????? ???????????? ???????????????? ??????????. </div>
                        <div className="formOneParent">
                            <div className="inputPar">
                                <div className="inpChild">
                                    <div className="labels"><span>???????????????? ???????????????????? ?????? :</span> </div>
                                    <div className="name"> <FiUserCheck />
                                        <div className="form__group">
                                            {props.initialName ? <input type="input" value={Dname} onChange={changeNameHandle} className="getUserInp2 LoginInpName form__field" placeholder="???? ?????????? ??????" name="name" required />
                                                               : <input type="input" className="getUserInp2 LoginInpName form__field" placeholder="???? ?????????? ??????" name="name" required />
                                            }
                                            
                                            <label htmlFor="name" className=" form__label">?????????? ?????????? ?????????????? ????</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="NextChild">
                                   
                                    <div className="inpChild next">
                                        <div className="labels"><span> ?????????? :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <div className="form__group">
                                            {props.initialName ? <input type="date" value={Ddate} onChange={changeDateHandle} max={Currentdate} placeholder="????????-??????-??????" className="getUserInp2 LoginInpName form__field" placeholder="?????????????????????? ????????????" name="date" required />
                                                                :<input type="date" max={Currentdate} placeholder="????????-??????-??????" className="getUserInp2 LoginInpName form__field" placeholder="?????????????????????? ????????????" name="date" required />         
                                            }
                                                
                                                <label htmlFor="password" className="form__label">????????-??????-???? </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inpChild next">
                                        <div className="labels"><span> ???? ???????? ?????? ???????????????? ???????????? ???????????????????????????? ???? : </span></div>
                                            <div className="name"> <BiPen />
                                                <div className="form__group">
                                                    {/* <div className="SignBtn" onClick={openModal} > ?????????? </div> */}
                                                    <input id="GetcheckBtn55" checked={props.initialName?true:null} className="checkBtn" type="checkbox" name="check" />
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                            <NextBtn id="myInput" onClick={clickHandles} style={spnBtn===false? { width:"40%" }:{ width:"10%" }}  className="SubmitButton" type="button">{spnBtn===false?(<>????????????<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></>):<img src="/gif1.gif" alt="spin" />} </NextBtn>
                        </div>
            </div>
        </Component3>
    )
}

export default TableSix


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

           .modalPar{
               padding:5px 5px;
              .Canvass{
                  border:1px solid rgba(${ColorRgb},0.5);
              }
               .BtnPar{
                  padding:0px 10px;
                  margin:20px 0px;
                  display:flex;
                  flex-direction:row;
                  align-items:center;
                  justify-content:space-between;
                  button{
                      font-weight:500;
                      color:rgba(${textColor},0.9);
                      cursor:pointer;
                      border-style:none;
                      border-radius:4px;
                      padding:6px 14px;
                      background-color:white;
                      box-shadow:1px 1px 8px -2px;
                  }
               }
           }
           .SingatureImg{
                margin:10px 0px;
                border:1px solid rgba(${ColorRgb},0.3);
                height:100%;
                width:420px;
                object-fit:cover;
           }
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
                        border-bottom: 1px solid rgba(${ColorRgb},0.2);
                        border-right: 1px solid rgba(${ColorRgb},0.2);
                        border-left: 1px solid rgba(${ColorRgb},0.2);
                        border-top: 1px solid rgba(${ColorRgb},0.2);
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
