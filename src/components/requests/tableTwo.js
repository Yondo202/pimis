import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link, animateScroll as scroll } from "react-scroll";
import { fontFamily, textColor, ColorRgb, Color,fontSize } from '../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {BiPen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from '../../context/UserContext'

function TableTwo() {
    const StyleContext  = useContext(UserContext);
    const [opacity2, setOpacity2] = useState("0");
    const [FinalErrorText, setFinalErrorText] = useState("");

    const clickHandles = (e) =>{
        StyleContext.StyleComp("-200%", "-100%", "0%", "100%", "200%","300%");
        // scroll.scrollTo(0);

        let finalOne = {};
        let finalEnd = {};
        let rs2 = document.querySelectorAll(".GetItem");
        // console.log(rs2,"myrs")
        let arr2 = Array.from(rs2);
        let finalOne2 = [];

        arr2.map(element=>{
              let soloObject2 = {}
              let field = element.id;
              let value = {};
              soloObject2[field] = value;
              finalOne2.push(soloObject2);
        });

        let conditionFinal = []
        
        finalOne2.map((el,i)=>{
            const Lala = []
            let rs2 = document.querySelectorAll(`.PPS${i + 1}`);
            let arr23 = Array.from(rs2);

            let condition = document.querySelectorAll(`.getItems${i + 1}`);
            let arr44 = Array.from(condition);
            arr44.map((el,i)=>{
                if(el.value !== ""){
                    let conditionbefore = {}
                    let field = el.name;
                    let value = el.value;
                    conditionbefore[field] = value;
                    conditionFinal.push(conditionbefore);
                }else{
                    return false
                }
            });
            arr23.map((el,i)=>{
                let soloObject2 = {}
                let field = el.name;
                let value = el.value;
                soloObject2[field] = value;
                Lala.push(soloObject2);
            });

              el[`pps${i + 1}`] = Lala;
        });

        let rs4 = document.querySelectorAll(".getUser2");
        let arr4 = Array.from(rs4);
        let userInp = {};

        arr4.map(element=>{
            let field = element.name;
            let value = element.value;
            userInp[field] = value;
        });

        let confirm = document.getElementById("GetcheckBtn2").checked;
        console.log(confirm, "my checkbtn");

        finalOne["request"] = finalOne2;
        finalOne["name"] = userInp.name;
        finalOne["date"] = userInp.date;
        finalEnd["PPS2"] = finalOne;

        console.log(finalEnd, "my all");

        if(conditionFinal.length < 27){
            setFinalErrorText("Хүснэгт хэсэгийг гүйцэд бөгөлнө үү");
            setOpacity2("1");
            scroll.scrollTo(0);
        }else if(userInp.name === "" || userInp.date === ""){
            setFinalErrorText("Хүсэлт гаргагчийн мэдүүлэг хэсэгийг бөгөлнө үү");
            setOpacity2("1");
        }else if(confirm === false){
            setFinalErrorText("Та үнэн зөв бөгөлсөн бол CHECK дарна уу");
            setOpacity2("1");
        }else{
            alert("gg");
            setOpacity2("0");
            // StyleContext.StyleComp("-200%", "-100%", "0%");
            // scroll.scrollTo(0);
        }
        // console.log(finalEnd, "final");
    }
   
    return (
        <Component2 className="container">
            <div className="shadow" >
            <div className="rowHeader">2. Баталгаа/зөвшөөрөл/тусгай зөвшөөрлийн үнэлгээ<span className="tseg">*</span></div>
             
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
                                                        <input max='3000-12-31' type="date" className={`PPS${i + 1} getItems${i + 1} LoginInpName form__field`} placeholder="Аж ахуйн нэр" onfocus="(this.type='text')" name="resentDate" required />
                                                        <label for="name" className=" form__label">Шинэчилсэн</label> </div> </div> </div>  </div>
                                              </div>
                                </div>

                                <div className="col-md-4 col-sm-12 col-12 headLeftBorder"> <div className="inpChild"><div className="labels"><span>Батлагдсан баримт бичгүүд /хавсаргасан :</span> </div>
                                     <div className="name"> <FiUserCheck />  <div className="form__group">
                                            <input type="file" className={`PPS${i + 1} LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="file" required />
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
                                                    {/* <div className="SignBtn" onClick={openModal} > Зурах </div> */}
                                                    <input id="GetcheckBtn2" className="checkBtn" type="checkbox" name="check" />
                                                </div>
                                            </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                                {/* <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div> */}
                                {/* <span onClick={clickHandles} className="TestButton">NEXT</span> */}
                            <button id="myInput" onClick={clickHandles} className="SubmitButton" type="button">Илгээх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></button>
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
            border-radius:6px 6px 0px 0px;
          background-color:white;
          padding: 24px 26px;
          font-size:1.2rem;
          // border-bottom:1px solid rgba(63, 81, 181,0.5);
          color:black;
          .tseg{
            color:red;
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
                    font-weght:500;
                    font-size:18px;
                    transition:all 0.4s ease;
                    color:rgba(255,0,0.6);
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
            .MainContPar{
                .ChildPar{
                    .inpChild{
                        padding: 0px 15px;
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
];