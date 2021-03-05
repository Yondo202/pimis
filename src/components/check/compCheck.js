import React,{useState, useContext,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import {IoMdCheckmarkCircle,IoIosArrowBack  } from 'react-icons/io';
import { fontFamily, textColor, Color,fontSize,NextBtn } from '../theme';
import {AiOutlineSend} from 'react-icons/ai'
import {CgDanger} from 'react-icons/cg'
import UserContext from '../../context/UserContext'
import AccessToken from '../../context/accessToken'
import axios from '../../axiosbase'
import {RiArrowGoBackFill  } from 'react-icons/ri';
import Modal from 'react-awesome-modal';
import { motion } from 'framer-motion';

function CompCheck() {
    const init = "once";
    const param = useParams().url;
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [ success, setSuccess ] = useState(0);
    const [ btnCond, setBtnCond ] = useState(init);
    const [ secondChance, setSecondChance ] = useState({});
    const [visible2, setVisible2] = useState(false);
    const [ BtnSpin, setBtnSpin ] = useState(false);
    const [ updateMount, setUpdateMount ] = useState(0);
    const [ initialData, setInitialData ] = useState(allData);
    const [opacity, setOpacity] = useState("0");
    const [opacity2, setOpacity2] = useState("0");
    const [procent, setProcent] = useState('0');
    const [FinalErrorText, setFinalErrorText] = useState("");

    useEffect(async()=>{
        const localId = localStorage.getItem("userId");
        console.log('localId', localId)
        const data =  await axios.get(`criterias${param!=="user"?`?userId=${param}`:`?userId=${localId}`}`,{ headers: { Authorization:AccessToken() } });
        console.log(data, " my data");
        let keys = Object.keys(data.data.data);
        if(keys.length > 1){
          setSuccess(data.data.data.approved);
          let filterArr = []; let value = Object.values(data.data.data);
          keys.map((el,i)=>{ let obj1 = {}; value.map((elem,ind)=>{  if(i===ind){ obj1["keys"] = el;  obj1["values"] = elem; }}); filterArr.push(obj1); });
          allData.map(el=>{ el.items.map((elem,ind)=>{filterArr.map(element=>{ if(el.group + (ind + 1) === element.keys){ elem["value"] = element.values };}); });});
          setInitialData(allData); setUpdateMount(1);
        }else{ console.log("^^data alga") }
    },[updateMount]);

    const NextPageHandle = (el) =>{ history.push(el); };

    const clickHandles = (btn) =>{
              let rs2 = document.querySelectorAll(".inpTest333"); let arr2 = Array.from(rs2); let soloObject2 = {};  const cond = {};
              arr2.map((element,i)=>{
                  if(element.checked === true){
                    let field = element.name; let value = element.value;  let id = element.id; soloObject2[id + field] = value;
                  }
                  if( element.checked === true && element.id + element.name !== "a6" && element.id + element.name !== "a7" && element.value === "false"){
                    let field = element.name; let value = element.value;  let id = element.id; cond[id + field] = value; 
                  }
              });
              let finalCond = Object.keys(cond);
              let keys = Object.keys(soloObject2);
              const Procent = keys.length * 100 / 25;
              const FinalProcent = Math.round(Procent);

              if(keys.length < 25){
                setOpacity("1");
                setProcent(FinalProcent);
              }else if(finalCond.length > 0){
                setOpacity("0");
                setSecondChance(cond);
                if(btn==="twice"){
                  soloObject2["approved"] = 1
                  setBtnSpin(true);
                  setOpacity("0");
                  setOpacity2("0");
                  setVisible2(false);
                  axios.post(`criterias`, soloObject2, {headers:{ Authorization:AccessToken() } }).then(res=>{
                    setUpdateMount(2); ctx.alertText('orange, Өргөдөл гаргах боломжгүй бөгөөд цааш дамжлагад тэнцэхгүй байна.', true); setBtnSpin(false);
                    setTimeout(()=>{history.push('/');},4000);
                  }).catch(err=>{setFinalErrorText("Серверт алдаа гарлаа."); setBtnSpin(false);});
                }else if(btn==="once"){
                  setVisible2(true);
                }
              }else{
                soloObject2["approved"] = 2
                setBtnSpin(true);
                setOpacity("0");
                setOpacity2("0");
                axios.post(`criterias`, soloObject2, {headers:{ Authorization:AccessToken() } }).then(res=>{
                  console.log(res);
                  setUpdateMount(2); ctx.alertText('green, Амжилттай илгээгдлээ', true); setBtnSpin(false);
                }).catch(err=>{setFinalErrorText("Серверт алдаа гарлаа."); setBtnSpin(false);});
              }
    }

    const closeModalX=()=>{ setVisible2(false); }
    const closeModal=()=>{ setBtnCond("twice");  setVisible2(false); }

    return (
      <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
           <Component1 className="container" >
              {param!=="user"? ( updateMount!==0? <div className="boxShadow">
                    <div className="rowHeader">Шалгуур хангалтыг тулгах хуудас <span className="tseg">*</span></div>
                    {initialData.map((el,i)=>{
                        return(
                            <div key={i} className="formTwoParent ">
                              <div className="headerPar">
                                  <div className="row" >
                                  <div className="head1 col-md-10 col-sm-8 col-8">{el.title}</div>
                                  <div className="head2 col-md-1 col-sm-2 col-2">Тийм</div>
                                  <div className="head2 col-md-1 col-sm-2 col-2">Үгүй</div>
                                  </div>
                              </div>
                              {el.items.map((elem, ind)=>{
                                  return(
                                  <div className="headerParchild" key={ind}>
                                    <div className="row" >
                                        <div className="number col-md-1 col-sm-1 col-1">{`${ind + 1}`}</div>
                                        <div className="texts col-md-9 col-sm-7 col-7">{elem.name}</div>
                                        <div className="radios col-md-1 col-sm-2 col-2"><input checked={ updateMount!==0? elem.value === true? true: false : null } className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="true"/></div>
                                        <div className="radios col-md-1 col-sm-2 col-2"><input checked={ updateMount!==0? elem.value === false? true: false : null }  className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="false"/></div>
                                    </div>
                                  </div>
                                  )
                              })}
                        </div>)})}

                        <div className="FinalBtn">
                            <div style={{opacity:`${opacity}`}} className="errtext">Таны асуулга {procent}% байна..</div>
                            <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div>
                        </div>
                        <div className="Success">
                            <NextBtn onClick={()=>NextPageHandle(`/progress/${param}`)} className="NextPageBtn" type="button"><div className="flexchild"><IoIosArrowBack/><IoIosArrowBack className="hide" /> <IoIosArrowBack className="hide1" /></div>Буцах</NextBtn>
                            {success === 1? <div className="item not"><IoMdCheckmarkCircle />Үндсэн шалгуурыг хангаагүй байна...</div> : success=== 2? <div className="item"><IoMdCheckmarkCircle />Та манай үндсэн шалгуурыг хангаж байна</div> :null }
                        </div> 
                </div> : ( <NullParent className="BtnPar"><button onClick={()=>NextPageHandle(`/progress/${param}`)}><RiArrowGoBackFill /> Буцах</button> <h2 style={{textAlign:"center"}}>Мэдээлэл оруулаагүй байна</h2> </NullParent> ) )
                :  (  <div className="boxShadow">
                    <div className="rowHeader">Шалгуур хангалтыг тулгах хуудас <span className="tseg">*</span></div>
                    {initialData.map((el,i)=>{
                        return(
                            <div key={i} className="formTwoParent ">
                              <div className="headerPar">
                                  <div className="row" >
                                  <div className="head1 col-md-10 col-sm-8 col-8">{el.title}</div>
                                  <div className="head2 col-md-1 col-sm-2 col-2">Тийм</div>
                                  <div className="head2 col-md-1 col-sm-2 col-2">Үгүй</div>
                                  </div>
                              </div>
                              {el.items.map((elem, ind)=>{
                                  return(
                                  <div className="headerParchild" key={ind}>
                                      <div className="row" >
                                      <div className="number col-md-1 col-sm-1 col-1">{`${ind + 1}`}</div>
                                      <div className="texts col-md-9 col-sm-7 col-7">{elem.name}</div>
                                      
                                      <div className="radios col-md-1 col-sm-2 col-2"><input checked={ updateMount!==0? elem.value === true? true: false : null } className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="true"/></div>
                                      <div className="radios col-md-1 col-sm-2 col-2"><input checked={ updateMount!==0? elem.value === false? true: false : null }  className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="false"/></div>
                                  </div>
                                  </div>
                                  )
                              })}
                        </div>)})}

                      <Modal visible={visible2} width="800" effect="fadeInDown" >
                              <div className="Modaltest">
                                <div onClick={closeModalX} className="headPar"><span >x</span></div>
                                  <div className="ModalTextPar">
                                    <div className="redPAr">
                                        <div className="redDesc">Таныг бөгөлсөн мэдээллээ дахин нэг шалгахыг хүсэж байна:</div>
                                    </div>
                                    <div className="mainText">
                                        <div className="title">Доорх асуултуудад "ҮГҮЙ" гэж хариулсандаа итгэлтэй байна уу?:</div>
                                        <ul className="desc">
                                          {secondChance.a1&&<li>100 хувь хувийн ААН мөн эсэх</li>}
                                          {secondChance.a2&&<li>2 жилийн турш тогтмол үйл ажиллагаа явуулсныг батлах санхүүгийн тайлантай эсэх</li>}
                                          {secondChance.a3&&<li>Уул уурхайн салбарт ажилладаггүй эсэх</li>}
                                          {secondChance.a4&&<li>Ре-экспортын худалдаа эрхэлдэггүй эсэх</li>}
                                          {secondChance.a5&&<li>Түүхий эд экспортлогч бус эсэх /хэрэв жилийн 100 мянган ам.доллараас дээш экспорт хийдэг бөгөөд энэ ойрын хугацаанд боловсруулсан бүтээгдэхүүний экспорт хийхээр зорьж буй бол тийм гэж дугуйлна уу</li>}
                                          {secondChance.b1&&<li>12 сараас дээш хугацааны нийгмийн даатгалын өргүй бөгөөд нотлох тодорхойлолттой эсэх</li>}
                                          {secondChance.b2&&<li>12 сараас дээш хугацааны татварын өргүй бөгөөд нотлох тодорхойлолттой эсэх</li>}
                                          {secondChance.b3&&<li>Монголбанкны муу ангиллын зээлгүй бөгөөд нотлох тодорхойлолттой эсэх</li>}
                                          {secondChance.c1&&<li>Ерөнхийлөгчтэй холбоогүй</li>}
                                          {secondChance.c2&&<li>Ерөнхий сайдтай холбоогүй</li>}
                                          {secondChance.c3&&<li>УИХ-н гишүүнтэй холбоогүй</li>}
                                          {secondChance.c4&&<li>Үндсэн хуулийн цэцийн гишүүдтэй холбоогүй</li>}
                                          {secondChance.c5&&<li>Дээд шүүхийн шүүгчидтэй холбоогүй</li>}
                                          {secondChance.c6&&<li>Улсын прокурортой холбоогүй</li>}
                                          {secondChance.c7&&<li>Аймаг, нийслэлийн засаг даргатай холбоогүй</li>}
                                          {secondChance.c8&&<li>Сайд, Төрийн нарийн бичгийн даргатай холбоогүй</li>}
                                          {secondChance.c9&&<li>Яам, хэрэгжүүлэгч агентлагуудын захирал, дарга нартай холбоогүй</li>}
                                          {secondChance.c10&&<li>Төрийн өмчит компаниудын захирал, дарга нартай холбоогүй</li>}
                                          {secondChance.d1&&<li>Экспортын чиглэлээр санхүүжилт хүсч, хийхээр төлөвлөсөн ажил нь гэрээ шалгаруулалт хийгдэж, гэрээ зурагдсанаас хойш 9 сарын дотор хэрэгжиж дуусах боломжтой эсэх</li>}
                                          {secondChance.d2&&<li>Экспортыг дэмжих төслөөс хүсч буй дэмжлэгтэй тэнцүү дүнгээр санхүүжилт гаргах боломжтой бөгөөд бэлэн эсэх</li>}
                                          {secondChance.d3&&<li>Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр өмнө гарсан зардлыг санхүүжүүлэхгүй эсэх</li>}
                                          {secondChance.d4&&<li>Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр зөвхөн зөвшөөрөгдсөн үйл ажиллагааг санхүүжүүлэх эсэх</li>}
                                          {secondChance.f1&&<li>Ирэх нэг жилийн хугацаанд Экспортыг дэмжих төслөөс зохион байгуулах арга хэмжээнд хамтарч, бусад экспортлогчид болон шинээр экспортлохоор зорьж буй аж ахуйн нэгжүүдийг бэлтгэх сургалт, мэдээлэл хуваалцах ажлилд өөрийн байгууллагын туршлага, мэдлэгээ хуваалцаж, идэвхитэй оролцох эсэх</li>}
                                        </ul>
                                    </div>
                                    <div className="btnPar">
                                        <button onClick={()=>{clickHandles("twice"); closeModal()}} class="btn btn-primary">Тийм &nbsp;&nbsp; (илгээх)</button>
                                        <button onClick={closeModal} class="btn btn-primary">Үгүй &nbsp;&nbsp; (буцах)</button>
                                    </div>
                                  </div>
                              </div>
                      </Modal>

                        <div className="FinalBtn">
                            <div style={{opacity:`${opacity}`}} className="errtext">Таны асуулга {procent}% байна..</div>
                            <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div>
                        </div>

                      {updateMount!==0?success===1? <div className="Success"> <div className="item not"><IoMdCheckmarkCircle />Өргөдөл гаргах боломжгүй бөгөөд цааш дамжлагад тэнцэхгүй байна.</div> </div> 
                      : <div className="Success">
                          <div className="item"><IoMdCheckmarkCircle />Та манай үндсэн шалгуурыг хангаж байна</div>
                          <NextBtn onClick={()=>NextPageHandle('/request/user')} className="NextPageBtn" type="button">Байгаль орчны үнэлгээний асуумж<div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
                        </div> 
                      :( <div className="buttonPar">
                          <div style={{opacity:`${opacity2}`}} className="errtext"><CgDanger /> {FinalErrorText}</div>
                          <NextBtn onClick={()=>clickHandles(btnCond)} style={BtnSpin===false? { width:"40%" }:{ width:"10%" }} className="SubmitButton" type="button"> {BtnSpin===false? <>Цааш <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div> </> : <img src="/gifff.gif" /> } </NextBtn>
                        </div> )}
                  </div>
                ) }

            </Component1>
      </motion.div>
        
    )
}

export default CompCheck


const NullParent = styled.div`
    dispaly:flex;
    flex-direction:row;
    align-items:center;
    button{
        padding:5px 10px;
        border:1px solid rgba(0,0,0,0.2);
        border-radius:3px;
        display:flex;
        svg{
            margin-right:6px;
        }
    }
`

let easing = [0, 0, 0.56, 0.95];
const textVariants2 = {exit: { y: -100, opacity: 0, transition: { duration: 0.9, ease: easing } },
    enter: { y: 0,opacity: 1,transition: { delay: 0.2, duration: 0.6, ease: easing }}};



const Component1 = styled.div`
    margin-top:40px;
    padding-bottom:80px;
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};

        .Modaltest{
          position:relative;
          width:100%;
          // height:100%;
          // overflow-y:scroll;
          background-color:white;
          .headPar{
            cursor:pointer;
            font-size:1.3rem;
            display:flex;
            align-items:center;
            justify-content:center;
            background-color:white;
            position:absolute;
            right:-10px;
            top:-10px;
            height:30px;
            width:30px;
            padding:5px 8px;
            border-radius:50%;
            a{
              color:black;
              text-decoration:none;
            }
          }
          .ModalTextPar{
            color:black;
            font-size:14px;
            padding:20px 50px;
            .btnPar{
              border-top:1px solid rgba(0,0,0,0.1);
              padding:20px 0px;
              padding-bottom:30px;
              width:100%;
              display:flex;
              flex-direction:row;
              align-items:center;
              justify-content:space-between;
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
                font-size:0.8rem;
                padding: .275rem 2.5rem;
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
                  padding:5px 0px;
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

      .boxShadow{
        box-shadow:1px 1px 18px -5px;
        border-radius:6px;
        margin-bottom:80px;

        .Success{
          padding:0px 30px;
          padding-bottom:30px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          .item{
            font-size:15px;
            display:flex;
            align-item:center;
            border-radius:4px;
            border:1px solid rgba(0,0,0,0.3);
            padding:10px 30px;
            
            svg{
              font-size:24px;
              margin-right:10px;
              color:green;
              background-color:white;
            }
          }
          .not{
            border:1px solid orange;
            svg{
              color:orange;
            }
          }
        }
          
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
        .formTwoParent{
            border-radius:0px 0px 6px 6px;
            background-color:white;
            font-size:${fontSize};
            .headerPar{
              background-color: rgba(0, 51, 102,0.9);
              color:white;
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              font-size:13px;
             
              .head1{
                padding-top: 10px;
                padding-bottom: 16px;
              }
              .head2{
                padding-bottom: 18px;
                border-left:1px solid rgba(0,0,0,0.4);
                padding:0px 0px;
                padding-top: 10px;
              }
            }
            .headerParchild{
              background-color: rgba(63, 81, 181,0.1);
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              .number{
                font-weight:500;
                text-align:center;
                border-right:1px solid rgba(0,0,0,0.4);
                padding-top: 10px;
                padding-bottom: 10px;
              }
              .texts{
                text-align:start;
                padding-top: 8px;
                padding-bottom: 8px;
              }
              .radios{
                display:flex;
                align-items:center;
                justify-content:center;
                border-left:1px solid rgba(0,0,0,0.4);
                padding:0px 0px;
                input{
                  cursor:pointer;
                  height:24px;
                  width:24px;
                  transition:all 0.4s ease;
                  border-radius:50% !important;
                  opacity: 0.8;
                  &:after{
                    content: "";
                    background: white;
                    display: block;
                    border-radius:50%;
                    position: absolute;
                    // transition: transform 1s ease;
                    transition: all 0.8s ease;
                    opacity: 0;
                    left:0%;
                    top:0%;
                    -webkit-transform: scale(2);
                    transform: scale(2);
                    height:24px;
                    width:24px !important;
                  }
                  &:active:after {
                    opacity: 1;
                    transition: 0s;
                    -webkit-transform: scale(0);
                    transform: scale(0);
                  }
                  ::-webkit-datetime-edit { 
                    font-size: 1.4rem;
                   }
                  &:checked{
                    opacity: 1;
                    -webkit-transform: scale(1.25);
                    transform: scale(1.25);
                    // box-shadow: 1px 1px 5px -2px;
                    border-radius:50% !important;
                  }
                }
              }
            }
        }
        .FinalBtn{
          margin:10px 10px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-around;
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
        .NextPageBtn{
          padding:5px 10px;
          background-color: #FFFFFF;
          color: rgba(${textColor});
          font-size:15px;
          text-decoration: underline;
          text-decoration-color:blue;
        }

        .buttonPar{
        //   margin:10px 0px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
          padding:30px 30px;
            .errtext{
              display:flex;
              color:black;
              align-items:center;
              transition:all 0.4s ease;
              text-align:center;
              background-color: #f6c343;
              border-radius:5px;
              font-size:16px !important;
              font-weight:500;
              line-height:34px;
              padding:6px 20px;
              svg{
                color:red;
                margin-right:10px;
                font-size:25px;
              }
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
                width:30%;
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

  @media only screen and (max-width:768px){
    .boxShadow{
        .formTwoParent{
            font-size:13px;
            .buttonPar{
                flex-direction: column;
                .errtext {
                    font-size:15px;
                    width:100%;
                }
                .SubmitButton{
                    width:100%;
                }
            }
            .headerPar{
                font-size:14px;
            }
            .headerParchild{
                font-size:13px;
            }
            .UserRequestPar{
                padding: 15px 15px;
                .inputPar{
                  .modalPar{
                    .BtnPar{
                      width:100%;
                      justify-content: center;
                      button{
                        margin-right:18px;
                      }
                    }
                  }
                    .NextChild{
                        flex-direction: column;
                        .next{ width:100%;}
                    }
                    .SingatureImg{
                        width:100%;
                    }
                }
            }
        }
        }
    }
`

const allData = [

    { 
       group: "a",
       title: "ҮНДСЭН ШАЛГУУР ХАНГАЛТ",
       items: [
           {  name: "100 хувь хувийн ААН мөн эсэх"},
           {  name: "2 жилийн турш тогтмол үйл ажиллагаа явуулсныг батлах санхүүгийн тайлантай эсэх"},
           {  name: "Уул уурхайн салбарт ажилладаггүй эсэх"},
           {  name: "Ре-экспортын худалдаа эрхэлдэггүй эсэх"},
           {  name: "Түүхий эд экспортлогч бус эсэх /хэрэв жилийн 100 мянган ам.доллараас дээш экспорт хийдэг бөгөөд энэ ойрын хугацаанд боловсруулсан бүтээгдэхүүний экспорт хийхээр зорьж буй бол тийм гэж дугуйлна уу"},
           {  name: "*Сүүлийн хоёр жил тус бүр 50 мянгаас 50 сая ам.доллартай тэнцэх нийт борлуулалтын орлоготой ажилласан эсэх "},
           {  name: "*Сүүлийн 2 жил тус бүр НДШ төлдөг бүтэн цагийн ажилчдын тоо 10-250 хооронд байсан эсэх"},
       ]
   }, 
   {
       group: "b",
       title: "ӨР ТӨЛБӨРИЙН ШАЛГУУР ХАНГАЛТ",
       items: [
           {  name: "12 сараас дээш хугацааны нийгмийн даатгалын өргүй бөгөөд нотлох тодорхойлолттой эсэх"},
           {  name: "12 сараас дээш хугацааны татварын өргүй бөгөөд нотлох тодорхойлолттой эсэх"},
           {  name: "Монголбанкны муу ангиллын зээлгүй бөгөөд нотлох тодорхойлолттой эсэх"},
       ]
   }, 
   { 
       group: "c",
       title: "АЖ АХУЙН НЭГЖИЙН ХУВЬ ЭЗЭМШИГЧ НЬ ДАРААХ УЛС ТӨРИЙН НӨЛӨӨ БҮХИЙ ЭТГЭЭДҮҮД БОЛОН ТЭДНИЙ ГЭР БҮЛИЙН ГИШҮҮНТЭЙ ХОЛБООТОЙ БАЙЖ БОЛОХГҮЙ",
       items: [
           {  name: "Ерөнхийлөгчтэй холбоогүй"},
           {  name: "Ерөнхий сайдтай холбоогүй"},
           {  name: "УИХ-н гишүүнтэй холбоогүй"},
           {  name: "Үндсэн хуулийн цэцийн гишүүдтэй холбоогүй"},
           {  name: "Дээд шүүхийн шүүгчидтэй холбоогүй"},
           {  name: "Улсын прокурортой холбоогүй"},
           {  name: "Аймаг, нийслэлийн засаг даргатай холбоогүй"},
           {  name: "Сайд, Төрийн нарийн бичгийн даргатай холбоогүй"},
           {  name: "Яам, хэрэгжүүлэгч агентлагуудын захирал, дарга нартай холбоогүй"},
           {  name: "Төрийн өмчит компаниудын захирал, дарга нартай холбоогүй"},
       ]
   }, 
   { 
       group: "d",
       title: "ЭКСПОРТ ХӨГЖЛИЙН ТӨЛӨВЛӨГӨӨГӨӨ БЭЛТГЭСЭН ЭСЭХ",
       items: [
           {  name: "Экспортын чиглэлээр санхүүжилт хүсч, хийхээр төлөвлөсөн ажил нь гэрээ шалгаруулалт хийгдэж, гэрээ зурагдсанаас хойш 9 сарын дотор хэрэгжиж дуусах боломжтой эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгтэй тэнцүү дүнгээр санхүүжилт гаргах боломжтой бөгөөд бэлэн эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр өмнө гарсан зардлыг санхүүжүүлэхгүй эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр зөвхөн зөвшөөрөгдсөн үйл ажиллагааг санхүүжүүлэх эсэх"},
       ]
   }, 
   { 
       group: "f",
       title: "БУСАДТАЙ ТУРШЛАГА, МЭДЭЭЛЛЭЭ ХУВААЛЦАХ БОЛОМЖТОЙ ЭСЭХ",
       items: [
           {  name: "Ирэх нэг жилийн хугацаанд Экспортыг дэмжих төслөөс зохион байгуулах арга хэмжээнд хамтарч, бусад экспортлогчид болон шинээр экспортлохоор зорьж буй аж ахуйн нэгжүүдийг бэлтгэх сургалт, мэдээлэл хуваалцах ажлилд өөрийн байгууллагын туршлага, мэдлэгээ хуваалцаж, идэвхитэй оролцох эсэх"},
       ]
   }, 
]


