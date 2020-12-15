import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link, animateScroll as scroll } from "react-scroll";
import { fontFamily, textColor, ColorRgb, Color,fontSize } from '../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {BiPen} from 'react-icons/bi'
import SignatureCanvas from 'react-signature-canvas'
import Modal from 'react-awesome-modal';
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from '../../context/UserContext'


function TableTwo() {
    const StyleContext  = useContext(UserContext);
    const [HeadTime, setHeadTime] = useState("");
    const [opacity, setOpacity] = useState("0");
    const [opacity2, setOpacity2] = useState("0");
    const [procent, setProcent] = useState('0');
    const [visible, setVisible] = useState(false);
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [dataFinal, setData] = useState({});
    const [dataDetail, setDataDetal] = useState([]);
    let [sigCanvas, setSigCanvas] = useState({});
    let [trimmedDataURL, setTrimmedDataURL] = useState("");

    const openModal=()=> { setVisible(true);}
    const closeModal=()=> { setVisible(false);}

    const clear = () => sigCanvas.clear();

    const trim = () =>{ setTrimmedDataURL(sigCanvas.getTrimmedCanvas().toDataURL('image/png'));

    setTimeout(()=>{
         closeModal();
      },1000) };


    const clickHandles = (e) =>{
        StyleContext.StyleComp("-200%", "-100%", "0%");
        scroll.scrollTo(0);
    }

    const [headFix, setHeadFix] = useState("-500px");
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    });
    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            setHeadFix("0");
        }else {
            setHeadFix("-241px");
        }
        // console.log('lalalall', window.pageYOffset);
    }
   
    return (
        <Component2 className="container">
            <div className="shadow" >
            <div className="rowHeader">2. Баталгаа/зөвшөөрөл/тусгай зөвшөөрлийн үнэлгээ<span className="tseg">*</span></div>
                {StyleContext.GlobalStyle.tableTwo === "0%"? (
                     <div className="FlexHead" style={{top:`${headFix}`}}>
                     <div className="HeadContent" >   Баталгааны хэлбэр (Зөвшөөрөл,<br /> тусгай зөвшөөрөл,  албан бичиг гэх мэт)<br /> ба батладаг эрх бүхий байгууллага	 </div>
                     <div className="DateCont headLeftBorder HeadContent "> Баталсан огноо
                         <div className="childCont">
                                 <div className="contentSm "> Хүлээн авсан </div>
                                 <div className="headLeftBorder contentSm"> Шинэчилсэн </div>
                         </div>
                     </div>
                     <div className="HeadContent headLeftBorder"> Батлагдсан баримт бичгүүд /хавсаргасан </div>
                 </div>
                ) : null }
               

                <div className="headerPar">
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-4 ">Баталгааны хэлбэр (Зөвшөөрөл,<br /> тусгай зөвшөөрөл,  албан бичиг гэх мэт)<br /> ба батладаг эрх бүхий байгууллага	</div>
                        <div className="col-md-4 col-sm-4 col-4 headLeftBorder">
                            <div className="dateHead">Баталсан огноо</div>
                            <div className="row head-border-top">
                                <div className="col-md-6 col-sm-6 col-6"> Хүлээн авсан </div>
                                <div className="col-md-6 col-sm-6 col-6 headLeftBorder"> Шинэчилсэн </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-4 headLeftBorder">Батлагдсан баримт бичгүүд /хавсаргасан</div>
                    </div>
                </div>
            <div className="MainContPar">
            {tableData.map((el,i)=>{
                    return(
                        <div className="ChildPar" key={i}>
                             <div className="Title"> {i + 1}. {el.name} :
                             {el.list.map((el,i)=>{
                                 return(
                                <div className="ListPar" key={i}>
                                    <li> {el} </li>
                                </div>
                                 )
                             })}
                                
                             </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-4 col-4 ">
                                    <div className="inpChild"> <div className="name"> <FiUserCheck />
                                                <div className="form__group"><input type="input" className="userInp LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" required />
                                                    <label for="name" className=" form__label">Баталгааны хэлбэр</label>
                                                </div>
                                            </div>
                                    </div>
                                </div>
    
                                <div className="col-md-4 col-sm-4 col-4 headLeftBorder">
                                    <div className="row head-border-top">
                                        <div className="col-md-6 col-sm-6 col-6"> 
                                            <div className="datePar inpChild">
                                                <div className="name"><div className="form__group">
                                                        <input type="date" className="userInp LoginInpName form__field" placeholder="Аж ахуйн нэр" onfocus="(this.type='text')" name="name" required />
                                                        <label for="name" className=" form__label">Хүлээн авсан</label> </div></div> </div></div>
                                        <div className="col-md-6 col-sm-6 col-6 headLeftBorder"> 
                                            <div className="datePar inpChild ">
                                                <div className="name"><div className="form__group">
                                                        <input type="date" className="userInp LoginInpName form__field" placeholder="Аж ахуйн нэр" onfocus="(this.type='text')" name="name" required />
                                                        <label for="name" className=" form__label">Шинэчилсэн</label> </div> </div> </div>  </div>
                                              </div>
                                </div>
    
                                <div className="col-md-4 col-sm-4 col-4 headLeftBorder">
                                    <div className="inpChild"> <div className="name"> <FiUserCheck />  <div className="form__group">
                                                        <input type="input" className="userInp LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" required />
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
                                            <input type="input" className="userInp LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" required />
                                            <label for="name" className=" form__label">Бүтэн нэрээ оруулна уу</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="NextChild">
                                    <div className="inpChild next">
                                        <div className="labels"><span> Гарын үсэг зурсан огноо : </span></div>
                                            <div className="name"> <BiPen />
                                                <div className="form__group">
                                                    <div className="SignBtn" onClick={openModal} > Зурах </div>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <div className="form__group">
                                                <input type="date" placeholder="өдөр-сар-жил" className="userInp LoginInpName form__field" placeholder="Регистерийн дугаар" name="date" required />
                                                <label for="password" className="form__label">Өдөр-Сар-Он </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {trimmedDataURL ? <img className="SingatureImg"  src={trimmedDataURL} alt="Signature" /> : null}

                                <Modal visible={visible}  width="700" height="350"effect="fadeInDown" onClickAway={closeModal}>
                                    <div className="modalPar">
                                        <div className="Canvass">
                                            <SignatureCanvas className='sigCanvas' penColor='green' ref={(ref) => { sigCanvas = ref }} canvasProps={{width: 690, height: 260, className: 'sigCanvas'}} />
                                        </div>
                                        <div className="BtnPar">
                                            <button onClick={clear}>Цэвэрлэх</button>
                                            <button onClick={trim}>Хадгалах</button>
                                            <button onClick={closeModal}>X</button>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                                {/* <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div> */}
                                {/* <span onClick={clickHandles} className="TestButton">NEXT</span> */}
                            <button onClick={clickHandles} className="SubmitButton" type="button">Илгээх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></button>
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
        .FlexHead{
            font-size:16px;
            transition: all 0.4s ease;
            position:fixed;
            left:0;
            z-index:2;
            padding:0 20%;
            width: inherit;
            max-width: inherit;
            background-color:rgba(${ColorRgb});
            color:white;
            text-align:center;
            border-bottom:1px solid rgba(0,0,0,0.4);
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
            height:86px;
            .HeadContent{
                height:100%;
                width:33.8%;
                padding-top:10px;
                padding-bottom:10px;
            }
            .headLeftBorder{
                border-left:1px solid rgba(255,255,255,0.5);
            }
            .DateCont{
                display:flex;
                flex-direction:column;
                height:100%;
               .childCont{
                    height:100%;
                  display:flex;
                  flex-direction:row;
                    border-top:1px solid rgba(255,255,255,0.5);
                  .contentSm{
                    padding:0px 15px;
                    width:50%;
                    height:100%;
                  }
               }
            }
        }
        .headerPar{
            background-color: rgba(0, 51, 102,1);
            color:white;
            text-align:center;
            border-bottom:1px solid rgba(255,255,255,0.5);
            .col-md-4{
                padding-top:10px;
                padding-bottom:10px;
            }
            .dateHead{
                padding:6px 0px;
            }
            .head-border-top{
           
              border-top:1px solid rgba(255,255,255,0.5);
            }
            .headLeftBorder{
               
                border-left:1px solid rgba(255,255,255,0.5);
            }
        }
        .MainContPar{
            background-color:white;
            .ChildPar{
                background-color:white;
                padding-top:14px;
                padding-bottom:18px;
                border-top:1px solid rgba(0,0,0,0.2);
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
                    margin:12px 0px;
                    padding:0px 15px;
                    display:flex;
                    flex-direction:column;
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
                       .SignBtn{
                           cursor:pointer;
                           padding:5px 0px;
                           border-radius:6px;
                           width:100%;
                           color:rgba(${ColorRgb},0.8);
                           background-color:rgba(${ColorRgb},0);
                           cursor:pointer;
                           font-size:18px;
                           text-align:center;
                           box-shadow:1px 1px 10px -2px;
                           &:hover{
                             box-shadow:1px 1px 15px -2px;
                           }
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
            .FlexHead{
                
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