import React from 'react'
import styled from 'styled-components'
import {fontSize, textColor,InputStyle,ColorRgb} from '../theme'

function Feedback() {
    return (
        <FeedBackCont className="container">
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title">САНАЛ ХҮСЭЛТИЙН МАЯГТ</div>
                    <div className="desc">Түншлэлийн шинжээчдийн баг өөрсдийн үйл ажиллагаанд хяналт тавьж, үзүүлж буй үйлчилгээнд үнэлгээ авснаар бидний цаашдын үйл ажиллагаа улам сайжрах тул та энэхүү асуулгын хуудсыг идэвхтэй бөглөнө үү.Таны өгсөн мэдээллийн нууцыг чанд хадгалах болно.  </div>
                </div>

                <div className="compName">
                    <div className="title">Аж ахуйн нэгж/ Кластерын нэр :</div>
                    {/* <input type="text" className="form-control" placeholder="нэрийг бүтнээр нь оруулна уу"  /> */}
                    <InputStyle className="nameText"><input placeholder="бүтэн нэрийг оруулна үү..."  type="text" />  <div className="line"></div></InputStyle>
                </div>

                <div className="infoWhere">
                        <div className="Title"><span className="circle">⬤</span>  Түншлэлийн дэмжлэгийн талаар хэрхэн мэдээлэл авсан бэ?</div>
                        <div className="helperTitle">[√] өөрт тохирох хариултуудыг сонгоно уу.</div>
                        <div className="inpPar">
                            {infoWhere.map((el,i)=>{
                                    return(
                                        <div className="items">
                                            <input className="radio" type="radio" />
                                            <div className="title">{el.title}</div>
                                            {el.place&&<InputStyle className="nameText"><input placeholder={el.place}  type="text" /> <div className="line"></div></InputStyle>}
                                        </div>
                                    )
                            })}
                        </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title2"><span className="circle">⬤</span>Түншлэлийн гэрээ өмнө нь хэдэн удаа байгуулж байсан бэ?
                            <InputStyle className="nameText"><input placeholder="байгуулсан тоо..."  type="number" />  <div className="line"></div></InputStyle>
                         </div>
                </div>

                <div className="infoWhere">
                        <div className="Title"><span className="circle">⬤</span>  Түншлэлийн дэмжлэгийн талаар хэрхэн мэдээлэл авсан бэ?</div>
                        <div className="inpPar">
                            {infoWhere2.map((el,i)=>{
                                    return(
                                        <div className="items">
                                            {!el.place&&<input className="radio" type="radio" />}  
                                            <div className="title">{el.title}</div>
                                            {el.place&&<InputStyle className="nameText"><input placeholder={el.place}  type="text" /> <div className="line"></div></InputStyle>}
                                        </div>
                                    )
                            })}
                        </div>
                </div>

                <div className="infoWhere">
                        <div className="Title Title4"><span className="circle">⬤</span>Та Түншлэлийн дэмжлэг аваагүй тохиолдолд энэ үйл ажиллагааг хэрэгжүүлэх үү? </div>
                        <div className="chekcPar">
                            <span className="title">Аль нэгийг тэмдэглэнэ үү. [√] : </span>
                            <div className="checkItem">
                                <div className="item"><input className="radio" type="radio" /> <span>Yes</span></div>  
                                <div className="item"><input className="radio" type="radio" /> <span>No</span></div>
                            </div>
                        </div>
                        <div className="Title3">
                            <div className="text">Яагаад?</div> 
                            <InputStyle className="nameText"><input placeholder="шалтгаанаа бичнэ үү..."  type="text" />  <div className="line"></div></InputStyle>
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
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{el.title}</td>
                                            <td><input className="radio" type="radio" /></td>
                                            <td><input className="radio"  type="radio" /></td>
                                            <td><input className="radio"  type="radio" /></td>
                                            <td><input className="radio"  type="radio" /></td>
                                            <td><input className="radio"  type="radio" /></td>
                                            <td><input className="radio"  type="radio" /></td>
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
                                   <th>Хүчин зүйлс</th>
                                   <th ><span className="question">Тохирох хариулт[√]</span>Тохирох хариулт[√]<span className="question">Тохирох хариулт[√]</span><span className="question">Тохирох хариулт[√]</span></th>
                                   <th> Мөнгөн дүн болон  хувиар илэрхийлвэл?</th>
                                </tr>
                                {tableData2.map((el,i)=>{
                                    return(
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>{el.title}</td>
                                            <td ><InputStyle className="nameText"><input placeholder="тохирх харулт..."  type="text" />  <div className="line"></div></InputStyle></td>
                                            <td ><InputStyle className="nameText"><input style={{textAlign:`right`}} placeholder=" ..."  type="text" />  <div className="line"></div></InputStyle></td>
                                        </tr>
                                    )
                                })}
                               
                            </table>
                        </div>
                </div>





            </div>
        </FeedBackCont>
    )
}


export default Feedback

// #1890ff;
const FeedBackCont = styled.div`
    color: rgba(${textColor});
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
    {  title: "Бусад:", place: "..." },
]

const tableData = [
    {  title: "Та зөвлөх хөлсөлж ажиллуулсан бол хэрхэн үнэлэх вэ?" },
    {   title: "Монгол улсад сургалт, семинарт хамрагдсан бол сургалтын чанар, үр дүнг хэрхэн үнэлэх вэ?"},
    {   title: "Гадаад оронд сургалтад хамрагдсан бол сургалтын чанар, үр дүнг хэрхэн үнэлэх вэ?"},
    {   title: "Бизнес хөгжлийн шинжээчийн танд тусалсан байдал, чадварыг хэрхэн үнэлэх вэ?"},
    {   title: "Бизнес хөгжлийн шинжээчийн  бизнесийн чадварыг хэрхэн үнэлэх вэ?"}
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