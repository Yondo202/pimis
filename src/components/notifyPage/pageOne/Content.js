import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-awesome-modal';
import SignatureCanvas from 'react-signature-canvas'
import {FaPenNib} from 'react-icons/fa'
import { ColorRgb, textColor,InputStyle } from '../../theme'



function PageOne() {
      const [visible, setVisible] = useState(false);
      let [sigCanvas, setSigCanvas] = useState({});
      let [trimmedDataURL, setTrimmedDataURL] = useState(null);

      const openModal=()=> { setVisible(true); }
      const closeModal=()=> { setVisible(false);}
      const clear = () => sigCanvas.clear();
      const trim = () =>{ setTrimmedDataURL(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); closeModal();};
    
      return (
        <>
            <MainPar className="MainPar">
                    <div className="title"> Ашиг сонирхлын зөрчилгүй тухай мэдэгдэх хуудас</div>
                    <div className="nameTitle">Үнэлгээний хорооны гишүүн:</div>
                    <div className="MemeberInfo">/..................../ ( албан тушаал... )</div>
                    <div className="contentPar">
                            <div className="items">Би Түншлэлийн дэмжлэг хүсэгчийн өргөдлийг үнэлэх, Түншлэлийн дэмжлэг хүсэгчийн чадавхыг үнэлэх үнэлгээний хорооны гишүүнээр ажиллахыг зөвшөөрч байна. </div>
                            <div className="items">Би дараах мэдэгдлийг хийж байна: </div>
                            <div className="Content">
                                <div className="Titles">I-р хэсэг – Ашиг сонирхлын зөрчилгүйг мэдүүлэх</div>
                                <ul>
                                    <li className="items">
                                        Үнэлгээний явцад оролцогч талуудтай ямар нэгэн ашиг сонирхлын зөрчил үүсгэхгүй бөгөөд аливаа зөрчил үүсэж болзошгүй тохиолдолд нөхцөл байдлыг ил тодоор зарлаж үнэлгээний багаас огцрох болно. <br /><br />
                                        [Хэрэв танд Түншлэлийн дэмжлэг хүсэгч ААН, Кластер болон үнэлгээний хорооны бусад гишүүдтэй сонирхлын зөрчил байгаа бол үнэлгээний хорооноос өөрийн хүсэлтээр огцорно уу.]<br />
                                        Түншлэлийн дэмжлэг хүсэгчтэй дараах ашиг сонирхлын зөрчил үүсэж байна: 
                                    </li>
                                    <InputStyle>
                                      <textarea placeholder="зөрчил үүсэж байгаа бол энд бичнэ үү..." />
                                      <div className="line"></div>
                                    </InputStyle>

                                    <li className="items"> 
                                        Түншлэлийн дэмжлэг олгох үйл ажиллагааг үнэлэх явцад оролцож буй талуудтай ямар нэгэн бизнес эсвэл гэр бүлийн харилцаа байхгүй гэдгийг үүгээр баталгаажуулж байна. Хэрэв ийм харилцаа гарч ирвэл төслийн захиралд нэн даруй мэдэгдэх болно. 
                                    </li>
                                    <div className="Titles">II-р хэсэг – Ашиг сонирхлын зөрчилгүйг мэдүүлэх</div>
                                    <li className="items">Хэрэв Түншлэлийн дэмжлэг хүсэгч нь хээл хахууль өгөхийг оролдох эсвэл хууран мэхлэх, хуйвалдах, дарамт шахалт үзүүлэх, авлига өгөхийг санаархах зэрэг үйлдэл гаргасан тохиолдолд төслийн захиралд нэн даруй мэдэгдэх болно. </li>
                                        <ul className="smUl">
                                                <li>“хээл хахууль өгөх” 	гэдэг нь талуудын үйл ажиллагаанд зүй бусаар нөлөөлөхийн тулд үнэ цэнтэй зүйлийг шууд болон шууд бусаар санал болгох, өгөх, хүлээн авах, санал болгохыг хэлнэ. </li>
                                                <li>"хууран мэхлэх үйлдэл" гэдэг нь санхүүгийн болон бусад ашиг хонжоо олох, үүрэг хариуцлагаас зайлсхийхийг оролдох, санаатайгаар төөрөгдүүлэх буюу төөрөгдүүлэхийг оролдсон аливаа үйлдэл, эс үйлдэл юм; </li>
                                                <li>"хуйвалдааны үйл ажиллагаа" гэдэг нь зохисгүй зорилгод хүрэхэд чиглэсэн хоёр буюу түүнээс дээш талуудын хоорондох зохион байгуулалттай үйл ажиллагааг ойлгоно; </li>
                                                <li>"дарамт шахалт үзүүлэх" гэдэг нь талуудын үйл ажиллагаанд зүй бусаар нөлөөлөхийн тулд талуудын өмч хөрөнгийг шууд болон шууд бусаар хохирол учруулах буюу хохирол учруулахыг завдахыг хэлнэ</li>
                                                <li>“саад болох” авлигад автах, залилан мэхлэх, хуйвалдааны үйлдлийг илрүүлэх мөрдөн байцаалтын явцад худал мэдээлэл өгөх эсвэл нотлох баримтыг нуун дарагдуулах, хуурамчаар үйлдэх, өөрчлөх, устгах болон мөрдөн байцаах явцад мэдээллийг ил тод болгож буй этгээдийг сүрдүүлэх, дарамтлах, заналхийлэх зэрэг үйлдлийг хамааруулан ойлгоно</li>
                                        </ul>
                                    <li className="items">Би Түншлэлийн дэмжлэг хүсэгч ААН, Кластерыг үнэлэхэд ямар нэгэн хувийн ашиг сонирхол үзүүлэхгүй.</li>
                                    <li className="items">Би дэмжлэг хүсэгч ААН, Кластеруудыг ялгаварлан гадуурхахгүй.</li>
                                    <li className="items">Би Монгол улсын засгийн газар болон төслийн эрх ашгийн төлөө бүх цаг хугацаанд үнэнч шударга, тууштай, ёс зүйтэй ажиллах болно.</li>
                                    <li className="items">Үнэлгээний хорооны гишүүнээр томилогдсоноос эхлэн үнэлгээ хийх явцад энэхүү мэдэгдлийн 1 болон 2-т заагдсан аливаа үйлдэл гарсан тохиолдолд төслийн захиралд нэн даруй мэдэгдэнэ.</li>
                                    <li className="items">Хүндэтгэн үзэх шалтгаангүйгээр Үнэлгээний хорооны хуралд оролцохоос татгалзахгүй.</li>
                                    <li className="items">Би ажил үүргээ өөрийн мэдлэг, туршлагын хүрээнд өндөр ёс зүйтэйгээр гүйцэтгэж, шударга дүгнэлтийг гаргана</li>
                                    <li className="items">Үнэлгээний хорооны гишүүний эрх үүргийн хүрээнд олж авсан аливаа нууцлал бүхий мэдээллийг урвуулан ашиглахгүй. Эдгээр мэдээллийг гуравдагч этгээдэд дамжуулахгүй</li>
                                    <li className="items">Үнэлгээний хорооны шийдвэр гаргахад нөлөөлөх зорилгоор Түншлэлийн дэмжлэг хүсэгч ААН, Кластер болон бусад холбоо бүхий этгээдээс ямар нэгэн шагнал, бэлэг болон үнэ бүхий зүйлийг авахгүй. </li>
                                    <li className="items">Үнэлгээний хорооны хурлын тэмдэглэлд ямар нэгэн төөрөгдүүлэх эсвэл худлаа мэдээлэл оруулахгүй.</li>
                                    <li className="items">Түншлэлийн дэмжлэг хүсэгчийн өргөдлийн үнэлэхдээ Түншлэлийн дэмжлэг үзүүлэх зааварт заасан дүрэм, шалгуурыг баримтална.</li>
                                </ul>
                            </div>
                    </div>

                    <div className="signature">
                        {/* <div className="title"> Гарын үсэг: <div className="signatureItem">/........................................./ </div>  </div> */}

                        <div className="drowPar">
                              <div className="titleee">Гарын үсэг:</div> <div className="SignBtn" onClick={()=>openModal()} ><FaPenNib /><span>Зурах</span></div>
                                 {trimmedDataURL ? <img className="SingatureImg"  src={trimmedDataURL}/> : null}
                                    <Modal visible={visible}  width="620" height="380"effect="fadeInDown" onClickAway={closeModal}>
                                        <div className="modalPar">
                                            <div className="Canvass">
                                                <SignatureCanvas className='sigCanvas' penColor='green' ref={(ref) => { sigCanvas = ref }} canvasProps={{width: 620, height: 310, className: 'sigCanvas'}} />
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
             </MainPar>
             </>
        )
  }
  export default PageOne

