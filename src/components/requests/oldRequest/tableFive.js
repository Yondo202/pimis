import React, { useState, useEffect, useContext } from 'react';
import TableFiveDetails from './deitals/tableFiveDetail';
import TableFiveDetails2 from './deitals/tableFiveDetail2';
import { Link, animateScroll as scroll } from "react-scroll";
import styled from 'styled-components';
import { fontFamily, textColor, ColorRgb, fontSize, NextBtn } from '../../theme';
import { FiUserCheck } from 'react-icons/fi';
import { MdDateRange } from 'react-icons/md';
import { BiPen } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import HelperContext from '../../../context/HelperContext';
import axios from '../../../axiosbase';
import AccessToken from '../../../context/accessToken';

const today = new Date(); const month = (today.getMonth() + 1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length === 1 ? '0' + month : month) + '-' + (day.toString().length === 1 ? '0' + day : day);

function TableFive(props) {
    const helperContext = useContext(HelperContext);
    const [spnBtn, setSpnBtn] = useState(false);
    const [opacity2, setOpacity2] = useState("0");
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [Dname, setDname] = useState(null);
    const [Ddate, setDdate] = useState(null);
    const changeNameHandle = (event) => { setDname(event.target.value); };
    const changeDateHandle = (event) => { setDdate(event.target.value); };


    useEffect(() => {
        if (props.initialName) {
            setDname(props.initialName);
            setDdate(props.initialDate);
        }
    }, [props.initialName]);

    const clickHandles = () => {
        let finalOne = {}; let finalEnd = {}; let rs2 = document.querySelectorAll(".GetItemAdd55"); let arr2 = Array.from(rs2); let finalOne2 = []; let tableCondition1 = [];
        arr2.forEach((el, i) => {
            const Lala = {}
            let rs2 = document.querySelectorAll(`.PASS${i + 1}`);
            let arr23 = Array.from(rs2);
            arr23.forEach((el, i) => {
                if (el.value !== "") {
                    let field = el.name; let value = el.value; Lala["id"] = el.id; Lala[field] = value;
                } else {
                    let field = el.name; Lala["id"] = el.id; Lala[field] = null;
                }
            }); tableCondition1.push(Lala); finalOne2.push(Lala);
        });
        let keys1 = Object.keys(tableCondition1[0]);

        let tableCondition2 = []; let rs22 = document.querySelectorAll(".GetItemAdd555"); let arr22 = Array.from(rs22); let finalOne22 = [];

        arr22.forEach((el, i) => {
            const Lala = {}
            let rs2 = document.querySelectorAll(`.passa${i + 1}`);
            let arr23 = Array.from(rs2);
            arr23.forEach((el, i) => {
                if (el.value !== "") {
                    let field = el.name; let value = el.value; Lala["id"] = el.id; Lala[field] = value;
                } else {
                    let field = el.name; Lala["id"] = el.id; Lala[field] = null;
                }
            });
            tableCondition2.push(Lala); finalOne22.push(Lala);
        });

        let keys2 = Object.keys(tableCondition2[0]);
        let rs4 = document.querySelectorAll(".getUserInp222"); let arr4 = Array.from(rs4); let userInp = {};
        arr4.forEach(el => { let field = el.name; let value = el.value; userInp[field] = value; });
        let confirm = document.getElementById("GetcheckBtn5").checked; console.log(confirm, "my confirm");

        finalOne["requestOne"] = finalOne2; finalOne["requestTwo"] = finalOne22; finalOne["name"] = userInp.name; finalOne["date"] = userInp.date; finalEnd["PPS5"] = finalOne;

        if (keys1.length < 8 || keys2.length < 8) {
            setFinalErrorText("?????????????? ???????????????? ???????????? ?????????????? ????"); setOpacity2("1");
        } else if (userInp.name === "" || userInp.date === "") {
            setFinalErrorText("???????????? ???????????????????? ???????????????? ???????????????? ?????????????? ????"); setOpacity2("1");
        } else if (confirm === false) {
            setFinalErrorText("???? ???????? ?????? ???????????????? ?????? CHECK ?????????? ????"); setOpacity2("1");
        } else {
            setOpacity2("0");
            setSpnBtn(true);
            if (Dname) {
                axios.put(`pps-request/${props.id}`, finalEnd, { headers: { Authorization: props.token } }).then((res) => { setSpnBtn(false); scroll.scrollTo(0); helperContext.alertText('green', '?????????????????? ????????????????????????', true); helperContext.StyleComp("-500%", "-400%", "-300%", "-200%", "-100%", "0%"); })
                    .catch((err) => { setSpnBtn(false); helperContext.alertText('orange', '?????????? ????????????', true); });

            } else {
                axios.put(`pps-request/${helperContext.tableId}`, finalEnd, { headers: { Authorization: AccessToken() } }).then((res) => {
                    setSpnBtn(false);
                    helperContext.alertText('green', '?????????????????? ????????????????????????', true); helperContext.StyleComp("-500%", "-400%", "-300%", "-200%", "-100%", "0%"); scroll.scrollTo(0);
                }).catch((err) => { setSpnBtn(false); helperContext.alertText('orange', '?????????? ????????????', true); });
            }

        }
    }

    return (
        <Component3 className="container">
            {Dname ? (
                <><TableFiveDetails initialData={props.initialData.requestOne} />
                    <TableFiveDetails2 initialData={props.initialData.requestTwo} /></>
            ) : <><TableFiveDetails initialData={null} />
                <TableFiveDetails2 initialData={null} /></>}

            <div className="UserRequestPar">
                <div className="Title">???????????? ???????????????????? ???????????????? :</div>
                <div className="description">????/?????? ???????????? ?????????????? ?????????? ???????????????? ???? ???????? ?????? ?????????????? ???????????? ???????????? ???????????? ??????????, ?????????? ???????????????? ?????????? ???? ???????????????????? ???????????????????? ???????????????? ???????????????? ?????????? ???????????????????? ???????????????????? ??????????????, ???????????? ???????????? ???????????????? ?????????? ?????????????? ???????????? ???????????????? ??????????. </div>
                <div className="formOneParent">
                    <div className="inputPar">
                        <div className="inpChild">
                            <div className="labels"><span>???????????????? ???????????????????? ?????? :</span> </div>
                            <div className="name"> <FiUserCheck />
                                <div className="form__group">
                                    {Dname ? <input type="input" value={Dname} onChange={changeNameHandle} className="getUserInp222 LoginInpName form__field" placeholder="???? ?????????? ??????" name="name" required />
                                        : <input type="input" className="getUserInp222 LoginInpName form__field" placeholder="???? ?????????? ??????" name="name" required />
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
                                        {Dname ? <input type="date" value={Ddate} onChange={changeDateHandle} max={Currentdate} placeholder="????????-??????-??????" className="getUserInp222 LoginInpName form__field" name="date" required />
                                            : <input type="date" max={Currentdate} placeholder="????????-??????-??????" className="getUserInp222 LoginInpName form__field" name="date" required />
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
                                        <input id="GetcheckBtn5" checked={Dname ? true : null} className="checkBtn" type="checkbox" name="check" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="buttonPar">
                    <div style={{ opacity: `${opacity2}` }} className="errtext">{FinalErrorText}</div>
                    <NextBtn id="myInput" onClick={clickHandles} style={spnBtn === false ? { width: "40%" } : { width: "10%" }} className="SubmitButton" type="button">{spnBtn === false ? (<>????????????<div className="flexchild"><AiOutlineSend /> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></>) : <img src="/gif1.gif" alt="spin" />} </NextBtn>
                </div>
            </div>
        </Component3>
    )
}

export default TableFive

const Component3 = styled.div`
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};
    margin-bottom:600px;
    font-size:${fontSize};
  


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
                display:flex;
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
