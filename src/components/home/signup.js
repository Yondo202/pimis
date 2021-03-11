import React, { useState, useContext, useEffect,useCallback } from 'react'
import styled from 'styled-components'
import {Color,ColorRgb,InputStyle,NextBtn} from "../theme"
import Modal from 'react-awesome-modal';
import {CgProfile} from 'react-icons/cg'
import {GoMail} from 'react-icons/go'
import {BiLockOpen} from 'react-icons/bi'
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from '../../context/UserContext'
import PasswordInducator from './PasswordIndicator'
import axios from '../../axiosbase';

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ ~@#$%^&*()_+\-=[\]{;':\\|,.<>\/?]/;

function Signup() {
    const signUpCtx = useContext(UserContext);
    const [ sectorData, setSectorData ] = useState([]);
    const [PassText, setPassText] = useState("");
    const [scale, setScale] = useState("1");
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [ color1, setColor1 ] = useState("rgba(0,0,0,0.7)");
    const [passwordValidity, setPasswordValidity  ] = useState({
      minCar: null,
      number: null,
      specialChar: null
    });

    const openModal=()=> { setVisible(false); setVisible2(true); }
    const closeModal=()=> { setVisible(false); }
    const closeModal3=()=> { setVisible2(false);  setVisible(false); }
    const closeModal2=()=> {
      let confirm = document.getElementById("GetcheckBtn2").checked;
      if(confirm === true){ setVisible2(false);  setVisible(true); }else{ setColor1("red"); }
    }

    const keyPress = useCallback(e=>{
      if(e.key === 'F2'){ openModal(); }
    },[]);

    useEffect( async ()=>{
        const sectorData = await axios.get(`business-sector`); setSectorData(sectorData.data.data);
        console.log(sectorData," sector data");
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    },[keyPress]);

    const onChangePassword =password =>{
      setPassword(password);
      setPasswordValidity({
        minChar: password.length >=8 ? true : false,
        number: isNumberRegx.test(password) ? true : false, 
        specialChar: specialCharacterRegx.test(password) ? true : false
      });
    }
    
    const handleClick = () =>{
             let rs = document.querySelectorAll(".userInp"); let arr = Array.from(rs);  let finalOne = {};
            arr.map(element=>{
              if(element.value !== "- Сонго -" && element.value !== "" ){
                let field = element.name;  let value = element.value;  finalOne[field] = value;  }
            });
            let keys = Object.keys(finalOne);
            if(keys.length < 7){
              setPassText("Гүйцэд бөгөлнө үү");
            }else if(passwordValidity.minChar === false || passwordValidity.number === false || passwordValidity.specialChar === false){
              setPassText("Нууц үг хийх хэсэгээ шалгана уу..");
            }else if(finalOne.password !== finalOne.passwordagain) {
              setPassText("Нууц үг адил биш байна...");
            }else{
               setPassText(""); signUpCtx.signUpUser(finalOne); setScale("1"); 
              //  setTimeout(()=>{ setVisible(false); setVisible2(false); },10000);
            }
    }
    const cond =signUpCtx.errMsgSignup.cond;
 
    return (
        <Component className="SignUp">
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
                                    <div className="redTitle">Түншлэлийн Хөтөлбөрт хамрагдах гэж буй экспортын чиг баримжаатай, экспортлогч ААН, Кластеруудад АНХААРУУЛАХ нь:</div>
                                    <div className="redDesc">Эдгээр хориглосон үйл ажиллагаа, бүтээгдэхүүн, үйлчилгээ болон зардлуудыг Түншлэлийн Хөтөлбөр санхүүжүүлэх БОЛОМЖГҮЙ гэдгийн АНХААРНА УУ:</div>
                                </div>

                                <div className="mainText">
                                    <div className="title">Хориглох үйл ажиллагааны жагсаалт:</div>
                                    <ul className="desc">
                                      <li>Түншлэлийн хөтөлбөрт өргөдөл гаргахдаа төлөвлөгөөнд тусгагдаагүй, үл хамаарах үйл ажиллагаа</li>
                                      <li>Бизнесийн төлөвлөгөө нь шинэ бүтээгдэхүүн, шинэ зах зээлийг дэмжиж төрөлжүүлэх эсвэл борлуулалтыг нэмэгдүүлэхэд чиглэгдээгүй бол</li>
                                      <li>Бизнесийн төлөвлөгөө, үнэ цэнэ багатай, жинхэнэ эрэлт хэрэгцээнд суурилсан бус зөвлөхүүдийн дэмжлэгтэй бизнес төлөвлөгөө бол</li>
                                      <li>Түншлэлийн санхүүгийн дэмжлэг олгох шийдвэр гаргахаас өмнө хэрэгжиж дууссан үйл ажиллагаа</li>
                                      <li>Олон Улсын Хөгжлийн Ассоциациас хориглосон бусад үйл ажиллагаа</li>
                                    </ul>
                                </div>

                                <div className="mainText">
                                    <div className="title">Түншлэлийн санхүүгийн дэмжлэг олгохыг хориглох бүтээгдэхүүн, үйлчилгээний жагсаалт: <span className="nemelt">Уул уурхайн салбарын бүх төрлийн бүтээгдэхүүнүүд, цэргийн болон тансаг хэрэглээний зориулалттай барааг хамааруулна. Тодруулбал:</span></div>
                                    <ul className="desc">
                                      <li>Уул уурхайн бүтээгдэхүүн</li>
                                      <li>Жилийн дундаж экспортын эргэлт 100 мянган ам.доллараас доош түүхий эд экспортлогчдыг</li>
                                      <li>Ре-экспорт</li>
                                      <li>Цэрэг арми болон цэрэгжсэн байгууллагад зориулсан тоног төхөөрөмж</li>
                                      <li>Зэрлэг амьтан, ургамлын ховордсон төрөл зүйлийг олон улсын хэмжээнд худалдаалах тухай конвенц (CITES)-ийн хүрээнд хориглодог ан амьтан, ургамлын худалдаа</li>
                                      <li>Байгаль, хүрээлэн буй орчинд гений өөрчлөлтөд орсон организмуудыг гаргах</li>
                                      <li>Хориглосон пестицид, хербицидийн үйлдвэрлэл, нийлүүлэлт, худалдаа</li>
                                      <li>Цацраг идэвхт бодис олон түүнтэй холбоотой материал</li>
                                      <li>Аюултай хог хаягдлын хадгалалт, боловсруулалт, зайлуулалт</li>
                                      <li>Хлорфторт нүүрстөрөгчид, галонс болон Монреалын протоколын хүрээнд зохицуулагддаг бусад бодисууд агуулсан тоног төхөөрөмж, хэрэгслийн үйлдвэрлэл</li>
                                      <li>Олон хлорт бефенилиудын үзүүлэх нөлөө 0.005 %-аас хэтэрсэн агууламж бүхий цахилгаан хэрэгсэл, тоног төхөөрөмжийн үйлдвэрлэл</li>
                                      <li>Шөрмөсөн чулуу агуулсан бүтээгдэхүүний үйлдвэрлэл</li>
                                      <li>Цөмийн реактор, тэдгээрийн эд анги</li>
                                      <li>Архины салбарын бүтээгдэхүүн (архи, пиво гэх мэт)</li>
                                      <li>Тамхи (үйлдвэрлэлийн бус ба үйлдвэрлэлийн); Тамхины хатаасан навч боловсруулах машин</li>
                                      <li>ОУХА-аас хориглосон химийн бүтээгдэхүүн ашигладаг мал тэжээлийн газар</li>
                                      <li>Зассан болон засаагүй сувд, хагас болон бүтэн эрдэнийн чулуу</li>
                                      <li>Алт, мөнгө, платинум металиар хийсэн үнэт эдлэлийн үйлдвэрлэл (үүнд цаг болон цагны хүрээ хамаарахгүй) болон алт, мөнгөний дархны газар</li>
                                      <li>Алт, мөнгө (үүнд алтны хүдэр болон баяжмал хамаарахгүй)</li>
                                      <li>ОУХА-аас хориглосон бусад ижил төстэй үйлчилгээ, бараа бүтээгдэхүүн</li>
                                    </ul>
                                </div>

                                <div className="mainText">
                                    <div className="title">Түшлэлийн санхүүгийн дэмжлэгт хамруулах боломжгүй зардлын жагсаалт:</div>
                                    <ul className="desc">
                                      <li>Хөрөнгө оруулалт<ul className="desc">
                                          <li>Экспортын бүтээгдэхүүний үйлдвэрлэлийн одоогийн дэд бүтэц, барилга байгууламжийг барих, өргөтгөх, сэргээн засварлах, шинэчлэх биет хөрөнгө оруулалт</li>
                                          <li>Дүрмийн сан бүрдүүлэх</li>
                                        </ul>
                                      </li>
                                      <li>Хөдлөх болон үл хөдлөх хөрөнгө:  <ul className="desc">
                                          <li>Газар худалдан авах</li>
                                          <li>Үл хөдлөх хөрөнгийн зардал (барилга байгууламж, бусад хөрөнгө)</li>
                                          <li>Хөдлөх хөрөнгийн зардал (машин механизм, ерөнхий програм хангамж, техник хангамж)</li>
                                          <li>Өгөөж өгөх хөрөнгө (хувьцаа, үнэт цаас, бонд, хувьцааны багц, түрээсийн эд хөрөнгө, эсвэл үйлдвэр)</li>
                                        </ul>
                                      </li>
                                      <li>Өдөр тутмын үйл ажиллагааны зардал: <ul className="desc">
                                          <li>Цалин, хураамж, тэтгэмж, даатгалын шимтгэл, татвар</li>
                                          <li>Материалын зардал, оффисын цэвэрлэгээ, засвар үйлчилгээний зардал болон бусад үйл ажиллагааны зардал, зар сурталчилгааны зардал</li>
                                          <li>"Нэг удаагийн" дэмжлэг, бизнесийн ердийн зардал: өр цуглуулах үйлчилгээ, үл хөдлөх агентын үйлчилгээ, архитекторын үйлчилгээ, оффис болон үйлдвэрийн үйлчилгээ, өдөр тутмын бизнесийн үйл ажиллагаанд шаардлагатай хэвлэх болон график дизайн, бохирдлын хянах үйл ажиллагаа, хөдөлмөр эрхлэлтийн журам, бүсчлэлийн шаардлага болон болон гүйцэтгэлийн төлбөр</li>
                                        </ul>
                                      </li>
                                      <li>Бусад зардал: <ul className="desc">
                                          <li>Банкны хүү, хураамж, бусдад төлөх өр болон хүү</li>
                                          <li>Валют ханшийн алдагдал, хураамж, торгууль</li>
                                          <li>Хандив, тусламж</li>
                                          <li>Туршлага нь төлөвлөсөн ажилд тэнцэхгүй (шинжээч нь дор хаяж 10 жилийн туршлагатай байх) эсвэл ААН, Кластерийн гишүүдтэй шууд харилцаатай байх судалгаа, сургалтын шинжээчийн төлбөр</li>
                                          <li>Батлагдахаас өмнө гарсан төлбөр</li>
                                        </ul>
                                      </li>
                                    </ul>
                                </div>
                                  
                                <div className="btnPar">
                                    <span style={{color:color1}} className="text">Дээрх анхааруулгатай танилцан хүлээн зөвшөөрч байвал ✔ дарна уу..</span>
                                   <input name="confirm" id="GetcheckBtn2" className="check" type="checkbox" />
                                   <button onClick={closeModal2} class="btn btn-primary">Уншиж танилцсан</button>
                                </div>

                              </div>
                          </div>
                </Modal>

                <Modal visible={visible} width="900" height="580" effect="fadeInDown" onClickAway={closeModal}  >
                            <div className="formOneParent">
                              <div className="headPar"><span className="headText">Бүртгүүлэх</span>
                                <a href="javascript:void(0);" onClick={closeModal}>X</a>
                              </div>

                              {signUpCtx.errMsgSignup.cond===false? (<div className="inputPar">
                                      <div className="UserSectionMiddle">
                                          <div className="inpChild">
                                                <div className="labels"><span>Компаны нэр :</span> </div>
                                                <div className="name">
                                                <InputStyle className="newInp">
                                                    <input type="input" className="userInp  form__field" placeholder="нэр..." name="companyname" required />
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
                                                        <input type="number" className="userInp  form__field" placeholder="123..." name="companyregister" required />
                                                        <div className="line"></div>
                                                    </InputStyle>
                                                </div>
                                            </div>
                                            <div className="inpChild sectorChild">
                                                <div className="labels"><span>Салбарууд :</span> </div>
                                                <div className="name">
                                                    <div className="form__group">
                                                      <select name="business_sectorId" className="userInp sectors" >
                                                          <option disabled selected >- Сонго -</option>
                                                          {sectorData.map((el,i)=>{
                                                            return( <option key={i} value={el.id}>{el.bdescription_mon}</option> )
                                                          })}
                                                      </select>
                                                        {/* <input type="input" className="userInp  form__field" name="sectors" required />
                                                        <label for="name" className="form__label"> </label> */}
                                                    </div>
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
                                                      <InputStyle className="newInp">
                                                          <input onFocus={()=> setPasswordFocused(true)} onBlur={()=> setPasswordFocused(false)} onChange={e => onChangePassword(e.target.value)} value={password} type="password" className="userInp  form__field" placeholder="Нууц үг" name="password" required />
                                                          <div className="line"></div>
                                                      </InputStyle>

                                                  </div>
                                              {passwordFocused && <PasswordInducator validity={passwordValidity} />}
                                            </div>

                                            <div className="inpChild">
                                                <div className="labels"> <span> Нууц үг давтах </span> </div>
                                                  <div className="name">
                                                      <BiLockOpen />
                                                      <InputStyle className="newInp">
                                                          <input  type="password" className="userInp  form__field" placeholder="Нууц үгээ дахин оруулах" name="passwordagain" required />
                                                          <div className="line"></div>
                                                      </InputStyle>
                                                  </div>
                                            </div>
                                        </div>

                                          <div className="SubmitButtonPar">
                                                <NextBtn style={cond? {width:`20%`,opacity:`0.7`} :{width:`100%`,opacity:`1`}} disabled={true} onClick={handleClick} className="SubmitButton" type="button">{cond? <img src="/gif1.gif" /> : `Бүртгүүлэх` }  <div style={cond? {display:`none`} :{display:`flex`}} className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div>  </NextBtn>
                                                {PassText? (<span className="colorText" style={{transform:`scale(${scale})`}}>{PassText}</span>) :  (<span className="colorText" style={{transform:`scale(${scale})`}}>{signUpCtx.errMsgSignup.msg}</span>)}  
                                          </div>
                                      </div>) 
                                        :( <div className="success">
                                              <h3 className="title">Тавтай морил</h3>
                                              <span className="desc">{signUpCtx.errMsgSignup.msg}</span>
                                          </div>   )}
                                
                          </div>
                </Modal>
                {/* </form> */}
        </Component>
    )
}

export default Signup


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
                width:25%;
                .sectors{
                  font-size:13px !important;
                  border-radius: 2px;
                  border:1px solid rgba(0,51,102,0.2);
                  width:100%;
                  padding:7px 0px;
                  padding-left:10px;
                  font-size: 1rem;
                  option{

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