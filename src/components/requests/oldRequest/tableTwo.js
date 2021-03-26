import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { animateScroll as scroll } from "react-scroll";
import { fontFamily, textColor, ColorRgb,fontSize,PrevBtn,NextBtn,InputStyle } from '../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {RiUpload2Line} from 'react-icons/ri'
import {BsArrowRightShort} from 'react-icons/bs'
import {AiOutlineSend} from 'react-icons/ai'
import axios from '../../../axiosbase'
import HelperContext from '../../../context/HelperContext'
import AccessToken from '../../../context/accessToken'


const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function TableTwo(props) {
    const helperContext  = useContext(HelperContext);
    const [ spnBtn, setSpnBtn ] = useState(false);
    const [ fileSave, setFileSave ] = useState([]);
    const [opacity2, setOpacity2] = useState("0");
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [ initialData, setInitialData ] = useState([]);
    const [ Dname, setDname ] = useState(null);
    const [Ddate, setDdate] = useState(null);

    useEffect(_=>{
        if(props.initialData){
            const finalData = []
            tableData.map((el,i)=>{
                        props.initialData.map((elem, index )=> {
                            if(i === index ){ el["name"] = elem.name; el["recentDate"] = elem.recentDate;  el["getDate"] = elem.getDate; el["id"] = elem.id; el["files"] = elem.files  }
                        })
                finalData.push(el);
            });
            setDname(props.initialName); setDdate(props.initialDate); setInitialData(finalData);
        }
        console.log("useEffect ajillav ------------------");
    },[props.initialData]);


    const onChangeHandle = (event) =>{ const finalData = [];
          tableData.map((el,i)=>{props.initialData.map(elem=> elem); finalData.push(el);
       });
        finalData.map((el, i )=>{
            if(el.id.toString() === event.target.id){ el["name"] = event.target.value }});
       setInitialData(finalData);
    }

    const onChangeGetDate = (event) =>{ const finalData = []
        tableData.map((el,i)=>{ props.initialData.map(elem=> elem); finalData.push(el); });
        finalData.map((el, i )=>{
            if(el.id.toString() === event.target.id){el["getDate"] = event.target.value }  });
        setInitialData(finalData);
    }

    const onChangeRecentDate = (event) =>{ const finalData = []
        tableData.map((el,i)=>{props.initialData.map(elem=> elem);finalData.push(el);  });
        finalData.map((el, i )=>{if(el.id.toString() === event.target.id){ el["recentDate"] = event.target.value }});
        setInitialData(finalData);
    }

    const onChangeFile = (event) =>{
        const formData = new FormData()
        formData.append('file', event.target.files[0]);
        formData.append('description', event.target.id);
        axios.post('attach-files',formData, {headers: { 'Authorization': props.token, 'Content-Type': 'multipart/form-data', }})
        .then((res)=>{ 
            setFileSave(prev=> prev.concat(res.data.data));
        }).catch(err=>console.log(err));
    }
   
    const changeHandleName = (e) =>{   setDname(e.target.value);  }
    const changeHandleDate = (e)=>{  setDdate(e.target.value);  }


    const clickHandles = (e) =>{
        let getFile = document.querySelectorAll(".GetFilesData");  let myArr1 = Array.from(getFile);  let condition = []
        myArr1.map((el,i)=>{
            let value = {};   value = el.files[0];
            if(value !== undefined){ condition.push(value); }
        });
        
        let finalOne = {};  let finalEnd = {}; let rs2 = document.querySelectorAll(".GetItem"); let arr2 = Array.from(rs2); let finalOne2 = [];
        
        arr2.map((el,i)=>{
            const Lala = {};  let rs2 = document.querySelectorAll(`.PPS${i + 1}`);  let arr23 = Array.from(rs2);
            arr23.map((el,index)=>{
                if(el.value !== ""){
                    let field = el.name; let value = el.value;
                    if(Dname){ Lala["id"] = el.id;   }
                    Lala[field] = value; 
                }else{
                    let field = el.name;
                    if(Dname){ Lala["id"] = el.id;   }
                    Lala[field] = null;
                }
            });
            fileSave.map((elem,ind)=>{
                if((i + 1)=== parseInt(elem.description)){  Lala["files"] = elem }
            });
            finalOne2.push(Lala);
        });

        let originalTest = []
        if(Dname !== null){
            finalOne2.map(el =>{
             let  conditon1 = Object.keys(el)
               if(Dname){
                   if(conditon1.length > 3){   originalTest.push(el); }
               }else{ if(conditon1.length === 3){ originalTest.push(el); }
               }
           })
        }else{ finalOne2.map(el =>{   let  conditon1 = Object.keys(el); if(conditon1.length > 2){ originalTest.push(el);  } })  }

        let rs4 = document.querySelectorAll(".getUser2");
        let arr4 = Array.from(rs4);
        let userInp = {};

        arr4.map(el=>{
            let field = el.name; let value = el.value; if(value===""){ el.classList += " red"; }else{  el.classList =- " red";  el.classList += " getUser2"; };  userInp[field] = value;
        });
        let confirm = document.getElementById("GetcheckBtn2").checked;

        finalOne["request"] = finalOne2;
        finalOne["name"] = userInp.name;
        finalOne["date"] = userInp.date;
        finalEnd["PPS2"] = finalOne;

        if(originalTest.length < 10){
            setFinalErrorText("Хүснэгт хэсэгийг гүйцэд бөгөлнө үү"); setOpacity2("1");
        }else if(userInp.name === "" || userInp.date === ""){
            setFinalErrorText("Хүсэлт гаргагчийн мэдүүлэг хэсэгийг бөгөлнө үү"); setOpacity2("1");
        }else if(confirm === false){
            setFinalErrorText("Та үнэн зөв бөгөлсөн бол CHECK дарна уу"); setOpacity2("1");
        }else{
            setSpnBtn(true);
            setOpacity2("0");
            if(Dname){
                axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization: props.token}})
                .then((res)=>{setSpnBtn(false); console.log(res); helperContext.alertText('green', "Амжилттай хадаглалаа", true); helperContext.StyleComp("-200%", "-100%", "0%", "100%", "200%","300%"); scroll.scrollTo(0); helperContext.reqMountFunc(1); })
                .catch((err)=>{setSpnBtn(false); helperContext.alertText('orange', "Алдаа гарлаа", true); console.log(err) });
            }else{
                axios.put(`pps-request/${helperContext.tableId}`, finalEnd, {headers: {Authorization:AccessToken()}} ).then((res)=>{
                    setSpnBtn(false); helperContext.alertText('green', "Амжилттай хадаглагдлаа", true);  helperContext.StyleComp("-200%", "-100%", "0%", "100%", "200%","300%");  scroll.scrollTo(0); helperContext.reqMountFunc(1);
                  }).catch((err)=>{setSpnBtn(false); helperContext.alertText('orange', "Алдаа гарлаа", true); });
            }
        }
        // console.log(finalEnd, "my all");
    }

    return (
        <Component2 className="container">
            <div className="shadow" >
            <div className="rowHeader">
                <div className="boldTitle">ХАВСРАЛТ 2 B.</div>
                <div className="italicTitle">ХҮСНЭГТ 2. БАТАЛГАА/ЗӨВШӨӨРӨЛ/ТУСГАЙ ЗӨВШӨӨРЛИЙН ҮНЭЛГЭЭ</div>
            </div>
            <div className="MainContPar">
            {Dname !== null? (initialData.map((el,i)=>{
                    return(
                        <div id={i} className="GetItem ChildPar" key={i + 1}>
                            <div className="Title"> {i + 1}. {el.items} :
                                {el.list.map((el,i)=>{
                                    return(
                                    <div className="ListPar" key={i}>
                                        <li> {el} </li>
                                    </div>
                                    )
                                })}
                            </div>
                            <div className=" row">
                                <div className="col-md-4 col-sm-12 col-12 ">
                                    <div className="inpChild"><div className="labels"><span>(Зөвшөөрөл, тусгай зөвшөөрөл, албан бичиг гэх мэт) ба батладаг эрх бүхий байгууллага :</span> </div> <div className="name"> <FiUserCheck />
                                        <InputStyle className="newInp">
                                            <input type="input" id={el.id} value={el.name} placeholder="..." onChange={onChangeHandle} className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} name="name" />
                                            <div className="line"></div>
                                        </InputStyle>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder">
                                 <div className="Parentlabels"><span>Баталсан огноо :</span> </div>
                                    <div className="row head-border-top">
                                        <div className="col-md-6 col-sm-6 col-6"> 
                                            <div className="datePar inpChild"><div className="labels"><span>(Хүлээн авсан) :</span> </div>
                                                <div className="name">
                                                <InputStyle className="newInp">
                                                        <input max={Currentdate} onChange={onChangeGetDate} value={el.getDate} id={el.id} type="date" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} name="getDate" required />
                                                        <div className="line"></div>
                                                </InputStyle>
                                                        </div> </div></div>
                                        <div className="col-md-6 col-sm-6 col-6 headLeftBorder"> 
                                            <div className="datePar inpChild "><div className="labels"><span>(Шинэчилсэн) :</span> </div>
                                                <div className="name">
                                                <InputStyle className="newInp">
                                                        <input max={Currentdate} onChange={onChangeRecentDate} type="date" id={el.id} value={el.recentDate} className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} onfocus="(this.type='text')" name="recentDate" required />
                                                        <div className="line"></div>
                                                </InputStyle>
                                                         </div> </div>  </div>
                                              </div>
                                </div>

                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder"> <div className="inpChild"><div className="labels"><span>Батлагдсан баримт бичгүүд /хавсаргасан :</span> <div className="filess">{el.files?el.files.name:""}</div> </div>
                                        <div className="name"> <RiUpload2Line />  
                                        <InputStyle className="newInp">
                                                <input type="file"  id={i + 1} onChange={onChangeFile} accept=".xlsx,.xls,img/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" className={` GetFilesData LoginInpName form__field `}  name="file"  />
                                                <div className="line"></div>
                                        </InputStyle>
                                        </div> </div>
                                </div>
                            </div>
                        </div>
                    )
                })): (tableData.map((el,i)=>{
                    return(
                        <div id={i}  className="GetItem ChildPar" key={i + 1}>
                            <div className="Title"> {i + 1}. {el.items} :
                                {el.list.map((el,i)=>{
                                    return(
                                    <div className="ListPar" key={i}>
                                        <li> {el} </li>
                                    </div>
                                    )
                                })}
                            </div>
                            <div className=" row">
                                <div className="col-md-4 col-sm-12 col-12 ">
                                    <div className="inpChild"><div className="labels"><span>(Зөвшөөрөл, тусгай зөвшөөрөл, албан бичиг гэх мэт) ба батладаг эрх бүхий байгууллага :</span> </div> <div className="name"> <FiUserCheck />
                                         <InputStyle className="newInp">
                                                 <input type="text" placeholder="..." className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} name="name" />
                                                <div className="line"></div>
                                        </InputStyle>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder">
                                 <div className="Parentlabels"><span>Баталсан огноо :</span> </div>
                                    <div className="row head-border-top">
                                        <div className="col-md-6 col-sm-6 col-6"> 
                                            <div className="datePar inpChild"><div className="labels"><span>(Хүлээн авсан) :</span> </div>
                                                <div className="name">
                                                    <InputStyle className="newInp">
                                                            <input max={Currentdate}  type="date" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} name="getDate" required />
                                                            <div className="line"></div>
                                                    </InputStyle>
                                                   
                                                        
                                                        </div> </div></div>
                                        <div className="col-md-6 col-sm-6 col-6 headLeftBorder"> 
                                            <div className="datePar inpChild "><div className="labels"><span>(Шинэчилсэн) :</span> </div>
                                                <div className="name">
                                                     <InputStyle className="newInp">
                                                            <input max={Currentdate} type="date" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} name="recentDate" required />
                                                            <div className="line"></div>
                                                    </InputStyle>
                                                        </div> </div>  </div>
                                              </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder"> <div className="inpChild"><div className="labels"><span>Батлагдсан баримт бичгүүд /хавсаргасан :</span> <div className="filess">{el.files?el.files.name:""}</div> </div>
                                     <div className="name"> <RiUpload2Line /> 
                                     <InputStyle className="newInp">
                                            <input type="file" id={i + 1}  onChange={onChangeFile} accept=".xlsx,.xls,img/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" className={` GetFilesData LoginInpName form__field `}  name="file"  />
                                            <div className="line"></div>
                                    </InputStyle>
                                        </div> </div>
                                </div>
                            </div>
                        </div>
                    )
                })) }
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
                                                {Dname !== null ? <input type="input" onChange={changeHandleName} value={Dname} className="getUser2 LoginInpName form__field" placeholder="Бүтэн нэрээ оруулна уу" name="name" required />
                                                : <input type="input" className="getUser2 LoginInpName form__field" name="name" required />  }
                                                <div className="line"></div>
                                        </InputStyle>

                                    </div>
                                </div>
                                
                                <div className="NextChild">
                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <InputStyle className="newInp">
                                                    {Dname !== null ? <input max={Currentdate} onChange={changeHandleDate} value={Ddate}  type="date" placeholder="өдөр-сар-жил" className="getUser2 LoginInpName form__field" placeholder="Регистерийн дугаар" name="date" required />
                                                    : <input max={Currentdate} type="date" placeholder="өдөр-сар-жил" className="getUser2 LoginInpName form__field" placeholder="Регистерийн дугаар" name="date" required />  }
                                                    <div className="line"></div>
                                            </InputStyle>
                                        </div>
                                    </div>

                                    <div className="inpChild next">
                                        <div className="labels"><span> Та үнэн зөв бөгөлсөн эсэхээ баталгаажуулна уу : </span></div>
                                        <div className="name"> <BsArrowRightShort />
                                            <InputStyle className="newInp">
                                                <input id="GetcheckBtn2" checked={Dname !== null?true:null} className="checkBtn" type="checkbox" name="check" />
                                            </InputStyle>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                        <div className="buttonPar">
                            {Dname !== null? (<PrevBtn id="myInput" onClick={()=> { scroll.scrollTo(0); helperContext.StyleComp("0%", "100%", "200%", "300%", "400%","500%")}} className="SubmitButton" type="button"><div className="flexchild"><AiOutlineSend/></div>Өмнөх хуудас</PrevBtn>) : null } 
                            <NextBtn onClick={clickHandles} style={spnBtn===false? { width:"40%" }:{ width:"10%" }} className="SubmitButton" type="button">{spnBtn===false?(<> Дараагийн хуудас <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></> ): <img src="/gif1.gif" alt="spin" />  }</NextBtn>
                        </div>
            </div>
        </div>
        </Component2>
    )
}

