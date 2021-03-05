import React,{useEffect, useState,useRef} from 'react'
import styled from 'styled-components'
import {fontSize, textColor,InputStyle,ColorRgb,NextBtn } from '../theme'
import {AiOutlineSend} from 'react-icons/ai'
import { animateScroll as scroll } from "react-scroll";

function Feedback() {
    const [FinalErrorText, setFinalErrorText] = useState("");
    const [opacity2, setOpacity2] = useState("0");

    const [otherOne, setOtherOne] = useState({Cname: "getInputt", checked:null, self:""  });
    const [otherTwo, setOtherTwo] = useState({Cname: "getInputt", checked:null, self:"" });
    
    let inputFullName = useRef(null);
    useEffect(()=>{
        setTimeout(()=>{  inputFullName.current.focus();},3000);
    },[]);

    const onChange1 = (e) =>{
        if(e.target.value.length > 1){ setOtherOne({ Cname:"", checked:false, self:"getInputt" })
        }else{setOtherOne({ Cname:"getInputt", checked:null, self:"" })}
    }
    const onChange2 = (e) =>{
        if(e.target.value.length > 1){ setOtherTwo({ Cname:"", checked:false, self:"getInputt" })
        }else{setOtherTwo({ Cname:"getInputt", checked:null, self:"" })}
    }
    const reasonNo = (el) =>{
        if(el.target.value.length > 1){
            setOtherTwo({ Cname:"", checked:false, self:"" })
            el.target.className ="getInputt"
        }else{ el.target.className ="zz"; setOtherTwo({ Cname:"getInputt", checked:null, self:"" })  }
    }


    const ClickHandle = () =>{
        let inp = document.querySelectorAll(".getInputt"); let arr = Array.from(inp); let final = {};
        arr.map(el=>{
            if(el.type === "radio"){
                if(el.checked === true){
                    let obj = {}
                    let next = document.querySelectorAll(`.${el.name}${el.id}_why`); let otherArr = Array.from(next);
                    console.log(next);
                    otherArr.map(elem=>{
                        if(elem.id){
                            obj[elem.name] = elem.value;
                        }else{
                            obj[elem.name] = elem.value;
                        }
                    });
                    obj["checked"] = el.value;
                    final[el.name] = obj;
                }
            }else{
                if(el.name==="financing"){
                    let dd = {};  dd["checked"] = el.value;  final["financing"] = dd
                }else if(el.name==="finance_req"){
                    let nn = {}; nn["checked"] = el.value; final["finance_req"] =nn
                } else if(el.name==="finance_req_no"){
                    let nn = {}; nn["checked_no"] = el.value; final["finance_req"] =nn
                }else{
                    if(!el.value){
                        el.classList += " RedPar"
                    }else{
                        final[el.name] = el.value;
                        el.classList =- " RedPar"
                        el.classList += " getInputt"
                    }
                }
            }
        });

        let getT = document.querySelectorAll(".getTable1"); let tableArr = Array.from(getT); let tableOne = [];
        tableArr.map((el,i)=>{
            let obj = {};
            let tb = document.querySelectorAll(`.tableItem${i+1}`); let itemarr = Array.from(tb);
            itemarr.map((elem,ind)=>{
                if(elem.checked===true){
                    obj["checked"] = elem.value;
                    obj["title"] = elem.name;
                }
            });
            tableOne.push(obj);
        });
        let getT2 = document.querySelectorAll(".getTable2"); let tableArr2 = Array.from(getT2); let tableTwo = [];
        tableArr2.map((el,i)=>{
            let obj = {}; obj["title"] = el.id; let tb2 = document.querySelectorAll(`.itemOne${i+1}`); let itemarr2 = Array.from(tb2); 
            itemarr2.map((elem,index)=>{
                obj[elem.name] = elem.value
            });
            tableTwo.push(obj);
        })

        final["service_assess"] = tableOne;
        final["efficiency"] = tableTwo;
        let keys = Object.keys(final); 
        console.log(keys.length);

        if(keys.length < 11){
            setFinalErrorText("Та гүйцэд бөгөлнө үү...");
            setOpacity2("1");
            scroll.scrollTo(0);
        }else{
            console.log("done");
        }
        console.log(final, "^final");
    }

    return (
        <FeedBackCont className="container">
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title">САНАЛ ХҮСЭЛТИЙН МАЯГТ</div>
                    <div className="desc">Түншлэлийн шинжээчдийн баг өөрсдийн үйл ажиллагаанд хяналт тавьж, үзүүлж буй үйлчилгээнд үнэлгээ авснаар бидний цаашдын үйл ажиллагаа улам сайжрах тул та энэхүү асуулгын хуудсыг идэвхтэй бөглөнө үү.Таны өгсөн мэдээллийн нууцыг чанд хадгалах болно.  </div>
                </div>

                <div className="compName">
                    <div className="title">Аж ахуйн нэгж/ Кластерын нэр :</div>
                    <InputStyle  className="nameText"><input className="getInputt" name="compname" ref={inputFullName} placeholder="бүтэн нэрийг оруулна үү..."  type="text" />  <div className="line"></div></InputStyle>
                </div>

                <div className="infoWhere">
                        <div className="Title"><span className="circle">⬤</span>  Түншлэлийн дэмжлэгийн талаар хэрхэн мэдээлэл авсан бэ?</div>
                        <div className="helperTitle">[√] өөрт тохирох хариултуудыг сонгоно уу.</div>
                        <div className="inpPar">
                            {infoWhere.map((el,i)=>{
                                    return(
                                        <div className="items">
                                            <input style={{backgroundColor:"#eee"}} className="getInputt radio" id={i + 1} name="infhear" value={el.title} type="radio" />
                                            <div className="title">{el.title}</div>
                                            {el.place&&<InputStyle className="nameText"><input placeholder={el.place} className={`infhear${i + 1}_why`} name="other" id={i + 1}  type="text" /> <div className="line"></div></InputStyle>}
                                        </div>
                                    )
                            })}
                        </div>
                </div>

                <div className="infoWhere">
                    <div className="Title Title2"><span className="circle">⬤</span>Түншлэлийн гэрээ өмнө нь хэдэн удаа байгуулж байсан бэ?
                        <InputStyle className="nameText"><input className="getInputt" name="edpcount" placeholder="байгуулсан тоо..." type="number" />  <div className="line"></div></InputStyle>
                    </div>
                </div>

                <div className="infoWhere">
                    <div className="Title"><span className="circle">⬤</span>Түншлэлийн дэмжлэгээр олгогдож буй санхүүжилтээр дараах үйл ажиллагаануудын алийг санхүүжүүлж байна вэ? <br />  / тэмдэглэнэ үү / :</div>
                    <div className="inpPar">
                        {infoWhere2.map((el,i)=>{
                                return(
                                    <div className="items">
                                        <input className={`radio ${otherOne.Cname}`} value={el.title} checked={otherOne.checked} name="financing" type="radio" />
                                        <div className="title">{el.title}</div>
                                    </div>
                                )
                        })}
                        {/* zasna  */}
                        <div className="items">
                            <div className="title">Бусад :</div>
                            <InputStyle className="nameText"><input className={otherOne.self} onChange={onChange1} name="financing" placeholder="..." type="text" /> <div className="line"></div></InputStyle>
                        </div>
                    </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Та Түншлэлийн дэмжлэг аваагүй тохиолдолд энэ үйл ажиллагааг хэрэгжүүлэх үү? </div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг тэмдэглэнэ үү. [√] : </span>
                            <div className="checkItem">
                                <div className="item"><input className="radio getInputt" type="radio" name="nofinancing" value="true" /> <span>Тийм</span></div>  
                                <div className="item"><input className="radio getInputt" type="radio" name="nofinancing" value="false" /> <span>Үгүй</span></div>
                            </div>
                        </div>
                        <div className="Title3">
                            <div className="text">Яагаад?</div> 
                            <InputStyle className="nameText"><textarea className="nofinancing_why" name="reason" placeholder="шалтгаанаа бичнэ үү..."  type="text" />  <div className="line"></div></InputStyle>
                        </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Танай байгууллагад үзүүлсэн үйлчилгээг үнэлнэ үү,<br />Үнэлгээ: 1 (маш муу), 2 (муу), 3 (дунд), 4 (сайн), 5 (маш сайн) эсвэл 6 (онц сайн) </div>
                        <div className="ContentPar">

                            <table id="customers">
                                <tr>
                                  <th>№</th> <th>Үзүүлсэн үйлчилгээ, үйл ажиллагаа</th><th>1</th><th>2</th> <th>3</th><th>4</th><th>5</th><th>6</th>
                                </tr>
                                {tableData.map((el,i)=>{
                                    return(
                                        <tr className="getTable1">
                                            <td>{i + 1}</td>
                                            <td>{el.title}</td>
                                            <td><input className={`radio tableItem${i+1}`} value={1} name={el.title} type="radio" /></td>
                                            <td><input className={`radio tableItem${i+1}`} value={2} name={el.title} type="radio" /></td>
                                            <td><input className={`radio tableItem${i+1}`} value={3} name={el.title} type="radio" /></td>
                                            <td><input className={`radio tableItem${i+1}`} value={4} name={el.title} type="radio" /></td>
                                            <td><input className={`radio tableItem${i+1}`} value={5} name={el.title} type="radio" /></td>
                                            <td><input className={`radio tableItem${i+1}`} value={6} name={el.title} type="radio" /></td>
                                        </tr>
                                    )
                                })}
                               
                            </table>
                        </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Энэ үйл ажиллагааг хэрэгжүүлснээр танай байгууллагад ямар үр ашиг бий болсон бэ? Хүснэгтээс өөрт тохирох нэг болон түүнээс дээш мөрийг бөглөнө үү.</div>
                        <div className="ContentPar">

                            <table id="customers">
                                <tr>
                                  <th>№</th>
                                   <th>Хүчин зүйлс </th>
                                   <th ><span className="question">Тохирох хариулт[√]</span>Тохирох хариулт[√]<span className="question">Тохирох хариулт[√]</span><span className="question">Тохирох хариулт[√]</span></th>
                                   <th> Мөнгөн дүн болон  хувиар илэрхийлвэл?</th>
                                </tr>
                                {tableData2.map((el,i)=>{
                                    return(
                                        <tr id={el.title} className="getTable2">
                                            <td>{i+1}</td>
                                            <td>{el.title}</td>
                                            <td ><InputStyle className="nameText"><input className={`itemOne${i+1}`} name="appoint_answer"  placeholder="тохирх харулт..."  type="text" />  <div className="line"></div></InputStyle></td>
                                            <td ><InputStyle className="nameText"><input className={`itemOne${i+1}`} name="amount" style={{textAlign:`right`}} placeholder=" ..."  type="text" />  <div className="line"></div></InputStyle></td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Урьд өмнө хэрэгжүүлж байгаагүй энэ үйл ажиллагааг хэрэгжүүлснээр таныг бизнесээ цааш чиглүүлж явахад хувь нэмэр оруулна гэж бодож байна уу?</div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг сонгоно уу [√] : </span>
                            <div className="checkItem">
                                <div className="item"><input className="radio getInputt" name="direct_addition" value="true" type="radio" /> <span>Тийм</span></div>  
                                <div className="item"><input className="radio getInputt" name="direct_addition" value="true" type="radio" /> <span>Үгүй</span></div>
                            </div>
                        </div>
                        <div className="Title3">
                            <div className="text">Яагаад?</div> 
                            <InputStyle className="nameText"><textarea name="reason" className="direct_addition_why" placeholder="шалтгаанаа бичнэ үү..."  type="text" />  <div className="line"></div></InputStyle>
                         </div>
                </div>


                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Та дараагийн 12 сарын хугацаанд дахин санхүүгийн дэмжлэгийн хүсэлт гаргах уу?</div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Хэрэв тийм бол ямар үйл ажиллагааг санхүүжүүлэх вэ[√]?</div>
                        <div className="chekcPar">
                            <div className="checkItem">
                                <div style={{marginLeft:0}} className="item">
                                    <input className={`radio ${otherTwo.Cname}`} checked={otherTwo.checked} name="finance_req" type="radio" value="Сургалт, семинар" /> <span>1. Сургалт, семинар  </span></div>  
                                <div className="item">
                                    <input className={`radio ${otherTwo.Cname}`} checked={otherTwo.checked} type="radio" value="Зөвлөх үйлчилгээ" name="finance_req" /> <span>2. Зөвлөх үйлчилгээ </span></div>
                                <div className="item"><span>3. Бусад  </span><InputStyle style={{marginLeft:10}} className="nameText">
                                    <input onChange={onChange2} name="finance_req" placeholder="энд бичнэ үү..." className={otherTwo.self}  type="text" />  <div className="line"></div></InputStyle></div>
                            </div>
                        </div>

                        <div className="Title3">
                            <div style={{width:"30%"}} className="text">Хэрэв үгүй бол яагаад?</div> 
                            <InputStyle className="nameText"><textarea onChange={reasonNo} name="finance_req_no" placeholder="шалтгаанаа бичнэ үү..." type="text" />  <div className="line"></div></InputStyle>
                         </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Энэхүү төслөөс хуримтлуулсан туршлага дээр үндэслэн санхүүгийн дэмжлэг болон ижил төрлийн программ байхгүй болсон тохиолдолд энэ төрлийн зардлыг танай байгууллага санхүүжүүлэх үү? [√] </div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг тэмдэглэнэ үү. [√] : </span>
                            <div className="checkItem">
                                <div className="item"><input className="radio getInputt" type="radio" value="true" name="spend_finance" /> <span>Тийм, 100% санхүүжүүлнэ.</span></div>  
                                <div className="item"><input className="radio getInputt" type="radio" value="false" name="spend_finance" /> <span>Үгүй</span></div>
                            </div>
                        </div>
                        <div className="Title3">
                            <div style={{width:"30%"}} className="text">Шалтгааныг бичнэ үү:?</div> 
                            <InputStyle className="nameText"><textarea name="spend_finance_why" placeholder="энд бичнэ үү..."  type="text" /><div className="line"></div></InputStyle>
                         </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Үйл ажиллагааны үр дүнгээс үл хамааран санхүүгийн дэмжлэгийн багийн үйлчилгээнд сэтгэл хангалуун байсан уу? [√] </div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг тэмдэглэнэ үү. [√] : </span>
                            <div className="checkItem">
                                <div className="item"><input className="radio getInputt" type="radio" name="edp_impression" value="true" /> <span>Тийм</span></div>  
                                <div className="item"><input className="radio getInputt" type="radio" name="edp_impression" value="false" /> <span>Үгүй</span></div>
                            </div>
                        </div>
                </div>

                <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                            <NextBtn onClick={ClickHandle} className="SubmitButton" type="button">Илгээх <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></NextBtn>
                </div>
            </div>
        </FeedBackCont>
    )
}


export default Feedback

// #1890ff;
const FeedBackCont = styled.div`
    color: rgba(${textColor});
    padding-bottom:80px;
    .form-control{
       &:hover{
           border:1px solid #1890ff;
       }
    }
    .contentPar{
        background-color:white;
        padding:20px 100px;
        font-size:${fontSize};
        margin-top:30px;
        border:1px solid rgba(0,0,0,.2);
        .TitlePar{
            padding:10px 0px;
            .title{
                color:${textColor};
                padding-bottom:10px;
                font-size:14px;
                text-align:center;
                font-weight:500;
            }
            .desc{
                font-style: italic;
            }
        }
        .compName{
            width:100%;
            padding:10px 0px;
            display:flex;
            margin-bottom:16px;
            .title{
                width:50%;
                
            }
            .nameText{
                width:100%;
            }
        }
        
        .infoWhere{
            width:100%;
            margin-bottom:40px;
            #customers {
                border-collapse: collapse;
                width: 100%;
                td, th{
                    border: 1px solid rgba(0,0,0,0.2);
                    padding: 8px;
                }
                th{
                    color:white;
                    background-color:rgba(${ColorRgb});

                    .question{
                        opacity:0;
                        transform:scale(0);
                        // margin-right:80px;
                    }
                }
                td{
                    .radio{
                        cursor:pointer;
                        width:15px;
                        height:15px;
                        transition:all 0.3s ease;
                        margin-right:5px;
                        &:checked{
                            -webkit-transform: scale(1.2);
                            transform: scale(1.2);
                            border-radius:50% !important;
                        }
                    }
                    .nameText{
                        width:100%;
                        .line{
                            height:2px;
                            background-color:#1890ff;
                        }
                    }
                }
               
            }
            .Title{
                font-weight:500;
                display:flex;
                align-items:center;
                .circle{
                    margin-right:10px;
                    font-size:7px;
                }
            }
            .Title2{
               display:flex;
               align-items:center;
               .nameText{
                   width:35%;
                   font-size:13px;
                    margin-left:15px;
               }
            }
            .Title3{
                padding-top:10px;
                padding-left:40px;
                display:flex;
                .text{
                    width:10%;
                }
                .nameText{
                    width:90%;
                }
            }
            .Title4{
                margin-bottom:8px;
            }
            .helperTitle{
                color: rgba(${textColor},0.8);
                margin-bottom:6px;
            }
            .chekcPar{
                padding-left:40px;
                display:flex;
                .title{

                }
                .checkItem{
                    display:flex;
                    .item{
                        display:flex;
                        align-items:center;
                        margin-left:25px;
                        .radio{
                            cursor:pointer;
                            width:15px;
                            height:15px;
                            transition:all 0.3s ease;
                            margin-right:5px;
                            &:checked{
                                -webkit-transform: scale(1.2);
                                transform: scale(1.2);
                                border-radius:50% !important;
                            }
                        }
                    }
                }
            }
            .inpPar{
                padding-left:40px;
                color: rgba(${textColor},0.95);
                .items{
                    padding:7px 0px;
                    width:100%;
                    display:flex;
                    justify-content:start;
                    align-items:center;
                    .radio{
                        cursor:pointer;
                        width:15px;
                        height:15px;
                        transition:all 0.3s ease;
                        margin-right:15px;
                        &:checked{
                            -webkit-transform: scale(1.2);
                            transform: scale(1.2);
                            border-radius:50% !important;
                        }
                    }
                    .title{
                        margin-right:8px;
                        // width:60%;
                    }
                    .nameText{
                        font-size:13px;
                        width:40%;
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
      }

    @media only screen and (max-width:786px){
        .contentPar{
            padding: 20px 10px
        }
    }
`

const infoWhere = [
    { title: "Түншлэлийн дэмжлэг хүртэгч ААН, Кластераас (нэр) ", place: "нэрийг нь бичнэ үү"},
    { title: "Бизнесийн холбоодоос (нэр болон харьяа)", place: "нэр болон харьяа..." },
    { title: "Экспортыг дэмжих төслийн сургалт, мэдээллээс (хаана)  ", place: "хаанаас..."},
    { title: "Зөвлөхөөс (зөвлөхийн нэр)", place: "нэрийг нь бичнэ үү..."},
    { title: "Түншлэлийн шинжээчээс (ажилтны нэр)", place: "нэрийг нь бичнэ үү..."},
    { title: "Экспортыг дэмжих төслийн илгээсэн мэдээллээс", place: null },
    { title: "Түншлэлийн дэмжлэгийн тойм мэдээ", place: null },
    { title: "Түншлэлийн дэмжлэгийн брошюр", place: null },
    { title: "Экспортыг дэмжих төслийн вэбсайтаас", place: null },
    { title: "бусад эх сурвалжаас (тодорхойлно уу) ", place: "эх сурвалж..."},
]

const infoWhere2 = [
    {  title: "Сургалт, семинар", place: null },
    {  title: "Гадаад улсад сургалт", place: null},
    {  title: "ААН, Кластерын үнэлгээ, төлөвлөгө ", place: null },
    {  title: "Менежментийн систем", place: null },
    {  title: "Бүтээгдэхүүний үйлдвэрлэл	", place: null},
    {  title: "Техник, эдийн засгийн судалгаа", place: null },
    {  title: "Дотоод зах зээл, борлуулалтын суваг", place: null},
    {  title: "ОУ-ын үзэсгэлэн, яармаг", place: null},
    // {  title: "Бусад:", place: "..." },
]

const tableData = [
    {  title: "Та зөвлөх хөлсөлж ажиллуулсан бол хэрхэн үнэлэх вэ?", name: "tablerow1" },
    {   title: "Монгол улсад сургалт, семинарт хамрагдсан бол сургалтын чанар, үр дүнг хэрхэн үнэлэх вэ?", name: "tablerow2" },
    {   title: "Гадаад оронд сургалтад хамрагдсан бол сургалтын чанар, үр дүнг хэрхэн үнэлэх вэ?", name: "tablerow3" },
    {   title: "Бизнес хөгжлийн шинжээчийн танд тусалсан байдал, чадварыг хэрхэн үнэлэх вэ?", name: "tablerow4" },
    {   title: "Бизнес хөгжлийн шинжээчийн  бизнесийн чадварыг хэрхэн үнэлэх вэ?", name: "tablerow5" }
]


const tableData2 = [
    {  title: "Борлуулалтын өсөлт" },
    {   title: "Экспортын өсөлт"},
    {   title: "Зах зээлийн мэдлэг нэмэгдсэн"},
    {   title: "Бүтээмжийн өсөлт"},
    {   title: "Зах зээлд эзлэх хувийн өсөлт"},
    {   title: "Нэгж ажилчинд ногдох орлогын өсөлт"},
    {   title: "Ажилтны чадвар нэмэгдсэн"},
    {   title: "Ажлын байр нэмэгдсэн байдал"},
    {   title: "Ажилчдын эргэц буурсан байдал"},
    {   title: "Менежментийн систем сайжирсан"},
    {   title: "Санхүүгийн систем сайжирсан"},
    {   title: "Бусад, дэлгэрэнгүй бичнэ үү:"},
]