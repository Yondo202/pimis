import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom'
import { IoMdCheckmarkCircle, IoIosArrowBack } from 'react-icons/io';
import { fontFamily, textColor, Color, fontSize, NextBtn, InputStyle, ColorRgb } from '../theme';
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai'
import { CgDanger } from 'react-icons/cg'
import { RiArrowDownSLine } from 'react-icons/ri'
import UserContext from '../../context/UserContext'
import AccessToken from '../../context/accessToken'
import axios, {FrontUrl} from '../../axiosbase'
import { RiArrowGoBackFill } from 'react-icons/ri';
import Modal from 'react-awesome-modal';
// import { motion } from 'framer-motion';
import DocumentTitle from 'containers/document/DocumentTitle';
import FileUpload from "components/check/FileUpload"
import{  CustomFileUpload } from "components/misc/CustomStyle";

import { FaPenNib } from "react-icons/fa";
import SignatureCanvas from 'react-signature-canvas'

const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function CompCheck2() {
  DocumentTitle("Шалгуур хангалтыг тулгах хуудас");
  const localId = localStorage.getItem("userId");
  const init = "once";
  const param = useParams().url;
  const ctx = useContext(UserContext);
  const [ usersInfo, setUsersInfo ] = useState({});
  const history = useHistory();
  const [showFinal, setShowFinal] = useState(false);
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(0);
  const [btnCond, setBtnCond] = useState(init);
  const [secondChance, setSecondChance] = useState({});
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [BtnSpin, setBtnSpin] = useState(false);
  const [updateMount, setUpdateMount] = useState(0);
  const [initialData, setInitialData] = useState(allData);
  const [opacity, setOpacity] = useState("0");
  const [opacity2, setOpacity2] = useState("0");
  const [procent, setProcent] = useState('0');
  const [FinalErrorText, setFinalErrorText] = useState("");
  const [target, setTarget ] = useState(null);
  const [imgData, setImgData ] = useState(null);
  const [visibleSig, setVisibleSig] = useState(false);
  let [ sigCanvas, setSigCanvas] = useState({});
  let [ trimmedDataURL, setTrimmedDataURL] = useState(null);
  const [ selectLogo, setSelectLogo ] = useState({});

 

  useEffect(() => {
    void async function fetch() {
      const data = await axios.get(`users/${param !== "user" ? param : localId}`, { headers: { Authorization: AccessToken() } });
      setUsersInfo(data.data.data);
      setTarget(data.data.data?.project_type);
      setImgData(data.data.data?.signature);
      setSelectLogo({ fileUrl: data.data.data?.company_stamp });
    }()

    void async function fetch() {
      const data = await axios.get(`criterias${param !== "user" ? `?userId=${param}` : `?userId=${localId}`}`, { headers: { Authorization: AccessToken() } });
      let keys = Object.keys(data.data.data);
      if (keys.length > 1) {
        setSuccess(data.data.data.approved);
        let filterArr = []; let value = Object.values(data.data.data);
        keys.forEach((el, i) => { 
          let obj1 = {}; 
          value.forEach((elem, ind) => {
            if (i === ind) {
                obj1["keys"] = el; obj1["values"] = elem; 
              } 
          });
          filterArr.push(obj1); 
        });
        
        allData.forEach(el => { el.items.forEach((elem, ind) => { filterArr.forEach(element => { if (el.group + (ind + 1) === element.keys) { elem["value"] = element.values }; }); }); });
        setInitialData(allData); 
        setUpdateMount(1);

        TargetAnother(target)
      } 
    }()
    
  }, [updateMount]);

  // useEffect(()=>{
  //   // if(updateMount===1){
  //     // console.log("targret")
  //     TargetAnother(target)
  //   // }
  // },[updateMount])

  const NextPageHandle = (el) => { history.push(el); };

  const OneBack = () => {
    history.goBack();
  }

  const FinalClick = el => {
    if (el) {
      setShowFinal(true);
      setTimeout(() => {
        setVisible(false);
      }, 10000)
    } else {
      setVisible(false);
    }
  }
  const clickHandles = (e,btn) => {
    e.preventDefault();
    let rs2 = document.querySelectorAll(".inpTest333"); let arr2 = Array.from(rs2); let soloObject2 = {}; const cond = {};
    arr2.forEach(element => {
      if (element.checked === true) {
        let field = element.name; let value = element.value; let id = element.id; soloObject2[id + field] = value;
      }
      if (element.checked === true && element.value === "false") {
        let field = element.name; let value = element.value; let id = element.id; cond[id + field] = value;
      }
    });
    let finalCond = Object.keys(cond);
    let keys = Object.keys(soloObject2);
    const Procent = keys.length * 100 / 14;
    const FinalProcent = Math.round(Procent);

    let inp = document.querySelectorAll(".getC"); let arr = Array.from(inp); let userInfos = {};

    arr.forEach(elem => {
      userInfos[elem.name] = elem.value;
    });

    userInfos["signature"] = imgData;
    // userInfos["project_type"] = target===1 ? 0:1;
    userInfos["project_type"] = target;
    userInfos["company_stamp"] = FrontUrl + selectLogo.fileUrl?.replace("public", "");


    if(keys.length < 14) {
      setOpacity("1");
      setProcent(FinalProcent);
      setTimeout(() => { setOpacity("0"); }, 5000);
    }else if(!imgData){
      setOpacity2("1");
      setFinalErrorText("Гүйцэтгэх албан тушаалтны гарын үсэгийг оруулна уу")
      setTimeout(() => {setOpacity2("0");}, 5000)
    }else if(!selectLogo?.fileUrl){
      setOpacity2("1");
      setFinalErrorText("Тамгаа хавсаргана уу");
      setTimeout(() => {setOpacity2("0");}, 5000);
    }else if (finalCond.length > 0) {
      setOpacity("0");
      setSecondChance(cond);
      if (btn === "twice") {
        soloObject2["approved"] = 1;
        // soloObject2["target"] = target;
        setBtnSpin(true);
        setOpacity("0");
        setOpacity2("0");
        setVisible2(false);
        SendData(soloObject2, false, userInfos);
    
      } else if (btn === "once") {
        setVisible2(true);
      }
    } else {
      soloObject2["approved"] = 2;
      // soloObject2["target"] = target;
      setBtnSpin(true);
      setOpacity("0");
      setOpacity2("0");
      SendData(soloObject2, true, userInfos);
    }
  }

  const SendData = (soloObject2, cond, userInfos) =>{
    axios.post(`criterias`, soloObject2, { headers: { Authorization: AccessToken() } }).then(_=> {

          axios.put(`users/${localId}`, userInfos, { headers: { Authorization: AccessToken() }}).then(_=>{
            setUpdateMount(2);
            if(cond){ ctx.alertText('green, Амжилттай илгээгдлээ', true); setVisible(true); }
            else{ ctx.alertText('orange, Өргөдөл гаргах боломжгүй бөгөөд цааш дамжлагад тэнцэхгүй байна.', true); }
            setBtnSpin(false);
            setTimeout(() => { history.push('/'); }, 4000);
          })

    }).catch(_=> { setFinalErrorText("Алдаа гарлаа."); setBtnSpin(false); });
  }

  const closeMModalX = () => { setVisible2(false); }
  const closeModal = (el) => {
    if (el === "shuud") {
      setBtnCond("twice"); setVisible2(false);
    } else {
      setCount(prev => prev + el);
      if (count < 2) {
        setBtnCond("once"); setVisible2(false);
      } else {
        setBtnCond("twice"); setVisible2(false);
      }
    }
  }
  

  const TargetHandle= (e) =>{
    if(updateMount===0 && param === "user"){
      setTarget(e);
      let arr = [];
      allData.forEach(el=>{
        if(el.group === "a"){
          el.items.forEach(elem=>{
            if(elem.cond){
              if(e===1){
                elem.name = "Кластерын ангилалд өргөдөл гаргаж байгаа бол сүүлийн хоёр жилийн дунджаар кластерын тэргүүлэгч аж ахуйн нэгж доод тал нь 300 сая, дээд тал нь 150 тэрбум, кластерын гишүүн аж ахуйн нэгж тус бүр доод тал нь 150 сая, дээд тал нь 150 тэрбум төгрөгийн борлуулалттай ажилласан эсэх"
              }
              if(e===0){
                elem.name = "Аж ахуйн нэгжийн ангилалд өргөдөл гаргаж байгаа бол сүүлийн хоёр жилийн дунджаар доод тал нь 150 сая, дээд тал нь 150 тэрбум төгрөгийн борлуулалттай ажилласан эсэх"
              }
            }
          })
          arr.push(el);
        }else{
          arr.push(el);
        }
      });
      setInitialData(arr);
    }
  }
  const clear = () => sigCanvas.clear();
  const trim = () =>{ setTrimmedDataURL(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); setImgData(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); setVisibleSig(false);};

  const TargetAnother = (e) =>{
    let arr = [];
      allData.forEach(el=>{
        if(el.group === "a"){
          el.items.forEach(elem=>{
            if(elem.cond){
              if(e===1){
                elem.name = "Кластерын ангилалд өргөдөл гаргаж байгаа бол сүүлийн хоёр жилийн дунджаар кластерын тэргүүлэгч аж ахуйн нэгж доод тал нь 300 сая, дээд тал нь 150 тэрбум, кластерын гишүүн аж ахуйн нэгж тус бүр доод тал нь 150 сая, дээд тал нь 150 тэрбум төгрөгийн борлуулалттай ажилласан эсэх"
              }
              if(e===0){
                elem.name = "Аж ахуйн нэгжийн ангилалд өргөдөл гаргаж байгаа бол сүүлийн хоёр жилийн дунджаар доод тал нь 150 сая, дээд тал нь 150 тэрбум төгрөгийн борлуулалттай ажилласан эсэх"
              }
            }
          })
          arr.push(el);
        }else{
          arr.push(el);
        }
      });
      setInitialData(arr);
  }

  return (
    // <motion.div initial="exit" animate="enter" exit="exit" variants={textVariants2}>
      <Component1 className="container" >
      <form onSubmit={e => clickHandles( e, btnCond)}>
        {param !== "user"
        ? (updateMount === 1 
        ? <div className="boxShadow">
          <div className="rowHeader">Шалгуур хангалтыг тулгах хуудас <span className="tseg">*</span></div>
          {initialData.map((el, i) => {
            return (
              <div key={i} className="formTwoParent ">
                <div className="headerPar">
                  <div className="row" >
                    <div className="head1 col-md-10 col-sm-8 col-8">{el.title}</div>
                    <div className="head2 col-md-1 col-sm-2 col-2">Тийм</div>
                    <div className="head2 col-md-1 col-sm-2 col-2">Үгүй</div>
                  </div>
                </div>
                {el.items.map((elem, ind) => {
                  return (
                    <div className="headerParchild" key={ind}>
                      <div className="row" >
                        <div className="number col-md-1 col-sm-1 col-1">{`${ind + 1}`}</div>
                        <div className="texts col-md-9 col-sm-7 col-7">{elem.name}</div>
                        <div className="radios col-md-1 col-sm-2 col-2"><input required checked={updateMount === 1 ? elem.value === true ? true : false : null} className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="true" /></div>
                        <div className="radios col-md-1 col-sm-2 col-2"><input required checked={updateMount === 1 ? elem.value === false ? true : false : null} className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="false" /></div>
                      </div>
                    </div>
                  )
                })}
              </div>)
          })}

          <div className="FinalBtn">
            <div style={{ opacity: `${opacity}` }} className="errtext">Таны асуулга {procent}% байна..</div>
            <div style={{ opacity: `${opacity}` }} className="errtext">Та гүйцэд бөгөлнө үү...</div>
          </div>
          <div className="Success">
            <NextBtn onClick={() => OneBack()} className="NextPageBtn" type="button"><div className="flexchild"><IoIosArrowBack /><IoIosArrowBack className="hide" /> <IoIosArrowBack className="hide1" /></div>Буцах</NextBtn>
            {success === 1 ? <div className="item not"><IoMdCheckmarkCircle />Таны асуулгаас харахад байгууллага Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрт аж ахуйн нэгжийн шаардлагыг хангахгүй байна. Гэвч танай компани кластерын бүрэлдэхүүний гишүүний шаардлагыг хангавал манайд хандаж болно.</div> : success === 2 ? 
            // <div className="item"><IoMdCheckmarkCircle />Түншлэлийн хөтөлбөрт ААН-ээр тэнцэж байна.</div>
              <div className="Success">
                <div className="item"><IoMdCheckmarkCircle />
                    {target===0&&`Түншлэлийн хөтөлбөрийн аж ахуйн нэгжийн ангилалд өргөдөл гаргах шалгуур үзүүлэлтийг хангаж байна.`}
                    {target===1&&`Түншлэлийн хөтөлбөрийн кластерын ангилалд өргөдөл гаргах шалгуур үзүүлэлтийг хангаж байна.`}
                </div>
                {/* <NextBtn onClick={() => NextPageHandle('/request/user')} className="NextPageBtn" type="button">Байгаль орчны үнэлгээний асуумж<div className="flexchild"><AiOutlineSend /><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn> */}
              </div>
          : null}
          </div>
        </div> : (<NullParent className="BtnPar"><button onClick={() => OneBack()}><RiArrowGoBackFill /> Буцах</button> <h2 style={{ textAlign: "center" }}>Мэдээлэл оруулаагүй байна</h2> </NullParent>))
          : (<div className="boxShadow">
            <div className="rowHeader">Шалгуур хангалтыг тулгах хуудас<span className="tseg">*</span></div>

            <div className="TargetParent">
              <div className="title">Та аль ангилалд өргөдөл гаргаж байна вэ?</div>
              <div className="Target">
                <div onClick={()=>TargetHandle(0)} className={`items ${target===0?`A11`:``}`}><span>Аж ахуйн нэгж</span><RiArrowDownSLine /></div>
                <div onClick={()=>TargetHandle(1)}  className={`items ${target===1?`A11`:``}`}><span>Кластер</span> <RiArrowDownSLine /></div>
              </div>
            </div>


            {target!==null?initialData.map((el, i) => {
              return (
                <div key={i} className="formTwoParent ">
                  <div className="headerPar">
                    <div className="row" >
                      <div className="head1 col-md-10 col-sm-8 col-8">{el.title}</div>
                      <div className="head2 col-md-1 col-sm-2 col-2">Тийм</div>
                      <div className="head2 col-md-1 col-sm-2 col-2">Үгүй</div>
                    </div>
                  </div>
                  {el.items.map((elem, ind) => {
                    return (
                      <div className="headerParchild" key={ind}>
                        <div className="row" >
                          <div className="number col-md-1 col-sm-1 col-1">{`${ind + 1}`}</div>
                          <div className="texts col-md-9 col-sm-7 col-7">{elem.name}</div>
                          <div className="radios col-md-1 col-sm-2 col-2"><input required checked={updateMount === 1 ? elem.value === true ? true : false : null} className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="true" /></div>
                          <div className="radios col-md-1 col-sm-2 col-2"><input required checked={updateMount === 1 ? elem.value === false ? true : false : null} className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="false" /></div>
                        </div>
                      </div>
                    )
                  })}
                </div>)
            }):null}


            <div className="FinalBtn">
              <div style={{ opacity: `${opacity}` }} className="errtext">Таны асуулга {procent}% байна..</div>
              <div style={{ opacity: `${opacity}` }} className="errtext">Та гүйцэд бөгөлнө үү...</div>
            </div>


            {target!==null?<div className="CompanyInformation">
                <div className="title">Мэдүүлэг бөглөсөн:</div>
                <div className="roww">
                    <div className="coll">
                      <div className="label">Аж ахуйн нэгжийн нэр :</div>
                      <div className="Fields">{usersInfo?.companyname}</div>
                    </div>
                    <div className="coll">
                      <div className="label">Имэйл хаяг:</div>
                      {/* <InputStyle><input type="email"  /><div className="line"  /></InputStyle> */}
                      <div className="Fields">{usersInfo?.email}</div>
                    </div>
                </div>

                <div className="roww">
                    <div className="coll">
                      <div className="label">Гүйцэтгэх захирлын овог :</div>
                      {!usersInfo.lastname?
                      <InputStyle><input type="text" name="lastname" required className="getC" /><div className="line" /></InputStyle>:
                      <div className="Fields">{usersInfo.lastname}</div>}
                    </div>
                    <div className="coll">
                      <div className="label">Гүйцэтгэх захирлын нэр :</div>
                      {!usersInfo.firstname?<InputStyle><input type="text" name="firstname" required className="getC" /><div className="line"   /></InputStyle>
                      :<div className="Fields">{usersInfo.firstname}</div>}
                    </div>
                </div>

                <div className="roww">
                    <div className="coll">
                      <div className="label">Гар утасны дугаар :</div>
                      {!usersInfo.phone?<InputStyle><input type="number" name="phone" required className="getC" /><div className="line"  /></InputStyle>
                      :<div className="Fields">{usersInfo.phone}</div>}
                    </div>
                    <div className="coll">
                      <div className="label">Огноо :</div>
                      {!usersInfo.criteria_date?<InputStyle><input type="date" name="criteria_date" required className="getC" max={Currentdate}  /><div className="line" /></InputStyle>
                      :<div className="Fields">{usersInfo.criteria_date}</div>}
                    </div>
                </div>

                <div className="roww">
                    <div className="coll">
                      <div className="label">Гүйцэтгэх албан тушаалтны гарын үсэг:</div>
                      <div className="infoPrent">
                        <div className="draw">
                        {!imgData?<>
                            <div className="smTitle">{!imgData? `Зурах`: `Засах` }:</div>
                            <CustomFileUpload>
                              <div className="contentPar contentPar2">
                                <div onClick={()=>setVisibleSig(true)} className="inputSector">
                                  <label className="inputStyle inputStyle2">
                                    <FaPenNib />
                                  </label>
                                </div>
                              </div>
                            </CustomFileUpload>
                          </>:null}
                          {imgData? <img className="SingatureImg" src={imgData} alt="гарын үсэг"/>  :  trimmedDataURL ? <img className="SingatureImg" src={trimmedDataURL} alt="гарын үсэг"/> : null} 
                        </div>

                        {/* {!imgData?<div className="draw">
                          <div className="smTitle">Хавсаргах:</div>
                          <FileUpload />
                        </div>:null} */}

                      </div>
                    </div>
                    <div className="coll">
                      <div className="label">Тамга :</div>
                      <div className="draw">
                        {!selectLogo.fileUrl?<div className="smTitle">Хавсаргах</div>:null}
                        <FileUpload stamp={usersInfo.company_stamp} selectLogo={selectLogo} setSelectLogo={setSelectLogo} />
                      </div>
                    </div>
                </div>
            </div>:null}

            {updateMount === 1 ? success === 1 ? <div className="Success"> <div className="item not"><IoMdCheckmarkCircle />Таны асуулгаас харахад байгууллага Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрт аж ахуйн нэгжийн шаардлагыг хангахгүй байна. Гэвч танай компани кластерын бүрэлдэхүүний гишүүний шаардлагыг хангавал манайд хандаж болно.</div> </div>
              : <div className="Success">
                <div className="item"><IoMdCheckmarkCircle />
                    {target===0&&`Түншлэлийн хөтөлбөрийн аж ахуйн нэгжийн ангилалд өргөдөл гаргах шалгуур үзүүлэлтийг хангаж байна.`}
                    {target===1&&`Түншлэлийн хөтөлбөрийн кластерын ангилалд өргөдөл гаргах шалгуур үзүүлэлтийг хангаж байна.`}
                </div>
                <NextBtn onClick={() => NextPageHandle('/request/user')} className="NextPageBtn" type="button">Байгаль орчны үнэлгээний асуумж<div className="flexchild"><AiOutlineSend /><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
              </div>
              : (target!==null&&<div className="buttonPar">
                <div style={{ opacity: `${opacity2}` }} className="errtext"><CgDanger /> {FinalErrorText}</div>
                <NextBtn  style={BtnSpin === false ? { width: "40%" } : { width: "10%" }} className="SubmitButton" type="submit"> {BtnSpin === false ? <>Цааш <div className="flexchild"><AiOutlineSend /><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div> </> : <img src="/gifff.gif" alt="" />} </NextBtn>
              </div>)}
          </div>
          )}

            <Modal visible={visible2} width="800" effect="fadeInDown" >
              <div className="Modaltest">
                <div onClick={closeMModalX} className="headPar"><span >✖</span></div>
                <div className="ModalTextPar">
                  <div className="redPAr">
                    <div className="redDesc">Таныг бөгөлсөн мэдээллээ дахин нэг шалгахыг хүсэж байна:</div>
                  </div>
                  <div className="mainText">
                    <div className="title">Доорх асуултуудад "ҮГҮЙ" гэж хариулсандаа итгэлтэй байна уу?:</div>
                    <ul className="desc">
                      {secondChance.a1 && <li>Монгол улсад бүртгэлтэй 100 хувь хувийн аж ахуйн нэгж мөн эсэхийг нотолсон аж ахуйн нэгжийн гэрчилгээг хавсаргасан эсэх</li>}
                      {secondChance.a2 && <li>Сүүлийн 2 жилийн турш тогтмол үйл ажиллагаа явуулсныг нотлох аудитлагдсан санхүүгийн тайланг хавсаргасан эсэх</li>}
                      {secondChance.a3 && <li>Өргөдөл гаргагч нь уул уурхайн салбарт үйл ажиллагаа эрхэлдэггүй бөгөөд хориотой үйл ажиллагааны чиглэлээр хандаагүй эсэх</li>}
                      {secondChance.a4 && <li>Өргөдөл гаргагч нь түүхий эд экспортлогч бус эсэх /хэрэв жилд 300 сая төгрөгөөс дээш экспорт хийдэг бөгөөд ойрын хугацаанд боловсруулсан бүтээгдэхүүний экспорт хийхээр зорьж буй бол тийм гэж хариулна уу/</li>}
                      {secondChance.a5 && <li>Экспортыг дэмжих төслийн санхүүгийн дэмжлэгтэйгээр хийхээр төлөвлөсөн ажлуудын санхүүжилтийг урьдчилан гаргах боломжтой бөгөөд түүнийгээ нотлох баримттай эсэх /сүүлийн 2 жилийн мөнгөн урсгалын тайлан, 1 жилийн мөнгөн урсгалын төлөвлөгөө, банкны хуулга гм/</li>}
                      {secondChance.a6 && <li>Аж ахуйн нэгжийн эцсийн өмчлөгч нь улс төрийн нөлөө бүхий этгээд биш эсэх</li>}

                      {secondChance.a7 && <li>{target===0
                      ?`Аж ахуйн нэгжийн ангилалд өргөдөл гаргаж байгаа бол сүүлийн хоёр жилийн дунджаар доод тал нь 150 сая, дээд тал нь 150 тэрбум төгрөгийн борлуулалттай ажилласан эсэх`
                      :`Кластерын ангилалд өргөдөл гаргаж байгаа бол сүүлийн хоёр жилийн дунджаар кластерын тэргүүлэгч аж ахуйн нэгж доод тал нь 300 сая, дээд тал нь 150 тэрбум, кластерын гишүүн аж ахуйн нэгж тус бүр доод тал нь 150 сая, дээд тал нь 150 тэрбум төгрөгийн борлуулалттай ажилласан эсэх`
                      }</li>}
                      {secondChance.b1 && <li>Экспорт хөгжлийн төлөвлөгөөгөө боловсруулсан эсэх /Хэрэв үгүй бол энэ удаагийн өргөдлөөр уг үйл ажиллагааг санхүүжүүлэх эсэх/</li>}
                      {secondChance.b2 && <li>Экспортыг дэмжих төслийн санхүүгийн дэмжлэгтэйгээр хийхээр төлөвлөсөн ажлууд нь гэрээ зурагдсанаас хойш 9 сарын дотор хэрэгжиж дуусах боломжтой эсэх</li>}
                      {secondChance.b3 && <li>Экспортыг дэмжих төслийн санхүүгийн дэмжлэгээр төслийн зорилтот салбарт зөвхөн зөвшөөрөгдсөн үйл ажиллагааг санхүүжүүлэх эсэх</li>}
                      {secondChance.b3 && <li>Төлөвлөсөн үйл ажиллагааг гүйцэтгэгч байгууллагуудаас үнийн санал авч, харьцуулалт хийсэн эсэх</li>}
                      {secondChance.c1 && <li>Ирэх нэг жилийн хугацаанд Экспортыг дэмжих төслөөс зохион байгуулах арга хэмжээнд хамтарч, бусад экспортлогчид болон экспортлогч болохоор зорьж буй аж ахуйн нэгжүүдийг бэлтгэх сургалт, мэдээлэл хуваалцах ажилд өөрийн байгууллагын туршлага, мэдээллээ хуваалцаж, идэвхтэй оролцох эсэх</li>}
                      {secondChance.c2 && <li>Хөтөлбөрт хүсэлт гаргасан, тэнцсэн болон тэнцээгүй, гэрээ байгуулсан, санхүүжилт авсан аж ахуйн нэгжүүдийн талаар олон нийтэд нээлттэй мэдээлэхийг хүлээн зөвшөөрч өргөдлөө гаргаж буй эсэх</li>}
                      {secondChance.c3 && <li>Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын боловсрол, ажлын туршлага, ур чадварыг илэрхийлэх намтрыг хавсаргасан эсэх</li>}
                
                    </ul>
                  </div>
                  <div className="btnPar">
                    <button onClick={e => { clickHandles(e,"twice"); closeModal("shuud") }} className="btn btn-primary" type="submit">Тийм &nbsp;&nbsp; (илгээх)</button>
                    <button onClick={() => closeModal(1)} className="btn btn-primary" type="button">Үгүй &nbsp;&nbsp; (буцах)</button>
                  </div>
                </div>
              </div>
            </Modal>
        </form>

            <Modal visible={visible} width="800" effect="fadeInDown" >
              <div className="Modaltest Modaltest22">
                {showFinal && <div onClick={() => setVisible(false)} className="headPar"><span >✖</span></div>}
                <div style={showFinal ? { opacity: 0.4 } : { opacity: 1 }} className="ModalTextPar">
                  <div className="redPAr">
                    {target===0&&<div className="redDesc">Түншлэлийн хөтөлбөрийн аж ахуйн нэгжийн ангилалд өргөдөл гаргах  шалгуур үзүүлэлтийг хангаж байна.</div>}
                    {target===1&&<div className="redDesc">Түншлэлийн хөтөлбөрийн кластерын ангилалд өргөдөл гаргах  шалгуур үзүүлэлтийг хангаж байна.</div>}
                  </div>
                  {/* <div className="mainText">
                    <div className="title">Жилийн борлуулалтын орлого нь 100 мянган ам.доллароос их бол  <span style={{ fontWeight: "400" }}> ( тийм ) </span>
                                         гэсэн хариултыг сонгоно уу?
                                        </div>
                    <span className="Nemelts"> ( Хэрэв цар тахлын үед борлуулалт огцом буурсан бол 2018, 2019 оны борлуулалтын орлогыг мэдээлэлд орлуулж болно )</span>

                  </div> */}
                  {/* <div className="btnPar">
                    <button className="btn btn-primary" onClick={() => FinalClick(true)}>Тийм </button>
                    <button className="btn btn-primary" onClick={() => FinalClick(false)}>Үгүй </button>
                  </div> */}
                </div>

                {/* {showFinal && <div className="correctPar">
                  <AiOutlineCheckCircle />
                  <span>
                    Таны асуулгаас харахад танай байгууллага Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрт ААН-ээр тэнцэхээс
                    гадна кластерын толгой компаниар тэнцэх боломжтой байна.
                                      </span>
                </div>} */}

              </div>
            </Modal>
            
            <Modal visible={visibleSig} width="620" height="380" effect="fadeInDown" onClickAway={()=>setVisibleSig(false)}>
                <div className="modalPar">
                    <div className="Canvass">
                        <SignatureCanvas className='sigCanvas' penColor='blue' ref={(ref) => { sigCanvas = ref }} canvasProps={{width: 620, height: 310, className: 'sigCanvas'}} />
                    </div>
                    <div className="BtnPar">
                        <button onClick={clear}>Цэвэрлэх</button>
                        <button onClick={()=>trim()}>Хадгалах</button>
                        <button onClick={()=>setVisibleSig(false)}>X</button>
                    </div>
                </div>
            </Modal>
      </Component1>
    // </motion.div>

  )
}

