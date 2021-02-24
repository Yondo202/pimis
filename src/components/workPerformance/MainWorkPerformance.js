import React, { useState } from 'react'
import styled from 'styled-components'
import {fontSize, textColor,InputStyle,ColorRgb } from '../theme'
import {MdAddCircle} from 'react-icons/md';
import Modal from 'react-awesome-modal';
import SignatureCanvas from 'react-signature-canvas'
import {FaPenNib} from 'react-icons/fa'

function MainWorkPerformance() {
    const userInitial = [{ids: 0,  url: null}];
    const initialList = [{ids: 1}];
    const [ userInfo, setUserInfo ] = useState(userInitial);
    const [ initialData, setInitialData ] = useState(initialList);
    const [visible, setVisible] = useState(false);

    let [sigCanvas, setSigCanvas] = useState({});
    let [trimmedDataURL, setTrimmedDataURL] = useState(
        [{id: null , url: null}]
    );


    const openModal=()=> {
        
         setVisible(true);
    }
    const closeModal=()=> { setVisible(false);}
    const clear = () => sigCanvas.clear();
    const trim = (id) =>{
        // let addItem = userInfo.concat([{ id:id, url: sigCanvas.getTrimmedCanvas().toDataURL('image/png') }])

        // userInitial.map((el,i)=>{
        //     if(i === id){
        //         addImg["ids"] = 1
        //         addImg["url"] = sigCanvas.getTrimmedCanvas().toDataURL('image/png')
        //     }
        // })
        let final = [];
        userInfo.map((el,i)=>{
            if((i+1) === id){
                let addImg = {};
                addImg["ids"] = 1
                addImg["url"] = sigCanvas.getTrimmedCanvas().toDataURL('image/png');
                // addImg.push(el);
                final.push(addImg);
            }
            final.push(el);
        })


        setUserInfo( final );

          setTimeout(()=>{ closeModal() },1000)
     };


    const AddHandle = ()=>{
        const list = initialData.concat( {ids: 1});
        setInitialData(list);
    }

    const AddHandleUser = ()=>{
        const list = userInfo.concat( {ids: 1, url: null});
        setUserInfo(list);
    }
    console.log(userInfo, " my user Info");


    return (
        <WorkPerformance className="container">
            <div className="contentPar">
                <div className="TitlePar">
                    <div className="title">АЖЛЫН ГҮЙЦЭТГЭЛ ХҮЛЭЭН АВАХ МАЯГТ</div>
                    <div className="desc">ЭКСПОРТЫГ ДЭМЖИХ ТӨСӨЛ (Кредит ........) Ажлын гүйцэтгэл хүлээн авах маягт</div>
                </div>

               <div className="tablePar">
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Түншлэлийн гэрээний дугаар: </div> </div>
                            <div className="col-md-9 col-9">
                                <div className="RightHead SingleSide">
                                  <InputStyle className="themeStyle" ><input placeholder="гэрээний дугаар..." type="number" /><div className="line" /></InputStyle>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Түншлэлийн дэмжлэг хүртэгчийн нэр : </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead"><InputStyle className="themeStyle" ><input placeholder="нэр..." type="number" /><div className="line" /></InputStyle></div></div>
                        </div>
                    </div>
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Утасны дугаар, e- mail: </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead"><InputStyle className="themeStyle" ><input placeholder="example@example.com..." type="number" /><div className="line" /></InputStyle></div></div>
                        </div>
                    </div>
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-12 col-12"><div className="betweenItems">Энэхүү маягтад гарын үсэг зурагдсанаар дараах гүйцэтгэх ажлуудыг батлагдсанд тооцно. </div> </div>
                        </div>
                    </div>
                    <div className="rowItems">
                        {initialData.map((el,i)=>{
                            return(
                                <div className="row rowA" key={i}>
                                    <div className="col-md-3 col-3"><div className="LeftHead">Гүйцэтгэх ажил {i + 1}:  {i===0?`Гүйцэтгэх ажлыг бичнэ үү :`: ""}  </div> </div>
                                    {/* <div className="col-md-9 col-9"><div className="RightHead"><ReactQuill placeholder={`Ажил гүйцэтгэсэн түвшин, чанар...`} theme="bubble" value={text} onChange={handleChange} /> </div></div> */}
                                    <div className="col-md-9 col-9"><div className="RightHead RightHeadA"><InputStyle className="themeStyle" ><textarea placeholder="Ажил гүйцэтгэсэн түвшин, чанар..." /><div className="line" /></InputStyle></div></div>
                                </div>
                            )
                        })}
                        <div onClick={AddHandle} className="addBtn"><MdAddCircle /></div>
                    </div>
                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Баталсан: </div> </div>
                            <div className="col-md-9 col-9"><div className="RightHead RightHeadB">Дээр дурдсан ажлуудыг хангалттай хэмжээнд гүйцэтгэсэн хэмээн ТХН, Түншлэлийн Хөтөлбөр зөвшөөрөв.</div></div>
                        </div>
                    </div>

                    <div className="rowItems">
                        <div className="row">
                            <div className="col-md-3 col-3"><div className="LeftHead">Хянасан: </div> </div>
                            <div className="col-md-9 col-9">

                                <div className="RightHead">
                                    <div className="addInfoPar">
                                        {userInfo.map((el,i)=>{
                                            return(
                                                    <div className="userInfPar" key={i}>
                                                        <div className="name">Нэр: А. Хашцэцэг</div>
                                                        <div>Албан тушаал: Төслийн зохицуулагч</div>
                                                        <div className="infItemPar">
                                                                <div className="DatePar">
                                                                    <span>Огноо: </span><InputStyle className="themeStyle" > <input placeholder="example@example.com..." type="date" max='3000-12-31' /><div className="line" /></InputStyle>
                                                                </div>
                                                                <div className="drowPar">
                                                                <div>Гарын үсэг:</div> <div className="SignBtn" onClick={()=>openModal()} ><FaPenNib /><span>Зурах</span></div>
                                                                    {el.url ? <img className="SingatureImg"  src={el.url}/> : null}
                                                                        <Modal visible={visible}  width="620" height="380"effect="fadeInDown" onClickAway={closeModal}>
                                                                            <div className="modalPar">
                                                                                <div className="Canvass">
                                                                                    <SignatureCanvas className='sigCanvas' penColor='green' ref={(ref) => { sigCanvas = ref }} canvasProps={{width: 620, height: 310, className: 'sigCanvas'}} />
                                                                                </div>
                                                                                <div className="BtnPar">
                                                                                    <button onClick={clear}>Цэвэрлэх</button>
                                                                                    <button onClick={()=>trim(i + 1)}>Хадгалах</button>
                                                                                    <button onClick={closeModal}>X</button>
                                                                                </div>
                                                                            </div>
                                                                        </Modal>
                                                                </div>
                                                        </div>
                                                </div>
                                            )
                                        })}
                                         <div onClick={AddHandleUser} className="addBtn"><MdAddCircle /></div>
                                    </div>

                                    <div className="remark"><span className="title">Жич:</span>ТХН-н хяналт-шинжилгээ, үнэлгээний мэргэжилтэнд Түншлэлийн хөтөлбөрийн хэрэгжилтийн явцыг зөвхөн тайлагнах бөгөөд тус мэргэжилтэн нь дээр дурдсан гүйцэтгэх ажлуудын чанарын тухайд аливаа хариуцлага хүлээхгүйгээс гадна төлбөрийг хойшлуулж болохгүй.</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    
               </div>
                
            </div>
           
        </WorkPerformance>
    )
}

