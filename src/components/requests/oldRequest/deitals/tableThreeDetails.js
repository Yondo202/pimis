import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { textColor, ColorRgb,InputStyle } from '../../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {GoCalendar,GoMail} from 'react-icons/go'
import {GiScales} from 'react-icons/gi'
import {IoIosAddCircleOutline} from 'react-icons/io'

const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function TableThreeDetails(props) {
    const initialList = [{id: 1}];
    const [ initialData, setInitialData ] = useState([]);
    const [ nullInf, setNullInf ] = useState(true);

    const AddHandle = ()=>{
        const list = initialData.concat( {id: 1});
        setInitialData(list);
    }

    useEffect(() => {
        if(props.initialData){
            setInitialData(props.initialData);
        }else{
            setInitialData(initialList);
        }
    }, [props.initialData]);

    const changeDateHandle = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{
            if(el.id.toString() === event.target.id){  el["pdate"] = event.target.value }
            finalData.push(el)
        })
        setInitialData(finalData);
    }
    
    const changeDateHandle2 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{
            if(el.id.toString() === event.target.id){  el["issue"] = event.target.value }
            finalData.push(el)
        })
        setInitialData(finalData);
    }

    const changeDateHandle3 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{
            if(el.id.toString() === event.target.id){  el["stepdate"] = event.target.value }
            finalData.push(el)
        })
        setInitialData(finalData);
    }
    const changeDateHandle4 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{
            if(el.id.toString() === event.target.id){  el["vote"] = event.target.value }
            finalData.push(el)
        })
        setInitialData(finalData);
    }

    const nullHandle = (event) =>{
        if(event.target.checked === true){setNullInf(false); }else{ setNullInf(true); }
    }

    return (
        <Component3Detail>
            <div className="rowHeader">
                <div className="boldTitle">Хавсралт 2В</div>
                <div className="italicTitle">ХҮСНЭГТ 3. ҮЙЛДВЭРЛЭГЧИЙН БАЙГАЛЬ ОРЧИН, НИЙГМИЙН УДИРДЛАГЫН ГҮЙЦЭТГЭЛИЙН ТАЛААРХ МЭДЭЭЛЛИЙН ТОВЧООН</div>
            </div>
            {props.na3===1? (<div className={`GetItemAdd33 DetailPar`} > <div className="topTitle"> <div className="Title"> 1 . Торгууль / Шийтгэл / Санал гомдлууд :</div> <div className="null">  Байхгүй:
                                <input checked={true} id="GetcheckBtnn3" className="GetcheckBtnn3" type="checkbox" name="na" />
                               </div>  </div>
                             </div>) : null  }
            {props.initialData? (initialData.map((el,i)=>{
                return(
                    <div id={i}  className={nullInf===true?`GetItemAdd33 DetailPar`:`DetailPar`} key={i}>
                        <div className="topTitle">
                            <div className="Title"> {i + 1} . Торгууль / Шийтгэл / Санал гомдлууд :</div>
                            <div style={{display:`none`}} className="null">
                                Байхгүй:
                                <input id="GetcheckBtnn3" className="GetcheckBtnn3" type="checkbox" name="na" />
                            </div>
                        </div>
                    <div className="formOneParent">
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>Огноо :</span> </div>
                                <div className="name"> <GoCalendar />
                                     <InputStyle className="newInp">
                                            <input type="date" onChange={changeDateHandle} id={el.id} value={el.pdate} max={Currentdate} className={`PPPS${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="pdate" required />
                                            <div className="line"></div>
                                    </InputStyle>
                                   
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>Асуудлын мөн чанар :</span> </div>
                                <div className="name"> <GiScales />
                                     <InputStyle className="newInp">
                                            <input type="text" onChange={changeDateHandle2} value={el.issue} id={el.id} className={`PPPS${i + 1}  userInp LoginInpName form__field`} placeholder="мөн чанар..." name="issue" required />
                                            <div className="line"></div>
                                    </InputStyle>
                                </div>
                            </div>
                        </div>
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>Авсан ба авах арга хэмжээ (огноо тус бүрээр) :</span> </div>
                                <div className="name"> <FiUserCheck />
                                    <InputStyle className="newInp">
                                            <input type="date" max={Currentdate} id={el.id} onChange={changeDateHandle3} value={el.stepdate} className={`PPPS${i + 1} userInp LoginInpName form__field`} placeholder="огноо тус бүрээр" name="stepdate" required />
                                            <div className="line"></div>
                                    </InputStyle>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>Санал :</span> </div>
                                <div className="name"> <GoMail />
                                    <InputStyle className="newInp">
                                        <input type="input" id={el.id} value={el.vote} onChange={changeDateHandle4}  className={`PPPS${i + 1} userInp LoginInpName form__field`} placeholder="Санал..." name="vote" required />
                                        <div className="line"></div>
                                    </InputStyle>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
                )
            })) : (initialData.map((el,i)=>{
                return(
                    <div id={i} className={nullInf===true?`GetItemAdd33 DetailPar`:`DetailPar`} key={i}>
                        <div className="topTitle">
                            <div className="Title"> {i + 1} . Торгууль / Шийтгэл / Санал гомдлууд :</div>
                            <div className="null">
                                Байхгүй:
                                <input onChange={nullHandle} className="GetcheckBtnn3" id="GetcheckBtnn3" type="checkbox" name="na" />
                            </div>
                        </div>

                    {nullInf&&(<div className="formOneParent">
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>Огноо :</span> </div>
                                <div className="name"> <GoCalendar />
                                    <InputStyle className="newInp">
                                            <input type="date"  max={Currentdate} className={`PPPS${i + 1} userInp LoginInpName form__field`} name="pdate" required />
                                            <div className="line"></div>
                                    </InputStyle>

                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>Асуудлын мөн чанар :</span> </div>
                                <div className="name"> <GiScales />
                                     <InputStyle className="newInp">
                                             <input type="input"  className={`PPPS${i + 1}  userInp LoginInpName form__field`} placeholder="мөн чанар..." name="issue" required />
                                            <div className="line"></div>
                                    </InputStyle>
                                </div>
                            </div>
                        </div>
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>Авсан ба авах арга хэмжээ (огноо тус бүрээр) :</span> </div>
                                <div className="name"> <FiUserCheck />
                                    <InputStyle className="newInp">
                                              <input type="date"  max={Currentdate} className={`PPPS${i + 1} userInp LoginInpName form__field`} placeholder="огноо тус бүрээр" name="stepdate" required />
                                            <div className="line"></div>
                                    </InputStyle>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>Санал :</span> </div>
                                <div className="name"> <GoMail />
                                    <InputStyle className="newInp">
                                              <input type="input" className={`PPPS${i + 1} userInp LoginInpName form__field`} placeholder="Санал..." name="vote" required />
                                            <div className="line"></div>
                                    </InputStyle>
                                </div>
                            </div>
                        </div>
                    </div> )} 
                 </div>
                )
            })) }
            {props.initialData ? null : nullInf&&<div className="AddItemBtn"> <IoIosAddCircleOutline onClick={AddHandle} /> </div> }
            
        </Component3Detail>
    )
}

export default TableThreeDetails

const Component3Detail = styled.div`
    background-color:white;
    border-radius:6px;
    padding:15px 40px;
    transition:all 0.5s ease; 
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
    .AddItemBtn{
        text-align:end;
        padding:10px 10px;
        svg{
            border-radius:50%;
            cursor:pointer;
            font-size:34px;
            box-shadow:1px 1px 10px -3px;
            transition:all 0.4s ease;
            &:hover{
                box-shadow:1px 1px 14px -3px;
            }
        }
    }
    .DetailPar{
        background-color:white;
        margin-top:40px;
        transition:all 0.5s ease; 
        .topTitle{
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
            .Title{
                font-size:14px;  
                font-weight:500;
                margin-bottom:10px;
            }
            .null{
                display:flex;
                text-aling:center;
                font-size:14px;  
                font-weight:500;
                margin-bottom:10px;
                .GetcheckBtnn3{
                    margin-left:10px;
                    cursor:pointer;
                    width:22px;
                    height:22px;
                  }
            }
        }
        
        .description{
            margin-bottom:20px;
        }
        .formOneParent{
            border-top:1px solid rgba(${ColorRgb},0.4);
            border-radius:8px;
            flex-direction:column;
            align-items:flex;
            justify-content:center;
            .inputPar{
                display:flex;
                flex-direction:row;
                align-items:flex;
                justify-content:space-between;
                padding-top:0px;
                .inpChild{
                    margin:12px 0px;
                    display:flex;
                    flex-direction:column;
                    width:44%;
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
                    //  .name{
                    //  display:flex;
                    //  flex-direction:row;
                    //  align-items:flex-end;
                    //  justify-content:flex-end;
                    //  width:100%;
                    //  svg{
                    //    color:rgba(${ColorRgb},0.7);
                    //    font-size:28px;
                    //    margin-right:15px;
                    //    margin-bottom:5px;
                    //  }
                    //  .form__group{
                    //   position:relative;
                    //   padding: 15px 0 0;
                    //   margin-top: 0px;
                    //   width: 100%;
                    //      .form__field{
                    //          font-family: inherit;
                    //          width: 100%;
                    //          border: 0;
                    //          border-radius:6px;
                    //          border-bottom: 1px solid rgba(${ColorRgb},0.2);
                    //          border-right: 1px solid rgba(${ColorRgb},0.2);
                    //          border-left: 1px solid rgba(${ColorRgb},0.2);
                    //          border-top: 1px solid rgba(${ColorRgb},0.2);
                    //          outline: 0;
                    //          font-size: 1rem;
                    //          color: black;
                    //          padding: 7px 0;
                    //          padding-left:10px;
                    //          font-size: 0.9rem;
                    //          background: transparent;
                    //          transition: border-color 0.2s;
                    //          transition:all 0.3s ease;
                    //          position: relative;
                    //          z-index: 1;
                    //          &::placeholder {
                    //            color: transparent;
                    //          }
                    //          &:placeholder-shown ~ .form__label {
                    //            font-size: 0.9rem;
                    //            cursor: text;
                    //            top: 24px;
                    //          }
                    //      }
                        
                    //      .form__label {
                    //          position: absolute;
                    //          top: 0;
                    //          display: block;
                    //          transition: 0.2s;
                    //          font-size: 0rem;
                    //          color: gray;
                    //          z-index: 0;
                    //          padding:0px 10px;
                    //          // background-color:black;
                    //        }
                           
                    //        .form__field{
                    //            &:focus {
                    //              ~ .form__label {
                    //                position: absolute;
                    //                top: 0;
                    //                display: block;
                    //                transition: 0.3s;
                    //                font-size: 0.8rem;
                    //                color: #11998e;
                    //                font-weight:400;    
                    //              }
                    //              border-right:none;
                    //              border-left:none;
                    //              border-top:none;
                    //              padding-bottom: 7px;
                    //              font-weight: 400;
                    //              border-width: 1px;
                    //              border-image: linear-gradient(to right, #11998e, #38ef7d);
                    //              border-image-slice: 1;
                    //            }
                    //        }
                    //        /* reset input */
                    //        .form__field{
                    //          &:required,&:invalid { box-shadow:none; }
                    //        }
                    //  }
                     
                   }
                }
             }
        }

       
      
    }
    @media only screen and (max-width:786px){
        padding: 15px 15px;
        .DetailPar{
            .formOneParent{
                .inputPar{
                    flex-direction: column;
                    justify-content: center;
                    .inpChild{
                        width:100%;
                    }
                }
            }
        }
    }


`