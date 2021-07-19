import React, { useState, useContext, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { Color, ColorRgb, InputStyle, NextBtn } from "../theme"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import Modal from 'react-awesome-modal';
import { CgProfile } from 'react-icons/cg'
import { GoMail } from 'react-icons/go'
import { BiLockOpen } from 'react-icons/bi'
import { AiOutlineSend } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import UserContext from '../../context/UserContext'
import PasswordInducator from './PasswordIndicator'
import axios from '../../axiosbase';
import SEctor from 'containers/users/Sector'

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ ~@#$!%^&*()_+\-=[\]{;':\\|,.<>/?]/;

function Signup() {
  const signUpCtx = useContext(UserContext);
  const [showSectors, setShowSectors] = useState(false);
  const [selectSectors, setSelectSectors] = useState("- Сонго -");
  const [sectorId, setSectorId] = useState(null);
  const [Show, setShow] = useState(false);
  const [Show2, setShow2] = useState(false);
  const [sectorData, setSectorData] = useState([]);
  const [PassText, setPassText] = useState("");
  const [ errTextShow, setErrTextShow ] = useState(false);
  const [scale, setScale] = useState("1");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [color1, setColor1] = useState("rgba(0,0,0,0.7)");
  const [reg, setReg] = useState('');

  const registerHandle = (e) =>{
    if(e.target.value.length < 8){
      setReg(e.target.value);
    }
  }

  const [password, setPassword] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({
    minCar: null,
    number: null,
    specialChar: null
  });

  const openModal = () => { setVisible(false); setVisible2(true); }
  const closeModal = () => { setVisible(false); }
  const closeModal3 = () => { setVisible2(false); setVisible(false); }
  const closeModal2 = () => {
    let confirm = document.getElementById("GetcheckBtn2").checked;
    if (confirm === true) { setVisible2(false); setVisible(true); } else { setColor1("red"); }
  }

  const keyPress = useCallback(e => {
    if (e.key === 'F2') { openModal(); }
  }, []);

  useEffect(() => {
    axios.get(`business-sector`).then(res => setSectorData(res.data.data));
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress]);

  const onChangePassword = password => {
    setPassword(password);
    setPasswordValidity({
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false
    });
  }

  const handleClick = () => {
      let rs = document.querySelectorAll(".userInp"); let arr = Array.from(rs); let finalOne = {};
      arr.forEach(element => {
        if (element.value !== "") {
          element.classList = - " red"
          element.classList += " userInp"
          let field = element.name; let value = element.value; finalOne[field] = value;
        } else { element.classList += " red" }
      });
      let keys = Object.keys(finalOne);
      if (keys.length < 6) {
        setPassText("Гүйцэд бөгөлнө үү"); setScale("1"); setTimeout(() => { setScale("0"); setPassText(null);  }, 3000);
      }else if(reg.length !== 7){
        setPassText("Регистрийн дугаараа дахин шалгана уу"); setScale("1"); setTimeout(() => { setScale("0"); setPassText(null);  }, 3000);
      }else if (selectSectors === "- Сонго -") {
        setPassText("Салбараа сонгоно уу"); setScale("1"); setShowSectors(true); setTimeout(() => { setScale("0"); setPassText(null); }, 3000);
        // if(selectSectors!=="- Сонго -"){
        //   setPassText("");setScale("0");
        // }
      } else if (passwordValidity.minChar === false || passwordValidity.number === false || passwordValidity.specialChar === false) {
        setPassText("Нууц үг хийх хэсэгээ шалгана уу.."); setScale("1"); setTimeout(() => { setScale("0"); setPassText(null); }, 3000);
      } else if (finalOne.password !== finalOne.passwordagain) {
        setPassText("Нууц үг адил биш байна..."); setScale("1"); setTimeout(() => { setScale("0"); setPassText(null); }, 3000);
      } else {
        finalOne["business_sectorId"] = sectorId; setPassText(""); signUpCtx.signUpUser(finalOne); setScale("1");
      }
  }
  const cond = signUpCtx.errMsgSignup.cond;

  return (
    <Component className="SignUp">
      {showSectors && <GhostPar><div onClick={() => setShowSectors(false)} className="Ghost"></div> <div className="Sectorpar"><SEctor data={sectorData} setSectorId={setSectorId} setSelectSectors={setSelectSectors} setShowSectors={setShowSectors} /></div></GhostPar>}
      <span >Та бүртгэл үүсгээгүй бол
            {/* <Switch>
                <Link to="/signup"><a><span className="SignBtn"> Бүртгүүлэх </span></a></Link>
            </Switch> */}
        <a><span className="SignBtn" onClick={openModal} > Бүртгүүлэх </span></a> дарна уу.</span>
      {/* <form onSubmit={handleClick}> */}
      <Modal visible={visible2} width="800" height="90%" effect="fadeInDown" onClickAway={closeModal3} >
        <div className="Modaltest">
          <div className="ModalTextPar">
            <div className="redPAr">
              <div className="redTitle">
               Түншлэлийн хөтөлбөрт өргөдөл гаргаж буй экспортын чиг баримжаатай болон экспортлогч аж ахуйн нэгж, кластеруудад АНХААРУУЛАХ нь:
              </div>
              <div className="redDesc">
                  Доорх хориглосон үйл ажиллагаа, бүтээгдэхүүн, үйлчилгээ болон зардлуудыг Түншлэлийн хөтөлбөрийн хүрээнд санхүүжүүлэх БОЛОМЖГҮЙ болохыг АНХААРНА УУ:
              </div>
            </div>

            <div className="mainText">
              <div className="title">САНХҮҮЖИЛТЭД ХАМРАГДАХГҮЙ ҮЙЛ АЖИЛЛАГАА</div>
              <ul className="desc">
                <li>Түншлэлийн хөтөлбөрт ирүүлсэн өргөдөл, экспорт хөгжлийн төлөвлөгөөнд тусгаагүй, дэмжлэг олгох гэрээ хийгдсэнээс өмнө эхэлсэн, хэрэгжиж дууссан үйл ажиллагаа;</li>
                <li>Хөрөнгө оруулалт, хөдлөх болон үл хөдлөх хөрөнгө худалдан авах (дэд бүтэц, барилга байгууламж барих, өргөтгөх, сэргээн засварлах, шинэчлэх, газар, тоног төхөөрөмж, машин, механизм худалдан авах биет хөрөнгө оруулалт, дүрмийн сан бүрдүүлэх, үнэт цаас худалдан авах);</li>
                <li>Өдөр тутмын үйл ажиллагааны санхүүжилт (цалин, түрээс, түүхий эдийн худалдан авалт, дотоодын зар сурталчилгаа цацах, өр цуглуулах үйлчилгээ, үл хөдлөх агентын үйлчилгээ, архитекторын үйлчилгээ, оффис болон үйлдвэрийн үйлчилгээ, өдөр тутмын бизнесийн үйл ажиллагаанд шаардлагатай хэвлэх болон график дизайн, бохирдлын хянах үйл ажиллагаа, хөдөлмөр эрхлэлтийн журам, бүсчлэлийн шаардлага болон болон гүйцэтгэлийн төлбөр, банкны хүү, хураамж, бусдад төлөх өр болон хүү, валютын ханшийн алдагдал, хураамж, торгууль, хандив, тусламж)</li>
                <li>Өргөдөл гаргагчийн төлөвлөсөн үйл ажиллагааг гүйцэтгэх сургалт, судалгааны зөвлөх үйлчилгээ үзүүлэгч нь өргөдөл гаргагчтай хамаарал бүхий этгээд байх эсхүл ур чадварын хувьд хангалтгүй байх (тухайн салбартаа дор хаяж 10 жил ажилласан туршлагатай байх шаардлагатай); </li>
                <li>Олон Улсын Хөгжлийн Ассоциаци (ОУХА)-аас хориглосон бусад үйл ажиллагаа</li>
               
                
              </ul>
            </div>

            <div className="mainText">
              <div className="title">ДЭМЖЛЭГ ОЛГОХЫГ ХОРИГЛОХ БҮТЭЭГДЭХҮҮН, ҮЙЛЧИЛГЭЭНИЙ ЖАГСААЛТ: </div>
              <ul className="desc">
                <li>Уул уурхайн салбарын бүх төрлийн бүтээгдэхүүн, цэргийн болон тансаг хэрэглээний зориулалттай бараа бүтээгдэхүүн;</li>
                <li>Зорилтот бус салбар: Архины салбарын бүтээгдэхүүн (архи, пиво, гм); Тамхи (үйлдвэрлэлийн бус ба үйлдвэрлэлийн); Тамхины хатаасан навч боловсруулах машин; Уул уурхайн бүтээгдэхүүний үйлдвэрлэл, худалдаа; Такси үйлчилгээ; Тээвэрлэлт;</li>
                <li>Жилийн дундаж экспортын эргэлт 300 сая төгрөгөөс доош түүхий эд экспортлогчдын үйл ажиллагаа; Ре-экспортлогчид;</li>
                <li>Цэрэг арми болон цэрэгжсэн байгууллагад зориулсан тоног төхөөрөмж;</li>
                <li>Зэрлэг амьтан, ургамлын ховордсон төрөл зүйлийг олон улсын хэмжээнд худалдаалах тухай конвенц (CITES)-ийн хүрээнд хориглодог ан амьтан, ургамлын худалдаа;</li>
                <li>Байгаль, хүрээлэн буй орчинд генийн өөрчлөлтөд орсон организмуудыг гаргах; Хориглосон пестицид, хербицидийн үйлдвэрлэл, нийлүүлэлт, худалдаа; ОУХА-аас хориглосон химийн бүтээгдэхүүн ашигладаг мал тэжээлийн газар;</li>
                <li>Цацраг идэвхт бодис болон түүнтэй холбоотой материал; Аюултай хог хаягдлын хадгалалт, боловсруулалт, зайлуулалт; Цөмийн реактор, тэдгээрийн эд анги;</li>
                <li>Хлорфторт нүүрстөрөгчид, галонс болон Монреалийн протоколын хүрээнд зохицуулагддаг бусад бодисуудыг агуулсан тоног төхөөрөмж, хэрэгслийн үйлдвэрлэл; Олон хлорт бефенилиудын үзүүлэх нөлөө 0.005 хувиас хэтэрсэн агууламж бүхий цахилгаан хэрэгсэл, тоног төхөөрөмжийн үйлдвэрлэл;</li>
                <li>Шөрмөсөн чулуу агуулсан бүтээгдэхүүний үйлдвэрлэл; Зассан болон засаагүй сувд, хагас болон бүтэн эрдэнийн чулуу; Алт, мөнгө, платинум металлаар хийсэн үнэт эдлэлийн үйлдвэрлэл (үүнд цаг болон цагны хүрээ хамаарахгүй) болон алт, мөнгөний дархны газар; Алт, мөнгө (үүнд алтны хүдэр болон баяжмал хамаарахгүй);</li>
                <li>ОУХА-аас хориглосон бусад ижил төстэй үйлчилгээ, бараа бүтээгдэхүүн.</li>
              </ul>
            </div>

            <div className="btnPar">
              <span style={{ color: color1 }} className="text">Дээрх анхааруулгатай танилцан хүлээн зөвшөөрч байвал ✔ дарна уу..</span>
              <input name="confirm" id="GetcheckBtn2" className="check" type="checkbox" />
              <button onClick={closeModal2} className="btn btn-primary">Уншиж танилцсан</button>
            </div>

          </div>
        </div>
      </Modal>

      <Modal visible={visible} width="900" height="580" effect="fadeInDown" onClickAway={closeModal}  >
        <form>
          <div className="formOneParent">
            <div className="headPar"><span className="headText">Бүртгүүлэх</span>
              <a style={{cursor:"pointer"}} onClick={closeModal}>X</a>
            </div>

            {signUpCtx.errMsgSignup.cond === false ? (<div className="inputPar">
              <div className="UserSectionMiddle">
                <div className="inpChild">
                  <div className="labels"><span>Компаны нэр :</span> </div>
                  <div className="name">
                    <InputStyle className="newInp">
                      <input type="input" className="userInp form__field" placeholder="нэр..." name="companyname" required />
                      <div className="line"></div>
                    </InputStyle>
                    {/* <div className="form__group">
                                                          <input type="input" className="userInp  form__field" name="companyname" required />
                                                      </div> */}
                  </div>
                </div>
                <div className="inpChild">
                  <div className="labels"><span>Регистрийн дугаар :</span> </div>
                  <div className="name">
                    <InputStyle className="newInp">
                      <input type="number" value={reg} onChange={registerHandle} className="userInp form__field" placeholder="123..." name="companyregister" required />
                      <div className="line"></div>
                    </InputStyle>
                  </div>
                </div>
                <div className="inpChild sectorChild">
                  <div className="labels"><span>Салбарууд : </span> </div>
                  <div className="name">
                    <div onClick={() => setShowSectors(prev => !prev)} className="sectors" ><span>{selectSectors} </span>  <MdKeyboardArrowDown /> </div>
                  </div>
                </div>
              </div>

              <div className="UserSection">
                <div className="inpChild">
                  <div className="labels"><span>Нэр :</span> </div>
                  <div className="name">
                    <CgProfile />
                    <InputStyle className="newInp">
                      <input type="input" className="userInp form__field" placeholder="нэр..." name="name" required />
                      <div className="line"></div>
                    </InputStyle>
                  </div>
                </div>
                <div className="inpChild">
                  <div className="labels"><span>Email :</span> </div>
                  <div className="name">
                    <GoMail />

                    <InputStyle className="newInp">
                      <input type="email" className="userInp  form__field" placeholder="Цахим шуудан" name="email" required />
                      <div className="line"></div>
                    </InputStyle>

                  </div>
                </div>
              </div>

              <div className="UserSection">
                <div className="inpChild">
                  <div className="labels">
                    <span> Нууц үг </span>
                    <span className="forget"> 8-с дээш оронтой байх</span>
                  </div>
                  <div className="name">
                    <BiLockOpen />
                    <InputStyle className="newInp pass">
                      <input onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} onChange={e => onChangePassword(e.target.value)} value={password} type={Show ? 'text' : 'password'} className="userInp  form__field" placeholder="Нууц үг" name="password" />
                      {Show ? <FaRegEye onClick={() => setShow(false)} /> : <FaRegEyeSlash onClick={() => setShow(true)} />}
                      <div className="line"></div>
                    </InputStyle>

                  </div>
                  <PasswordInducator validity={passwordValidity} />
                </div>

                <div className="inpChild">
                  <div className="labels"> <span> Нууц үг давтах </span> </div>
                  <div className="name">
                    <BiLockOpen />
                    <InputStyle className="newInp pass">
                      <input type={Show2 ? 'text' : 'password'} className="userInp  form__field" placeholder="Нууц үгээ дахин оруулах" name="passwordagain" />
                      {Show2 ? <FaRegEye onClick={() => setShow2(false)} /> : <FaRegEyeSlash onClick={() => setShow2(true)} />}
                      <div className="line"></div>
                    </InputStyle>
                  </div>
                </div>
              </div>

              <div className="SubmitButtonPar">
                <NextBtn style={cond ? { width: `20%`, opacity: `0.7` } : { width: `100%`, opacity: `1` }} disabled={true} onClick={handleClick} className="SubmitButton" type="button">{cond ? <img src="/gif1.gif" alt="" /> : `Бүртгүүлэх`}  <div style={cond ? { display: `none` } : { display: `flex` }} className="flexchild"><AiOutlineSend /> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div>  </NextBtn>
                {PassText ?
                (<span className="colorText" style={{ transform: `scale(${scale})` }}>{PassText}</span>)
                :(<span className="colorText" style={{ transform: `scale(${scale})` }}>{signUpCtx.errMsgSignup.msg}</span>)}
              </div>
            </div>)
              : (<div className="success">
                <h3 className="title">Тавтай морил</h3>
                <span className="desc">{signUpCtx.errMsgSignup.msg}</span>
              </div>)}

          </div>
        </form>
      </Modal>
      {/* </form> */}
    </Component>
  )
}