export default CompCheck2


const NullParent = styled.div`
    display:flex;
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

// let easing = [0, 0, 0.56, 0.95];
// const textVariants2 = {
//   exit: { y: -50, opacity: 0, transition: { duration: 0.6, ease: easing } },
//   enter: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.6, ease: easing } }
// };

const animate = keyframes`
  0% { transform:translateX(100px); opacity:0; }
  100% { transform:translate(0px); opacity:1;  }
`

const anime = keyframes`
  0% { transform:translateY(-20px); opacity:0; }
  100% { transform:translateY(0px); opacity:1;  }
`

const animate22 = keyframes`
  0% { transform:scale(0);  }
  100% { transform:scale(1); }
`

const Component1 = styled.div`
    margin-top:40px;
    padding-bottom:80px;
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};
    .modalPar{
          text-align:center;
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
    .CompanyInformation{
      background-color:#ffffff;
      padding: 24px 26px;
      .roww{
        display:flex;
        justify-content:space-between;
        margin-bottom:26px;
        .coll{
          width:45%;
          .Fields{
            letter-spacing:0.3px;
            color:hsl(110, 90%, 30%);
            font-size:15px;
          }
          .label{
            opacity:0.9;
            font-weight:500;
            margin-bottom:8px;
          }
          .draw{
            .smTitle{
              font-weight:400;
              margin:6px 0px;
            }
            .SingatureImg{
                border:1px solid rgba(${ColorRgb},0.3);
                width:260px;
                height:130px;
                object-fit:contain;
            }
          }
          .infoPrent{
            display:flex;
            gap:30px;
          }
          input{
            background-color:#f6f8fa;
          }
        }
      }
      .title{
        font-size:17px;
        font-weight:500;
        color:rgb(${textColor});
        margin-bottom:25px;
      }
    }
        .Modaltest{
          position:relative;
          width:100%;
          height:30rem;
          overflow-y:scroll;
          background-color:white;
          .headPar{
            cursor:pointer;
            font-size:1.3rem;
            display:flex;
            align-items:center;
            justify-content:center;
            background-color:white;
            position:absolute;
            right:10px;
            top:10px;
            height:30px;
            width:30px;
            padding:5px 8px;
            border-radius:50%;
            z-index: 99999999;
            span{
                font-size: 26px;
            }
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
              .redDesc{
                font-size:15px;
                font-weight:500;
                margin-bottom:15px;
                text-align:start;
                color:#FF4333;
              }
            }
          }
          .correctPar{
            display:flex;
            align-items:center;
            padding:20px 50px;
            border-top:3px solid green;
            border-radius:8px;
            svg{
              width:15%;
              color:green;
              font-size:24px;
            }
            span{
              font-size:15px;
              font-weight:500;
              animation: ${animate} 0.8s ease;
            }
          }
        }
        .Modaltest22{
          .ModalTextPar{
            .btnPar{
              button{
                font-size:15px;
                padding:4px 40px;
              }
            }
            .mainText{
              .title{
                font-size:15px;
              }
            }
            .redPAr{
              margin-bottom:15px;
                .redDesc{
                  font-weight:400;
                  font-size:18px;
                  text-align:start;
                  color:green;
                }
            }
          }
        }

      .boxShadow{
        box-shadow:1px 1px 18px -5px;
        border-radius:6px;
        margin-bottom:80px;
        .Success{
          background-color:#ffffff;
          padding:15px 30px;
          padding-bottom:30px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 50px;
          .item{
            font-size:15px;
            display:flex;
            align-items:center;
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
          .TargetParent{
            background-color: #FFFFFF;
            padding: 20px 26px;
            .title{
              font-weight: 500;
              margin-bottom: 20px;
              font-size: 15px;
            }
            .Target{
              display: flex;
              .items{
                gap: 20px;
                color: rgba(0, 18, 41, 0.8);
                text-decoration: none;
                margin-right: 18px;
                transition: all 0.3s ease 0s;
                cursor: pointer;
                border-radius: 5px;
                padding: 8px 30px 8px 60px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                -webkit-box-pack: justify;
                justify-content: space-between;
                box-shadow: 1px 1px 8px -6px;
                svg{
                  opacity: 0.6;
                  height: 100%;
                  font-size: 16px;
                }
              }
              .A11{
                position: relative;
                color: green;
                border: 1px solid rgba(0, 0, 0, 0.2);
                box-shadow: 1px 1px 14px -6px;
                &:before{
                  animation: ${animate22} 0.4s ease;
                  content: "✔";
                  position: absolute;
                  display: flex;
                  -webkit-box-align: center;
                  align-items: center;
                  -webkit-box-pack: center;
                  justify-content: center;
                  z-index: 1;
                  bottom: -7px;
                  right: 0%;
                  border: 1px solid green;
                  background-color: white;
                  color: green;
                  width: 19px;
                  height: 19px;
                  border-radius: 50%;
                }
              }
            }
          }

        .formTwoParent{
          animation: ${anime} 0.6s ease;
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
                padding-top: 12px;
                padding-bottom: 12px;
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
      .Success{
        flex-direction:column;
        .NextPageBtn{
          width:100%;
        }
      }
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
      { name: "Монгол улсад бүртгэлтэй 100 хувь хувийн аж ахуйн нэгж мөн эсэхийг нотолсон аж ахуйн нэгжийн гэрчилгээг хавсаргасан эсэх" },
      { name: "Сүүлийн 2 жилийн турш тогтмол үйл ажиллагаа явуулсныг нотлох аудитлагдсан санхүүгийн тайланг хавсаргасан эсэх" },
      { name: "Өргөдөл гаргагч нь уул уурхайн салбарт үйл ажиллагаа эрхэлдэггүй бөгөөд хориотой үйл ажиллагааны чиглэлээр хандаагүй эсэх" },
      { name: "Өргөдөл гаргагч нь түүхий эд экспортлогч бус эсэх /хэрэв жилд 300 сая төгрөгөөс дээш экспорт хийдэг бөгөөд ойрын хугацаанд боловсруулсан бүтээгдэхүүний экспорт хийхээр зорьж буй бол тийм гэж хариулна уу/" },

      { name: "Экспортыг дэмжих төслийн санхүүгийн дэмжлэгтэйгээр хийхээр төлөвлөсөн ажлуудын санхүүжилтийг урьдчилан гаргах боломжтой бөгөөд түүнийгээ нотлох баримттай эсэх /сүүлийн 2 жилийн мөнгөн урсгалын тайлан, 1 жилийн мөнгөн урсгалын төлөвлөгөө, банкны хуулга гм/" },
      { name: "Аж ахуйн нэгжийн эцсийн өмчлөгч нь улс төрийн нөлөө бүхий этгээд биш эсэх" },

      { name: "", cond:true },
      // { name: "Аж ахуйн нэгжийн ангилалд өргөдөл гаргаж байгаа бол сүүлийн хоёр жилийн дунджаар доод тал нь 150 сая, дээд тал нь 150 тэрбум төгрөгийн борлуулалттай ажилласан эсэх", code:true },
    //   { name: "Кластерын ангилалд өргөдөл гаргаж байгаа бол сүүлийн хоёр жилийн дунджаар кластерын тэргүүлэгч аж ахуйн нэгж доод тал нь 300 сая, дээд тал нь 150 тэрбум, кластерын гишүүн аж ахуйн нэгж тус бүр доод тал нь 150 сая, дээд тал нь 150 тэрбум төгрөгийн борлуулалттай ажилласан эсэх ", code:true },

    ]
  },
  {
    group: "b",
    title: "ЭКСПОРТ ХӨГЖЛИЙН ТӨЛӨВЛӨГӨӨГӨӨ БЭЛТГЭСЭН ЭСЭХ",
    items: [
      { name: "Экспорт хөгжлийн төлөвлөгөөгөө боловсруулсан эсэх /Хэрэв үгүй бол энэ удаагийн өргөдлөөр уг үйл ажиллагааг санхүүжүүлэх эсэх/" },
      { name: "Экспортыг дэмжих төслийн санхүүгийн дэмжлэгтэйгээр хийхээр төлөвлөсөн ажлууд нь гэрээ зурагдсанаас хойш 9 сарын дотор хэрэгжиж дуусах боломжтой эсэх" },
      { name: "Экспортыг дэмжих төслийн санхүүгийн дэмжлэгээр төслийн зорилтот салбарт зөвхөн зөвшөөрөгдсөн үйл ажиллагааг санхүүжүүлэх эсэх" },
      { name: "Төлөвлөсөн үйл ажиллагааг гүйцэтгэгч байгууллагуудаас үнийн санал авч, харьцуулалт хийсэн эсэх" },
    ]
  },

  {
    group: "c",
    title: "БУСАД ШААРДЛАГАТАЙ МЭДЭЭЛЛҮҮД",
    items: [
      { name: "Ирэх нэг жилийн хугацаанд Экспортыг дэмжих төслөөс зохион байгуулах арга хэмжээнд хамтарч, бусад экспортлогчид болон экспортлогч болохоор зорьж буй аж ахуйн нэгжүүдийг бэлтгэх сургалт, мэдээлэл хуваалцах ажилд өөрийн байгууллагын туршлага, мэдээллээ хуваалцаж, идэвхтэй оролцох эсэх" },
      { name: "Хөтөлбөрт хүсэлт гаргасан, тэнцсэн болон тэнцээгүй, гэрээ байгуулсан, санхүүжилт авсан аж ахуйн нэгжүүдийн талаар олон нийтэд нээлттэй мэдээлэхийг хүлээн зөвшөөрч өргөдлөө гаргаж буй эсэх" },
      { name: "Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын боловсрол, ажлын туршлага, ур чадварыг илэрхийлэх намтрыг хавсаргасан эсэх" },
 
    ]
  },
]