const MainPar = styled.div`
    margin-bottom:30px;
    background-color:white;
    max-width:700px;
    margin-top:20px;
    font-size:13px;
    padding:15px 50px;
    border:1px solid rgba(0,0,0,.3);
    .signature{
      padding:30px 0px;
          .drowPar{
            display:flex;
            align-items:start;
            margin-top:10px;
            .titleee{
              font-weight:500;
            }
            .SignBtn{
                margin-left:30px;
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
                  font-weight:500;
                }
                &:hover{
                    background-color:rgba(0,0,0,.2);
                }
            }
            
            .SingatureImg{
                border:1px solid rgba(${ColorRgb},0.3);
                width:200px;
                // height:100px;
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
      font-weight:500;
      margin:20px 0px;
      text-align:center;
    }
    .nameTitle{
      font-weight:500;
    }
    .contentPar{
      margin-top:15px;
      .items{
        margin:10px 0px; 
      }
      .Content{
        padding:0px 50px;
        .Titles{
          margin:25px 0px;
          text-align:center;
        }
        ul{
          list-style-type:decimal;
          .items{

          }
          .form-control{
            font-size:0.9em;
          }
          .smUl{
            padding-left:50px;
            list-style-type:upper-roman;
          }
        }
        

      }
      
    }
    @media (max-width:768px){
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

