import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Modal from 'react-awesome-modal';
import SignatureCanvas from 'react-signature-canvas'
import {FaPenNib} from 'react-icons/fa'
import { VscAdd } from 'react-icons/vsc'
import { ColorRgb, textColor,InputStyle } from '../../theme'
import AddModal from "./AddModal"

const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

function PageOne(props) {
      const ref = useRef();
      const [ why, setWhy ] = useState(false);
      const [ addModal, setAddModal ] = useState(false);
      

      const [visible, setVisible] = useState(false);
      let [sigCanvas, setSigCanvas] = useState({});
      let [trimmedDataURL, setTrimmedDataURL] = useState(null);
      const openModal=()=> { setVisible(true); }
      const closeModal=()=> { setVisible(false);}
      const clear = () => sigCanvas.clear();
      const trim = () =>{ setTrimmedDataURL(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); props.setImgData(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); closeModal();};
      const changeHandle = (event) =>{ if(event.target.value==="true"){ setWhy(true); ref.current?.focus(); }else{ setWhy(false); } }

      return (
        <>
            {addModal?<AddModal setAddModal={setAddModal} setConflict={props?.setConflict} />:null}
            <MainPar className="MainPar">
                    <div className="title">Ашиг сонирхлын зөрчилгүй гэдгээ илэрхийлэх, Зөрчил үүссэн тухай мэдэгдэл</div>
                    <div className="title">Нэг. Сонгон шалгаруулалтын багийн гишүүн</div>

                    <div className="MemeberInfo">
                      <span className="titleSm">Эцэг (эх)-ийн нэр: </span> 
                      <span className="Values">{props.userInfo?.memberInfo?.lastname}</span>
                    </div>

                    <div className="MemeberInfo">
                      <span className="titleSm">Нэр: </span> 
                      <span className="Values">{props.userInfo?.memberInfo?.firstname}</span>
                    </div>

                    <div className="MemeberInfo"><span className="titleSm">Албан тушаал: </span> 
                        <InputStyle className="inpp">
                          <input className="getInputt" defaultValue={props.propData?.occupation} name="occupation" type="text" placeholder="албан тушаалаа бичнэ үү..." /> 
                          <div className="line"></div>
                        </InputStyle>
                    </div>

                    <div className="MemeberInfo"><span className="titleSm">Байгууллагын нэр: </span> 
                        <InputStyle className="inpp">
                        <input className="getInputt" defaultValue={props.propData?.member_compname} name="member_compname" type="text" placeholder="байгууллагын нэрээ бичнэ үү..." /> 
                        <div className="line"></div></InputStyle>
                    </div>

                    <div className="MemeberInfo MemeberInfo2">
                      <span className="titleSm">Сонирхлын зөрчилтэй эсэх: </span>
                      { props.propData?
                            <div className="childPar">
                                <div className="child"> <input className="radio getInputt" checked={props.propData.is_violation?true:false} id="radio" name="is_violation" value="true" type="radio" /><span className="smTitle">Тийм</span></div>
                                <div className="child childA"><input className="radio getInputt" checked={props.propData.is_violation?false:true} name="is_violation" value="false" type="radio" /><span className="smTitle">Үгүй</span></div>
                            </div>
                            :
                            <div className="childPar">
                                <div className="child"> <input className="radio getInputt" onChange={changeHandle} id="radio" name="is_violation" value="true" type="radio" /><span className="smTitle">Тийм</span></div>
                                <div className="child childA"><input className="radio getInputt" onChange={changeHandle} name="is_violation" value="false" type="radio" /><span className="smTitle">Үгүй</span></div>
                            </div>
                      }
                    </div>

                    <div className="contentPar">
                        <div className="Content">
                            <div className="title">Хоёр. Сонирхлын зөрчилгүйг илэрхийлсэн байдал</div>
                            <div className="texts"><span style={{fontWeight:`500`}}>{props.userInfo?.memberInfo?.lastname}</span> овогтой <span style={{fontWeight:`500`}}>{props.userInfo?.memberInfo.firstname} </span> 
                             миний бие Дэлхийн банкны санхүүжилтээр Хүнс, хөдөө аж ахуй, хөнгөн үйлдвэрийн яамны дэргэд хэрэгжиж байгаа Экспортыг дэмжих төслийн Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгчийн өргөдлийг үнэлэх Сонгон шалгаруулалтын багийн гишүүнээр ажиллахад ямар нэгэн сонирхлын зөрчилгүй болохыг үүгээр мэдэгдэж байна. </div>
                            {/* <ul>
                                <li className="items"> 
                                    Түншлэлийн дэмжлэг олгох үйл ажиллагааг үнэлэх явцад оролцож буй талуудтай ямар нэгэн бизнес эсвэл гэр бүлийн харилцаа байхгүй гэдгийг үүгээр баталгаажуулж байна. Хэрэв ийм харилцаа гарч ирвэл төслийн захиралд нэн даруй мэдэгдэх болно. 
                                </li>
                               
                                <li className="items">Түншлэлийн дэмжлэг хүсэгчийн өргөдлийн үнэлэхдээ Түншлэлийн дэмжлэг үзүүлэх зааварт заасан дүрэм, шалгуурыг баримтална.</li>
                            </ul> */}
                        </div>
                    </div>

                    <div className="contentPar">
                        <div className="Content">
                            <div className="title">Гурав. Сонирхлын зөрчил үүссэн тухай</div>
                            <div className="texts">Сонгон шалгаруулалтын багийн гишүүн би Түншлэлийн хөтөлбөрөөс дэмжлэг хүсэгч доорх хүснэгтэд байгаа аж ахуйн нэгж эсхүл кластертай сонирхлын зөрчил үүсэх нөхцөл байдал бий болсон гэж үзэж байгаа тул тухайн аж ахуйн нэгж эсхүл кластерын өргөдлийг үнэлэх Сонгон шалгаруулалтын багийн хуралд оролцохоос татгалзаж байна. </div>
                            <div className="customTable">
                              <table >
                                <tbody>
                                  <tr>
                                    <th>№</th>
                                    <th style={{minWidth:`200px`}}>Аж ахуйн нэгж эсхүл кластерын нэр</th>
                                    <th>Сонирхлын зөрчил</th>
                                  </tr>
                                  {props?.conflict?.map((el,ind)=>{
                                    return(
                                      <tr key={ind}>
                                        <td>{ind+1}</td>
                                        <td>{el.compname}</td>
                                        <td>{el.description}</td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                              <div onClick={e=>setAddModal(true)} className="Add">
                                 <VscAdd  />
                              </div>
                            </div>
                            

                        </div>
                    </div>

                    <div className="contentPar">
                        <div className="Content">
                            <div className="title">Дөрөв. Сонгон шалгаруулалтын багийн гишүүний үүрэг</div>
                            {MemberRole.map((el,ind)=>{
                              return(
                                <div key={ind} className="texts texts2">
                                    {el.text}
                                </div>
                              )
                            })}
                        </div>
                    </div>

                    <div className="contentPar">
                        <div className="Content">
                            <div className="title">Тав. Баталгаажуулалт</div>
                            <div className="texts">Сонгон шалгаруулалтын багийн гишүүн би үүргээ чанд ухамсарлан энэхүү мэдэгдлийг үнэн зөв гаргасан болохоо үүгээр баталгаажуулж байна. </div>
                        </div>
                    </div>

                    <div className="signature">
                        {/* <div className="title"> Гарын үсэг: <div className="signatureItem">/........................................./ </div>  </div> */}
                        <div className="drowPar">
                              <div className="titleee">Гарын үсэг:</div>
                              {!props.propData&&<div className="SignBtn" onClick={()=>openModal()} ><FaPenNib /><span>Зурах</span></div>} 
                              {props.propData? <img className="SingatureImg"  src={props.propData?.signature_data}/>  : trimmedDataURL ? <img className="SingatureImg"  src={trimmedDataURL}/> : null }
                              {/* signature_data */}
                              <Modal visible={visible}  width="620" height="380"effect="fadeInDown" onClickAway={closeModal}>
                                  <div className="modalPar">
                                      <div className="Canvass">
                                          <SignatureCanvas className='sigCanvas' penColor='blue' ref={(ref) => { sigCanvas = ref }} canvasProps={{width: 620, height: 310, className: 'sigCanvas'}} />
                                      </div>
                                      <div className="BtnPar">
                                          <button onClick={clear}>Цэвэрлэх</button>
                                          <button onClick={()=>trim()}>Хадгалах</button>
                                          <button onClick={closeModal}>X</button>
                                      </div>
                                  </div>
                              </Modal>
                        </div>
                    </div>

                    <div className="datePar">
                        <span className="Title">Огноо: </span>
                        <InputStyle>
                            { props.propData? <input className="getInputt" value={props.propData.sdate} name="sdate" max={Currentdate} type="date" /> : <input className="getInputt" name="sdate" max={Currentdate} type="date" /> }
                          <div className="line"></div>
                        </InputStyle>
                    </div>

             </MainPar>
             </>
        )
  }
  export default PageOne

const MainPar = styled.div`
    margin-bottom:30px;
    background-color:white;
    // max-width:700px;
    margin-top:20px;
    font-size:13.5px;
    padding:25px 100px;
    border:1px solid rgba(0,0,0,.3);
    color:rgba(${textColor},1);
    .datePar{
      padding-bottom:30px;
      display:flex;
      align-items:center;
      .Title{
        font-weight:500;
        margin-right:20px;
        font-size:14px;
      }
    }
    .signature{
      padding:30px 0px;
          .drowPar{
            display:flex;
            align-items:start;
            margin-top:10px;
            .titleee{
              font-weight:500;
              margin-right:30px;
              margin-bottom:15px;
            }
            .SignBtn{
                // margin-left:30px;
                margin-right:30px;
                padding:3px 15px;
                cursor:pointer;
                display:flex;
                align-items:center;
                border:1px solid rgba(0,0,0,0.4);
                svg{
                    margin-right:10px;
                }
                span{
                  // font-weight:500;
                }
                &:hover{
                    background-color:rgba(0,0,0,.2);
                }
            }
            
            .SingatureImg{
                border:1px solid rgba(${ColorRgb},0.3);
                width:200px;
                height:100px;
                object-fit:contain;
          }

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
        }


    }
    .title{
      color:rgb(${textColor});
      font-weight:500;
      margin:10px 0px;
      margin-bottom:30px;
      text-align:center;
      font-size:15px;
    }
    .MemeberInfo{
      margin-top:8px;
      margin-bottom:28px;
      display:flex;
      align-items:center;
      .titleSm{
        width:20%;
        font-weight:500;
        margin-right:15px;
      }
      .inpp{
        font-weight:400;
        width:80%;
      }
      .childPar{
        display:flex;
        align-items:center;
        margin-top:10px;
        .child{
          display:flex;
          align-items:center;
          .smTitle{
            margin-left:5px;
          }
          .radio{
            cursor:pointer;
            width:20px;
            height:20px;
          }
        }
        .childA{
          margin-left:30px;
        }
      }
    }
    .MemeberInfo2{
      .titleSm{
        width:30%;
      }
      .childPar{
        width:70%;
      }
    }
    .nameTitle{
      // font-weight:500;
      span{
        margin-left:15px;
        font-weight:400;
      }
    }
    .contentPar{
      margin-top:30px;
      .items{
        margin:10px 0px; 
      }
      .Content{
        padding:0px 0px;
        .Titles{
          margin:25px 0px;
          text-align:center;
        }
        .texts{
          line-height: 2em;
        }
        .texts2{
          line-height: 1.7em;
          margin:12px 0px;
        }
        ul{
          list-style-type:decimal;
          .items{
            .ZorchilPar{
              margin:10px 0px;
              .titleBig{
                font-weight:500;
              }
            }
          }
          .form-control{
            font-size:0.9em;
          }
          .smUl{
            padding-left:50px;
            list-style-type:upper-roman;
          }
        }
        .customTable{
          width:100%;
          margin:20px 0px;
          .Add{
            display:flex;
            justify-content:center;
            width:100%;
            border:1px solid rgba(0,0,0,0.2);   
            border-top:none;
            padding:8px;
            background-color:#d5e1ec;
            cursor:pointer;
            svg{
              font-size:18px;
            }
            &:hover{
              background-color:#e6ecf1;
            }
          }
          table{
            width:100%;
            border-collapse: collapse;
            th{
              text-align:center;
              background-color:#E7E9EB;
              }
              td, th{
                  &:first-child{
                      text-align:center;
                  }
                  padding:10px 8px;
                  border:1px solid rgba(0,0,0,.2);
              }
              td{
                  padding:12px 10px;
                  // &:last-child{
                  //     padding:8px 0px;
                  // }
                
              }
              
            }
            
        }
      }
    }

    @media (max-width:768px){
      
      .signature{
        .drowPar{
          flex-direction:column;
          .SignBtn{
            margin:15px 0px;
          }
        }
      }
      .MemeberInfo{
        align-items:start;
        flex-direction:column;
        .titleSm{
          width:100%;
        }
      }
      padding: 15px 10px;
      .contentPar{
        .Content{
          padding: 0px 25px;
          ul{
            .smUl{
              padding-left: 35px;
            }
          }
        }
      }
     
    }

    @media print{
      margin-bottom:30px;
      background-color:white;
      max-width:1200px;
      margin-top:20px;
      font-size:15px;
      padding:15px 80px;
      border:none;
      .contentPar{
        padding: 30px 25px;
      }
    }
`

const MemberRole = [
  {text:'4.1. Хэрэв Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгч нь авлига, хээл хахууль өгөхийг оролдох, хууран мэхлэх, хуйвалдах, дарамт шахалт үзүүлэх зэрэг үйлдэл гаргасан тохиолдолд Экспортыг дэмжих төслийн Зохицуулагчид нэн даруй мэдэгдэнэ.' },
  {text:'4.1.1. “авлига, хээл хахууль өгөх” гэж талуудын үйл ажиллагаанд зүй бусаар нөлөөлөхийн тулд үнэ цэнтэй зүйлийг шууд болон шууд бусаар санал болгох, өгөх, хүлээн авах, санал болгохыг хэлнэ.'},
  {text:'4.1.2. "хууран мэхлэх үйлдэл" гэж санхүүгийн болон бусад ашиг хонжоо олох, үүрэг хариуцлагаас зайлсхийхийг оролдох, санаатайгаар төөрөгдүүлэх буюу төөрөгдүүлэхийг оролдсон аливаа үйлдэл, эс үйлдлийг хэлнэ. '},
  {text:'4.1.3. "хуйвалдааны үйл ажиллагаа" гэж зохисгүй зорилгод хүрэхэд чиглэсэн хоёр буюу түүнээс дээш талуудын хоорондох зохион байгуулалттай үйл ажиллагааг ойлгоно.'},
  {text:'4.1.4. "дарамт шахалт үзүүлэх" гэж талуудын үйл ажиллагаанд зүй бусаар нөлөөлөхийн тулд талуудын өмч хөрөнгийг шууд болон шууд бусаар хохирол учруулах буюу хохирол учруулахыг завдахыг хэлнэ.'},
  {text:'4.3. Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгч аж ахуйн нэгж эсхүл кластерыг сонгон шалгаруулахад ямар нэгэн хувийн ашиг сонирхлын зөрчил гаргахгүй.'},
  {text:'4.4. Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгч аж ахуйн нэгж эсхүл кластерыг ялгаварлан гадуурхахгүй.'},
  {text:'4.5. Монгол Улсын Засгийн газар болон Экспортыг дэмжих төслийн эрх ашгийн төлөө бүх цаг хугацаанд үнэнч шударга, тууштай, ёс зүйтэй ажиллана.'},
  {text:'4.6. Хүндэтгэн үзэх шалтгаангүйгээр Сонгон шалгаруулалтын багийн хуралд оролцохоос татгалзахгүй.'},
  {text:'4.7. Ажил үүргээ өөрийн мэдлэг, туршлагын хүрээнд өндөр ёс зүйтэйгээр гүйцэтгэж, шударга дүгнэлт гаргана. '},
  {text:'4.8. Сонгон шалгаруулалтын багийн гишүүний эрх, үүргийн хүрээнд олж авсан байгууллагын нууцлалтай мэдээллийг урвуулан ашиглахгүй. Эдгээр мэдээллийг гуравдагч этгээдэд дамжуулахгүй.'},
  {text:'4.9. Сонгон шалгаруулалтын багийн шийдвэр гаргахад нөлөөлөх зорилгоор Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгч аж ахуйн нэгж эсхүл кластер болон бусад хамааралтай этгээдээс ямар нэгэн шагнал, бэлэг болон үнэ цэнтэй зүйлийг авахгүй. '},
  {text:'4.10. Сонгон шалгаруулалтын багийн хурлын тэмдэглэлд ямар нэгэн төөрөгдүүлэх эсхүл худлаа мэдээлэл оруулахгүй. '},
  {text:'4.11. Түншлэлийн хөтөлбөрөөс санхүүгийн дэмжлэг хүсэгчийн өргөдлийг сонгон шалгаруулахдаа Түншлэлийн хөтөлбөрийг хэрэгжүүлэх зааварт заасан дүрэм, шалгуурыг баримтална.'},
]