export default Signup

const sectorAnimate = keyframes`
  0%{ transform:translateY(120px); opacity:0; }
  80%{ transform:translateY(-20px); opacity:0.8; }
  100%{ transform:translateY(0); opacity:1; }
`

const GhostPar = styled.div`
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  width:100vw;
  z-index:10010;
  .Ghost{
    background-color:rgba(250,250,250,0.3);
    backdrop-filter: blur(4px);
    position:fixed;
    height:100%;
    width:100%;
  }
  .Sectorpar{
    box-shadow:1px 1px 17px -6px rgba(0,51,102,1);
    animation: ${sectorAnimate} 0.6s ease;
    transition:all 0.3s ease;
    transform:scale(1);
    top:10%;
    left:25%;
    position:absolute;
    z-index:10;
  }
  @media only screen and (max-width:768px){
    .Sectorpar{
      top:10%;
      left:5%;
    }
  }
`

const Component = styled.div`
    margin-top:15px;
    text-align:center;
    .Modaltest{
      width:100%;
      height:100%;
      overflow-y:scroll;
      background-color:white;
      .ModalTextPar{
        color:black;
        font-size:13px;
        padding:20px 50px;
        .btnPar{
          border-top:1px solid rgba(0,0,0,0.1);
          padding:20px 0px;
          padding-bottom:30px;
          width:100%;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:flex-end;
          .text{
            font-size:13px;
            color:black;
            padding-right:10px;
            color:#339CFF;
          }
          .check{
            cursor:pointer;
            height:25px;
            width:25px;
            margin-right:30px;
          }
          button{

          }
        }
        .mainText{
          margin-bottom:20px;
          text-align:start;
          .title{
            margin-bottom:6px;
            font-size:14px;
            font-weight:500;
            .nemelt{
              font-size:13px;
              font-weight:400;
            }
          }
          .desc{
            list-style-position: outside;
            list-style-type: circle;
            margin-left:30px;
            li{
              margin:7px 0px;
            }
          }
        }
        .redPAr{
          margin-bottom:15px;
          .redTitle{
            font-size:15px;
            font-weight:500;
            color:#FF1300;
            margin-bottom:15px;
          }
          .redDesc{
            text-align:start;
            color:#FF4333;
          }
        }


      }
    }
    span{
        color:rgba(0,0,0,0.8);
        font-size:15px;
      }   
      a{
        text-decoration: none;
        .SignBtn{
            cursor:pointer;
            color:${Color};
        }
    }

      .formOneParent{
            border-top:4px solid ${Color};
            background-color:white;
            border-radius:5px;
            margin-bottom:16px;
            padding-bottom:20px 0px;
            padding:10px 60px;
            .success{
              padding:50px 0px;
              .title{
                color:${Color};
                padding:15px 0px;
              }
              .desc{
                font-size:16px;
              }
            }

            .headPar{
            padding:6px 0;
            font-size:1.3rem;
            border-bottom:1px solid rgba(63, 81, 181,0.3);
            color:black;
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            .headText{
                font-size:20px;
            }
          }
        .inputPar{
            display:flex;
            flex-direction:column;
            align-items:flex;
            justify-content:center;
            .UserSectionMiddle{
              display:flex;
              algin-items:center;
              justify-content:space-between;
              .inpChild{
                .labels{
                  span{
                    font-size:14px;
                    color:rgba(0,0,0,0.8);
                  }
                }
              }
                .sectorChild{
                  position:relative;
                  width:25%;
                  .sectors{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    font-weight:500;
                    cursor:pointer;
                    border:1px solid rgba(0,51,102,0.3);
                    width:100%;
                    border-radius: 2px;
                    transtion:all 0.3s ease;
                    overflow:hidden;
                    padding:8px 0px;
                    padding-left:0px;

                    span{ 
                      margin-top:-4px;
                      height:22px;
                      width:100%;
                      font-size:13px !important;
                      // padding:8px 0px;
                      padding-left:3px;
                    }
                    &:hover{
                      box-shadow:1px 1px 8px -4px rgba(0,51,102,1);
                    }
                    svg{
                      font-size:22px;
                      margin-right:0px;
                      margin-bottom:0px;
                    }
                  }
                }
            }
            .UserSection{
              display:flex;
              flex-direction:row;
              justify-content:space-between;
              .passIndPar{
                // margin-top:15px;
                text-align:start;
                font-size:13px;
              }
              .inpChild{
                width:46%;
                  margin:12px 0px;
                  display:flex;
                  flex-direction:column;
                  .labels{
                      display:flex;
                      flex-direction:row;
                      justify-content:space-between;
                      font-size:13px;
                      span{
                          font-size:14px;
                          color:rgba(0,0,0,0.8);
                          font-weight:500;
                      }
                      .forget{
                       color:rgba(${ColorRgb},0.9);
                       font-weight:600;
                          cursor:pointer;
                          &:hover{
                               color:rgba(${ColorRgb},0.7);
                          }
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
                     margin-bottom:5px;
                   }
                   .pass{
                        svg{
                          position:absolute;
                          right:0;
                          bottom:2px;
                          font-size:18px;
                          color:rgba(0,0,0,0.9);
                          cursor:pointer;
                        }
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
        .SubmitButtonPar{
            margin-top:12px;
            margin-bottom:20px;
            text-align:end;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            .colorText{
              width:100%;
              text-align:center;
              background-color: #f6c343;
              box-shadow:1px 1px 10px -2px black;
              border-radius:5px;
              font-size:15px;
              font-weight:400;
              color:black;
              margin-top:18px;
              line-height:34px;
            }
            .colorTextgreen{
              background-color:green;
              box-shadow:1px 1px 10px -2px black;
              border-radius:5px;
              font-size:15px;
              font-weight:400;
              color:white;
              margin:16px 0;
              line-height:24px;
              padding:3px 15px; 
            }
         
            .SubmitButton{
                width:100%;
                font-size:14px;
            }
          }
        }
     
      @media only screen and (max-width:768px){
            .formOneParent{
              width:100%;
              height:100%;
              overflow-y:scroll;
              padding:10px 18px;
              .SubmitButtonPar{
                flex-direction: column-reverse;
              }
                .inputPar{
                  .UserSectionMiddle{
                    flex-direction: column;
                  }
                }
                .headPar{
                    font-size:1em;
                    .headText{
                        font-size:14px;
                    }
                }
              .inputPar{
                .UserSection{
                  flex-direction:column;
                  .inpChild{
                    width:100%;
                  }
                }
                .UserSectionMiddle{
                  .sectorChild{
                    width:100%;
                  }
                }
              }
            }
      }
      
`