export default MainWorkPerformance

const WorkPerformance = styled.div`
    color: rgba(${textColor});
    padding-bottom:80px;
    .contentPar{
        background-color:white;
        padding:20px 80px;
        font-size:${fontSize};
        margin-top:30px;
        border:1px solid rgba(0,0,0,.2);
        .tablePar{
            border:1px solid rgba(0,0,0,.2);
            .rowItems{
                position:relative;
                border-bottom:1px solid rgba(0,0,0,.2);
                .addBtn{
                    z-index:2;
                    cursor:pointer;
                    background-color:white;
                    border-radius:50%;
                    color:#228B22;
                    font-size:22px;
                    position:absolute;
                    left:-10px;
                    bottom:-10px;
                    transition:transform 0.3s ease;
                    &:hover{
                        transform:scale(1.15);
                    }
                }
               
                .LeftHead{
                    display:flex;
                    align-items:center;
                    height:100%;
                    background-color: rgba(63,81,181,0.1);
                    padding:8px 8px;
                    padding-right:0px;
                    border-right:1px solid rgba(0,0,0,.2);
                }
                .RightHead{
                    padding:8px 8px;
                    padding-left:0px;
                    .remark{
                        padding:15px 0px;
                        color: rgba(${textColor},0.9);
                        font-size:12.3px;
                        .title{
                            font-weight:500;
                            margin-right:10px;
                        }
                        font-style:italic;
                    }
                    
                    input{
                        width:100%;
                    }
                    .addInfoPar{
                        position:relative;
                        .addBtn{
                            width:22px;
                            height:22px;
                            cursor:pointer;
                            background-color:white;
                            border-radius:50%;
                            color:#228B22;
                            font-size:22px;
                            position:absolute;
                            left: 99.5%;
                            bottom:-8px;
                            transition:transform 0.3s ease;
                            &:hover{
                                transform:scale(1.15);
                            }
                        }
                        .userInfPar{
                            padding: 10px 0px;
                            margin-left:-30px;
                            padding-left:30px;
                            margin-right:-8px;
                            padding-right: 8px;
                            border-bottom:1px solid rgba(0,0,0,0.2);
                            .name{
                                margin-bottom:5px;
                            }
                            .infItemPar{
                                padding:10px 0px;
                                display:flex;
                                align-items:start;
                                flex-direction:column;
                                .drowPar{
                                    display:flex;
                                    align-items:start;
                                    margin-top:10px;
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
                                        height:100px;
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
                                
    
                                .DatePar{
                                    padding:5px 0px;
                                    display:flex;
                                    align-items:center;
                                    input{ margin-left:10px; }
                                    span{
                                        margin-right:10px;
                                    }
                                }
                            }
                        }
                    }
                    

                    .quill{
                        .ql-bubble{
                            border-bottom-left-radius: 0;
                            border-bottom-right-radius: 0;
                        }
                    }
                    
                }
                .SingleSide{
                    height:100%;
                    display:flex;
                    align-items:center;
                    .themeStyle{
                        width:100%;
                    }
                }
                .betweenItems{
                    background-color: rgba(63,81,181,0.3);
                    padding:4px 15px;
                }

                .rowA{
                    // border-bottom:1px solid rgba(0,0,0,.2);
                    .LeftHead{border-bottom:1px solid rgba(0,0,0,.2);}
                    .RightHead{border-bottom:1px solid rgba(0,0,0,.2);}
                }
                .RightHeadA{
                    margin-left:-30px;
                    padding-left:30px;
                }
                .RightHeadB{
                    margin-left:-30px;
                    padding-left:30px;
                    background-color: rgba(63,81,181,0.1);
                }
            }
        }
        .TitlePar{
            padding:10px 0px;
            margin-bottom:15px;
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
    }


    @media only screen and (max-width:786px){
        .contentPar{
            padding: 20px 10px
        }
    }
`


