import React, { useState,useContext, useEffect } from 'react'
import styled from 'styled-components'
import { textColor, ColorRgb } from '../../../theme';
import {GoCalendar} from 'react-icons/go'
import {VscAccount,VscFoldDown,VscCloudUpload,VscCloudDownload,VscChecklist,VscOpenPreview} from 'react-icons/vsc'
import {IoIosAddCircleOutline} from 'react-icons/io'

const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function TableFiveDetails(props) {
    const initialList = [{id: 1}];
    const [ addItem, setAddItem ] = useState(initialList);
    const [ initialData, setInitialData ] = useState([]);
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
    
    const changeHandle1 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{ if(el.id.toString() === event.target.id){  el["issue"] = event.target.value };finalData.push(el) })
        setInitialData(finalData);
    }

    const changeHandle2 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{ if(el.id.toString() === event.target.id){  el["reduce"] = event.target.value };finalData.push(el) })
        setInitialData(finalData);
    }
    const changeHandle3 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{ if(el.id.toString() === event.target.id){  el["standard_mgl"] = event.target.value };finalData.push(el) })
        setInitialData(finalData);
    }
    const changeHandle4 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{ if(el.id.toString() === event.target.id){  el["standard_world"] = event.target.value };finalData.push(el) })
        setInitialData(finalData);
    }
    const changeHandle5 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{ if(el.id.toString() === event.target.id){  el["reduce_cost"] = event.target.value };finalData.push(el) })
        setInitialData(finalData);
    }
    const changeHandle6 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{ if(el.id.toString() === event.target.id){  el["hostname"] = event.target.value };finalData.push(el) })
        setInitialData(finalData);
    }
    const changeHandle7 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{ if(el.id.toString() === event.target.id){  el["startdate"] = event.target.value };finalData.push(el) })
        setInitialData(finalData);
    }
    const changeHandle8 = (event) =>{
        const finalData = []
        props.initialData.map((el,i)=>{ if(el.id.toString() === event.target.id){  el["enddate"] = event.target.value };finalData.push(el) })
        setInitialData(finalData);
    }


    return (
        <Component3Detail>
            <div className="rowHeader">
                <div className="boldTitle">???????????????? 2 ??.</div>
                <div className="italicTitle">?????????????? 5. ?????????????? ??????????, ???????????????? ???????????????????????? ?????????????????????????? ????????????</div>
            </div>

            {props.initialData?( initialData.map((el,i)=>{
                return(
                    <div id={i}  className="GetItemAdd55 DetailPar" key={i}>
                    <div className="Title"> {i + 1} . ???????????? ???????????????????????? ???? ?????? :</div>
                    <div className="formOneParent">
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>?????????????? :</span> </div>
                                <div className="name"> <VscOpenPreview />
                                    <div className="form__group">
                                        <input type="text" id={el.id} onChange={changeHandle1} value={el.issue} className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="issue" required />
                                        <label htmlFor="name" className=" form__label">??????????????</label>
                                    </div>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>???????????????????? ?????????????????? ???????? ???????????? :</span> </div>
                                <div className="name"> <VscChecklist />
                                    <div className="form__group">
                                        <input type="input" id={el.id} onChange={changeHandle2} value={el.reduce} className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="reduce" required />
                                        <label htmlFor="name" className=" form__label">???????????????????? ?????????????????? ???????? ????????????</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>?????????????????? ?????????????????????? :</span> </div>
                                <div className="name"> <VscCloudDownload />
                                    <div className="form__group">
                                        <input type="input" id={el.id} onChange={changeHandle3} value={el.standard_mgl} className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="standard_mgl" required />
                                        <label htmlFor="name" className=" form__label">???????????? ??????</label>
                                    </div>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>?????????????????? ?????????????????????? :</span> </div>
                                <div className="name"> <VscCloudUpload />
                                    <div className="form__group">
                                        <input type="input" id={el.id} onChange={changeHandle4} value={el.standard_world} className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="standard_world" required />
                                        <label htmlFor="name" className=" form__label">?????????????? ????????</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{borderStyle:"none"}} className="formOneParent">
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>???????????????????? ?????????????????? ?????? ?????????????????????? ???????????? :</span> </div>
                                <div className="name">
                                     {/* <VscFoldDown /> */}
                                     <div className="svg">???</div>
                                    <div className="form__group">
                                        <input style={{textAlign:`right`,paddingRight:15}} type="number" style={{textAlign:`right`}} id={el.id} onChange={changeHandle5} value={el.reduce_cost} className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="reduce_cost" required />
                                        <label htmlFor="name" className=" form__label">?????? ?????????????????????? ????????????</label>
                                    </div>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>???????????????? ???????? :</span> </div>
                                <div className="name"> <VscAccount />
                                    <div className="form__group">
                                        <input type="input" id={el.id} onChange={changeHandle6} value={el.hostname}  className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="hostname" required />
                                        <label htmlFor="name" className=" form__label">???????????????? ????????</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>?????????? ?????????????? :</span> </div>
                                <div className="name"> <GoCalendar />
                                    <div className="form__group">
                                        <input type="date" id={el.id} onChange={changeHandle7} value={el.startdate}  max={Currentdate} className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="startdate" required />
                                        <label htmlFor="name"  className=" form__label">????-??????-????????</label>
                                    </div>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>???????????? ?????????????? :</span> </div>
                                <div className="name"> <GoCalendar />
                                    <div className="form__group">
                                        <input type="date" id={el.id} max={Currentdate} onChange={changeHandle8} value={el.enddate}   className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="enddate" required />
                                        <label htmlFor="name" className=" form__label">????-??????-????????</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
                )
            })) : (initialData.map((el,i)=>{
                    return(
                        <div id={i}  className="GetItemAdd55 DetailPar" key={i}>
                        <div className="Title"> {i + 1} . ???????????? ???????????????????????? ???? ?????? :</div>
                        <div className="formOneParent">
                            <div className="inputPar">
                                <div className="inpChild">
                                    <div className="labels"><span>?????????????? :</span> </div>
                                    <div className="name"> <VscOpenPreview />
                                        <div className="form__group">
                                            <input type="text" className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="issue" required />
                                            <label htmlFor="name" className=" form__label">??????????????</label>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="inpChild">
                                    <div className="labels"><span>???????????????????? ?????????????????? ???????? ???????????? :</span> </div>
                                    <div className="name"> <VscChecklist />
                                        <div className="form__group">
                                            <input type="input" className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="reduce" required />
                                            <label htmlFor="name" className=" form__label">???????????????????? ?????????????????? ???????? ????????????</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inputPar">
                                <div className="inpChild">
                                    <div className="labels"><span>?????????????????? ?????????????????????? :</span> </div>
                                    <div className="name"> <VscCloudDownload />
                                        <div className="form__group">
                                            <input type="input" className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="standard_mgl" required />
                                            <label htmlFor="name" className=" form__label">???????????? ??????</label>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="inpChild">
                                    <div className="labels"><span>?????????????????? ?????????????????????? :</span> </div>
                                    <div className="name"> <VscCloudUpload />
                                        <div className="form__group">
                                            <input type="input" className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="standard_world" required />
                                            <label htmlFor="name" className=" form__label">?????????????? ????????</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div style={{borderStyle:"none"}} className="formOneParent">
                            <div className="inputPar">
                                <div className="inpChild">
                                    <div  className="labels"><span>???????????????????? ?????????????????? ?????? ?????????????????????? ???????????? :</span> </div>
                                    <div className="name">
                                         {/* <VscFoldDown /> */}
                                         <div className="svg">???</div>
                                        <div className="form__group">
                                            <input style={{textAlign:`right`,paddingRight:15}} type="number" className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="reduce_cost" required />
                                            <label htmlFor="name" className=" form__label">?????? ?????????????????????? ????????????</label>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="inpChild">
                                    <div className="labels"><span>???????????????? ???????? :</span> </div>
                                    <div className="name"> <VscAccount />
                                        <div className="form__group">
                                            <input type="input" className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="hostname" required />
                                            <label htmlFor="name" className=" form__label">???????????????? ????????</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inputPar">
                                <div className="inpChild">
                                    <div className="labels"><span>?????????? ?????????????? :</span> </div>
                                    <div className="name"> <GoCalendar />
                                        <div className="form__group">
                                            <input type="date" max={Currentdate} className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="startdate" required />
                                            <label htmlFor="name"  className=" form__label">????-??????-????????</label>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="inpChild">
                                    <div className="labels"><span>???????????? ?????????????? :</span> </div>
                                    <div className="name"> <GoCalendar />
                                        <div className="form__group">
                                            <input type="date" max={Currentdate}  className={`PASS${i + 1} userInp LoginInpName form__field`} placeholder="???? ?????????? ??????" name="enddate" required />
                                            <label htmlFor="name" className=" form__label">????-??????-????????</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                    )
                })
            )}
            
            {!props.initialData&&<div className="AddItemBtn"><IoIosAddCircleOutline onClick={AddHandle} /></div>} 

            {/* <button >hahahaha</button> */}


        </Component3Detail>
    )
}

export default TableFiveDetails

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
        .Title{
            font-size:16px;  
            font-weight:500;
            margin-bottom:10px;
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
                     .svg{
                        color:rgba(${ColorRgb},0.7);
                        font-size:24px;
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