export default TableTwo


const Component2 = styled.div`
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};
    margin-bottom:600px;
    font-size:${fontSize} !important;
    border-radius:6px;
    .shadow{
        box-shadow:1px 1px 18px -5px;
        border-radius:6px;
        position: relative;
        width: 100%;
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
     
        .MainContPar{
            background-color:white;
            .ChildPar{
                background-color:white;
                padding-top:14px;
                padding-bottom:18px;
                border-top:1px solid rgba(0,0,0,0.2);
                .Parentlabels{
                    text-align:center;
                    border-bottom:1px solid rgba(0,0,0,0.2);
                    padding-bottom:6px;
                }
                .headLeftBorder{
                    border-left:1px solid rgba(0,0,0,0.2);
                  }
                .Title{
                    font-size:16px;  
                    font-weight:500;
                    margin:15px;
                    .ListPar{
                        margin-left:15px;
                        li{
                            color:rgba(${textColor},0.8);
                            font-weight:400;
                        }
                    }
                }
                .datePar{
                    padding:0px 0px !important;
                }
                .inpChild{
                    margin:5px 0px;
                    padding:0px 15px;
                    display:flex;
                    flex-direction:column;
                    justify-content:flex-end;
                    height:100%;
                    .labels{
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        font-size:13px;
                        span{
                         
                         color:rgba(${textColor},.9);
                         font-weight:500;
                        }
                        .filess{
                            color:green;
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
                          padding: 15px 0 0;
                          margin-top: 0px;
                          width: 100%;
                        }
                      }
                     
                   }
                }
            }
        }
        .UserRequestPar{
            background-color:white;
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
                       font-size:13px;
                       span{
                        color:rgba(${textColor},.9);
                        font-weight:500;
                       }
                      
                    }
                    .name{
                        padding:10px 0px;
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
                          padding: 15px 0 0;
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
        
    }
   
    @media only screen and (max-width:1665px){
        .shadow{
            .FlexHead{
                padding:0 15%;
            }
        }
    }
    @media only screen and (max-width:1565px){
        .shadow{
            .FlexHead{
                padding:0 12.5%;
            }
        }
    }
    @media only screen and (max-width:1465px){
        .shadow{
            .FlexHead{
                padding:0 10.5%;
            }
        }
    }
    @media only screen and (max-width:1365px){
        .shadow{
            .FlexHead{
                padding:0 8.5%;
            }
        }
    }
    @media only screen and (max-width:1265px){
        .shadow{
            .FlexHead{
                padding:0 6.5%;
            }
        }
    }


    @media only screen and (max-width:768px){
        .shadow{
            .UserRequestPar{
                .buttonPar{
                    flex-direction:column;
                    .SubmitButton{
                        width:100% !important;
                    }
                }
                .inputPar{
                    .NextChild{
                        flex-direction:column;
                        .next{
                            width:100%;
                        }
                    }
                }
            }
            .MainContPar{
                .ChildPar{
                    .inpChild{
                        padding: 10px 15px;
                    }
                }
            }
        }
    }
`



const tableData = [
  { items: "Үйлдвэрийн үйл ажиллагаа  (зөвшөөрөл, тусгай зөвшөөрөл гм)", list:[]},
  {items: "Байгаль орчны үнэлгээ ", list:[]},
  {items: "Усан хангамж",list:[]},
  {items: "Хаягдал ус гаргах",list:["Хотын","Үйлдвэрийн","Бусад"]},
  {items: "Хаягдал зайлуулалт",list:["Аюултай бус (жишээ нь: цаас, сав боодол, мод, хуванцар гм) ","Аюултай"]},
  {items: "Аюултай материалын хадгалалт, ашиглалт  (будаг, уусгагч, түлш, бусад шатамхай бодис материал гм)",list:[]},
  {items: "Гал түймрээс сэргийлэх",list:[]},
  {items: "Эрүүл мэнд, аюулгүй ажиллагаа",list:[]},
  {items: "Хүүхдийн хөдөлмөр эрхлэлт",list:[]},
  {items: "Шатаах зуух/ зуухнаас ялгарах утаа, бодис",list:[]},
];