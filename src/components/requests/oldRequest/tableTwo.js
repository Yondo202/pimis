import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link, animateScroll as scroll } from "react-scroll";
import { fontFamily, textColor, ColorRgb,fontSize,PrevBtn,NextBtn } from '../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {RiUpload2Line} from 'react-icons/ri'
import {BiPen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from '../../../context/UserContext'
import axios from '../../../axiosbase'
import HelperContext from '../../../context/HelperContext'

function TableTwo(props) {
    const StyleContext  = useContext(UserContext);
    const helpCtx  = useContext(HelperContext);
    const [opacity2, setOpacity2] = useState("0");
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [ initialData, setInitialData ] = useState([]);
    const [ Dname, setDname ] = useState("");
    const [Ddate, setDdate] = useState("");

    useEffect(()=>{
       const finalData = []
       tableData.map((el,i)=>{
           props.initialData.map((elem, index )=> {
            if(i === index ){
                el["name"] = elem.name;
                el["recentDate"] = elem.recentDate
                el["getDate"] = elem.getDate;
                el["id"] = elem.id
                el["fileurl"] = elem.fileurl
            }
           })
           finalData.push(el);
       });
       setDname(props.initialName);
       setDdate(props.initialDate);
       setInitialData(finalData);
    },[]);
    console.log(initialData, " 222  my initial Data");


    const onChangeHandle = (event) =>{ const finalData = [];
          tableData.map((el,i)=>{props.initialData.map(elem=> elem); finalData.push(el);
       });
        finalData.map((el, i )=>{
            if(el.id.toString() === event.target.id){ el["name"] = event.target.value }});
       setInitialData(finalData);
    }

    const onChangeGetDate = (event) =>{const finalData = []
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
        const finalData = [];
        tableData.map((el,i)=>{props.initialData.map(elem=> elem);finalData.push(el); });

        finalData.map((el, i )=>{ if(el.id.toString() === event.target.id){ el["fileurl"] = event.target.files[0].name }  });
        setInitialData(finalData);
    }

    const changeHandleName = (e) =>{   setDname(e.target.value);  }
    const changeHandleDate = (e)=>{  setDdate(e.target.value);  }


    const clickHandles = (e) =>{
        let getFile = document.querySelectorAll(".GetFilesData");  let myArr1 = Array.from(getFile);  let condition = []
        myArr1.map((el,i)=>{let value = {};   value = el.files[0];
            if(value !== undefined){ condition.push(value); }
        })

        const FilesSend = (FileData) =>{
            const TestArr = [];
                myArr1.map((el,i)=>{ let value = el.files[0]
                    if(value === undefined){value = {}}
                    FileData.map((element, index)=>{  if( i === index){value["tableId"] = element.id;TestArr.push(value); }})
                });
            TestArr.map((el,i)=>{ const data = new FormData();   data.append(el.name, el);
                    axios.put(`pps-request/${el.tableId}/upload-pps2`, data, {headers: {Authorization:`bearer ${props.token}`}}).then((res)=>{console.log(res,'ress'); })
                    .catch((err)=> console.log(err))
            });
        }

        e.preventDefault();
        let finalOne = {};  let finalEnd = {}; let rs2 = document.querySelectorAll(".GetItem"); let arr2 = Array.from(rs2); let finalOne2 = [];
        
        arr2.map((el,i)=>{
            const Lala = {};  let rs2 = document.querySelectorAll(`.PPS${i + 1}`);  let arr23 = Array.from(rs2);
            arr23.map((el,i)=>{
                if(el.value !== ""){ let field = el.name; let value = el.value; if(props.initialData[0]){   Lala["id"] = el.id;}  Lala[field] = value; }
            });
            finalOne2.push(Lala);
        });

        let originalTest = []
         finalOne2.map(el =>{
          let  conditon1 = Object.keys(el)
            if(props.initialData[0]){
                if(conditon1.length === 4){   originalTest.push(el); }
            }else{ if(conditon1.length === 3){ originalTest.push(el); }
            }
        })

        let rs4 = document.querySelectorAll(".getUser2");
        let arr4 = Array.from(rs4);
        let userInp = {};

        arr4.map(element=>{
            let field = element.name;
            let value = element.value;
            userInp[field] = value;
        });
        let confirm = document.getElementById("GetcheckBtn2").checked;

        finalOne["request"] = finalOne2;
        finalOne["name"] = userInp.name;
        finalOne["date"] = userInp.date;
        finalEnd["PPS2"] = finalOne;

        console.log(originalTest.length, "hevellee");

        if(originalTest.length < 10){
            setFinalErrorText("Хүснэгт хэсэгийг гүйцэд бөгөлнө үү"); setOpacity2("1");
        }else if(userInp.name === "" || userInp.date === ""){
            setFinalErrorText("Хүсэлт гаргагчийн мэдүүлэг хэсэгийг бөгөлнө үү"); setOpacity2("1");
        }
        // else if(condition.length < 10){
        //     setFinalErrorText("Шаардлагатай материал бүрэн хавсаргаагүй байна...");
        //     setOpacity2("1");
        // }
        else if(confirm === false){
            setFinalErrorText("Та үнэн зөв бөгөлсөн бол CHECK дарна уу"); setOpacity2("1");
        }else{
            setOpacity2("0"); axios.put(`pps-request/${props.id}`, finalEnd, {headers: {Authorization:`bearer ${props.token}`}})
            .then((res)=>{ console.log(res); FilesSend(res.data.data.ppsRequest2Detail); helpCtx.alertText('green', "Амжилттай боллоо", true); StyleContext.StyleComp("-200%", "-100%", "0%", "100%", "200%","300%"); scroll.scrollTo(0); })
            .catch((err)=>{ helpCtx.alertText('orange', "Алдаа гарлаа", true); console.log(err) });
            
        }
        
        console.log(finalEnd, "my all");
    }
   
    return (
        <Component2 className="container">
            <div className="shadow" >
            <div className="rowHeader">
                <div className="boldTitle">ХАВСРАЛТ 2 B.</div>
                <div className="italicTitle">ХҮСНЭГТ 2. БАТАЛГАА/ЗӨВШӨӨРӨЛ/ТУСГАЙ ЗӨВШӨӨРЛИЙН ҮНЭЛГЭЭ</div>
            </div>
            <div className="MainContPar">
            {props.initialData[0]? (initialData.map((el,i)=>{
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
                                            <div className="form__group"><input type="input" id={el.id} value={el.name} onChange={onChangeHandle} className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} name="name" />
                                                    <label for="name" className=" form__label">Баталгааны хэлбэр</label>
                                                </div>
                                            </div>
                                    </div>
                                </div>
    
                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder">
                                 <div className="Parentlabels"><span>Баталсан огноо :</span> </div>
                                    <div className="row head-border-top">
                                        <div className="col-md-6 col-sm-6 col-6"> 
                                            <div className="datePar inpChild"><div className="labels"><span>(Хүлээн авсан) :</span> </div>
                                                <div className="name"><div className="form__group">
                                                        <input max='3000-12-31' onChange={onChangeGetDate} value={el.getDate} id={el.id} type="date" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} onfocus="(this.type='text')" name="getDate" required />
                                                        <label for="name" className=" form__label">Хүлээн авсан</label> </div></div> </div></div>
                                        <div className="col-md-6 col-sm-6 col-6 headLeftBorder"> 
                                            <div className="datePar inpChild "><div className="labels"><span>(Шинэчилсэн) :</span> </div>
                                                <div className="name"><div className="form__group">
                                                        <input max='3000-12-31' onChange={onChangeRecentDate} type="date" id={el.id} value={el.recentDate} className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} onfocus="(this.type='text')" name="recentDate" required />
                                                        <label for="name" className=" form__label">Шинэчилсэн</label> </div> </div> </div>  </div>
                                              </div>
                                </div>

                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder"> <div className="inpChild"><div className="labels"><span>Батлагдсан баримт бичгүүд /хавсаргасан :</span> <div className="filess">{el.fileurl}</div> </div>
                                     <div className="name"> <RiUpload2Line />  <div className="form__group">
                                            <input type="file"  id={el.id} onChange={onChangeFile} accept=".xlsx,.xls,img/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" className={` GetFilesData LoginInpName form__field `}  name="file"  />
                                            <label for="name" className=" form__label">Батлагдсан баримт бичгүүд</label>

                                            {/* <input type="file" tabIndex={el.id} onChange={()=>onChangeFile()} accept=".xlsx,.xls,img/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" className={`GetFilesData inputfile`} id="file" name="file"  />
                                            <label for="file" >{el.fileurl}</label>  */}
                                        </div></div> </div>
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
                                            <div className="form__group"><input type="input" value={el.name} className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} name="name" />
                                                    <label for="name" className=" form__label">Баталгааны хэлбэр</label>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder">
                                 <div className="Parentlabels"><span>Баталсан огноо :</span> </div>
                                    <div className="row head-border-top">
                                        <div className="col-md-6 col-sm-6 col-6"> 
                                            <div className="datePar inpChild"><div className="labels"><span>(Хүлээн авсан) :</span> </div>
                                                <div className="name"><div className="form__group">
                                                        <input max='3000-12-31' value={el.getDate} type="date" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} onfocus="(this.type='text')" name="getDate" required />
                                                        <label for="name" className=" form__label">Хүлээн авсан</label> </div></div> </div></div>
                                        <div className="col-md-6 col-sm-6 col-6 headLeftBorder"> 
                                            <div className="datePar inpChild "><div className="labels"><span>(Шинэчилсэн) :</span> </div>
                                                <div className="name"><div className="form__group">
                                                        <input max='3000-12-31' type="date" value={el.recentDate} className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} onfocus="(this.type='text')" name="recentDate" required />
                                                        <label for="name" className=" form__label">Шинэчилсэн</label> </div> </div> </div>  </div>
                                              </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder"> <div className="inpChild"><div className="labels"><span>Батлагдсан баримт бичгүүд /хавсаргасан :</span> <div className="filess">{el.fileurl}</div> </div>
                                     <div className="name"> <RiUpload2Line />  <div className="form__group">
                                            <input type="file"   accept=".xlsx,.xls,img/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" className={` GetFilesData LoginInpName form__field `}  name="file"  />
                                            <label for="name" className=" form__label">Батлагдсан баримт бичгүүд</label>

                                            {/* <input type="file" tabIndex={el.id} onChange={()=>onChangeFile()} accept=".xlsx,.xls,img/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" className={`GetFilesData inputfile`} id="file" name="file"  />
                                            <label for="file" >{el.fileurl}</label>  */}
                                        </div></div> </div>
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
                                        <div className="form__group">
                                            <input type="input" onChange={changeHandleName} value={Dname} className="getUser2 LoginInpName form__field" name="name" required />
                                            <label for="name"   className=" form__label">Бүтэн нэрээ оруулна уу</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="NextChild">
                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <div className="form__group">
                                                <input max='3000-12-31' onChange={changeHandleDate} value={Ddate}  type="date" placeholder="өдөр-сар-жил" className="getUser2 LoginInpName form__field" placeholder="Регистерийн дугаар" name="date" required />
                                                <label for="password" className="form__label">Өдөр-Сар-Он </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inpChild next">
                                        <div className="labels"><span>Та үнэн зөв бөгөлсөн эсэхээ баталгаажуулна уу : </span></div>
                                            <div className="name"> <BiPen />
                                                <div className="form__group">
                                                    {/* <div className="SignBtn" onClick={openModal} > Зурах </div> */}
                                                    <input id="GetcheckBtn2" className="checkBtn" type="checkbox" name="check" />
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                        <div className="buttonPar">
                            <PrevBtn id="myInput" onClick={()=> { scroll.scrollTo(0); StyleContext.StyleComp("0%", "100%", "200%", "300%", "400%","500%")}} className="SubmitButton" type="button"><div className="flexchild"><AiOutlineSend/></div>Өмнөх хуудас</PrevBtn>
                            <NextBtn id="myInput" onClick={clickHandles} className="SubmitButton" type="button">Илгээх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
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
                     display:flex;
                     flex-direction:row;
                     align-items:flex-end;
                     justify-content:flex-end;
                     width:100%;
                     svg{
                       color:rgba(${ColorRgb},0.7);
                       font-size:24px;
                       margin-right:15px;
                       margin-bottom:10px;
                     }
                     .form__group{
                      position:relative;
                      padding: 15px 0 0;
                      margin-top: 0px;
                      width: 100%;
                        .inputfile{
                            width: 0.1px;
                            height: 0.1px;
                            opacity: 0;
                            overflow: hidden;
                            position: absolute;
                            z-index: -1;
                            &+label {
                                border-radius:3px;
                                padding:4px 10px;
                                font-weight: 400;
                                color: white;
                                background-color: rgb(${ColorRgb});
                                display: inline-block;
                            }
                            &:focus + label,
                            & + label:hover {
                                cursor:pointer;
                                background-color: rgba(${ColorRgb},0.8);
                            }
                           
                        }
                       
                         .form__field{
                             font-family: inherit;
                             width: 100%;
                             border: 0;
                             border-radius:6px;
                             border-bottom: 1px solid rgba(${ColorRgb},0.3);
                             border-right: 1px solid rgba(${ColorRgb},0.3);
                             border-left: 1px solid rgba(${ColorRgb},0.3);
                             border-top: 1px solid rgba(${ColorRgb},0.3);
                             outline: 0;
                             font-size: 0.8rem;
                             color: black;
                             padding: 10px 0px 10px 10px;
                             background: transparent;
                             transition: border-color 0.2s;
                             transition:all 0.3s ease;
                             position: relative;
                             z-index: 1;
                             &::placeholder {
                               color: transparent;
                             }
                             &:placeholder-shown ~ .form__label {
                               font-size: 0.8rem;
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
                        width:100%;
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