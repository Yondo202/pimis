import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { animateScroll as scroll } from "react-scroll";
import { fontFamily, textColor, ColorRgb, Color,fontSize } from '../../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {BiPen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import HelperContext from '../../../context/HelperContext'
import AccessToken from '../../../context/accessToken'
import axios from '../../../axiosbase'

function TableTwo() {
    const [ spnBtn, setSpnBtn ] = useState(false);
    const helperContext = useContext(HelperContext);
    const [opacity2, setOpacity2] = useState("0");
    const [FinalErrorText, setFinalErrorText] = useState("");
    

    const clickHandles = (e) =>{
        let getFile = document.querySelectorAll(".GetFilesData");
        let myArr1 = Array.from(getFile); let condition = []
        myArr1.map((el,i)=>{let value = {}; value = el.files[0]; if(value !== undefined){  condition.push(value); } })

        const FilesSend =(AllData)=>{
            const TestArr = [];
            myArr1.map((el,i)=>{
                    let value = {};  value = el.files[0];
                    if(value === undefined){ value = {"name" : null };}
                    AllData.map((element, index)=>{if( i === index){ value["tableId"] = element.id; TestArr.push(value); } });
            });
            TestArr.map((el,i)=>{
                  const data = new FormData(); data.append(el.name, el);
                  axios.put(`pps-request/${el.tableId}/upload-pps2`, data, {headers: {Authorization:AccessToken()}}).then((res)=>{ console.log(res, 'ress');  }).catch((err)=> console.log(err))
            });
        }

        e.preventDefault();
        let finalOne = {};  let finalEnd = {}; let rs2 = document.querySelectorAll(".GetItem");let arr2 = Array.from(rs2); let finalOne2 = [];
        
        arr2.map((el,i)=>{
            const Lala = {};  let rs2 = document.querySelectorAll(`.PPS${i + 1}`); let arr23 = Array.from(rs2);
            arr23.map((el,i)=>{
                if(el.value !== ""){  let field = el.name; let value = el.value; Lala[field] = value;}else{  return false   }
            });
            finalOne2.push(Lala);
        });

        let originalTest = []
         finalOne2.map(el =>{   let  conditon1 = Object.keys(el); if(conditon1.length === 3){ originalTest.push(el);  } })

        let rs4 = document.querySelectorAll(".getUser2"); let arr4 = Array.from(rs4); let userInp = {};

        arr4.map(element=>{ let field = element.name; let value = element.value; userInp[field] = value;  });
        let confirm = document.getElementById("GetcheckBtn2").checked;

        finalOne["request"] = finalOne2;   finalOne["name"] = userInp.name;  finalOne["date"] = userInp.date;  finalEnd["PPS2"] = finalOne;

        if(originalTest.length < 10){
            setFinalErrorText("Хүснэгт хэсэгийг гүйцэд бөгөлнө үү");
            setOpacity2("1");
        }else if(userInp.name === "" || userInp.date === ""){
            setFinalErrorText("Хүсэлт гаргагчийн мэдүүлэг хэсэгийг бөгөлнө үү");
            setOpacity2("1");
        }else if(confirm === false){
            setFinalErrorText("Та үнэн зөв бөгөлсөн бол CHECK дарна уу");
            setOpacity2("1");
        }else{
            setSpnBtn(true);
            if(condition.length < 10){
                helperContext.alertText('orange', "Шаардлагатай материал хавсаргаагүй тохиолдолд хүсэлт хүчингүй болно гэдэгийг анхаарна уу!!!", true);
                // const str = "аардлагатай материал хавсаргаагүй тохиолдолд хүсэлт хүчингүй болно гэдэгийг анхаарна уу!!!";
                // const str2 = "а хүсэлт гэсэн хэсэгээр орж бүрэн хавсаргах боломжтой..";
                // alert.show("Т" + str2.toLowerCase(),{  title: "Ш" + str.toLowerCase() });
                // scroll.scrollTo(0);
            }
            setOpacity2("0");
            axios.put(`pps-request/${helperContext.tableId}`, finalEnd, {headers: {Authorization:AccessToken()}} ).then((res)=>{
                setTimeout(()=>{ helperContext.alertText('green', "Амжилттай хадаглагдлаа", true);  helperContext.StyleComp("-200%", "-100%", "0%", "100%", "200%","300%");  scroll.scrollTo(0); },2000);setSpnBtn(false);
                FilesSend(res.data.data.ppsRequest2Detail);
              }).catch((err)=>{ setSpnBtn(false);  helperContext.alertText('orange', "Алдаа гарлаа", true); });
        }
        console.log(finalEnd, "my all");
    }
    
    return (
        <Component2 className="container">
            <div className="shadow" >
            <div className="rowHeader">
                <div className="boldTitle">ХАВСРАЛТ 2Б</div>
                <div className="italicTitle">ХҮСНЭГТ 2. БАТАЛГАА/ЗӨВШӨӨРӨЛ/ТУСГАЙ ЗӨВШӨӨРЛИЙН ҮНЭЛГЭЭ</div>
            </div>
            <div className="MainContPar">
            {tableData.map((el,i)=>{
                    return(
                        <div id={i}  className="GetItem ChildPar" key={i + 1}>
                             <div className="Title"> {i + 1}. {el.name} :
                             {el.list.map((el,i)=>{
                                 return(
                                <div className="ListPar" key={i}>
                                    <li> {el} </li>
                                </div>
                                 )
                             })}
                                
                             </div>
                            <div   className=" row">
                                <div className="col-md-4 col-sm-12 col-12 ">
                                    <div className="inpChild"> <div className="labels"><span>(Зөвшөөрөл, тусгай зөвшөөрөл, албан бичиг гэх мэт) ба батладаг эрх бүхий байгууллага :</span> </div> <div className="name"> <FiUserCheck />
                                                <div className="form__group"><input type="input" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="name" required />
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
                                                        <input max='3000-12-31' type="date" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} placeholder="Аж ахуйн нэр" onfocus="(this.type='text')" name="getDate" required />
                                                        <label for="name" className=" form__label">Хүлээн авсан</label> </div></div> </div></div>
                                        <div className="col-md-6 col-sm-6 col-6 headLeftBorder"> 
                                            <div className="datePar inpChild "><div className="labels"><span>(Шинэчилсэн) :</span> </div>
                                                <div className="name"><div className="form__group">
                                                        <input max='3000-12-31' type="date" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} placeholder="Аж ахуйн нэр" onfocus="(this.type='text')" name="recentDate" required />
                                                        <label for="name" className=" form__label">Шинэчилсэн</label> </div> </div> </div>  </div>
                                              </div>
                                </div>

                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder"> <div className="inpChild"><div className="labels"><span>Батлагдсан баримт бичгүүд /хавсаргасан :</span> </div>
                                     <div className="name"> <FiUserCheck />  <div className="form__group">
                                            <input type="file" accept=".xlsx,.xls,img/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" className={`GetFilesData LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="file" required />
                                            <label for="name" className=" form__label">Батлагдсан баримт бичгүүд</label>
                                        </div></div> </div>
                                </div>
                            </div>
                         </div>
                    )
                })}
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
                                            <input type="input" className="getUser2 LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" required />
                                            <label for="name" className=" form__label">Бүтэн нэрээ оруулна уу</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="NextChild">
                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <div className="form__group">
                                                <input max='3000-12-31' type="date" placeholder="өдөр-сар-жил" className="getUser2 LoginInpName form__field" placeholder="Регистерийн дугаар" name="date" required />
                                                <label for="password" className="form__label">Өдөр-Сар-Он </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inpChild next">
                                        <div className="labels"><span>Та үнэн зөв бөгөлсөн эсэхээ баталгаажуулна уу : </span></div>
                                            <div className="name"> <BiPen />
                                                <div className="form__group">
                                                    <input id="GetcheckBtn2" className="checkBtn" type="checkbox" name="check" />
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                            <button id="myInput" onClick={clickHandles} className="SubmitButton" type="button">{spnBtn===false?<>Илгээх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></>: <img src='/gifff.gif' alt="gif" /> } </button>
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
                      img{
                          width:25px;
                      }
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
  { name: "Үйлдвэрийн үйл ажиллагаа  (зөвшөөрөл, тусгай зөвшөөрөл гм)", list:[]},
  {name: "Байгаль орчны үнэлгээ ", list:[]},
  {name: "Усан хангамж",list:[]},
  {name: "Хаягдал ус гаргах",list:["Хотын","Үйлдвэрийн","Бусад"]},
  {name: "Хаягдал зайлуулалт",list:["Аюултай бус (жишээ нь: цаас, сав боодол, мод, хуванцар гм) ","Аюултай"]},
  {name: "Аюултай материалын хадгалалт, ашиглалт  (будаг, уусгагч, түлш, бусад шатамхай бодис материал гм)",list:[]},
  {name: "Гал түймрээс сэргийлэх",list:[]},
  {name: "Эрүүл мэнд, аюулгүй ажиллагаа",list:[]},
  {name: "Хүүхдийн хөдөлмөр эрхлэлт",list:[]},
  {name: "Шатаах зуух/ зуухнаас ялгарах утаа, бодис",list:[]},
];